"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X, Search, Bell, User } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function MainLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo and main nav */}
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <Link href="/">
                  <div className="flex items-center">
                    <Image
                      src="/logos/logo_myarchery.svg"
                      alt="MyArchery"
                      width={140}
                      height={40}
                      className="h-8 w-auto"
                    />
                  </div>
                </Link>
              </div>
              
              {/* Desktop navigation */}
              <nav className="hidden md:ml-6 md:flex md:space-x-6">
                <Link href="/events" className="text-slate-700 hover:text-slate-900 px-3 py-2 text-sm font-medium">
                  Events
                </Link>
                <Link href="/scoring" className="text-slate-700 hover:text-slate-900 px-3 py-2 text-sm font-medium">
                  Scoring
                </Link>
                <Link href="/register" className="text-slate-700 hover:text-slate-900 px-3 py-2 text-sm font-medium">
                  Register
                </Link>
              </nav>
            </div>
            
            {/* Search and right nav */}
            <div className="flex items-center">
              <div className="hidden md:block">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search size={16} className="text-slate-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search events..."
                    className="block w-full pl-10 pr-3 py-2 border border-slate-200 rounded-md text-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
              
              <button className="ml-4 p-1 rounded-full text-slate-600 hover:text-slate-900 focus:outline-none">
                <Bell size={20} />
              </button>
              
              <div className="ml-4 relative flex-shrink-0">
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <User size={16} className="mr-2" />
                  Sign In
                </Button>
              </div>
              
              {/* Mobile menu button */}
              <div className="ml-4 md:hidden flex items-center">
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="inline-flex items-center justify-center p-2 rounded-md text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-none"
                >
                  {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link href="/events" className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-100">
                Events
              </Link>
              <Link href="/scoring" className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-100">
                Scoring
              </Link>
              <Link href="/register" className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-100">
                Register
              </Link>
            </div>
            <div className="px-5 py-3 border-t border-slate-200">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search size={16} className="text-slate-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search events..."
                  className="block w-full pl-10 pr-3 py-2 border border-slate-200 rounded-md text-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Main content */}
      <div className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </div>
      </div>
      
      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <Image
                src="/logos/logo_myarchery.svg"
                alt="MyArchery"
                width={120}
                height={30}
                className="h-6 w-auto"
              />
              <p className="text-sm text-slate-500 mt-2">© 2025 MyArchery. All rights reserved.</p>
            </div>
            <div className="flex space-x-6">
              <Link href="/privacy-policy" className="text-sm text-slate-600 hover:text-slate-900">Privacy Policy</Link>
              <Link href="/terms" className="text-sm text-slate-600 hover:text-slate-900">Terms of Service</Link>
              <Link href="/contact" className="text-sm text-slate-600 hover:text-slate-900">Contact</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}