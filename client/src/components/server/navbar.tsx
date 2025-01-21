import { Logo } from '@/assets/images';
import { Link } from '@/libs/i18n/routing';
import { ReactNode } from 'react';
import { DynamicLanguageSelector } from '../client';

export async function Navbar() {
  const NAVBAR_LINKS: {
    children: ReactNode;
    href: string;
    target?: string;
    rel?: string;
  }[] = [];

  return (
    <nav className='items-center h-fit bg-black p-6xl'>
      <ul className='space-x-3 flex items-center justify-center m-auto w-auto'>
        <li>
          <Link href='/'>
            <Logo className='pl-2' />
          </Link>
        </li>

        {NAVBAR_LINKS.map((link) => (
          <li>
            <Link key={link.href} href={link.href}>
              {link.children}
            </Link>
          </li>
        ))}

        <li>
          <DynamicLanguageSelector />
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
