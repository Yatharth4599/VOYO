'use client';

import { ReactNode, useState } from 'react';
import Image from 'next/image';
import BurgerMenu from './BurgerMenu';
import Link from 'next/link';

interface NavigationLayoutProps {
  children: ReactNode;
  title: string;
  currentPage?: string;
  showCreateButton?: boolean;
  onCreateClick?: () => void;
  createButtonText?: string;
}

export default function NavigationLayout({
  children,
  title,
  currentPage,
  showCreateButton = false,
  onCreateClick,
  createButtonText = 'Create New'
}: NavigationLayoutProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-tr from-[#FAF8F3] to-[#F5F2EA] text-gray-800 font-sans">
      {/* Main Content Area */}
      <div 
        className="px-8 py-12 relative transition-all duration-300 ease-in-out"
        style={{
          marginLeft: isMenuOpen ? '256px' : '0px'
        }}
      >
        {/* Top Navbar */}
        <div className="flex items-center gap-4 mb-10 relative z-40">
          <BurgerMenu 
            currentPage={currentPage} 
            onMenuToggle={setIsMenuOpen}
          />
          <Link href={'/'}>
           <Image src="/logo-voyo-removebg-preview.png" alt="Voyo Logo" width={90} height={60} className="cursor-pointer"/>
          </Link>
          <h1 className="text-3xl font-bold text-amber-700">{title}</h1>
          {showCreateButton && onCreateClick && (
            <button
              onClick={onCreateClick}
              className="ml-auto bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg text-lg font-semibold cursor-pointer shadow-md transition-all"
            >
              {createButtonText}
            </button>
          )}
        </div>

        {/* Page Content */}
        {children}
      </div>
    </div>
  );
}