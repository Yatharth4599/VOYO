'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Menu, X, LogOut } from 'lucide-react';

interface BurgerMenuProps {
  currentPage?: string;
  onMenuToggle?: (isOpen: boolean) => void;
}

export default function BurgerMenu({ currentPage, onMenuToggle }: BurgerMenuProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  const menuItems = [
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Agents', path: '/agents' },
    { name: 'Knowledge Base', path: '/knowledge-base' },
    { name: 'Call History', path: '/call-history' },
    { name: 'Phone Numbers', path: '/phone-numbers' },
  ];

  const toggleMenu = (open: boolean) => {
    setIsMenuOpen(open);
    onMenuToggle?.(open);
  };

  const handleLogout = () => {
    // Clear JWT token from localStorage
    localStorage.removeItem('jwtToken');
    
    // Close the menu
    toggleMenu(false);
    
    // Redirect to landing page
    router.push('/');
  };

  return (
    <>
      {/* Burger Menu Button */}
      <button
        onClick={() => toggleMenu(true)}
        className="text-gray-700 focus:outline-none cursor-pointer hover:text-amber-600 transition-colors"
      >
        <Menu size={28} />
      </button>

      {/* Sidebar */}
      <motion.div
        initial={{ x: -250 }}
        animate={{ x: isMenuOpen ? 0 : -250 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="fixed top-0 left-0 w-64 h-screen bg-white/95 backdrop-blur-md border-r border-gray-200 z-50 shadow-xl p-6 pt-8 flex flex-col"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-amber-600">Menu</h2>
          <button onClick={() => toggleMenu(false)}>
            <X size={24} className="text-gray-700 cursor-pointer" />
          </button>
        </div>
        {/* Navigation Items */}
        <nav className="flex flex-col gap-6 mt-8 flex-1">
          {menuItems.map((item) => (
            <button
              key={item.path}
              onClick={() => {
                router.push(item.path);
                toggleMenu(false);
              }}
              className={`text-lg text-left cursor-pointer transition-colors ${
                currentPage === item.path
                  ? 'text-amber-600 font-semibold'
                  : 'text-gray-700 hover:text-amber-600'
              }`}
            >
              {item.name}
            </button>
          ))}
        </nav>
        
        {/* Logout Button - positioned at bottom */}
        <div className="border-t border-gray-200 pt-4 mt-4">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 text-lg text-left cursor-pointer transition-colors text-red-600 hover:text-red-700 w-full"
          >
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </motion.div>
    </>
  );
}