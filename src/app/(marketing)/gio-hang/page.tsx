import Link from "next/link";
import type { Metadata } from "next";
import { ShoppingBag } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Giỏ hàng",
  description: "Xem lại sản phẩm trong giỏ hàng và tiến hành đặt mua.",
  path: "/gio-hang",
  noIndex: true,
});

export default function CartPage() {
  return (
    <div className="mx-auto grid min-h-[60vh] max-w-3xl place-items-center px-4 py-12 md:px-6">
      <div className="text-center">
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-muted">
          <ShoppingBag className="h-7 w-7 text-muted-foreground" />
        </div>
        <h1 className="mt-4 font-display text-2xl tracking-wide md:text-3xl">
          GIỎ HÀNG ĐANG TRỐNG
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Tính năng đặt hàng online sẽ ra mắt trong phase tiếp theo. Hiện tại
          bạn có thể gọi hoặc gửi yêu cầu báo giá để đặt nhanh.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link href="/san-pham" className={cn(buttonVariants({ size: "lg" }))}>
            Xem sản phẩm
          </Link>
          <Link
            href="/lien-he"
            className={cn(buttonVariants({ size: "lg", variant: "outline" }))}
          >
            Gửi yêu cầu báo giá
          </Link>
        </div>
      </div>
    </div>
  );
}
