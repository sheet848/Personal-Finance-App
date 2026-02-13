'use client';

import SidebarItem from './ui/SidebarItem';
import { sidebarItems } from '../constants/Sidebardata';

export default function Sidebar() {
  return (
    <aside
      className="fixed bottom-0 left-0 z-50
      flex h-16 w-full items-center justify-around
      bg-neutral-900 md:h-screen md:w-64
      md:flex-col md:justify-start
    "
    >
      {/* Logo */}
      <h1 className="hidden px-4 py-6 text-2xl font-bold text-white md:block">
        finance
      </h1>

      {/* Navigation */}
      <nav
        className="flex w-full items-center justify-around
    md:flex-col md:gap-1 md:px-2"
      >
        {sidebarItems.map((item) => (
          <SidebarItem key={item.href} {...item} />
        ))}
      </nav>

      {/* Footer 
      <div className="mt-auto pt-6">
        <button
          className=" mt-auto hidden items-center gap-2 px-4 py-4 text-sm text-gray-400 hover:text-white md:flex"
        >
          ⏴ Minimize Menu
        </button>
      </div>
      */}
    </aside>
  );
}
