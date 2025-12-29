import React, { useEffect, useMemo, useRef, useState } from "react";
import { Upload, FileSpreadsheet, X } from "lucide-react";

type UploadModalProps = {
  open: boolean;
  onClose: () => void;
  onSubmit?: (file: File) => void;
};

export default function UploadModal({ open, onClose, onSubmit }: UploadModalProps) {
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // Reset selection when closed
  useEffect(() => {
    if (!open) setSelectedFile(null);
  }, [open]);

  // ESC to close
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  // Basic focus management: focus dialog on open
  useEffect(() => {
    if (open) {
      setTimeout(() => dialogRef.current?.focus(), 0);
    }
  }, [open]);

  const accept = useMemo(() => ".csv,.xlsx", []);

  if (!open) return null;

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // close if clicking backdrop only
    if (e.target === e.currentTarget) onClose();
  };

  const handlePickFile = () => inputRef.current?.click();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] ?? null;
    setSelectedFile(f);
  };

  const handleSubmit = () => {
    if (!selectedFile) return;
    console.log("Upload submit (stub):", {
      name: selectedFile.name,
      size: selectedFile.size,
      type: selectedFile.type,
    });
    onSubmit?.(selectedFile);
    onClose();
  };

  return (
    <div
      onClick={handleBackdropClick}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",

        // Darkened + blurred executive backdrop
        background: "rgba(6, 10, 18, 0.62)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        padding: "24px",
      }}
    >
      <div
        ref={dialogRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-label="Upload file"
        style={{
          width: "min(640px, 92vw)",
          borderRadius: 18,
          overflow: "hidden",

          // Glass card
          background: "rgba(18, 26, 40, 0.82)",
          border: "1px solid rgba(255, 215, 120, 0.14)",
          boxShadow: "0 22px 60px rgba(0,0,0,0.55)",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "16px 16px 12px 16px",
            borderBottom: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div
              style={{
                width: 34,
                height: 34,
                borderRadius: 12,
                display: "grid",
                placeItems: "center",
                background: "rgba(255, 215, 120, 0.10)",
                border: "1px solid rgba(255, 215, 120, 0.18)",
              }}
            >
              <Upload size={18} color="rgba(255, 215, 120, 0.95)" />
            </div>
            <div style={{ lineHeight: 1.1 }}>
              <div
                style={{
                  fontSize: 14,
                  fontWeight: 700,
                  color: "rgba(255,255,255,0.92)",
                  letterSpacing: 0.2,
                }}
              >
                Submit Data File
              </div>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.60)" }}>
                Accepted formats: .csv, .xlsx
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Close"
            style={{
              width: 34,
              height: 34,
              borderRadius: 12,
              border: "1px solid rgba(255,255,255,0.10)",
              background: "rgba(255,255,255,0.06)",
              cursor: "pointer",
              display: "grid",
              placeItems: "center",
            }}
          >
            <X size={18} color="rgba(255,255,255,0.78)" />
          </button>
        </div>

        {/* Body */}
        <div style={{ padding: 16 }}>
          <input
            ref={inputRef}
            type="file"
            accept={accept}
            onChange={handleFileChange}
            style={{ display: "none" }}
          />

          <div
            style={{
              borderRadius: 16,
              border: "1px dashed rgba(255, 215, 120, 0.22)",
              background: "rgba(255,255,255,0.04)",
              padding: 16,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div
                style={{
                  width: 46,
                  height: 46,
                  borderRadius: 16,
                  display: "grid",
                  placeItems: "center",
                  background: "rgba(220, 231, 255, 0.08)",
                  border: "1px solid rgba(220, 231, 255, 0.12)",
                }}
              >
                <FileSpreadsheet size={22} color="rgba(220,231,255,0.92)" />
              </div>

              <div style={{ flex: 1 }}>
                <div
                  style={{
                    fontSize: 13,
                    fontWeight: 700,
                    color: "rgba(255,255,255,0.90)",
                  }}
                >
                  Choose a file to upload
                </div>
                <div style={{ fontSize: 12, color: "rgba(255,255,255,0.60)" }}>
                  We’ll only store UI state for now (no backend wired).
                </div>
              </div>

              <button
                onClick={handlePickFile}
                style={{
                  padding: "10px 12px",
                  borderRadius: 12,
                  border: "1px solid rgba(255, 215, 120, 0.22)",
                  background: "rgba(255, 215, 120, 0.10)",
                  color: "rgba(255,255,255,0.92)",
                  cursor: "pointer",
                  fontWeight: 700,
                  fontSize: 12,
                  letterSpacing: 0.2,
                }}
              >
                Browse
              </button>
            </div>

            {/* Selected filename */}
            <div
              style={{
                marginTop: 14,
                padding: "10px 12px",
                borderRadius: 12,
                border: "1px solid rgba(255,255,255,0.10)",
                background: "rgba(10, 14, 22, 0.45)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 10,
              }}
            >
              <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.55)" }}>
                  Selected file
                </div>
                <div
                  style={{
                    fontSize: 12,
                    fontWeight: 700,
                    color: selectedFile ? "rgba(255,255,255,0.92)" : "rgba(255,255,255,0.45)",
                    maxWidth: "440px",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                  title={selectedFile?.name ?? ""}
                >
                  {selectedFile?.name ?? "None"}
                </div>
              </div>

              {selectedFile ? (
                <button
                  onClick={() => setSelectedFile(null)}
                  style={{
                    padding: "8px 10px",
                    borderRadius: 12,
                    border: "1px solid rgba(255,255,255,0.10)",
                    background: "rgba(255,255,255,0.06)",
                    color: "rgba(255,255,255,0.85)",
                    cursor: "pointer",
                    fontWeight: 700,
                    fontSize: 12,
                  }}
                >
                  Clear
                </button>
              ) : (
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.42)" }}>
                  .csv / .xlsx
                </div>
              )}
            </div>
          </div>

          {/* Actions */}
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              gap: 10,
              marginTop: 16,
            }}
          >
            <button
              onClick={onClose}
              style={{
                padding: "10px 14px",
                borderRadius: 14,
                border: "1px solid rgba(255,255,255,0.10)",
                background: "rgba(255,255,255,0.06)",
                color: "rgba(255,255,255,0.85)",
                cursor: "pointer",
                fontWeight: 800,
                fontSize: 12,
                letterSpacing: 0.2,
              }}
            >
              Cancel
            </button>

            <button
              onClick={handleSubmit}
              disabled={!selectedFile}
              style={{
                padding: "10px 14px",
                borderRadius: 14,
                border: "1px solid rgba(255, 215, 120, 0.26)",
                background: selectedFile ? "rgba(255, 215, 120, 0.14)" : "rgba(255, 215, 120, 0.06)",
                color: selectedFile ? "rgba(255,255,255,0.92)" : "rgba(255,255,255,0.45)",
                cursor: selectedFile ? "pointer" : "not-allowed",
                fontWeight: 900,
                fontSize: 12,
                letterSpacing: 0.35,
              }}
            >
              Upload
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
