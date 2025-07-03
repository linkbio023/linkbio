import { applicationUrls } from "@/constants/application-urls";
import {
  BadgeCheck,
  Binoculars,
  HeartHandshake,
  Home,
  Image as ImageIcon,
  LineChart,
  ListCheck,
  QrCode,
  Users,
  Zap,
} from "lucide-react";

export const menu = [
  {
    title: "Dashboard",
    icon: <Home className="h-4 w-4" />,
    href: applicationUrls.dashboard.root,
    action: "read",
    subject: "Dashboard",
  },
  {
    title: "Biolink",
    icon: <Zap className="h-4 w-4" />,
    href: applicationUrls.dashboard.biolink.list,
    action: "read",
    subject: "Biolink",
  },
  {
    title: "QR Code",
    icon: <QrCode className="h-4 w-4" />,
    href: applicationUrls.dashboard.qrcode,
    action: "read",
    subject: "Qrcode",
  },
  {
    title: "Media",
    icon: <ImageIcon className="h-4 w-4" />,
    href: applicationUrls.dashboard.media,
    action: "read",
    subject: "Media",
  },
  {
    title: "Analytics",
    icon: <LineChart className="h-4 w-4" />,
    href: applicationUrls.dashboard.analytics.list,
    action: "read",
    subject: "Analytics",
  },
  // Mamagement Section
  {
    title: "BioLinks",
    icon: <ListCheck className="h-4 w-4" />,
    href: applicationUrls.dashboard.manage.biolinks.list,
    action: "manage",
    subject: "ManageBiolink",
  },
  {
    title: "Users",
    icon: <Users className="h-4 w-4" />,
    href: applicationUrls.dashboard.manage.users.list,
    action: "manage",
    subject: "ManageUser",
  },
  {
    title: "Subscription",
    icon: <BadgeCheck className="h-4 w-4" />,
    href: applicationUrls.dashboard.manage.subscription.list,
    action: "manage",
    subject: "ManageSubscribers",
  },
  {
    title: "Support",
    icon: <HeartHandshake className="h-4 w-4" />,
    href: applicationUrls.dashboard.manage.support.list,
    action: "manage",
    subject: "ManageSupport",
  },
  {
    title: "Administrator",
    icon: <Binoculars className="h-4 w-4" />,
    href: applicationUrls.dashboard.manage.administrator.list,
    action: "manage",
    subject: "ManageAdministrator",
  },
];
