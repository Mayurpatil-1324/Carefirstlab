'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Phone, 
  MapPin, 
  Clock, 
  MessageSquare, 
  Star, 
  Calendar, 
  CheckCircle2, 
  Navigation,
  User,
  Home,
  FileText,
  AlertCircle,
  Upload,
  Image as ImageIcon,
  X
} from 'lucide-react';
import { LAB_DETAILS, VERIFIED_REVIEWS } from '@/data/labData';

export default function HomePage() {
  // Exact Requested Simple Booking Form State
  const [patientName, setPatientName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [address, setAddress] = useState('');
  const [requiredTests, setRequiredTests] = useState('');
  const [prescriptionFile, setPrescriptionFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formError, setFormError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState<{
    bookingId?: string;
    emailSent?: boolean;
    targetEmail?: string;
    prescriptionSaved?: boolean;
  } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setPrescriptionFile(file);
      if (file.type.startsWith('image/')) {
        setPreviewUrl(URL.createObjectURL(file));
      } else {
        setPreviewUrl(null);
      }
    }
  };

  const handleRemoveFile = () => {
    setPrescriptionFile(null);
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientName.trim()) {
      setFormError('Please enter Patient Full Name');
      return;
    }
    if (!mobileNumber.trim() || mobileNumber.replace(/\D/g, '').length < 10) {
      setFormError('Please enter a valid 10-digit mobile number');
      return;
    }
    if (!address.trim()) {
      setFormError('Please enter Complete Home Address');
      return;
    }
    setFormError('');
    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append('patientName', patientName.trim());
      formData.append('mobileNumber', mobileNumber.trim());
      formData.append('address', address.trim());
      formData.append('requiredTests', requiredTests.trim() || 'General Blood Test / Checkup');
      formData.append('preferredSlot', 'Earliest Available');
      if (prescriptionFile) {
        formData.append('prescription', prescriptionFile);
      }

      const res = await fetch('/api/book', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to submit booking');
      }

      setSubmissionResult(data);
      setFormSubmitted(true);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Something went wrong. Please try again or book directly via WhatsApp.';
      setFormError(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFormWhatsApp = () => {
    const text = `*New Home Collection Request - CareFirst Lab*\n\n` +
      `👤 *Patient Full Name:* ${patientName || 'Patient'}\n` +
      `📞 *Mobile (WhatsApp):* ${mobileNumber || 'Not provided'}\n` +
      `🏠 *Complete Home Address:* ${address || 'Please contact for address'}\n` +
      `🧪 *Required Tests:* ${requiredTests || 'Doctor Prescription / Blood Work'}\n` +
      (prescriptionFile ? `📎 *Prescription Attached:* Yes (${prescriptionFile.name})\n` : '') +
      `\nPlease confirm the phlebotomist schedule.`;

    const url = `https://wa.me/${LAB_DETAILS.contact.whatsapp}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="flex flex-col min-h-screen bg-white text-slate-900 font-sans">
      
      {/* 1. HERO - PROFESSIONAL & MODERN */}
      <section className="bg-slate-900 text-white py-12 md:py-16 border-b border-slate-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Content (7 cols) */}
            <div className="lg:col-span-7 space-y-5 text-left">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold border border-emerald-500/30">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                Open 24 Hours • 5.0 ★ Google Rating (82 Reviews)
              </div>

              {/* Heading */}
              <div className="space-y-2">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
                  CareFirst Pathology Laboratory
                </h1>
                <p className="text-sm sm:text-base text-teal-400 font-medium">
                  Jijamata Chowk, Ambegaon Pathar, Pune
                </p>
                <p className="text-sm sm:text-base text-slate-300 max-w-xl leading-relaxed">
                  Complete pathology diagnostic services, routine blood tests, and doorstep home sample collection. Fast, verified PDF reports delivered directly on WhatsApp.
                </p>
              </div>

              {/* Direct Big Action Buttons */}
              <div className="pt-1 flex flex-wrap items-center gap-3">
                <a
                  href={`tel:${LAB_DETAILS.contact.phoneIntl}`}
                  className="px-6 py-3 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-sm transition-all shadow-sm flex items-center gap-2"
                >
                  <Phone className="w-4 h-4 text-slate-950" />
                  <span>Call: {LAB_DETAILS.contact.phone}</span>
                </a>

                <a
                  href={`https://wa.me/${LAB_DETAILS.contact.whatsapp}?text=${encodeURIComponent(
                    'Hello CareFirst Lab, I would like to book a blood test and home sample collection.'
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm transition-all shadow-sm flex items-center gap-2"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>WhatsApp Us</span>
                </a>

                <Link
                  href="/home-collection"
                  className="px-6 py-3 rounded-xl bg-white hover:bg-slate-100 text-slate-900 font-bold text-sm transition-all shadow-sm flex items-center gap-2"
                >
                  <Calendar className="w-4 h-4 text-teal-600" />
                  <span>Book Home Collection</span>
                </Link>
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-slate-400">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal-400" />
                  Sterile Vacuum Tubes
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal-400" />
                  Reports in 4–6 Hours
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal-400" />
                  24/7 Day & Night
                </span>
              </div>
            </div>

            {/* Right Hero Image Card (5 cols) */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden border border-slate-700/80 shadow-2xl bg-slate-800">
                <Image
                  src="/images/hero-lab.jpg"
                  alt="CareFirst Pathology Laboratory automated clinical testing equipment"
                  width={600}
                  height={450}
                  className="w-full h-64 sm:h-72 md:h-80 object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-transparent to-transparent"></div>
                
                {/* Floating Bottom Pill */}
                <div className="absolute bottom-3 left-3 right-3 bg-slate-900/90 backdrop-blur-md border border-slate-700/60 p-3 rounded-xl flex items-center justify-between text-xs">
                  <div>
                    <p className="font-bold text-white">Modern Clinical Pathology</p>
                    <p className="text-[11px] text-teal-300">Automated Analyzers & Gentle Phlebotomy</p>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-bold text-[10px] border border-emerald-500/30">
                    24/7 Open
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. SIMPLE BOOKING FORM WITH PRESCRIPTION IMAGE UPLOAD */}
      <section className="py-12 bg-slate-50 border-b border-slate-200">
        <div className="max-w-xl mx-auto px-4">
          <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200 shadow-sm space-y-4">
            
            <div className="text-center pb-2 border-b border-slate-100">
              <h2 className="text-xl font-bold text-slate-900">
                Simple Booking Form
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Enter patient details or attach doctor prescription for doorstep home collection.
              </p>
            </div>

            {formSubmitted ? (
              <div className="py-6 text-center space-y-4">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                
                <div className="space-y-1">
                  {submissionResult?.bookingId && (
                    <span className="inline-block px-3 py-1 rounded-full bg-teal-100 text-teal-800 text-[11px] font-bold border border-teal-200">
                      Booking ID: {submissionResult.bookingId}
                    </span>
                  )}
                  <h3 className="text-lg font-bold text-slate-900 mt-2">Home Collection Request Registered!</h3>
                  <p className="text-xs text-slate-600 max-w-sm mx-auto">
                    Thank you, <strong className="text-slate-800">{patientName}</strong>. Details and prescription import have been processed and dispatched to <strong className="text-teal-700">itzpatilmayur@gmail.com</strong>.
                  </p>
                </div>

                {prescriptionFile && (
                  <div className="p-3 bg-teal-50 border border-teal-200 rounded-xl text-xs text-teal-800 flex items-center justify-center gap-2 max-w-xs mx-auto">
                    <ImageIcon className="w-4 h-4 text-teal-600" />
                    <span>Prescription saved & attached: <strong>{prescriptionFile.name}</strong></span>
                  </div>
                )}

                <div className="pt-2 flex flex-col gap-2">
                  <button
                    onClick={handleFormWhatsApp}
                    className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                  >
                    <MessageSquare className="w-4 h-4" />
                    Confirm Details on WhatsApp
                  </button>
                  <button
                    onClick={() => {
                      setFormSubmitted(false);
                      setPatientName('');
                      setMobileNumber('');
                      setAddress('');
                      setRequiredTests('');
                      setSubmissionResult(null);
                      handleRemoveFile();
                    }}
                    className="text-xs text-slate-500 hover:underline pt-1 cursor-pointer"
                  >
                    Submit Another Request
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-3.5">
                {formError && (
                  <div className="p-2.5 bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{formError}</span>
                  </div>
                )}

                {/* Patient Full Name * */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Patient Full Name *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Anand Kulkarni"
                      value={patientName}
                      onChange={(e) => setPatientName(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 text-sm border border-slate-300 rounded-xl focus:outline-hidden focus:border-teal-600 focus:ring-1 focus:ring-teal-600"
                    />
                  </div>
                </div>

                {/* Mobile Number (WhatsApp) * */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Mobile Number (WhatsApp) *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                    <input
                      type="tel"
                      required
                      placeholder="10-digit mobile number"
                      value={mobileNumber}
                      onChange={(e) => setMobileNumber(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 text-sm border border-slate-300 rounded-xl focus:outline-hidden focus:border-teal-600 focus:ring-1 focus:ring-teal-600"
                    />
                  </div>
                </div>

                {/* Complete Home Address * */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Complete Home Address *
                  </label>
                  <div className="relative">
                    <Home className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                    <textarea
                      rows={2}
                      required
                      placeholder="Flat/House No., Building/Society, Landmark (e.g. Near Jijamata Chowk, Ambegaon)"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-sm border border-slate-300 rounded-xl focus:outline-hidden focus:border-teal-600 focus:ring-1 focus:ring-teal-600"
                    />
                  </div>
                </div>

                {/* Required Tests or Doctor Prescription */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Required Tests or Doctor Prescription
                  </label>
                  <div className="relative">
                    <FileText className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                    <input
                      type="text"
                      placeholder="e.g. CBC, Blood Sugar, Lipid Profile, or Full Body Checkup"
                      value={requiredTests}
                      onChange={(e) => setRequiredTests(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 text-sm border border-slate-300 rounded-xl focus:outline-hidden focus:border-teal-600 focus:ring-1 focus:ring-teal-600"
                    />
                  </div>
                </div>

                {/* Prescription Image Upload Option */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Prescription Image / Photo (Optional)
                  </label>
                  
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*,.pdf"
                    onChange={handleFileChange}
                    className="hidden"
                    id="homepage-prescription-upload"
                  />

                  {!prescriptionFile ? (
                    <label
                      htmlFor="homepage-prescription-upload"
                      className="flex items-center justify-center gap-2 p-3 border-2 border-dashed border-slate-300 hover:border-teal-500 rounded-xl cursor-pointer bg-slate-50 hover:bg-teal-50/40 transition-colors text-xs text-slate-600 font-medium"
                    >
                      <Upload className="w-4 h-4 text-teal-600" />
                      <span>Upload Prescription Image / PDF</span>
                    </label>
                  ) : (
                    <div className="p-3 bg-teal-50/80 border border-teal-200 rounded-xl flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2.5 overflow-hidden">
                        {previewUrl ? (
                          <img 
                            src={previewUrl} 
                            alt="Prescription preview" 
                            className="w-10 h-10 object-cover rounded-lg border border-teal-300 shrink-0" 
                          />
                        ) : (
                          <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center text-teal-800 font-bold shrink-0">
                            PDF
                          </div>
                        )}
                        <div className="overflow-hidden">
                          <p className="font-semibold text-slate-900 truncate">{prescriptionFile.name}</p>
                          <p className="text-[11px] text-slate-500">{(prescriptionFile.size / 1024).toFixed(1)} KB</p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={handleRemoveFile}
                        className="p-1 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50"
                        title="Remove file"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="pt-2 flex flex-col sm:flex-row gap-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 py-3 px-4 rounded-xl bg-teal-600 hover:bg-teal-700 disabled:bg-teal-800 disabled:opacity-80 text-white font-bold text-xs transition-colors cursor-pointer disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Sending to itzpatilmayur@gmail.com...</span>
                      </>
                    ) : (
                      <span>Request Home Collection</span>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={handleFormWhatsApp}
                    className="py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <MessageSquare className="w-4 h-4 text-emerald-400" />
                    Book on WhatsApp
                  </button>
                </div>

                <p className="text-[11px] text-center text-slate-500 pt-1">
                  ⚡ Doorstep blood sample collection across Ambegaon, Katraj & Narhe.
                </p>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* 3. 4 CORE SERVICES ONLY */}
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-extrabold text-slate-900">
              Our Core Services
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Accurate diagnostics, compassionate care, and rapid reports.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            
            {/* Service 1 */}
            <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-xs hover:shadow-md transition-shadow">
              <div className="h-44 relative bg-slate-100">
                <Image
                  src="/images/microscope.jpg"
                  alt="Routine and specialized pathology blood tests under microscope"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-5 space-y-2">
                <span className="text-[11px] font-bold text-teal-700 uppercase tracking-wider">Clinical Pathology</span>
                <h3 className="font-bold text-slate-900 text-base">Routine & Specialized Blood Tests</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Complete Blood Count (CBC), Fasting & PP Blood Sugar, HbA1c, Lipid Profile, Liver (LFT), Kidney (KFT), Thyroid (T3/T4/TSH), Dengue & Fever Panels.
                </p>
              </div>
            </div>

            {/* Service 2 */}
            <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-xs hover:shadow-md transition-shadow">
              <div className="h-44 relative bg-slate-100">
                <Image
                  src="/images/home-collection.jpg"
                  alt="Doorstep blood sample collection by certified phlebotomist"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-5 space-y-2">
                <span className="text-[11px] font-bold text-teal-700 uppercase tracking-wider">Doorstep Phlebotomy</span>
                <h3 className="font-bold text-slate-900 text-base">Doorstep Home Sample Collection</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Convenient doorstep blood draws across Ambegaon Pathar, Katraj, Narhe, and Dhankawadi by certified and gentle phlebotomists.
                </p>
              </div>
            </div>

            {/* Service 3 */}
            <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-xs hover:shadow-md transition-shadow">
              <div className="h-44 relative bg-slate-100">
                <Image
                  src="/images/facility.jpg"
                  alt="CareFirst Pathology Laboratory open 24 hours round the clock"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-5 space-y-2">
                <span className="text-[11px] font-bold text-teal-700 uppercase tracking-wider">24/7 Availability</span>
                <h3 className="font-bold text-slate-900 text-base">Open 24 Hours (Round-the-Clock)</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Emergency fever, cardiac marker, and doctor-prescribed urgent tests accepted 24/7 day and night at our Jijamata Chowk laboratory.
                </p>
              </div>
            </div>

            {/* Service 4 */}
            <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-xs hover:shadow-md transition-shadow">
              <div className="h-44 relative bg-slate-100">
                <Image
                  src="/images/checkup.jpg"
                  alt="Accurate verified diagnostic test reports on WhatsApp"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-5 space-y-2">
                <span className="text-[11px] font-bold text-teal-700 uppercase tracking-wider">Digital Reports</span>
                <h3 className="font-bold text-slate-900 text-base">Digital Reports on WhatsApp</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  No need to revisit the lab to collect printouts. Verified, signed digital PDF reports are delivered directly to your WhatsApp and email.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. REAL PATIENT REVIEWS */}
      <section className="py-10 bg-slate-50 border-t border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-6">
            <h2 className="text-xl font-bold text-slate-900">
              Verified Patient Reviews
            </h2>
            <div className="flex items-center justify-center gap-1 text-amber-500 font-bold text-xs mt-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              ))}
              <span className="text-slate-700 ml-1">5.0 Star Rating (82 Google Reviews)</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {VERIFIED_REVIEWS.slice(0, 3).map((review) => (
              <div key={review.id} className="p-4 rounded-xl bg-white border border-slate-200 text-xs space-y-2">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                  ))}
                </div>
                <p className="text-slate-800 italic font-medium">
                  &ldquo;{review.comment}&rdquo;
                </p>
                <p className="text-slate-500 text-[11px] pt-1 border-t border-slate-100">
                  — {review.author} (Google Review)
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. LOCATION & CONTACT */}
      <section className="py-10 bg-white">
        <div className="max-w-4xl mx-auto px-4 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-slate-900">
                Laboratory Location & Hours
              </h2>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs space-y-3">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900">CareFirst Pathology Laboratory</strong>
                    <p className="text-slate-600 mt-0.5">
                      Sr. No. 28, Jijamata Chowk, in front of Ambegaon Pathar Police Chowky, Ambegaon Budruk, Pune, Maharashtra 411046
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 border-t border-slate-200 pt-2.5">
                  <Clock className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900">Operating Hours:</strong>
                    <p className="text-emerald-700 font-bold mt-0.5">Open 24 Hours (Monday to Sunday)</p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 border-t border-slate-200 pt-2.5">
                  <Phone className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900">Telephone:</strong>
                    <p className="mt-0.5 font-bold text-teal-700">
                      <a href={`tel:${LAB_DETAILS.contact.phoneIntl}`}>{LAB_DETAILS.contact.phone}</a>
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex gap-2.5">
                <a
                  href={`tel:${LAB_DETAILS.contact.phoneIntl}`}
                  className="flex-1 py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs text-center inline-flex items-center justify-center gap-2"
                >
                  <Phone className="w-3.5 h-3.5 text-teal-400" />
                  Call Lab
                </a>
                <a
                  href={LAB_DETAILS.address.googleMapsDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2.5 px-4 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs text-center inline-flex items-center justify-center gap-2"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  Directions
                </a>
              </div>
            </div>

            {/* Embedded Google Map */}
            <div className="bg-slate-50 p-2 rounded-xl border border-slate-200">
              <div className="relative w-full h-[240px] rounded-lg overflow-hidden bg-slate-100">
                <iframe
                  title="CareFirst Pathology Laboratory Map"
                  src="https://maps.google.com/maps?q=CareFirst+Pathology+Laboratory+Jijamata+Chowk+Ambegaon+Pathar+Pune&t=&z=16&ie=UTF8&iwloc=&output=embed"
                  className="w-full h-full border-0"
                  loading="lazy"
                  allowFullScreen
                />
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
