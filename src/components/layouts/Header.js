'use client';
import React from 'react';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';

const Header = () => {
  const session = useSession();
  const status = session.status;
  const userData = session.data?.user;

  let userName = userData?.name || userData?.email;
  if (userName && userName.includes(' ')) {
    userName = userName.split(' ')[0];
  }

  return (
    <>
      <header className='flex items-center justify-between'>
        <nav className='flex items-center gap-4 text-gray-500 font-semibold'>
          <Link className='text-primary font-semibold text-2xl' href={'/'}>
            Bon
          </Link>
          <Link href={'/'}>Home</Link>
          <Link href={'/menu'}>Menu</Link>
          <Link href={'/about'}>About</Link>
          <Link href={'/contact'}>Contact</Link>
        </nav>
        <nav className='flex items-center gap-4 text-gray-500 font-semibold'>
          {status === 'authenticated' ? (
            <>
              <Link href={'/profile'} className=' whitespace-nowrap'>
                {' '}
                Hello, {userName}
              </Link>
              <button
                onClick={() => {
                  signOut();
                }}
                className=' bg-primary rounded-full text-white px-4 py-2'
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href={'/login'}>Login</Link>
              <Link
                href={'/register'}
                className=' bg-primary rounded-full text-white px-4 py-2'
              >
                Register
              </Link>
            </>
          )}
        </nav>
      </header>
    </>
  );
};

export default Header;
