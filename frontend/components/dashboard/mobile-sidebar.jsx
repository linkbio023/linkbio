"use client";
import Link from "next/link";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import UpgradeMessage from "@/components/upgrade/upgrade-message";
import { menu } from "@/constants/menu";
import { usePathname } from "next/navigation";
import { memo, useState } from "react";
import LogoDark from "@/components/shared/logo-dark";
import { blinkConfig } from "@/config/blink-config";
import { Can } from "@/authorization/AbilityContext";

function MenuItem({ item, pathName, handleSheetClose }) {
  const isActive = pathName === item?.href;
  return (
    <Can I={item?.action} a={item?.subject}>
      <Link
        href={item?.href}
        className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${
          isActive
            ? "border border-solid border-primary rounded-lg bg-muted text-primary"
            : "border border-transparent"
        }`}
        onClick={() => handleSheetClose(false)}
      >
        {item?.icon}
        {item?.title}
      </Link>
    </Can>
  );
}

const MobileSidebar = memo(function MobileSidebarComponent() {
  const [open, setOpen] = useState(false);
  const pathName = usePathname();

  // close sheet when user clicks on a menu item
  const handleSheetClose = (value) => {
    if (value === false) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  };

  return (
    <Sheet onOpenChange={handleSheetClose} open={open}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="shrink-0 md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="flex flex-col">
        <SheetDescription />
        <nav className="grid gap-2 text-sm font-medium">
          <div
            className="flex items-center gap-2 mb-4"
            onClick={() => handleSheetClose(false)}
          >
            <div className="flex items-center w-full h-full max-w-6">
              <LogoDark />
            </div>
            <SheetTitle>{blinkConfig?.title}</SheetTitle>
          </div>
          {menu.map((item, index) => (
            <MenuItem
              key={index}
              item={item}
              pathName={pathName}
              handleSheetClose={handleSheetClose}
            />
          ))}
        </nav>
        <Can I="read" a="UpgradeMessage">
          <div className="mt-auto">
            <UpgradeMessage />
          </div>
        </Can>
      </SheetContent>
    </Sheet>
  );
});

export default MobileSidebar;
