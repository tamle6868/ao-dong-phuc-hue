"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RefreshCcw, Home } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[app-error]", error);
  }, [error]);

  return (
    <div className="mx-auto grid min-h-[60vh] max-w-3xl place-items-center px-4 py-12 md:px-6">
      <div className="text-center">
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-destructive/10 text-destructive">
          <AlertTriangle className="h-7 w-7" />
        </div>
        <h1 className="mt-4 font-display text-2xl tracking-wide md:text-3xl">
          ĐÃ CÓ LỖI XẢY RA
        </h1>
        <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
          Xin lỗi, có lỗi không mong muốn. Bạn thử tải lại trang hoặc về trang
          chủ. Nếu vẫn lỗi, gọi cho chúng tôi để được hỗ trợ ngay.
        </p>
        {error.digest && (
          <p className="mt-2 font-mono text-[11px] text-muted-foreground">
            Mã lỗi: {error.digest}
          </p>
        )}
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button
            type="button"
            onClick={() => reset()}
            className={cn(buttonVariants({ size: "lg" }))}
          >
            <RefreshCcw className="h-4 w-4" />
            Thử lại
          </button>
          <Link
            href="/"
            className={cn(buttonVariants({ size: "lg", variant: "outline" }))}
          >
            <Home className="h-4 w-4" />
            Về trang chủ
          </Link>
        </div>
      </div>
    </div>
  );
}
