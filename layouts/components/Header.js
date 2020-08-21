import React from 'react';
import Link from 'next/link';

const Header = () => {
  const a = '';
  return (
    <header className="flex md:justify-between p-8">
      <div className="flex items-center">
        <img src="/tp-100.png" alt="tp-logo" className="w-16 mx-5" />
        <h1 className="text-white sm:text-3xl text-2xl font-bold">
          <Link href="/">
            <a href="/">
              TP-Demo
            </a>
          </Link>
        </h1>
      </div>
    </header>
  );
};

export default Header;
