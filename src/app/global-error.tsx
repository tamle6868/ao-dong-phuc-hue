"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[global-error]", error);
  }, [error]);

  return (
    <html lang="vi">
      <body
        style={{
          fontFamily:
            "ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",
          background: "#ffffff",
          color: "#0a0a0a",
          margin: 0,
        }}
      >
        <div
          style={{
            display: "grid",
            placeItems: "center",
            minHeight: "100vh",
            padding: "2rem 1rem",
            textAlign: "center",
          }}
        >
          <div>
            <h1
              style={{
                fontSize: "1.75rem",
                fontWeight: 700,
                letterSpacing: "0.02em",
                margin: 0,
              }}
            >
              ĐÃ CÓ LỖI HỆ THỐNG
            </h1>
            <p
              style={{
                marginTop: "0.75rem",
                color: "#525252",
                maxWidth: 480,
              }}
            >
              Xin lỗi, ứng dụng gặp lỗi nghiêm trọng. Bạn thử tải lại trang.
            </p>
            <button
              type="button"
              onClick={() => reset()}
              style={{
                marginTop: "1.25rem",
                padding: "0.75rem 1.5rem",
                background: "#8b0e0e",
                color: "#ffffff",
                border: "none",
                borderRadius: "0.5rem",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Thử lại
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
