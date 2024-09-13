// Nav.js

import Link from "next/link";
import { NAV_ITEMS } from "@/constants";

export default function Nav() {
  return (
    <nav className="ml-auto flex gap-4 sm:gap-6">
      {NAV_ITEMS.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="text-sm font-medium hover:underline underline-offset-4"
          prefetch={false}
          scroll={true}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
