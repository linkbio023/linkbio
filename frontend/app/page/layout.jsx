import FooterSection from "@/components/shared/footer";
import NavigationMenu from "@/components/shared/navigation-menu";
import { Toaster } from "@/components/ui/sonner";

export default function PageLayout({ children }) {
  return (
    <main>
      <NavigationMenu />
      <div>{children}</div>
      <Toaster closeButton={true} position="top-right" />
      <FooterSection />
    </main>
  );
}
