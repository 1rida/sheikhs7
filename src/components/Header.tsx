'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '../context/CartContext'; 
import { useAuth } from '../context/AuthContext'; 

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { getCartItemCount } = useCart(); 
  const { isLoggedIn, logout } = useAuth();

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Products', href: '/products' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <header className="sticky top-0 bg-white shadow-sm z-50">
      <div className="container mx-auto flex items-center justify-between h-20 px-4 md:px-6">
        <div className="flex-none hidden md:block">
          <span className="text-black text-3xl font-extrabold tracking-wide" style={{ fontFamily: 'Playfair Display, serif' }}>
            Sheikh&#39;s <span className="text-green-600 text-4xl">7</span>
          </span>
        </div>

        <div className="flex-1 flex justify-center items-center overflow-hidden">
          <Image
            src="/logo.png"
            alt="Sheikh 7 Logo"
            width={60}
            height={60}
            className="object-contain transition-transform duration-300 ease-in-out lg:scale-150 transform origin-center mt-3"
            priority
          />
        </div>

        <div className="flex-none flex items-center space-x-4">
          <nav className="hidden md:flex items-center">
            <ul className="flex list-none p-0 m-0">
              {navLinks.map((link) => (
                <li key={link.name} className="mx-4">
                  <Link
                    href={link.href}
                    className="relative text-black text-lg font-medium hover:text-green-700
                               after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-green-600
                               after:transition-all after:duration-300 hover:after:w-full"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
              {isLoggedIn ? (
                <>
                  <li className="mx-4">
                    <Link
                      href="/admin"
                      className="relative text-black text-lg font-medium hover:text-green-700
                                 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-green-600
                                 after:transition-all after:duration-300 hover:after:w-full"
                    >
                      Admin
                    </Link>
                  </li>
                  <li className="mx-4">
                    <button
                      onClick={logout}
                      className="relative text-black text-lg font-medium hover:text-red-700
                                 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-red-600
                                 after:transition-all after:duration-300 hover:after:w-full"
                    >
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <li className="mx-4">
                  <Link
                    href="/admin-login"
                    className="relative text-black text-lg font-medium hover:text-green-700
                               after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-green-600
                               after:transition-all after:duration-300 hover:after:w-full"
                  >
                    Login
                  </Link>
                </li>
              )}
            </ul>
          </nav>

          <div className="ml-6 hidden md:block">
            <Link href="/cart"> 
              <button className="relative text-black hover:text-green-700 focus:outline-none cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                </svg>
                {getCartItemCount() > 0 && ( 
                  <span className="absolute -top-1 -right-1 bg-green-600 text-white text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center">
                    {getCartItemCount()}
                  </span>
                )}
              </button>
            </Link>
          </div>

          <div className="md:hidden ml-4">
            <button onClick={() => setIsOpen(!isOpen)} className="text-black focus:outline-none">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}></path>
              </svg>
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <nav className="md:hidden bg-white absolute top-full left-0 w-full shadow-lg pb-4">
          <ul className="flex flex-col items-center list-none p-0 m-0">
            {navLinks.map((link) => (
              <li key={link.name} className="my-2">
                <Link
                  href={link.href}
                  className="text-black text-xl font-medium hover:text-green-700"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              </li>
            ))}
            {isLoggedIn ? (
              <>
                <li className="my-2">
                  <Link
                    href="/admin"
                    className="text-black text-xl font-medium hover:text-green-700"
                    onClick={() => setIsOpen(false)}
                  >
                    Admin
                  </Link>
                </li>
                <li className="my-2">
                  <button
                    onClick={() => { logout(); setIsOpen(false); }}
                    className="text-black text-xl font-medium hover:text-red-700"
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <li className="my-2">
                <Link
                  href="/admin-login"
                  className="text-black text-xl font-medium hover:text-green-700"
                  onClick={() => setIsOpen(false)}
                >
                  Login
                </Link>
              </li>
            )}
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Header;
