"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, Search, ShoppingBag, User } from "lucide-react";

const NAV = [
  { href: "/shop", label: "Shop" },
  { href: "/categories", label: "Categories" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-sand bg-paper/95 backdrop-blur dark:bg-[#15140F]/95 dark:border-white/10">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link href="/" className="font-display text-xl tracking-tight">
          Shop
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm">
          {NAV.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-accent transition-colors">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <Link
            href="/search"
            aria-label="Search"
            className="hidden sm:flex p-2 rounded-full hover:bg-sand dark:hover:bg-white/10"
          >
            <Search size={20} />
          </Link>
          <Link
            href="/account"
            aria-label="Account"
            className="hidden sm:flex p-2 rounded-full hover:bg-sand dark:hover:bg-white/10"
          >
            <User size={20} />
          </Link>
          <Link
            href="/cart"
            aria-label="Cart"
            className="flex p-2 rounded-full hover:bg-sand dark:hover:bg-white/10"
          >
            <ShoppingBag size={20} />
          </Link>
          <button
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="md:hidden p-2 rounded-full hover:bg-sand dark:hover:bg-white/10"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="md:hidden border-t border-sand dark:border-white/10 px-4 py-3 flex flex-col gap-1">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="py-2 text-base"
            >
              {item.label}
            </Link>
          ))}
          <Link href="/search" onClick={() => setOpen(false)} className="py-2 text-base">
            Search
          </Link>
          <Link href="/account" onClick={() => setOpen(false)} className="py-2 text-base">
            Account
          </Link>
        </nav>
      )}
    </header>
  );
}
