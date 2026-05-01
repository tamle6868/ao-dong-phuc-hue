import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center px-4">
      <div className="text-center">
        <p className="font-display text-5xl text-primary md:text-7xl">404</p>
        <h1 className="mt-2 font-display text-2xl tracking-wide md:text-3xl">
          KHÔNG TÌM THẤY TRANG
        </h1>
        <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
          Trang bạn tìm có thể đã được di chuyển hoặc không còn tồn tại.
        </p>
        <Link
          href="/"
          className={cn(buttonVariants({ size: "lg" }), "mt-5")}
        >
          Về trang chủ
        </Link>
      </div>
    </main>
  );
}
