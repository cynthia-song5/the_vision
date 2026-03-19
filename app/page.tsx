"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { pushRoute } from "./lib/route-push";

declare global {
  interface Window {
    THREE: any;
  }
}

export default function Home() {
  const router = useRouter();
  const pathname = usePathname();

  // Prevent any lingering landing-page overlay (canvas + UI) from persisting
  // when navigating away and back within the same session.
  if (pathname !== "/") return null;

  useEffect(() => {
    if (pathname !== "/") return;

    // When pathname changes away from '/', this effect instance should be torn down.
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
    script.async = true;
    document.head.appendChild(script);

    let renderer: any = null;
    let scene: any = null;
    let domElement: HTMLCanvasElement | null = null;
    let rafId: number | null = null;
    let timeoutId: ReturnType<typeof setTimeout> | null = null;
    let onMouseMove: ((e: MouseEvent) => void) | null = null;
    let onResize: (() => void) | null = null;
    let onClick: (() => void) | null = null;

    // Extra resources for proper disposal (prevents resource leaks across navigations).
    let cubeRenderTarget: any = null;
    let envTex: any = null;
    let cancelled = false;

    script.onload = () => {
      // If we've already navigated away or cleaned up, don't initialize again.
      if (cancelled || pathname !== "/") return;

      if (!(window as any).THREE) {
        console.error('THREE.js failed to load');
        return;
      }

      const THREE = (window as any).THREE;

      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.2;

      domElement = renderer.domElement as HTMLCanvasElement;
      document.body.appendChild(domElement);

      scene = new THREE.Scene();
      scene.background = new THREE.Color(0xffffff);

      const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
      camera.position.set(0, 0, 8);

      const pmremGenerator = new THREE.PMREMGenerator(renderer);
      pmremGenerator.compileCubemapShader();

      function buildGradientEnv() {
        const cvs = document.createElement('canvas');
        cvs.width = 512; cvs.height = 512;
        const c = cvs.getContext('2d');
        if (!c) return null;

        c.fillStyle = '#ffffff';
        c.fillRect(0, 0, 512, 512);

        let g = c.createLinearGradient(0, 0, 0, 200);
        g.addColorStop(0, 'rgba(255,255,255,1)');
        g.addColorStop(1, 'rgba(230,230,240,0)');
        c.fillStyle = g;
        c.fillRect(0, 0, 512, 512);

        const bands = [
          { y: 80,  h: 6,  col: 'rgba(100,100,115,0.9)' },
          { y: 180, h: 3,  col: 'rgba(80,80,95,0.7)'    },
          { y: 280, h: 8,  col: 'rgba(60,60,75,0.85)'   },
          { y: 390, h: 4,  col: 'rgba(50,50,65,0.6)'    },
          { y: 460, h: 12, col: 'rgba(30,30,45,0.9)'    },
        ];
        bands.forEach(b => {
          c.fillStyle = b.col;
          c.fillRect(0, b.y, 512, b.h);
        });

        let floor = c.createLinearGradient(0, 300, 0, 512);
        floor.addColorStop(0, 'rgba(120,120,135,0)');
        floor.addColorStop(1, 'rgba(40,40,55,0.95)');
        c.fillStyle = floor;
        c.fillRect(0, 0, 512, 512);

        return new THREE.CanvasTexture(cvs);
      }

      const builtEnvTex = buildGradientEnv();
      if (!builtEnvTex) {
        console.error('Failed to build environment texture');
        return;
      }

      envTex = builtEnvTex;
      const envMat = new THREE.MeshBasicMaterial({
        map: envTex,
        side: THREE.BackSide,
      });
      const envGeom = new THREE.SphereGeometry(50, 32, 32);
      const envMesh = new THREE.Mesh(envGeom, envMat);
      const envScene = new THREE.Scene();
      envScene.add(envMesh);

      cubeRenderTarget = new THREE.WebGLCubeRenderTarget(256, {
        format: THREE.RGBFormat,
        generateMipmaps: true,
        minFilter: THREE.LinearMipmapLinearFilter,
      });
      const cubeCamera = new THREE.CubeCamera(0.1, 100, cubeRenderTarget);
      envScene.add(cubeCamera);
      cubeCamera.update(renderer, envScene);

      const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
      scene.add(ambientLight);

      const keyLight = new THREE.DirectionalLight(0xffffff, 2.5);
      keyLight.position.set(5, 8, 5);
      keyLight.castShadow = true;
      scene.add(keyLight);

      const fillLight = new THREE.DirectionalLight(0xe8eaff, 0.8);
      fillLight.position.set(-5, 2, 3);
      scene.add(fillLight);

      const rimLight = new THREE.DirectionalLight(0xffffff, 1.5);
      rimLight.position.set(0, -5, -5);
      scene.add(rimLight);

      const topLight = new THREE.PointLight(0xffffff, 1.2, 20);
      topLight.position.set(0, 6, 3);
      scene.add(topLight);

      function createChromeMaterial() {
        return new THREE.MeshPhysicalMaterial({
          color: 0xffffff,
          metalness: 1.0,
          roughness: 0.04,
          envMap: cubeRenderTarget.texture,
          envMapIntensity: 2.5,
          reflectivity: 1.0,
          clearcoat: 1.0,
          clearcoatRoughness: 0.05,
        });
      }

      function createStarGeometry(outerR: number, innerR: number, depth: number, points: number) {
        const shape = new THREE.Shape();
        const n = points || 5;
        for (let i = 0; i < n * 2; i++) {
          const angle = (i * Math.PI) / n - Math.PI / 2;
          const r = i % 2 === 0 ? outerR : innerR;
          const x = Math.cos(angle) * r;
          const y = Math.sin(angle) * r;
          i === 0 ? shape.moveTo(x, y) : shape.lineTo(x, y);
        }
        shape.closePath();

        const extrudeSettings = {
          depth: depth,
          bevelEnabled: true,
          bevelSegments: 6,
          steps: 2,
          bevelSize: outerR * 0.12,
          bevelThickness: outerR * 0.12,
        };

        const geom = new THREE.ExtrudeGeometry(shape, extrudeSettings);
        geom.center();
        return geom;
      }

      const starData = [
        { label: 'feed',  basePos: new THREE.Vector3(-1.8,  0.9,  0),   size: 0.75, points: 5, depth: 0.32, route: '/feed'        },
        { label: 'share', basePos: new THREE.Vector3( 1.9,  0.7,  0.3), size: 0.62, points: 6, depth: 0.28, route: '/share'       },
        { label: 'find',  basePos: new THREE.Vector3( 0.1, -1.5, -0.2), size: 0.85, points: 5, depth: 0.35, route: '/find-vision' },
      ];

      const stars: any[] = [];

      starData.forEach((data: any) => {
        const geom = createStarGeometry(data.size, data.size * 0.42, data.depth, data.points);
        const mat = createChromeMaterial();
        const mesh = new THREE.Mesh(geom, mat);

        const group = new THREE.Group();
        group.add(mesh);
        group.position.copy(data.basePos);
        scene.add(group);

        stars.push({
          mesh,
          mat,
          group,
          basePos: data.basePos.clone(),
          floatOffset: Math.random() * Math.PI * 2,
          floatSpeed: 0.3 + Math.random() * 0.2,
          rotSpeed: (Math.random() - 0.5) * 0.4,
          wobblePhase: Math.random() * Math.PI * 2,
          hovered: false,
          hoverScale: 1,
          targetHoverScale: 1,
          driftAngle: Math.random() * Math.PI * 2,
          driftSpeed: 0.08 + Math.random() * 0.06,
          driftRadius: 0.15 + Math.random() * 0.1,
          currentPos: data.basePos.clone(),
          route: data.route,
        });
      });

      const labelEls = [
        document.getElementById('label-0'),
        document.getElementById('label-1'),
        document.getElementById('label-2'),
      ];

      function updateLabels() {
        stars.forEach((star: any, i: number) => {
          const pos = star.group.position.clone();
          pos.project(camera);
          const x = (pos.x * 0.5 + 0.5) * window.innerWidth;
          const y = (-pos.y * 0.5 + 0.5) * window.innerHeight;
          if (labelEls[i]) {
            (labelEls[i] as HTMLElement).style.left = x + 'px';
            (labelEls[i] as HTMLElement).style.top = (y + starData[i].size * 90 + 14) + 'px';
            labelEls[i]!.classList.toggle('hovered', star.hovered);
          }
        });
      }

      const mouse = { x: 0, y: 0, ndc: new THREE.Vector2() };
      const cursor = document.getElementById('cursor');
      const raycaster = new THREE.Raycaster();
      let anyHovered = false;

      onMouseMove = (e: MouseEvent) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
        mouse.ndc.x = (e.clientX / window.innerWidth) * 2 - 1;
        mouse.ndc.y = -(e.clientY / window.innerHeight) * 2 + 1;
        if (cursor) {
          cursor.style.left = e.clientX + 'px';
          cursor.style.top = e.clientY + 'px';
        }
      };
      document.addEventListener('mousemove', onMouseMove);

      const clock = new THREE.Clock();

      function animate() {
        rafId = requestAnimationFrame(animate);
        const t = clock.getElapsedTime();

        raycaster.setFromCamera(mouse.ndc, camera);
        const meshes = stars.map((s: any) => s.mesh);
        const hits = raycaster.intersectObjects(meshes);
        const hitSet = new Set(hits.map((h: any) => h.object));

        anyHovered = hits.length > 0;
        if (cursor) {
          cursor.classList.toggle('hover', anyHovered);
        }

        stars.forEach((star: any) => {
          const isHit = hitSet.has(star.mesh);
          star.hovered = isHit;
          star.targetHoverScale = isHit ? 1.22 : 1.0;
          star.hoverScale += (star.targetHoverScale - star.hoverScale) * 0.08;

          star.driftAngle += star.driftSpeed * 0.005;
          const driftX = Math.cos(star.driftAngle) * star.driftRadius;
          const driftY = Math.sin(star.driftAngle * 1.3) * star.driftRadius * 0.7;
          const floatY = Math.sin(t * star.floatSpeed + star.floatOffset) * 0.12;

          const proj = star.basePos.clone().project(camera);
          const sx = (proj.x * 0.5 + 0.5) * window.innerWidth;
          const sy = (-proj.y * 0.5 + 0.5) * window.innerHeight;
          const dx = (mouse.x - sx) / window.innerWidth;
          const dy = (mouse.y - sy) / window.innerHeight;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const repel = Math.max(0, 1 - dist / 0.25) * 0.18;
          const repelX = -dx * repel;
          const repelY = dy * repel;

          star.group.position.x = star.basePos.x + driftX + repelX;
          star.group.position.y = star.basePos.y + driftY + floatY + repelY;
          star.group.position.z = star.basePos.z;

          star.group.scale.setScalar(star.hoverScale);

          star.mesh.rotation.x = Math.sin(t * 0.25 + star.wobblePhase) * 0.06;
          star.mesh.rotation.y = Math.cos(t * 0.2 + star.wobblePhase * 0.7) * 0.06;
          star.mesh.rotation.z = Math.sin(t * 0.18 + star.wobblePhase * 1.3) * 0.04;

          star.mat.envMapIntensity = isHit ? 3.5 : 2.5;
          star.mat.roughness = isHit ? 0.02 : 0.04;
        });

        updateLabels();

        camera.position.x += (mouse.ndc.x * 0.3 - camera.position.x) * 0.02;
        camera.position.y += (mouse.ndc.y * 0.2 - camera.position.y) * 0.02;
        camera.lookAt(0, 0, 0);

        renderer.render(scene, camera);
      }

      animate();

      onResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      };
      window.addEventListener('resize', onResize);

      // ── FIXED: only push the route of the star that is actually hovered ──
      onClick = () => {
        const hoveredStar = stars.find((star: any) => star.hovered);
        if (!hoveredStar) return;

        hoveredStar.targetHoverScale = 1.35;
        if (timeoutId) clearTimeout(timeoutId);

        timeoutId = setTimeout(() => {
          hoveredStar.targetHoverScale = 1.22;
          pushRoute(router, hoveredStar.route);
        }, 60);
      };

      domElement?.addEventListener('click', onClick);
    };

    return () => {
      cancelled = true;
      if (timeoutId) clearTimeout(timeoutId);
      if (rafId) cancelAnimationFrame(rafId);

      if (onMouseMove) document.removeEventListener('mousemove', onMouseMove);
      if (onResize) window.removeEventListener('resize', onResize);
      if (domElement && onClick) domElement.removeEventListener('click', onClick);

      try {
        // Dispose WebGL resources to avoid leaked render loops across navigations.
        if (scene) {
          scene.traverse((obj: any) => {
            if (obj?.geometry?.dispose) obj.geometry.dispose();
            if (obj?.material?.dispose) obj.material.dispose();
            if (Array.isArray(obj?.material)) {
              obj.material.forEach((m: any) => m?.dispose?.());
            }
          });
        }
        if (cubeRenderTarget?.dispose) cubeRenderTarget.dispose();
        if (envTex?.dispose) envTex.dispose();
        renderer?.dispose?.();
      } catch {
        // best-effort cleanup; avoid throwing during unmount
      }

      if (domElement?.parentNode) {
        domElement.parentNode.removeChild(domElement);
      }
    };
  }, [router, pathname]);

  return (
    <>
      <style dangerouslySetInnerHTML={{
        __html: `
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body {
            background: #ffffff;
            width: 100vw;
            height: 100vh;
            overflow: hidden;
            font-family: 'DM Sans', system-ui, sans-serif;
            cursor: none;
          }
          .cursor {
            position: fixed;
            width: 8px; height: 8px;
            background: #1a1a1a;
            border-radius: 50%;
            pointer-events: none;
            transform: translate(-50%, -50%);
            z-index: 9999;
            transition: transform 0.15s ease, width 0.3s ease, height 0.3s ease;
            mix-blend-mode: multiply;
          }
          .cursor.hover {
            width: 32px; height: 32px;
            background: transparent;
            border: 1px solid rgba(0,0,0,0.25);
          }
          .labels {
            position: fixed;
            top: 0; left: 0;
            width: 100%; height: 100%;
            pointer-events: none;
            z-index: 10;
          }
          .label {
            position: absolute;
            transform: translate(-50%, -50%);
            opacity: 1;
            text-align: center;
          }
          .label.hovered span {
            letter-spacing: 0.35em;
          }
          .label span {
            display: block;
            font-size: 11px;
            letter-spacing: 0.25em;
            text-transform: lowercase;
            color: #1a1a1a;
            font-weight: 300;
            font-family: 'DM Sans', system-ui, sans-serif;
            transition: letter-spacing 0.4s ease;
          }
          .wordmark {
            position: fixed;
            top: 40px; left: 50%;
            transform: translateX(-50%);
            z-index: 20;
            font-size: 11px;
            letter-spacing: 0.35em;
            text-transform: lowercase;
            color: rgba(0,0,0,0.3);
            font-family: 'DM Sans', system-ui, sans-serif;
            font-weight: 300;
            user-select: none;
          }
          .hint {
            position: fixed;
            bottom: 40px; left: 50%;
            transform: translateX(-50%);
            z-index: 20;
            font-size: 9px;
            letter-spacing: 0.4em;
            text-transform: lowercase;
            color: rgba(0,0,0,0.2);
            font-family: 'DM Sans', system-ui, sans-serif;
            animation: breathe 4s ease-in-out infinite;
          }
          @keyframes breathe {
            0%, 100% { opacity: 0.5; }
            50% { opacity: 1; }
          }
        `
      }} />

      <div className="cursor" id="cursor"></div>
      <div className="wordmark">✦ &nbsp; studio</div>
      <div className="hint">hover to explore</div>

      <div className="labels" id="labels">
        <div className="label" id="label-0"><span>feed</span></div>
        <div className="label" id="label-1"><span>share</span></div>
        <div className="label" id="label-2"><span>find</span></div>
      </div>
    </>
  );
}