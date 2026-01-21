'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

type Props = {
  label: string;
  href: string;
  icon: React.ElementType;
};

export default function SidebarItem({ label, href, icon: Icon }: Props) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`
        flex items-center justify-center rounded-lg px-3 py-2
        text-gray-400 transition

        md:w-full md:justify-start md:gap-3 md:px-4 md:py-3

        ${
          isActive
            ? 'text-emerald-500 md:bg-white md:text-emerald-600'
            : 'hover:text-white'
        }
      `}
    >
      <Icon size={20} />
      <span className="hidden md:inline">{label}</span>
    </Link>
  );
}
