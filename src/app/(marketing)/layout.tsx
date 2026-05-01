import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { BottomNav } from "@/components/layout/bottom-nav";
import { FloatingContact } from "@/components/layout/floating-contact";
import { PageTransition } from "@/components/layout/page-transition";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 pb-24 md:pb-0">
        <PageTransition>{children}</PageTransition>
      </main>
      <Footer />
      <BottomNav />
      <FloatingContact />
    </div>
  );
}
