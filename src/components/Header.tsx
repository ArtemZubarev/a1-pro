"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import cn from 'classnames';


export default function Header() {
  const pathName = usePathname();
  const isActive = (href: string) => pathName === href;

  const links = [
    {
      title: 'Задание 1',
      to: '/',
      isActive: isActive('/')
    },
    {
      title: 'Задание 2',
      to: '/selectbox',
      isActive: isActive('/selectbox')
    },
    {
      title: 'Задание 3',
      to: '/games',
      isActive: isActive('/games')
    }
  ];

  return (
    <div className="bg-white">
      <nav className="mx-auto flex max-w-7xl items-center justify-between pt-6 pb-6 pl-0 gap-4" aria-label="Global">
        {
          links.map(({ to, title, isActive }) => (
            <Link
              href={to}
              className={cn('text-sm font-semibold leading-6', { 'text-blue-500': isActive })}
              key={to}
            >
              {title}
            </Link>
          ))
        }
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <a href="https://github.com/ArtemZubarev/a1-pro" target="_blank" className="text-blue-600 bold">Github</a>
        </div>
      </nav>
    </div>
  )
}