"use client";

import clsx from "clsx";
import Link from "next/link";
import { useParams, useSelectedLayoutSegment } from "next/navigation";

export default function SiteSettingsNav() {
  const { id } = useParams() as { id?: string };
  const segment = useSelectedLayoutSegment();

  const navItems = [
    {
      name: "General",
      href: `/site/${id}/settings`,
      segment: null,
    },
    {
      name: "Domains",
      href: `/site/${id}/settings/domains`,
      segment: "domains",
    },
    {
      name: "Appearance",
      href: `/site/${id}/settings/appearance`,
      segment: "appearance",
    },
  ];

  return (
    <div className="flex space-x-4 border-b border-stone-200 pb-4 pt-2">
      {navItems.map((item) => (
        <Link
          key={item.name}
          href={item.href}
          // Change style depending on whether the link is active
          className={clsx(
            "rounded-md px-2 py-1 text-sm font-medium transition-colors active:bg-stone-200",
            segment === item.segment
              ? "bg-stone-100 text-stone-600"
              : "text-stone-600 hover:bg-stone-100",
          )}
        >
          {item.name}
        </Link>
      ))}
    </div>
  );
}
