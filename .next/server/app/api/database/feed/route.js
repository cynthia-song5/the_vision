/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/database/feed/route";
exports.ids = ["app/api/database/feed/route"];
exports.modules = {

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ }),

/***/ "../app-render/work-async-storage.external":
/*!*****************************************************************************!*\
  !*** external "next/dist/server/app-render/work-async-storage.external.js" ***!
  \*****************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-async-storage.external.js");

/***/ }),

/***/ "./work-unit-async-storage.external":
/*!**********************************************************************************!*\
  !*** external "next/dist/server/app-render/work-unit-async-storage.external.js" ***!
  \**********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-unit-async-storage.external.js");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

"use strict";
module.exports = require("fs");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("path");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fdatabase%2Ffeed%2Froute&page=%2Fapi%2Fdatabase%2Ffeed%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fdatabase%2Ffeed%2Froute.ts&appDir=%2FUsers%2Fcynthiasong%2FDesktop%2Fstyletag%20(2)%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fcynthiasong%2FDesktop%2Fstyletag%20(2)&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fdatabase%2Ffeed%2Froute&page=%2Fapi%2Fdatabase%2Ffeed%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fdatabase%2Ffeed%2Froute.ts&appDir=%2FUsers%2Fcynthiasong%2FDesktop%2Fstyletag%20(2)%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fcynthiasong%2FDesktop%2Fstyletag%20(2)&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _Users_cynthiasong_Desktop_styletag_2_app_api_database_feed_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/database/feed/route.ts */ \"(rsc)/./app/api/database/feed/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/database/feed/route\",\n        pathname: \"/api/database/feed\",\n        filename: \"route\",\n        bundlePath: \"app/api/database/feed/route\"\n    },\n    resolvedPagePath: \"/Users/cynthiasong/Desktop/styletag (2)/app/api/database/feed/route.ts\",\n    nextConfigOutput,\n    userland: _Users_cynthiasong_Desktop_styletag_2_app_api_database_feed_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZkYXRhYmFzZSUyRmZlZWQlMkZyb3V0ZSZwYWdlPSUyRmFwaSUyRmRhdGFiYXNlJTJGZmVlZCUyRnJvdXRlJmFwcFBhdGhzPSZwYWdlUGF0aD1wcml2YXRlLW5leHQtYXBwLWRpciUyRmFwaSUyRmRhdGFiYXNlJTJGZmVlZCUyRnJvdXRlLnRzJmFwcERpcj0lMkZVc2VycyUyRmN5bnRoaWFzb25nJTJGRGVza3RvcCUyRnN0eWxldGFnJTIwKDIpJTJGYXBwJnBhZ2VFeHRlbnNpb25zPXRzeCZwYWdlRXh0ZW5zaW9ucz10cyZwYWdlRXh0ZW5zaW9ucz1qc3gmcGFnZUV4dGVuc2lvbnM9anMmcm9vdERpcj0lMkZVc2VycyUyRmN5bnRoaWFzb25nJTJGRGVza3RvcCUyRnN0eWxldGFnJTIwKDIpJmlzRGV2PXRydWUmdHNjb25maWdQYXRoPXRzY29uZmlnLmpzb24mYmFzZVBhdGg9JmFzc2V0UHJlZml4PSZuZXh0Q29uZmlnT3V0cHV0PSZwcmVmZXJyZWRSZWdpb249Jm1pZGRsZXdhcmVDb25maWc9ZTMwJTNEISIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUErRjtBQUN2QztBQUNxQjtBQUNzQjtBQUNuRztBQUNBO0FBQ0E7QUFDQSx3QkFBd0IseUdBQW1CO0FBQzNDO0FBQ0EsY0FBYyxrRUFBUztBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsWUFBWTtBQUNaLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSxRQUFRLHNEQUFzRDtBQUM5RDtBQUNBLFdBQVcsNEVBQVc7QUFDdEI7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUMwRjs7QUFFMUYiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90aGUtdmlzaW9uLz81NzVjIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFwcFJvdXRlUm91dGVNb2R1bGUgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9yb3V0ZS1tb2R1bGVzL2FwcC1yb3V0ZS9tb2R1bGUuY29tcGlsZWRcIjtcbmltcG9ydCB7IFJvdXRlS2luZCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL3JvdXRlLWtpbmRcIjtcbmltcG9ydCB7IHBhdGNoRmV0Y2ggYXMgX3BhdGNoRmV0Y2ggfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9saWIvcGF0Y2gtZmV0Y2hcIjtcbmltcG9ydCAqIGFzIHVzZXJsYW5kIGZyb20gXCIvVXNlcnMvY3ludGhpYXNvbmcvRGVza3RvcC9zdHlsZXRhZyAoMikvYXBwL2FwaS9kYXRhYmFzZS9mZWVkL3JvdXRlLnRzXCI7XG4vLyBXZSBpbmplY3QgdGhlIG5leHRDb25maWdPdXRwdXQgaGVyZSBzbyB0aGF0IHdlIGNhbiB1c2UgdGhlbSBpbiB0aGUgcm91dGVcbi8vIG1vZHVsZS5cbmNvbnN0IG5leHRDb25maWdPdXRwdXQgPSBcIlwiXG5jb25zdCByb3V0ZU1vZHVsZSA9IG5ldyBBcHBSb3V0ZVJvdXRlTW9kdWxlKHtcbiAgICBkZWZpbml0aW9uOiB7XG4gICAgICAgIGtpbmQ6IFJvdXRlS2luZC5BUFBfUk9VVEUsXG4gICAgICAgIHBhZ2U6IFwiL2FwaS9kYXRhYmFzZS9mZWVkL3JvdXRlXCIsXG4gICAgICAgIHBhdGhuYW1lOiBcIi9hcGkvZGF0YWJhc2UvZmVlZFwiLFxuICAgICAgICBmaWxlbmFtZTogXCJyb3V0ZVwiLFxuICAgICAgICBidW5kbGVQYXRoOiBcImFwcC9hcGkvZGF0YWJhc2UvZmVlZC9yb3V0ZVwiXG4gICAgfSxcbiAgICByZXNvbHZlZFBhZ2VQYXRoOiBcIi9Vc2Vycy9jeW50aGlhc29uZy9EZXNrdG9wL3N0eWxldGFnICgyKS9hcHAvYXBpL2RhdGFiYXNlL2ZlZWQvcm91dGUudHNcIixcbiAgICBuZXh0Q29uZmlnT3V0cHV0LFxuICAgIHVzZXJsYW5kXG59KTtcbi8vIFB1bGwgb3V0IHRoZSBleHBvcnRzIHRoYXQgd2UgbmVlZCB0byBleHBvc2UgZnJvbSB0aGUgbW9kdWxlLiBUaGlzIHNob3VsZFxuLy8gYmUgZWxpbWluYXRlZCB3aGVuIHdlJ3ZlIG1vdmVkIHRoZSBvdGhlciByb3V0ZXMgdG8gdGhlIG5ldyBmb3JtYXQuIFRoZXNlXG4vLyBhcmUgdXNlZCB0byBob29rIGludG8gdGhlIHJvdXRlLlxuY29uc3QgeyB3b3JrQXN5bmNTdG9yYWdlLCB3b3JrVW5pdEFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MgfSA9IHJvdXRlTW9kdWxlO1xuZnVuY3Rpb24gcGF0Y2hGZXRjaCgpIHtcbiAgICByZXR1cm4gX3BhdGNoRmV0Y2goe1xuICAgICAgICB3b3JrQXN5bmNTdG9yYWdlLFxuICAgICAgICB3b3JrVW5pdEFzeW5jU3RvcmFnZVxuICAgIH0pO1xufVxuZXhwb3J0IHsgcm91dGVNb2R1bGUsIHdvcmtBc3luY1N0b3JhZ2UsIHdvcmtVbml0QXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcywgcGF0Y2hGZXRjaCwgIH07XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWFwcC1yb3V0ZS5qcy5tYXAiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fdatabase%2Ffeed%2Froute&page=%2Fapi%2Fdatabase%2Ffeed%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fdatabase%2Ffeed%2Froute.ts&appDir=%2FUsers%2Fcynthiasong%2FDesktop%2Fstyletag%20(2)%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fcynthiasong%2FDesktop%2Fstyletag%20(2)&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(ssr)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "(rsc)/./app/api/database/feed/route.ts":
/*!****************************************!*\
  !*** ./app/api/database/feed/route.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ GET)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! fs */ \"fs\");\n/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(fs__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! path */ \"path\");\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_2__);\n\n\n\nasync function GET(request) {\n    try {\n        // Get the feed directory - check if it exists first\n        const feedDir = path__WEBPACK_IMPORTED_MODULE_2___default().join(process.cwd(), 'public', 'database', 'feed');\n        // Check if feed directory exists\n        if (!fs__WEBPACK_IMPORTED_MODULE_1___default().existsSync(feedDir)) {\n            console.error('Feed directory does not exist:', feedDir);\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: 'Feed directory not found. Images should be placed in /public/database/feed/'\n            }, {\n                status: 404\n            });\n        }\n        // Read all files in feed directory\n        const files = fs__WEBPACK_IMPORTED_MODULE_1___default().readdirSync(feedDir);\n        // Filter for image files (JPG, HEIC, etc.)\n        const imageFiles = files.filter((file)=>/\\.(jpg|jpeg|heic|png|webp)$/i.test(file));\n        if (imageFiles.length === 0) {\n            console.log('No images found in feed directory');\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                posts: []\n            });\n        }\n        // Create posts from image files\n        const posts = imageFiles.map((file, index)=>{\n            const fileName = file.split('.')[0]; // Remove extension\n            const fileExt = path__WEBPACK_IMPORTED_MODULE_2___default().extname(file).toLowerCase();\n            return {\n                id: `feed-${index + 1}`,\n                image: `/database/feed/${file}`,\n                username: `style_${fileName.replace(/[^a-zA-Z0-9]/g, '')}`,\n                caption: `Style inspiration from ${fileName.replace(/[^a-zA-Z0-9]/g, ' ')}`,\n                tags: [\n                    'style',\n                    'fashion',\n                    'inspiration'\n                ],\n                likeCount: Math.floor(Math.random() * 500) + 100,\n                timestamp: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000),\n                userAvatar: `/database/feed/${imageFiles[index % imageFiles.length]}`\n            };\n        });\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            posts\n        });\n    } catch (error) {\n        console.error('Error reading database feed:', error);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: 'Failed to load feed data'\n        }, {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL2RhdGFiYXNlL2ZlZWQvcm91dGUudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQXdEO0FBQ3BDO0FBQ0k7QUFFakIsZUFBZUcsSUFBSUMsT0FBb0I7SUFDNUMsSUFBSTtRQUNGLG9EQUFvRDtRQUNwRCxNQUFNQyxVQUFVSCxnREFBUyxDQUFDSyxRQUFRQyxHQUFHLElBQUksVUFBVSxZQUFZO1FBRS9ELGlDQUFpQztRQUNqQyxJQUFJLENBQUNQLG9EQUFhLENBQUNJLFVBQVU7WUFDM0JLLFFBQVFDLEtBQUssQ0FBQyxrQ0FBa0NOO1lBQ2hELE9BQU9MLHFEQUFZQSxDQUFDWSxJQUFJLENBQ3RCO2dCQUFFRCxPQUFPO1lBQThFLEdBQ3ZGO2dCQUFFRSxRQUFRO1lBQUk7UUFFbEI7UUFFQSxtQ0FBbUM7UUFDbkMsTUFBTUMsUUFBUWIscURBQWMsQ0FBQ0k7UUFFN0IsMkNBQTJDO1FBQzNDLE1BQU1XLGFBQWFGLE1BQU1HLE1BQU0sQ0FBQ0MsQ0FBQUEsT0FDOUIsK0JBQStCQyxJQUFJLENBQUNEO1FBR3RDLElBQUlGLFdBQVdJLE1BQU0sS0FBSyxHQUFHO1lBQzNCVixRQUFRVyxHQUFHLENBQUM7WUFDWixPQUFPckIscURBQVlBLENBQUNZLElBQUksQ0FBQztnQkFBRVUsT0FBTyxFQUFFO1lBQUM7UUFDdkM7UUFFQSxnQ0FBZ0M7UUFDaEMsTUFBTUEsUUFBUU4sV0FBV08sR0FBRyxDQUFDLENBQUNMLE1BQU1NO1lBQ2xDLE1BQU1DLFdBQVdQLEtBQUtRLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLG1CQUFtQjtZQUN4RCxNQUFNQyxVQUFVekIsbURBQVksQ0FBQ2dCLE1BQU1XLFdBQVc7WUFFOUMsT0FBTztnQkFDTEMsSUFBSSxDQUFDLEtBQUssRUFBRU4sUUFBUSxHQUFHO2dCQUN2Qk8sT0FBTyxDQUFDLGVBQWUsRUFBRWIsTUFBTTtnQkFDL0JjLFVBQVUsQ0FBQyxNQUFNLEVBQUVQLFNBQVNRLE9BQU8sQ0FBQyxpQkFBaUIsS0FBSztnQkFDMURDLFNBQVMsQ0FBQyx1QkFBdUIsRUFBRVQsU0FBU1EsT0FBTyxDQUFDLGlCQUFpQixNQUFNO2dCQUMzRUUsTUFBTTtvQkFBQztvQkFBUztvQkFBVztpQkFBYztnQkFDekNDLFdBQVdDLEtBQUtDLEtBQUssQ0FBQ0QsS0FBS0UsTUFBTSxLQUFLLE9BQU87Z0JBQzdDQyxXQUFXLElBQUlDLEtBQUtBLEtBQUtDLEdBQUcsS0FBS0wsS0FBS0UsTUFBTSxLQUFLLElBQUksS0FBSyxLQUFLLEtBQUs7Z0JBQ3BFSSxZQUFZLENBQUMsZUFBZSxFQUFFM0IsVUFBVSxDQUFDUSxRQUFRUixXQUFXSSxNQUFNLENBQUMsRUFBRTtZQUN2RTtRQUNGO1FBRUEsT0FBT3BCLHFEQUFZQSxDQUFDWSxJQUFJLENBQUM7WUFBRVU7UUFBTTtJQUNuQyxFQUFFLE9BQU9YLE9BQU87UUFDZEQsUUFBUUMsS0FBSyxDQUFDLGdDQUFnQ0E7UUFDOUMsT0FBT1gscURBQVlBLENBQUNZLElBQUksQ0FDdEI7WUFBRUQsT0FBTztRQUEyQixHQUNwQztZQUFFRSxRQUFRO1FBQUk7SUFFbEI7QUFDRiIsInNvdXJjZXMiOlsid2VicGFjazovL3RoZS12aXNpb24vLi9hcHAvYXBpL2RhdGFiYXNlL2ZlZWQvcm91dGUudHM/ODc3NyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZXh0UmVxdWVzdCwgTmV4dFJlc3BvbnNlIH0gZnJvbSAnbmV4dC9zZXJ2ZXInO1xuaW1wb3J0IGZzIGZyb20gJ2ZzJztcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gR0VUKHJlcXVlc3Q6IE5leHRSZXF1ZXN0KSB7XG4gIHRyeSB7XG4gICAgLy8gR2V0IHRoZSBmZWVkIGRpcmVjdG9yeSAtIGNoZWNrIGlmIGl0IGV4aXN0cyBmaXJzdFxuICAgIGNvbnN0IGZlZWREaXIgPSBwYXRoLmpvaW4ocHJvY2Vzcy5jd2QoKSwgJ3B1YmxpYycsICdkYXRhYmFzZScsICdmZWVkJyk7XG4gICAgXG4gICAgLy8gQ2hlY2sgaWYgZmVlZCBkaXJlY3RvcnkgZXhpc3RzXG4gICAgaWYgKCFmcy5leGlzdHNTeW5jKGZlZWREaXIpKSB7XG4gICAgICBjb25zb2xlLmVycm9yKCdGZWVkIGRpcmVjdG9yeSBkb2VzIG5vdCBleGlzdDonLCBmZWVkRGlyKTtcbiAgICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbihcbiAgICAgICAgeyBlcnJvcjogJ0ZlZWQgZGlyZWN0b3J5IG5vdCBmb3VuZC4gSW1hZ2VzIHNob3VsZCBiZSBwbGFjZWQgaW4gL3B1YmxpYy9kYXRhYmFzZS9mZWVkLycgfSxcbiAgICAgICAgeyBzdGF0dXM6IDQwNCB9XG4gICAgICApO1xuICAgIH1cbiAgICBcbiAgICAvLyBSZWFkIGFsbCBmaWxlcyBpbiBmZWVkIGRpcmVjdG9yeVxuICAgIGNvbnN0IGZpbGVzID0gZnMucmVhZGRpclN5bmMoZmVlZERpcik7XG4gICAgXG4gICAgLy8gRmlsdGVyIGZvciBpbWFnZSBmaWxlcyAoSlBHLCBIRUlDLCBldGMuKVxuICAgIGNvbnN0IGltYWdlRmlsZXMgPSBmaWxlcy5maWx0ZXIoZmlsZSA9PiBcbiAgICAgIC9cXC4oanBnfGpwZWd8aGVpY3xwbmd8d2VicCkkL2kudGVzdChmaWxlKVxuICAgICk7XG4gICAgXG4gICAgaWYgKGltYWdlRmlsZXMubGVuZ3RoID09PSAwKSB7XG4gICAgICBjb25zb2xlLmxvZygnTm8gaW1hZ2VzIGZvdW5kIGluIGZlZWQgZGlyZWN0b3J5Jyk7XG4gICAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBwb3N0czogW10gfSk7XG4gICAgfVxuICAgIFxuICAgIC8vIENyZWF0ZSBwb3N0cyBmcm9tIGltYWdlIGZpbGVzXG4gICAgY29uc3QgcG9zdHMgPSBpbWFnZUZpbGVzLm1hcCgoZmlsZSwgaW5kZXgpID0+IHtcbiAgICAgIGNvbnN0IGZpbGVOYW1lID0gZmlsZS5zcGxpdCgnLicpWzBdOyAvLyBSZW1vdmUgZXh0ZW5zaW9uXG4gICAgICBjb25zdCBmaWxlRXh0ID0gcGF0aC5leHRuYW1lKGZpbGUpLnRvTG93ZXJDYXNlKCk7XG4gICAgICBcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGlkOiBgZmVlZC0ke2luZGV4ICsgMX1gLFxuICAgICAgICBpbWFnZTogYC9kYXRhYmFzZS9mZWVkLyR7ZmlsZX1gLFxuICAgICAgICB1c2VybmFtZTogYHN0eWxlXyR7ZmlsZU5hbWUucmVwbGFjZSgvW15hLXpBLVowLTldL2csICcnKX1gLFxuICAgICAgICBjYXB0aW9uOiBgU3R5bGUgaW5zcGlyYXRpb24gZnJvbSAke2ZpbGVOYW1lLnJlcGxhY2UoL1teYS16QS1aMC05XS9nLCAnICcpfWAsXG4gICAgICAgIHRhZ3M6IFsnc3R5bGUnLCAnZmFzaGlvbicsICdpbnNwaXJhdGlvbiddLFxuICAgICAgICBsaWtlQ291bnQ6IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDUwMCkgKyAxMDAsXG4gICAgICAgIHRpbWVzdGFtcDogbmV3IERhdGUoRGF0ZS5ub3coKSAtIE1hdGgucmFuZG9tKCkgKiA3ICogMjQgKiA2MCAqIDYwICogMTAwMCksIC8vIFJhbmRvbSB0aW1lIHdpdGhpbiBsYXN0IHdlZWtcbiAgICAgICAgdXNlckF2YXRhcjogYC9kYXRhYmFzZS9mZWVkLyR7aW1hZ2VGaWxlc1tpbmRleCAlIGltYWdlRmlsZXMubGVuZ3RoXX1gXG4gICAgICB9O1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgcG9zdHMgfSk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgY29uc29sZS5lcnJvcignRXJyb3IgcmVhZGluZyBkYXRhYmFzZSBmZWVkOicsIGVycm9yKTtcbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oXG4gICAgICB7IGVycm9yOiAnRmFpbGVkIHRvIGxvYWQgZmVlZCBkYXRhJyB9LFxuICAgICAgeyBzdGF0dXM6IDUwMCB9XG4gICAgKTtcbiAgfVxufVxuIl0sIm5hbWVzIjpbIk5leHRSZXNwb25zZSIsImZzIiwicGF0aCIsIkdFVCIsInJlcXVlc3QiLCJmZWVkRGlyIiwiam9pbiIsInByb2Nlc3MiLCJjd2QiLCJleGlzdHNTeW5jIiwiY29uc29sZSIsImVycm9yIiwianNvbiIsInN0YXR1cyIsImZpbGVzIiwicmVhZGRpclN5bmMiLCJpbWFnZUZpbGVzIiwiZmlsdGVyIiwiZmlsZSIsInRlc3QiLCJsZW5ndGgiLCJsb2ciLCJwb3N0cyIsIm1hcCIsImluZGV4IiwiZmlsZU5hbWUiLCJzcGxpdCIsImZpbGVFeHQiLCJleHRuYW1lIiwidG9Mb3dlckNhc2UiLCJpZCIsImltYWdlIiwidXNlcm5hbWUiLCJyZXBsYWNlIiwiY2FwdGlvbiIsInRhZ3MiLCJsaWtlQ291bnQiLCJNYXRoIiwiZmxvb3IiLCJyYW5kb20iLCJ0aW1lc3RhbXAiLCJEYXRlIiwibm93IiwidXNlckF2YXRhciJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./app/api/database/feed/route.ts\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/@opentelemetry"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fdatabase%2Ffeed%2Froute&page=%2Fapi%2Fdatabase%2Ffeed%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fdatabase%2Ffeed%2Froute.ts&appDir=%2FUsers%2Fcynthiasong%2FDesktop%2Fstyletag%20(2)%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fcynthiasong%2FDesktop%2Fstyletag%20(2)&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();