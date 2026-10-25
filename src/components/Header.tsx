'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Phone, 
  MapPin, 
  MessageSquare, 
  Activity,
  CalendarCheck,
  FlaskConical
} from 'lucide-react';
import { LAB_DETAILS } from '@/data/labData';
import QuickBookingModal from './QuickBookingModal';

export default function Header() {
  const pathname = usePathname();
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  // Exact 4 pages requested
  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Tests & Packages', href: '/tests' },
    { name: 'Home Collection', href: '/home-collection' },
    { name: 'Contact & Map', href: '/contact' },
  ];

  return (
    <>
      {/* Top Notification Bar - Desktop Only (Hidden on Mobile) */}
      <div className="hidden md:block bg-slate-900 text-slate-200 text-xs border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex items-center justify-between">
          {/* Left Side: Open 24 Hours (24/7 Diagnostic Service) */}
          <div className="flex items-center gap-2 text-teal-400 font-medium">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
            </span>
            <span>Open 24 Hours (24/7 Diagnostic Service)</span>
          </div>

          {/* Center: Jijamata Chowk, Ambegaon Pathar, Pune */}
          <div className="flex items-center gap-1.5 text-slate-300">
            <MapPin className="w-3.5 h-3.5 text-teal-400 shrink-0" />
            <span>Jijamata Chowk, Ambegaon Pathar, Pune</span>
          </div>

          {/* Right Side: 072763 43407 */}
          <a 
            href={`tel:${LAB_DETAILS.contact.phoneIntl}`}
            className="flex items-center gap-1.5 text-white hover:text-teal-300 font-semibold transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-teal-400" />
            <span>{LAB_DETAILS.contact.phone}</span>
          </a>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Brand Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-slate-900 to-blue-900 text-white flex items-center justify-center shadow-md group-hover:scale-105 transition-transform duration-200 border border-teal-500/30">
                <Activity className="w-6 h-6 text-teal-400" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold tracking-tight text-slate-900 leading-none">
                  Care<span className="text-teal-600">First</span>
                </span>
                <span className="text-[11px] font-semibold text-slate-500 tracking-wider uppercase mt-1">
                  Pathology Laboratory
                </span>
                <span className="text-[10px] text-teal-700 font-medium">
                  Pune • Open 24/7
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links - Exact 4 Pages */}
            <nav className="hidden lg:flex items-center gap-7">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`text-sm font-medium transition-colors relative py-1 ${
                      isActive
                        ? 'text-teal-700 font-semibold'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {link.name}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-teal-600 rounded-full" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Right Action CTAs */}
            <div className="hidden sm:flex items-center gap-3">
              <a
                href={LAB_DETAILS.contact.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden xl:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition-colors"
                title="Chat on WhatsApp"
              >
                <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                WhatsApp
              </a>
              
              <button
                onClick={() => setIsBookingModalOpen(true)}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white bg-teal-600 hover:bg-teal-700 shadow-sm transition-all cursor-pointer"
              >
                <CalendarCheck className="w-4 h-4" />
                <span>Book a Test</span>
              </button>
            </div>

            {/* Mobile Action Button - Replaces the 3-line hamburger menu */}
            <div className="flex items-center lg:hidden">
              <button
                onClick={() => setIsBookingModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold text-white bg-teal-600 hover:bg-teal-700 shadow-sm transition-all cursor-pointer active:scale-95"
              >
                <CalendarCheck className="w-4 h-4" />
                <span>Book</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Sticky Bottom Quick-Bar for Mobile Devices */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 px-3 py-2 flex items-center justify-around shadow-lg">
        <Link
          href="/"
          className={`flex flex-col items-center gap-0.5 ${pathname === '/' ? 'text-teal-700 font-bold' : 'text-slate-700'}`}
        >
          <div className="p-1 rounded-full bg-slate-100">
            <Activity className="w-4 h-4 text-teal-600" />
          </div>
          <span className="text-[10px]">Home</span>
        </Link>

        <Link
          href="/tests"
          className={`flex flex-col items-center gap-0.5 ${pathname === '/tests' ? 'text-teal-700 font-bold' : 'text-slate-700'}`}
        >
          <div className="p-1 rounded-full bg-slate-100">
            <FlaskConical className="w-4 h-4 text-teal-600" />
          </div>
          <span className="text-[10px]">Tests</span>
        </Link>

        <Link
          href="/home-collection"
          className={`flex flex-col items-center gap-0.5 ${pathname === '/home-collection' ? 'text-teal-700 font-bold' : 'text-slate-700'}`}
        >
          <div className="p-1 rounded-full bg-slate-100">
            <CalendarCheck className="w-4 h-4 text-teal-600" />
          </div>
          <span className="text-[10px]">Collection</span>
        </Link>

        <Link
          href="/contact"
          className={`flex flex-col items-center gap-0.5 ${pathname === '/contact' ? 'text-teal-700 font-bold' : 'text-slate-700'}`}
        >
          <div className="p-1 rounded-full bg-slate-100">
            <MapPin className="w-4 h-4 text-teal-600" />
          </div>
          <span className="text-[10px]">Contact</span>
        </Link>

        <a
          href={`tel:${LAB_DETAILS.contact.phoneIntl}`}
          className="flex flex-col items-center gap-0.5 text-slate-700 hover:text-teal-700"
        >
          <div className="p-1 rounded-full bg-slate-100">
            <Phone className="w-4 h-4 text-teal-600" />
          </div>
          <span className="text-[10px]">Call</span>
        </a>
      </div>

      {/* Global Booking Modal */}
      <QuickBookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
      />
    </>
  );
}
