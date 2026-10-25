'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { 
  MapPin, 
  Phone, 
  Clock, 
  MessageSquare, 
  ExternalLink, 
  CheckCircle2, 
  AlertCircle,
  Send,
  Navigation
} from 'lucide-react';
import { LAB_DETAILS } from '@/data/labData';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('General Enquiry');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setErrorMsg('Please enter your name.');
      return;
    }
    if (!phone.trim() || phone.replace(/\D/g, '').length < 10) {
      setErrorMsg('Please enter a valid 10-digit mobile number.');
      return;
    }
    if (!message.trim()) {
      setErrorMsg('Please enter your query or test requirements.');
      return;
    }

    setErrorMsg('');
    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append('patientName', name.trim());
      formData.append('mobileNumber', phone.trim());
      formData.append('address', `[Contact Enquiry: ${subject}]`);
      formData.append('requiredTests', message.trim());
      formData.append('preferredSlot', 'Inquiry Callback');

      const res = await fetch('/api/book', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to send message');
      }

      setSubmitted(true);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Something went wrong. Please try again or message via WhatsApp.';
      setErrorMsg(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWhatsAppSend = () => {
    const text = `*New Contact Enquiry - CareFirst Lab*\n\n` +
      `👤 *Name:* ${name || 'Patient'}\n` +
      `📞 *Phone:* ${phone || 'Not provided'}\n` +
      `📋 *Subject:* ${subject}\n` +
      `💬 *Message:* ${message || 'I have an inquiry regarding test availability and timings.'}\n`;

    const url = `https://wa.me/${LAB_DETAILS.contact.whatsapp}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      {/* Page Header */}
      <section className="bg-gradient-to-b from-slate-900 via-slate-900 to-blue-950 text-white py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-3">
            <span className="text-xs font-bold text-teal-400 tracking-wider uppercase">
              24/7 Laboratory Helpdesk
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              Contact Us & Location Map
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              We are situated at Jijamata Chowk, Ambegaon Pathar, Pune. Reach out anytime by phone, WhatsApp, or walk straight in for testing.
            </p>
          </div>
        </div>
      </section>

      {/* Main Grid: Details, Form, and Interactive Map */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Verified Business Information (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Contact Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-xs space-y-5">
              
              <div className="relative h-44 rounded-2xl overflow-hidden border border-slate-200 bg-slate-100">
                <Image
                  src="/images/facility.jpg"
                  alt="CareFirst Pathology Laboratory Reception and Diagnostic Facility at Jijamata Chowk"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent flex items-end p-3">
                  <span className="text-[11px] font-bold text-white bg-slate-900/80 px-2.5 py-1 rounded-lg backdrop-blur-xs border border-slate-700/60">
                    📍 Jijamata Chowk, Ambegaon Pathar, Pune
                  </span>
                </div>
              </div>

              <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">
                Laboratory Information
              </h2>

              <div className="space-y-4 text-xs text-slate-700">
                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-xl bg-teal-50 text-teal-700 shrink-0 border border-teal-100">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm">Physical Address:</h3>
                    <p className="text-slate-600 mt-1 leading-relaxed">
                      {LAB_DETAILS.address.fullAddress}
                    </p>
                    <p className="text-teal-700 font-semibold text-[11px] mt-1">
                      Landmark: In front of Ambegaon Pathar Police Chowky
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 border-t border-slate-100 pt-3">
                  <div className="p-2.5 rounded-xl bg-teal-50 text-teal-700 shrink-0 border border-teal-100">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm">Operating Hours:</h3>
                    <p className="text-emerald-700 font-bold mt-1 text-xs">
                      Open 24 Hours (Monday – Sunday)
                    </p>
                    <p className="text-slate-500 text-[11px] mt-0.5">
                      {LAB_DETAILS.hours.busyNote}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 border-t border-slate-100 pt-3">
                  <div className="p-2.5 rounded-xl bg-teal-50 text-teal-700 shrink-0 border border-teal-100">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm">Direct Contact Phone:</h3>
                    <a
                      href={`tel:${LAB_DETAILS.contact.phoneIntl}`}
                      className="text-teal-700 font-bold text-sm block mt-1 hover:underline"
                    >
                      {LAB_DETAILS.contact.phone}
                    </a>
                    <p className="text-slate-500 text-[11px] mt-0.5">
                      24/7 Telephone Assistance for patients & doctors
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 border-t border-slate-100 pt-3">
                  <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-700 shrink-0 border border-emerald-100">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm">WhatsApp Fast Support:</h3>
                    <a
                      href={LAB_DETAILS.contact.whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-700 font-bold text-xs block mt-1 hover:underline"
                    >
                      +91 72763 43407 (Click to Chat)
                    </a>
                    <p className="text-slate-500 text-[11px] mt-0.5">
                      Fastest response for prescriptions and test bookings
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
                <a
                  href={`tel:${LAB_DETAILS.contact.phoneIntl}`}
                  className="flex-1 py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs transition-colors text-center inline-flex items-center justify-center gap-2"
                >
                  <Phone className="w-4 h-4 text-teal-400" />
                  Call Now
                </a>
                <a
                  href={LAB_DETAILS.address.googleMapsDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3 px-4 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-semibold text-xs transition-colors text-center inline-flex items-center justify-center gap-2"
                >
                  <Navigation className="w-4 h-4" />
                  Get Directions
                </a>
              </div>
            </div>

            {/* Google Reviews Reference */}
            <div className="bg-slate-900 text-white rounded-3xl p-6 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-amber-400 font-bold">5.0 / 5.0 Google Rating</span>
                <span className="text-xs text-slate-400">82 Reviews</span>
              </div>
              <p className="text-xs text-slate-300 italic leading-relaxed">
                &ldquo;Good service to patients, timely and good staff. Good diagnostic services at affordable rates and faster report.&rdquo;
              </p>
              <a
                href={LAB_DETAILS.address.googleMapsPlaceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-teal-400 hover:underline font-semibold inline-flex items-center gap-1"
              >
                Read all verified reviews on Google Maps
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

          </div>

          {/* Right Column: Contact/Inquiry Form & Google Map (7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Form */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs">
              <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">
                Send an Enquiry or Feedback
              </h2>
              <p className="text-xs text-slate-500 mt-1 mb-5">
                Have a question about specific test requirements, fasting times, or home collection? Drop us a message below.
              </p>

              {submitted ? (
                <div className="py-6 text-center space-y-3">
                  <div className="w-12 h-12 bg-teal-50 text-teal-600 rounded-full flex items-center justify-center mx-auto border border-teal-200">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900">Message Received!</h3>
                  <p className="text-xs text-slate-600 max-w-sm mx-auto">
                    Thank you, <strong className="text-slate-800">{name}</strong>. Your enquiry has been sent to <strong className="text-teal-700">itzpatilmayur@gmail.com</strong>. Our desk will call you at <strong className="text-slate-800">{phone}</strong> shortly.
                  </p>
                  <div className="pt-2 flex justify-center gap-3">
                    <button
                      onClick={handleWhatsAppSend}
                      className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs inline-flex items-center gap-2"
                    >
                      <MessageSquare className="w-4 h-4" />
                      Open WhatsApp Chat
                    </button>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="px-4 py-2 rounded-xl border border-slate-300 text-slate-700 text-xs font-semibold"
                    >
                      Send Another
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {errorMsg && (
                    <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{errorMsg}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Vikas Patil"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl focus:outline-hidden focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Mobile Number *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="10-digit number"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl focus:outline-hidden focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Subject
                    </label>
                    <select
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl focus:outline-hidden focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20 bg-white"
                    >
                      <option value="Test Availability & Timing">Test Availability & Timing</option>
                      <option value="Home Collection Booking Inquiry">Home Collection Booking Inquiry</option>
                      <option value="Report Status Verification">Report Status Verification</option>
                      <option value="Doctor Prescription Inquiry">Doctor Prescription Inquiry</option>
                      <option value="Other Feedback">Other Feedback</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Your Message / Inquiry Details *
                    </label>
                    <textarea
                      rows={3}
                      required
                      placeholder="Please write your questions here..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl focus:outline-hidden focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20"
                    />
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row gap-3">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 py-3 px-4 rounded-xl bg-teal-600 hover:bg-teal-700 disabled:bg-teal-800 disabled:opacity-80 text-white font-bold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>Sending to itzpatilmayur@gmail.com...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-3.5 h-3.5" />
                          <span>Submit Inquiry</span>
                        </>
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={handleWhatsAppSend}
                      className="py-3 px-5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                      Send on WhatsApp
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* Embedded Google Maps */}
            <div className="bg-white rounded-3xl p-4 border border-slate-200 shadow-xs space-y-3">
              <div className="flex items-center justify-between px-2">
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Map & Route</h3>
                  <p className="text-[11px] text-slate-500">Sr. No. 28, Jijamata Chowk, Ambegaon Pathar, Pune</p>
                </div>
                <a
                  href={LAB_DETAILS.address.googleMapsDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-teal-700 font-bold hover:underline inline-flex items-center gap-1"
                >
                  <span>Open Directions</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              <div className="relative w-full h-[320px] rounded-2xl overflow-hidden bg-slate-100 border border-slate-200">
                <iframe
                  title="CareFirst Pathology Laboratory Map Ambegaon Pune"
                  src="https://maps.google.com/maps?q=CareFirst+Pathology+Laboratory+Jijamata+Chowk+Ambegaon+Pathar+Pune&t=&z=16&ie=UTF8&iwloc=&output=embed"
                  className="w-full h-full border-0"
                  loading="lazy"
                  allowFullScreen
                />
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
