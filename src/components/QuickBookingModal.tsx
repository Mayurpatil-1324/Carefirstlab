'use client';

import React, { useState, useRef } from 'react';
import { 
  X, 
  Phone, 
  User, 
  CheckCircle2, 
  MessageSquare, 
  AlertCircle, 
  FileText, 
  Home, 
  Upload, 
  Image as ImageIcon 
} from 'lucide-react';
import { LAB_DETAILS } from '@/data/labData';

interface QuickBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedTest?: string;
}

export default function QuickBookingModal({
  isOpen,
  onClose,
  preselectedTest = '',
}: QuickBookingModalProps) {
  const [patientName, setPatientName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [address, setAddress] = useState('');
  const [testsRequired, setTestsRequired] = useState(preselectedTest || '');
  const [prescriptionFile, setPrescriptionFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState<{
    bookingId?: string;
    emailSent?: boolean;
    targetEmail?: string;
    prescriptionSaved?: boolean;
  } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientName.trim()) {
      setErrorMsg('Please enter Patient Full Name');
      return;
    }
    if (!mobileNumber.trim() || mobileNumber.replace(/\D/g, '').length < 10) {
      setErrorMsg('Please enter a valid 10-digit mobile number');
      return;
    }
    if (!address.trim()) {
      setErrorMsg('Please enter Complete Home Address');
      return;
    }

    setErrorMsg('');
    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append('patientName', patientName.trim());
      formData.append('mobileNumber', mobileNumber.trim());
      formData.append('address', address.trim());
      formData.append('requiredTests', testsRequired.trim() || 'General Blood Test / Checkup');
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
      setIsSubmitted(true);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Something went wrong. Please try again or book directly via WhatsApp.';
      setErrorMsg(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWhatsAppBooking = () => {
    const text = `*New Home Collection Request - CareFirst Lab*\n\n` +
      `👤 *Patient Full Name:* ${patientName || 'Patient'}\n` +
      `📞 *Mobile (WhatsApp):* ${mobileNumber || 'Not provided'}\n` +
      `🏠 *Complete Home Address:* ${address || 'Please contact for address'}\n` +
      `🧪 *Required Tests:* ${testsRequired || 'Doctor Prescription / Blood Work'}\n` +
      (prescriptionFile ? `📎 *Prescription Attached:* Yes (${prescriptionFile.name})\n` : '') +
      `\nPlease confirm the phlebotomist schedule.`;

    const url = `https://wa.me/${LAB_DETAILS.contact.whatsapp}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="bg-slate-900 text-white p-5 flex items-center justify-between shrink-0">
          <div>
            <h3 className="text-lg font-bold">Simple Booking Form</h3>
            <p className="text-xs text-slate-300">CareFirst Pathology Laboratory • Open 24 Hours</p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-5 overflow-y-auto">
          {isSubmitted ? (
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
                <h4 className="text-lg font-bold text-slate-900 mt-2">Home Collection Request Registered!</h4>
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
                  type="button"
                  onClick={handleWhatsAppBooking}
                  className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs"
                >
                  <MessageSquare className="w-4 h-4" />
                  Confirm Details on WhatsApp
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="w-full py-2 px-4 rounded-xl border border-slate-300 text-slate-700 text-xs font-semibold hover:bg-slate-50"
                >
                  Close Window
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3.5">
              {errorMsg && (
                <div className="p-2.5 bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* Patient Full Name */}
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
                    className="w-full pl-9 pr-3 py-2 text-sm border border-slate-300 rounded-xl focus:outline-hidden focus:border-teal-600"
                  />
                </div>
              </div>

              {/* Mobile Number (WhatsApp) */}
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
                    className="w-full pl-9 pr-3 py-2 text-sm border border-slate-300 rounded-xl focus:outline-hidden focus:border-teal-600"
                  />
                </div>
              </div>

              {/* Complete Home Address */}
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
                    className="w-full pl-9 pr-3 py-2 text-sm border border-slate-300 rounded-xl focus:outline-hidden focus:border-teal-600"
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
                    value={testsRequired}
                    onChange={(e) => setTestsRequired(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-sm border border-slate-300 rounded-xl focus:outline-hidden focus:border-teal-600"
                  />
                </div>
              </div>

              {/* Prescription Image Upload Option */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Prescription Image / Document (Optional)
                </label>
                
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*,.pdf"
                  onChange={handleFileChange}
                  className="hidden"
                  id="modal-prescription-upload"
                />

                {!prescriptionFile ? (
                  <label
                    htmlFor="modal-prescription-upload"
                    className="flex items-center justify-center gap-2 p-3 border-2 border-dashed border-slate-300 hover:border-teal-500 rounded-xl cursor-pointer bg-slate-50 hover:bg-teal-50/50 transition-colors text-xs text-slate-600 font-medium"
                  >
                    <Upload className="w-4 h-4 text-teal-600" />
                    <span>Upload Prescription (Photo or PDF)</span>
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

              {/* Submit Buttons */}
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
                  onClick={handleWhatsAppBooking}
                  className="py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4 text-emerald-400" />
                  Book on WhatsApp
                </button>
              </div>

              <p className="text-[11px] text-center text-slate-600">
                🔒 Safe, barcoded vacuum collection tubes used for every patient.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
