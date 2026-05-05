import Link from "next/link";
import type { Metadata } from "next";
import { User } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Tài khoản",
  description: "Quản lý đơn hàng, thông tin thanh toán & ưu đãi cá nhân.",
  path: "/tai-khoan",
  noIndex: true,
});

export default function AccountPage() {
  return (
    <div className="mx-auto grid min-h-[60vh] max-w-3xl place-items-center px-4 py-12 md:px-6">
      <div className="text-center">
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-muted">
          <User className="h-7 w-7 text-muted-foreground" />
        </div>
        <h1 className="mt-4 font-display text-2xl tracking-wide md:text-3xl">
          TÀI KHOẢN KHÁCH HÀNG
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Phần đăng nhập / tra cứu đơn sẽ ra mắt khi tích hợp Supabase Auth ở
          phase tiếp theo.
        </p>
        <div className="mt-6">
          <Link href="/" className={cn(buttonVariants({ size: "lg" }))}>
            Về trang chủ
          </Link>
        </div>
      </div>
    </div>
  );
}
