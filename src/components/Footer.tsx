import React from 'react';
import Link from 'next/link';
import { 
  MapPin, 
  Phone, 
  Clock, 
  Star, 
  Activity, 
  ArrowRight, 
  ExternalLink, 
  MessageSquare
} from 'lucide-react';
import { LAB_DETAILS } from '@/data/labData';

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800 pt-16 pb-24 lg:pb-12 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main 4-column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-800">
          
          {/* Column 1: Lab Branding & Reputation (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-teal-500/20 text-teal-400 flex items-center justify-center border border-teal-500/30">
                <Activity className="w-5 h-5 text-teal-400" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold tracking-tight text-white leading-none">
                  Care<span className="text-teal-400">First</span>
                </span>
                <span className="text-[11px] font-semibold text-slate-400 tracking-wider uppercase mt-1">
                  Pathology Laboratory
                </span>
              </div>
            </Link>

            <p className="text-slate-400 text-xs leading-relaxed">
              Leading neighborhood pathology laboratory in Ambegaon Pathar, Pune. Committed to clinical precision, gentle patient care, and affordable rates with verified 24/7 round-the-clock availability.
            </p>

            {/* Google Rating Badge */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3 inline-flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center font-bold text-sm">
                5.0
              </div>
              <div>
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                  ))}
                </div>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Based on <strong className="text-white">82 Google Reviews</strong>
                </p>
              </div>
            </div>

            <div className="pt-1">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-teal-950 text-teal-300 border border-teal-800">
                <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
                24 Hours Open (Day & Night)
              </span>
            </div>
          </div>

          {/* Column 2: Quick Links (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider">
              Quick Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/" className="hover:text-teal-400 transition-colors flex items-center gap-1">
                  <ArrowRight className="w-3 h-3 text-slate-600" />
                  Home
                </Link>
              </li>
              <li>
                <Link href="/tests" className="hover:text-teal-400 transition-colors flex items-center gap-1">
                  <ArrowRight className="w-3 h-3 text-slate-600" />
                  Tests & Packages
                </Link>
              </li>
              <li>
                <Link href="/home-collection" className="hover:text-teal-400 transition-colors flex items-center gap-1">
                  <ArrowRight className="w-3 h-3 text-slate-600" />
                  Home Collection
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-teal-400 transition-colors flex items-center gap-1">
                  <ArrowRight className="w-3 h-3 text-slate-600" />
                  Contact & Map
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Diagnostic Categories (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider">
              Popular Test Panels
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/tests?cat=routine" className="hover:text-teal-400 transition-colors">
                  Complete Blood Count (CBC & ESR)
                </Link>
              </li>
              <li>
                <Link href="/tests?cat=diabetes" className="hover:text-teal-400 transition-colors">
                  HbA1c & Fasting Glucose Profile
                </Link>
              </li>
              <li>
                <Link href="/tests?cat=cardiac" className="hover:text-teal-400 transition-colors">
                  Lipid Profile (Cardiac Risk Screen)
                </Link>
              </li>
              <li>
                <Link href="/tests?cat=liver-kidney" className="hover:text-teal-400 transition-colors">
                  Liver & Kidney Function (LFT / KFT)
                </Link>
              </li>
              <li>
                <Link href="/tests?cat=thyroid" className="hover:text-teal-400 transition-colors">
                  Thyroid Profiles (T3, T4, TSH)
                </Link>
              </li>
              <li>
                <Link href="/tests?cat=fever-infections" className="hover:text-teal-400 transition-colors">
                  Dengue NS1 & Fever Panels (24/7 Stat)
                </Link>
              </li>
              <li>
                <Link href="/tests?cat=packages" className="hover:text-teal-400 transition-colors">
                  Annual Preventive Wellness Packages
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Location (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider">
              Visit or Contact Lab
            </h4>
            <div className="space-y-3 text-xs">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white">CareFirst Pathology Laboratory</strong>
                  <p className="text-slate-400 mt-0.5">
                    Sr. No. 28, Jijamata Chowk, in front of Ambegaon Pathar Police Chowky, Ambegaon Budruk, Pune 411046
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-teal-400 shrink-0" />
                <div>
                  <span className="text-white font-medium">Open 24 Hours (Monday - Sunday)</span>
                  <p className="text-slate-400 text-[11px]">Emergency samples received 24/7</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-teal-400 shrink-0" />
                <div>
                  <a 
                    href={`tel:${LAB_DETAILS.contact.phoneIntl}`}
                    className="text-white hover:text-teal-300 font-semibold transition-colors"
                  >
                    {LAB_DETAILS.contact.phone}
                  </a>
                  <p className="text-slate-400 text-[11px]">Phone line active 24/7</p>
                </div>
              </div>

              <div className="pt-1 flex items-center gap-2">
                <a
                  href={LAB_DETAILS.contact.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-xs transition-colors"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  Chat on WhatsApp
                </a>
                <a
                  href={LAB_DETAILS.address.googleMapsDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  Directions
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Doorstep Service Localities Bar */}
        <div className="py-6 border-b border-slate-900 text-xs text-slate-400 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-medium text-slate-300">Home Collection Areas in Pune:</span>
          </div>
          <div className="flex flex-wrap gap-2 text-[11px]">
            {LAB_DETAILS.homeCollectionAreas.map((area, idx) => (
              <span key={idx} className="bg-slate-900 px-2.5 py-1 rounded-md border border-slate-800 text-slate-300">
                {area}
              </span>
            ))}
          </div>
        </div>

        {/* Disclaimer & Copyright */}
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p className="max-w-2xl text-[11px] leading-relaxed">
            <strong>Medical Notice:</strong> Diagnostic test results are clinical laboratory findings and must be interpreted by a registered medical practitioner in conjunction with clinical symptoms and history. CareFirst Pathology Laboratory adheres to standard ethical diagnostic guidelines.
          </p>
          <div className="text-right shrink-0">
            <p>© {new Date().getFullYear()} CareFirst Pathology Laboratory. All rights reserved.</p>
            <p className="text-[10px] text-slate-400 mt-0.5">Jijamata Chowk, Ambegaon Pathar, Pune 411046</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
