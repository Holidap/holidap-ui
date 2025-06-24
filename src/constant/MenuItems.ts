import { Home, CheckCircle, FileCheck, CirclePlus, File } from "lucide-react";

export const MenuItems = [
  { title: "Dashboard", icon: Home, url: "/main" },
  { title: "Check List", icon: CheckCircle, url: "/checklist" },
  { title: "Todo", icon: CirclePlus, url: "/todo" },
  { title: "Prepare", icon: FileCheck, url: "/prepare" },
  { title: "Markdown View", icon: File, url: "/markdown-view" },
];
