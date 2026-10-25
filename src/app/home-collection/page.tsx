'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { 
  Phone, 
  Clock, 
  MessageSquare, 
  CheckCircle2, 
  User, 
  Home, 
  FileText, 
  AlertCircle, 
  Upload, 
  Image as ImageIcon, 
  X, 
  ShieldCheck, 
  Sparkles,
  Calendar
} from 'lucide-react';
import { LAB_DETAILS } from '@/data/labData';

export default function HomeCollectionPage() {
  // Simple Booking Form State
  const [patientName, setPatientName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [address, setAddress] = useState('');
  const [requiredTests, setRequiredTests] = useState('');
  const [preferredSlot, setPreferredSlot] = useState('Morning (7:00 AM - 10:00 AM)');
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
      formData.append('preferredSlot', preferredSlot);
      formData.append('requiredTests', requiredTests.trim() || 'General Blood Test / Checkup');
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
      `⏰ *Preferred Time:* ${preferredSlot}\n` +
      `🧪 *Required Tests:* ${requiredTests || 'Doctor Prescription / Blood Work'}\n` +
      (prescriptionFile ? `📎 *Prescription Attached:* Yes (${prescriptionFile.name})\n` : '') +
      `\nPlease confirm the phlebotomist schedule.`;

    const url = `https://wa.me/${LAB_DETAILS.contact.whatsapp}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-20 font-sans">
      
      {/* 1. Header Section */}
      <section className="bg-gradient-to-b from-slate-900 via-slate-900 to-blue-950 text-white py-14">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 text-xs font-semibold border border-teal-500/30">
            <Sparkles className="w-3.5 h-3.5 text-teal-400" />
            <span>Doorstep Sample Collection across Pune</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white">
            Home Blood Sample Collection
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Get your blood tests done from the comfort of your home. Safe, hygienic sample collection by experienced phlebotomists with fast PDF reports delivered on WhatsApp.
          </p>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3 text-xs">
            <a 
              href={`tel:${LAB_DETAILS.contact.phoneIntl}`} 
              className="px-5 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold transition-colors inline-flex items-center gap-2"
            >
              <Phone className="w-4 h-4 text-slate-950" />
              <span>Call: {LAB_DETAILS.contact.phone}</span>
            </a>
            <a 
              href={`https://wa.me/${LAB_DETAILS.contact.whatsapp}?text=${encodeURIComponent('Hello CareFirst Lab, I want to book a home blood collection.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition-colors inline-flex items-center gap-2"
            >
              <MessageSquare className="w-4 h-4" />
              <span>WhatsApp Us</span>
            </a>
          </div>
        </div>
      </section>

      {/* 2. Main Container: Booking Form & Highlights */}
      <div className="max-w-4xl mx-auto px-4 pt-10">
        
        {/* Professional Doorstep Phlebotomy Banner */}
        <div className="relative rounded-3xl overflow-hidden border border-slate-200 shadow-sm mb-8 bg-slate-900 text-white h-52 sm:h-64 flex items-end">
          <Image
            src="/images/home-collection.jpg"
            alt="Gentle doorstep blood collection by certified phlebotomist"
            fill
            className="object-cover opacity-60"
            priority
          />
          <div className="relative z-10 p-6 sm:p-8 space-y-2 max-w-xl">
            <span className="px-2.5 py-1 rounded-full bg-teal-500/30 text-teal-300 font-bold text-[11px] border border-teal-500/40">
              Doorstep Healthcare Service
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white leading-tight">
              Gentle Phlebotomy for Families, Seniors & Children
            </h2>
            <p className="text-xs sm:text-sm text-slate-200">
              Single-prick blood collection using sterile vacuum tubes. No waiting in clinic queues.
            </p>
          </div>
        </div>

        {/* Simple Booking Form Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md">
          <div className="border-b border-slate-100 pb-4 mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
              Simple Booking Form
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Fill in your details below or book directly via WhatsApp. Our team will contact you to confirm timing.
            </p>
          </div>

          {formSubmitted ? (
            <div className="p-6 rounded-2xl bg-teal-50 border border-teal-200 text-center space-y-4">
              <CheckCircle2 className="w-12 h-12 text-teal-600 mx-auto" />
              <div className="space-y-1.5">
                {submissionResult?.bookingId && (
                  <span className="inline-block px-3 py-1 rounded-full bg-teal-100 text-teal-800 text-[11px] font-bold border border-teal-200">
                    Booking ID: {submissionResult.bookingId}
                  </span>
                )}
                <h3 className="text-lg font-bold text-teal-950 mt-1">Home Collection Request Received!</h3>
                <p className="text-xs text-teal-800">
                  Thank you, <strong>{patientName}</strong>. Your request and prescription image import have been registered and sent to <strong>itzpatilmayur@gmail.com</strong>.
                </p>
                {prescriptionFile && (
                  <p className="text-[11px] text-teal-700">
                    📎 Prescription saved & attached: <strong>{prescriptionFile.name}</strong>
                  </p>
                )}
                <p className="text-[11px] text-slate-600">
                  Our phlebotomist team will call you at <strong>{mobileNumber}</strong> shortly to confirm your appointment.
                </p>
              </div>
              <div className="pt-2 flex flex-wrap justify-center gap-3">
                <button
                  type="button"
                  onClick={handleFormWhatsApp}
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs inline-flex items-center gap-2 cursor-pointer shadow-xs"
                >
                  <MessageSquare className="w-4 h-4" />
                  Send Confirmation on WhatsApp
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setFormSubmitted(false);
                    setPatientName('');
                    setMobileNumber('');
                    setAddress('');
                    setRequiredTests('');
                    setSubmissionResult(null);
                    handleRemoveFile();
                  }}
                  className="px-4 py-2.5 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-semibold cursor-pointer"
                >
                  Book Another Patient
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleFormSubmit} className="space-y-4 text-left">
              {formError && (
                <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{formError}</span>
                </div>
              )}

              {/* Patient Full Name * */}
              <div>
                <label className="block text-xs font-semibold text-slate-800 mb-1">
                  Patient Full Name <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <User className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Anand Kulkarni"
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 text-xs focus:ring-2 focus:ring-teal-500 focus:outline-hidden"
                  />
                </div>
              </div>

              {/* Mobile Number (WhatsApp) * */}
              <div>
                <label className="block text-xs font-semibold text-slate-800 mb-1">
                  Mobile Number (WhatsApp) <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
                  <input
                    type="tel"
                    required
                    maxLength={10}
                    placeholder="10-digit mobile number"
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, ''))}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 text-xs focus:ring-2 focus:ring-teal-500 focus:outline-hidden"
                  />
                </div>
              </div>

              {/* Complete Home Address * */}
              <div>
                <label className="block text-xs font-semibold text-slate-800 mb-1">
                  Complete Home Address <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <Home className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
                  <input
                    type="text"
                    required
                    placeholder="Flat/House No., Building/Society, Landmark (e.g. Near Jijamata Chowk, Ambegaon)"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 text-xs focus:ring-2 focus:ring-teal-500 focus:outline-hidden"
                  />
                </div>
              </div>

              {/* Preferred Collection Time */}
              <div>
                <label className="block text-xs font-semibold text-slate-800 mb-1">
                  Preferred Time Slot
                </label>
                <div className="relative">
                  <Calendar className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
                  <select
                    value={preferredSlot}
                    onChange={(e) => setPreferredSlot(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 text-xs focus:ring-2 focus:ring-teal-500 focus:outline-hidden"
                  >
                    <option value="Morning (7:00 AM - 10:00 AM) [Ideal for Fasting Tests]">
                      Morning (7:00 AM - 10:00 AM) [Fasting Tests]
                    </option>
                    <option value="Mid-day (10:00 AM - 1:00 PM)">Mid-day (10:00 AM - 1:00 PM)</option>
                    <option value="Afternoon (1:00 PM - 5:00 PM)">Afternoon (1:00 PM - 5:00 PM)</option>
                    <option value="Evening (5:00 PM - 9:00 PM)">Evening (5:00 PM - 9:00 PM)</option>
                    <option value="Urgent 24/7 Request (As early as possible)">Urgent Request (Earliest Available)</option>
                  </select>
                </div>
              </div>

              {/* Required Tests or Doctor Prescription */}
              <div>
                <label className="block text-xs font-semibold text-slate-800 mb-1">
                  Required Tests or Doctor Prescription
                </label>
                <div className="relative">
                  <FileText className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
                  <input
                    type="text"
                    placeholder="e.g. CBC, Blood Sugar, Lipid Profile, or Full Body Checkup"
                    value={requiredTests}
                    onChange={(e) => setRequiredTests(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 text-xs focus:ring-2 focus:ring-teal-500 focus:outline-hidden"
                  />
                </div>
              </div>

              {/* Prescription Image Upload Option */}
              <div>
                <label className="block text-xs font-semibold text-slate-800 mb-1">
                  Upload Doctor Prescription (Optional)
                </label>
                
                {!prescriptionFile ? (
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="border-2 border-dashed border-slate-300 hover:border-teal-500 rounded-xl p-4 text-center cursor-pointer transition-colors bg-slate-50/60 hover:bg-teal-50/30"
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*,.pdf"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    <div className="flex flex-col items-center justify-center gap-1.5 text-slate-500">
                      <div className="w-9 h-9 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center">
                        <Upload className="w-4 h-4" />
                      </div>
                      <p className="text-xs font-medium text-slate-700">
                        Click to upload prescription photo or PDF
                      </p>
                      <p className="text-[11px] text-slate-400">
                        Supported: JPG, PNG, WEBP, PDF (Max 10MB)
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-between p-3 rounded-xl border border-teal-200 bg-teal-50/60 text-xs">
                    <div className="flex items-center gap-2.5 overflow-hidden">
                      {previewUrl ? (
                        <img
                          src={previewUrl}
                          alt="Prescription preview"
                          className="w-10 h-10 object-cover rounded-lg border border-teal-300 shrink-0"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-lg bg-teal-200 text-teal-800 flex items-center justify-center shrink-0">
                          <ImageIcon className="w-5 h-5" />
                        </div>
                      )}
                      <div className="truncate">
                        <p className="font-semibold text-slate-900 truncate">
                          {prescriptionFile.name}
                        </p>
                        <p className="text-[11px] text-teal-700">
                          {(prescriptionFile.size / 1024).toFixed(1)} KB • Prescription Attached
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={handleRemoveFile}
                      className="p-1.5 rounded-lg hover:bg-teal-100 text-slate-500 hover:text-rose-600 transition-colors"
                      title="Remove file"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>

              {/* Submit Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row gap-3">
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
                ⚡ Routine blood samples collected 24/7 across Ambegaon, Katraj, Narhe & nearby areas.
              </p>
            </form>
          )}
        </div>

        {/* 3. How It Works (3 Steps) */}
        <div className="mt-12">
          <div className="text-center mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
              How Home Collection Works
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Three simple steps to test without visiting the laboratory
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-5 rounded-2xl bg-white border border-slate-200 text-center space-y-2.5">
              <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-700 font-extrabold flex items-center justify-center mx-auto text-base">
                1
              </div>
              <h3 className="font-bold text-slate-900 text-sm">Book Online or WhatsApp</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Fill the simple form above or message us on WhatsApp with your tests or prescription photo.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 text-center space-y-2.5">
              <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-700 font-extrabold flex items-center justify-center mx-auto text-base">
                2
              </div>
              <h3 className="font-bold text-slate-900 text-sm">Doorstep Blood Draw</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Our gentle, certified phlebotomist visits with sterile, single-use vacuum needles at your scheduled time.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 text-center space-y-2.5">
              <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-700 font-extrabold flex items-center justify-center mx-auto text-base">
                3
              </div>
              <h3 className="font-bold text-slate-900 text-sm">Fast WhatsApp Reports</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Accurate, digitally signed PDF reports are delivered directly to your WhatsApp in 4-6 hours.
              </p>
            </div>
          </div>
        </div>

        {/* 4. Why Choose CareFirst Home Collection */}
        <div className="mt-12 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200">
          <h2 className="text-xl font-bold text-slate-900 mb-6 text-center">
            Why Choose CareFirst Home Collection?
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-100">
              <ShieldCheck className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-900 block text-sm">100% Sterile & Sealed Needles</strong>
                <p className="text-slate-600 mt-0.5">Vacutainer tubes and needles are unsealed in front of the patient ensuring complete hygiene.</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-100">
              <Clock className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-900 block text-sm">Punctual & Convenient Slots</strong>
                <p className="text-slate-600 mt-0.5">Early morning 7:00 AM slots available so you can break your overnight fast comfortably.</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-100">
              <User className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-900 block text-sm">Gentle on Seniors & Kids</strong>
                <p className="text-slate-600 mt-0.5">Experienced phlebotomists trained for minimal-pain, one-prick vein location.</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-100">
              <CheckCircle2 className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-900 block text-sm">Affordable Transparent Pricing</strong>
                <p className="text-slate-600 mt-0.5">Reasonable rates with no hidden fees. Certified by 82+ 5.0★ Google reviews.</p>
              </div>
            </div>
          </div>
        </div>

        {/* 5. Areas Covered in Pune */}
        <div className="mt-8 bg-slate-900 text-white rounded-3xl p-6 sm:p-8">
          <div className="text-center space-y-2 mb-6">
            <h3 className="text-lg font-bold text-white">Areas Covered in Pune</h3>
            <p className="text-xs text-slate-300">
              We provide prompt doorstep sample collection in the following neighborhoods:
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-2 text-xs">
            {LAB_DETAILS.homeCollectionAreas.map((area, idx) => (
              <span
                key={idx}
                className="px-3 py-1.5 rounded-xl bg-slate-800 text-teal-300 border border-slate-700 font-medium"
              >
                📍 {area}
              </span>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4 text-xs">
            <div>
              <p className="font-semibold text-white">Need an urgent home collection outside these areas?</p>
              <p className="text-slate-400">Call our 24/7 helpdesk to check phlebotomist availability.</p>
            </div>
            <a
              href={`tel:${LAB_DETAILS.contact.phoneIntl}`}
              className="px-4 py-2 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold transition-colors inline-flex items-center gap-2"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Call 072763 43407</span>
            </a>
          </div>
        </div>

      </div>

    </div>
  );
}
