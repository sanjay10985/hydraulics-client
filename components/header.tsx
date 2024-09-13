import React from "react";
import Link from "next/link";
import { ShowerHeadIcon } from "lucide-react";
import { BRAND_NAME } from "@/constants";
import Nav from "./home/nav";

export default function Header() {
  return (
    <header className="px-4 lg:px-6 h-20 flex items-center bg-primary text-primary-foreground sticky top-0 z-10">
      <Link
        href="#"
        className="flex items-center justify-center"
        prefetch={false}
        scroll={true}
      >
        <ShowerHeadIcon className="h-6 w-6" />
        <span className="text-xl font-bold ml-2">{BRAND_NAME}</span>
      </Link>
      <Nav />
    </header>
  );
}
