"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, ImageIcon, AlertCircle } from "lucide-react";

interface DropZoneProps {
  onImageAccepted: (file: File) => void;
  isLoading: boolean;
}

export function DropZone({ onImageAccepted, isLoading }: DropZoneProps) {
  const [dragError, setDragError] = useState<string | null>(null);

  const onDrop = useCallback(
    (acceptedFiles: File[], rejectedFiles: unknown[]) => {
      setDragError(null);
      if (rejectedFiles && (rejectedFiles as File[]).length > 0) {
        setDragError("please upload a valid image file (jpeg, png, or webp).");
        return;
      }
      if (acceptedFiles.length > 0) onImageAccepted(acceptedFiles[0]);
    },
    [onImageAccepted]
  );

  const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
    onDrop,
    accept: { "image/jpeg": [".jpg", ".jpeg"], "image/png": [".png"], "image/webp": [".webp"] },
    maxFiles: 1,
    maxSize: 10 * 1024 * 1024,
    disabled: isLoading,
  });

  return (
    <div className="w-full">
      <div
        {...getRootProps()}
        className="relative group cursor-pointer rounded-2xl border-2 border-dashed transition-all duration-300 flex flex-col items-center justify-center min-h-[320px] p-10"
        style={{
          borderColor: isDragReject ? "#FCA5A5" : isDragActive ? "#7EB8D4" : "#BCC4D8",
          backgroundColor: isDragReject ? "rgba(254,226,226,0.4)" : isDragActive ? "rgba(126,184,212,0.06)" : "#F2F5FA",
          opacity: isLoading ? 0.6 : 1,
          cursor: isLoading ? "not-allowed" : "pointer",
        }}
      >
        <input {...getInputProps()} />

        {/* Corner accents */}
        {["top-3 left-3 border-t-2 border-l-2", "top-3 right-3 border-t-2 border-r-2",
          "bottom-3 left-3 border-b-2 border-l-2", "bottom-3 right-3 border-b-2 border-r-2"].map((cls, i) => (
          <span
            key={i}
            className={`absolute w-4 h-4 ${cls}`}
            style={{ borderColor: isDragActive ? "#7EB8D4" : "#BCC4D8" }}
          />
        ))}

        <div className="flex flex-col items-center gap-5 text-center">
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300"
            style={{
              backgroundColor: isDragActive ? "rgba(126,184,212,0.15)" : "#E4EAF4",
              color: isDragActive ? "#7EB8D4" : isDragReject ? "#F87171" : "#8F9BB8",
            }}
          >
            {isDragReject ? <AlertCircle size={26} /> : isDragActive ? <ImageIcon size={26} /> : <Upload size={26} />}
          </div>

          <div>
            <p className="font-display text-xl mb-1" style={{ color: "#1A2030" }}>
              {isDragActive && !isDragReject
                ? "release to analyse"
                : isDragReject
                  ? "invalid file type"
                  : "drop your outfit here"}
            </p>
            {!isDragActive && (
              <p className="font-body text-sm" style={{ color: "#8F9BB8" }}>
                or click to browse · jpeg, png, webp · max 10mb
              </p>
            )}
          </div>

          {!isDragActive && (
            <div className="flex items-center gap-2 mt-1 flex-wrap justify-center">
              {["full look", "street style", "runway", "mirror selfie"].map((label) => (
                <span
                  key={label}
                  className="px-3 py-1 text-xs font-body font-medium rounded-full border"
                  style={{ color: "#626F8C", backgroundColor: "#E4EAF4", borderColor: "#DDE2EE" }}
                >
                  {label}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {dragError && (
        <p className="mt-3 text-sm flex items-center gap-1.5" style={{ color: "#EF4444" }}>
          <AlertCircle size={14} />
          {dragError}
        </p>
      )}
    </div>
  );
}

