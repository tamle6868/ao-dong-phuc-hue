import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { BUSINESS_INFO } from "@/lib/constants";
import { PolicyLayout } from "../_components/policy-layout";

export const metadata: Metadata = buildMetadata({
  title: "Chính sách giao hàng",
  description:
    "Chính sách giao hàng của Áo Đồng Phục Huế: thời gian sản xuất, phí vận chuyển, khu vực giao toàn quốc, tracking đơn hàng.",
  path: "/chinh-sach/giao-hang",
});

const LAST_UPDATED = "01/2026";

export default function GiaoHangPage() {
  return (
    <PolicyLayout
      title="Chính sách giao hàng"
      intro="Cách Áo Đồng Phục Huế sản xuất, đóng gói và vận chuyển áo đến đội của bạn — từ Huế đi toàn quốc."
      lastUpdated={LAST_UPDATED}
    >
      <section>
        <h2 className="font-display text-xl tracking-wide md:text-2xl">
          1. Thời gian sản xuất
        </h2>
        <ul className="mt-3 list-disc space-y-1.5 pl-5">
          <li>
            <strong>Áo bóng đá thiết kế</strong>: 5–7 ngày từ khi chốt mẫu (bao
            gồm in chuyển nhiệt tên & số áo).
          </li>
          <li>
            <strong>Đồng phục doanh nghiệp</strong> (polo, sơ mi, áo gió): 7–10
            ngày từ khi xác nhận mẫu may + brand guideline.
          </li>
          <li>
            <strong>Áo lớp / áo nhóm</strong>: 4–6 ngày từ khi chốt thiết kế.
          </li>
          <li>
            <strong>Đơn gấp</strong> (cần trước giải đấu/sự kiện): liên hệ
            hotline {BUSINESS_INFO.phone} — phụ thu 15–25% tuỳ tiến độ.
          </li>
        </ul>
      </section>

      <section>
        <h2 className="font-display text-xl tracking-wide md:text-2xl">
          2. Khu vực &amp; thời gian vận chuyển
        </h2>
        <ul className="mt-3 list-disc space-y-1.5 pl-5">
          <li>
            <strong>Nội thành Huế</strong>: giao tận nơi 1 ngày làm việc (miễn
            phí đơn ≥ 11 áo).
          </li>
          <li>
            <strong>Đà Nẵng, Quảng Trị, Quảng Bình</strong>: 1–2 ngày qua nhà xe
            uy tín hoặc Viettel Post.
          </li>
          <li>
            <strong>Toàn quốc</strong>: 2–4 ngày qua J&amp;T / GHTK / Viettel
            Post. Đơn ≥ 30 áo miễn phí ship toàn quốc.
          </li>
        </ul>
      </section>

      <section>
        <h2 className="font-display text-xl tracking-wide md:text-2xl">
          3. Phí vận chuyển
        </h2>
        <p>
          Áp dụng theo bảng giá nhà vận chuyển; chúng tôi báo phí cụ thể trong
          quote PDF khi chốt đơn. Đơn lớn (≥ 50 áo) thường được miễn phí 100%.
        </p>
      </section>

      <section>
        <h2 className="font-display text-xl tracking-wide md:text-2xl">
          4. Tracking đơn hàng
        </h2>
        <p>
          Sau khi đóng gói, bạn nhận mã vận đơn qua Zalo / SMS. Có thể tra
          tracking real-time trên website của nhà vận chuyển.
        </p>
      </section>

      <section>
        <h2 className="font-display text-xl tracking-wide md:text-2xl">
          5. Đặt cọc &amp; thanh toán
        </h2>
        <ul className="mt-3 list-disc space-y-1.5 pl-5">
          <li>
            <strong>Đặt cọc 50%</strong> khi chốt mẫu (đội bóng / lớp / nhóm).
          </li>
          <li>
            <strong>Thanh toán đủ</strong> trước khi nhận hàng hoặc COD nội
            thành Huế.
          </li>
          <li>
            <strong>Doanh nghiệp công nợ 30 ngày</strong>: hỗ trợ khi đơn ≥ 100
            áo và có hợp đồng nguyên tắc. Có xuất hoá đơn VAT.
          </li>
        </ul>
      </section>
    </PolicyLayout>
  );
}
