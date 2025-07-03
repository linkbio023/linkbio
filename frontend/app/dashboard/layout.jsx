import Sidebar from "@/components/dashboard/sidebar";
import MobileSidebar from "@/components/dashboard/mobile-sidebar";
import AccountMenu from "@/components/dashboard/account-menu";
import { Toaster } from "@/components/ui/sonner";
import { AbilityProvider } from "@/authorization/AbilityContext";

export default function DashboardLayout({ children }) {
  return (
    <AbilityProvider>
      <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
        {/* Desktop & Tablet Sidebar */}
        <Sidebar />
        <div className="flex flex-col">
          {/* Header */}
          <header className="flex h-14 items-center gap-4 px-4 border-b border-primary/20 lg:h-[60px] lg:px-6">
            {/* Mobile Menu */}
            <MobileSidebar />
            {/* User Account Menu */}
            <div className="flex w-full justify-end">
              <AccountMenu />
            </div>
          </header>
          {/* Main content */}
          {children}
          {/* Toster / Sonner */}
          <Toaster closeButton={true} position="top-right" />
        </div>
      </div>
    </AbilityProvider>
  );
}
