import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { PolicyLayout } from "../_components/policy-layout";

export const metadata: Metadata = buildMetadata({
  title: "Chính sách đổi trả & bảo hành",
  description:
    "Chính sách đổi trả của Áo Đồng Phục Huế: bảo hành in chuyển nhiệt 12 tháng, đổi size miễn phí trong 7 ngày, hỗ trợ sửa lỗi sản xuất.",
  path: "/chinh-sach/doi-tra",
});

const LAST_UPDATED = "01/2026";

export default function DoiTraPage() {
  return (
    <PolicyLayout
      title="Chính sách đổi trả & bảo hành"
      intro="Cam kết của Áo Đồng Phục Huế khi áo có lỗi sản xuất, in ép hoặc cần đổi size."
      lastUpdated={LAST_UPDATED}
    >
      <section>
        <h2 className="font-display text-xl tracking-wide md:text-2xl">
          1. Bảo hành in chuyển nhiệt 12 tháng
        </h2>
        <p>
          Tất cả áo bóng đá / polo doanh nghiệp / áo lớp đều được bảo hành in ép
          (tên, số, logo) trong vòng <strong>12 tháng</strong> kể từ ngày nhận
          áo, với điều kiện giặt và bảo quản đúng hướng dẫn (giặt máy nước lạnh,
          không sấy nóng, không tẩy mạnh).
        </p>
        <p className="mt-2">
          Nếu hình in bong tróc, mờ màu hoặc nứt do lỗi sản xuất, chúng tôi
          nhận lại áo và <strong>in lại miễn phí</strong>.
        </p>
      </section>

      <section>
        <h2 className="font-display text-xl tracking-wide md:text-2xl">
          2. Đổi size miễn phí trong 7 ngày
        </h2>
        <ul className="mt-3 list-disc space-y-1.5 pl-5">
          <li>
            Áo chưa qua sử dụng, còn nguyên tag, không có vết bẩn / mùi lạ.
          </li>
          <li>
            Áp dụng cho áo không in tên người mặc (vì tên-số đã in không đổi size
            được — trừ khi do lỗi may).
          </li>
          <li>Đội trưởng đại diện gửi lại để chúng tôi đổi đồng loạt.</li>
          <li>
            Phí ship 2 chiều khi đổi size do khách chịu (trừ khi sai size do
            shop tư vấn nhầm).
          </li>
        </ul>
      </section>

      <section>
        <h2 className="font-display text-xl tracking-wide md:text-2xl">
          3. Lỗi sản xuất — đổi/trả 100%
        </h2>
        <p>
          Nếu áo nhận về bị lỗi từ phía xưởng — đường may bung, vải khuyết tật,
          in sai tên/số/logo so với mẫu đã duyệt — chúng tôi cam kết:
        </p>
        <ul className="mt-3 list-disc space-y-1.5 pl-5">
          <li>Đổi áo mới 100% trong 3–5 ngày làm việc.</li>
          <li>Miễn phí ship 2 chiều.</li>
          <li>
            Hoặc hoàn tiền 100% phần áo bị lỗi qua chuyển khoản trong 1–2 ngày
            làm việc.
          </li>
        </ul>
      </section>

      <section>
        <h2 className="font-display text-xl tracking-wide md:text-2xl">
          4. Trường hợp KHÔNG đổi trả
        </h2>
        <ul className="mt-3 list-disc space-y-1.5 pl-5">
          <li>Áo đã giặt, đã qua sử dụng (trừ trường hợp bảo hành in).</li>
          <li>
            Áo đã in tên cá nhân theo yêu cầu, không sai mẫu duyệt (vì không
            thể bán lại).
          </li>
          <li>Khách đã duyệt mẫu in/may rồi yêu cầu đổi thiết kế.</li>
        </ul>
      </section>

      <section>
        <h2 className="font-display text-xl tracking-wide md:text-2xl">
          5. Quy trình đổi/trả
        </h2>
        <ol className="mt-3 list-decimal space-y-1.5 pl-5">
          <li>
            Liên hệ hotline / Zalo, gửi ảnh áo lỗi + ảnh hoá đơn / mã đơn hàng.
          </li>
          <li>Chúng tôi xác nhận trong vòng 4 giờ làm việc.</li>
          <li>
            Đóng gói áo nguyên trạng, gửi về địa chỉ xưởng theo hướng dẫn (sẽ
            cung cấp mã COD nếu lỗi do shop).
          </li>
          <li>Xưởng kiểm tra trong 1–2 ngày, xử lý đổi mới hoặc hoàn tiền.</li>
        </ol>
      </section>
    </PolicyLayout>
  );
}
