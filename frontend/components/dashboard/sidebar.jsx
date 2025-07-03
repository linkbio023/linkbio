"use client";
import Link from "next/link";
import UpgradeMessage from "@/components/upgrade/upgrade-message";
import { menu } from "@/constants/menu";
import { usePathname } from "next/navigation";
import { Can } from "@/authorization/AbilityContext";
import { memo } from "react";
import LogoDark from "@/components/shared/logo-dark";
import { blinkConfig } from "@/config/blink-config";

function MenuItem({ item, pathName }) {
  const isActive = pathName === item?.href;
  return (
    <Can I={item?.action} a={item?.subject}>
      <Link
        href={item?.href}
        className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${
          isActive ? "rounded-lg bg-primary/10" : ""
        }`}
      >
        {item?.icon}
        {item?.title}
      </Link>
    </Can>
  );
}

const Sidebar = memo(function SidebarComponent() {
  const pathName = usePathname();
  return (
    <div className="hidden bg-primary/5 border-r border-primary/20 md:block">
      <div className="flex h-full  flex-col gap-2">
        <div className="flex h-14 items-center px-4 lg:h-[60px] lg:px-6">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <div className="w-full h-full max-w-6">
              <LogoDark />
            </div>
            <span>{blinkConfig?.title}</span>
          </Link>
        </div>
        <div className="flex-1">
          <nav className="grid gap-2 items-start px-2 text-sm font-medium lg:px-4">
            {menu.map((item, index) => (
              <MenuItem key={index} item={item} pathName={pathName} />
            ))}
          </nav>
        </div>
        <Can I="read" a="UpgradeMessage">
          <div className="p-4 sticky bottom-0">
            <UpgradeMessage />
          </div>
        </Can>
      </div>
    </div>
  );
});

export default Sidebar;
