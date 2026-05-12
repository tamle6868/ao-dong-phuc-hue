import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { BUSINESS_INFO } from "@/lib/constants";
import { PolicyLayout } from "../_components/policy-layout";

export const metadata: Metadata = buildMetadata({
  title: "Chính sách bảo mật",
  description:
    "Cách Áo Đồng Phục Huế thu thập, sử dụng và bảo vệ dữ liệu cá nhân của khách hàng — tuân thủ Luật An ninh mạng 2018.",
  path: "/chinh-sach/bao-mat",
});

const LAST_UPDATED = "01/2026";

export default function BaoMatPage() {
  return (
    <PolicyLayout
      title="Chính sách bảo mật"
      intro="Áo Đồng Phục Huế cam kết bảo vệ dữ liệu cá nhân của bạn — chỉ thu thập những gì cần thiết để liên hệ tư vấn và xử lý đơn hàng."
      lastUpdated={LAST_UPDATED}
    >
      <section>
        <h2 className="font-display text-xl tracking-wide md:text-2xl">
          1. Thông tin chúng tôi thu thập
        </h2>
        <ul className="mt-3 list-disc space-y-1.5 pl-5">
          <li>
            <strong>Họ tên, số điện thoại, email</strong>: khi bạn gửi form báo
            giá hoặc đặt áo.
          </li>
          <li>
            <strong>Tên công ty, vai trò</strong>: chỉ khi bạn liên hệ về đồng
            phục doanh nghiệp.
          </li>
          <li>
            <strong>Thiết kế, logo, ảnh đội</strong>: file bạn gửi qua Zalo để
            chúng tôi sản xuất.
          </li>
          <li>
            <strong>Dữ liệu kỹ thuật</strong>: trình duyệt, IP (đã hash SHA-256
            — không lưu IP gốc), UTM nguồn truy cập — phục vụ phân tích.
          </li>
        </ul>
      </section>

      <section>
        <h2 className="font-display text-xl tracking-wide md:text-2xl">
          2. Mục đích sử dụng
        </h2>
        <ul className="mt-3 list-disc space-y-1.5 pl-5">
          <li>Liên hệ tư vấn báo giá, gửi mẫu thiết kế qua điện thoại / Zalo.</li>
          <li>Xử lý đơn hàng, gửi mã vận đơn, chăm sóc sau bán.</li>
          <li>
            Phân tích nội bộ về kênh marketing hiệu quả (không bao giờ chia sẻ
            cho bên thứ ba).
          </li>
        </ul>
      </section>

      <section>
        <h2 className="font-display text-xl tracking-wide md:text-2xl">
          3. Chia sẻ dữ liệu
        </h2>
        <p>Chúng tôi <strong>KHÔNG</strong> bán, cho thuê hoặc chia sẻ dữ liệu cá nhân của bạn cho bên thứ ba — ngoại trừ:</p>
        <ul className="mt-3 list-disc space-y-1.5 pl-5">
          <li>
            Đơn vị vận chuyển (Viettel Post / J&amp;T / GHTK) khi giao hàng —
            chỉ thông tin cần thiết (tên, SĐT, địa chỉ).
          </li>
          <li>Theo yêu cầu của cơ quan nhà nước có thẩm quyền.</li>
        </ul>
      </section>

      <section>
        <h2 className="font-display text-xl tracking-wide md:text-2xl">
          4. Lưu trữ &amp; bảo mật
        </h2>
        <ul className="mt-3 list-disc space-y-1.5 pl-5">
          <li>
            Dữ liệu lưu trữ trên hạ tầng Supabase + Vercel (mã hoá at-rest và
            in-transit).
          </li>
          <li>
            Quyền truy cập admin được giới hạn cho nhân viên cần thiết qua hệ
            thống xác thực hai lớp.
          </li>
          <li>
            Bạn có thể yêu cầu xoá toàn bộ thông tin của mình bằng cách liên hệ
            email <a href={`mailto:${BUSINESS_INFO.email}`} className="text-primary underline">{BUSINESS_INFO.email}</a> — chúng tôi xử lý trong vòng 7 ngày làm việc.
          </li>
        </ul>
      </section>

      <section>
        <h2 className="font-display text-xl tracking-wide md:text-2xl">
          5. Cookies
        </h2>
        <p>
          Website sử dụng cookies kỹ thuật để giữ phiên đăng nhập admin và đo
          lường UTM. Chúng tôi <strong>không</strong> dùng cookies quảng cáo từ
          bên thứ ba. Bạn có thể tắt cookies trong trình duyệt — vẫn xem được
          website nhưng một số tính năng admin có thể bị ảnh hưởng.
        </p>
      </section>
    </PolicyLayout>
  );
}
