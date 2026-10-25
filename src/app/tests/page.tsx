'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Image from 'next/image';
import { 
  Search, 
  CheckCircle2, 
  MessageSquare, 
  AlertCircle, 
  X,
  Sparkles
} from 'lucide-react';
import { 
  PATHOLOGY_TESTS, 
  HEALTH_PACKAGES, 
  TEST_CATEGORIES, 
  TestItem, 
  LAB_DETAILS 
} from '@/data/labData';
import QuickBookingModal from '@/components/QuickBookingModal';

const QUICK_SEARCH_PILLS = [
  { label: 'CBC / Hemogram', query: 'cbc' },
  { label: 'Blood Sugar (FBS / PPBS)', query: 'sugar' },
  { label: 'HbA1c', query: 'hba1c' },
  { label: 'Lipid Profile', query: 'lipid' },
  { label: 'Thyroid (TSH)', query: 'thyroid' },
  { label: 'Liver (LFT)', query: 'lft' },
  { label: 'Kidney (KFT)', query: 'kft' },
  { label: 'Dengue Fever', query: 'dengue' },
  { label: 'Vitamin D & B12', query: 'vitamin' },
  { label: 'Urine Routine', query: 'urine' },
  { label: 'Full Body Checkup', query: 'full body' },
];

export default function TestsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTestForModal, setSelectedTestForModal] = useState<string>('');
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [activeDetailTest, setActiveDetailTest] = useState<TestItem | null>(null);

  // Check URL query parameters on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const cat = params.get('cat') || params.get('tab');
      const q = params.get('q') || params.get('search');
      if (cat) {
        setSelectedCategory(cat);
      }
      if (q) {
        setSearchQuery(q);
      }
    }
  }, []);

  const isSearching = searchQuery.trim().length > 0;

  const filteredTests = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();

    if (!q) {
      if (selectedCategory === 'packages') return [];
      return PATHOLOGY_TESTS.filter((test) =>
        selectedCategory === 'all' || test.categorySlug === selectedCategory
      );
    }

    // When searchQuery is present, search across all tests with relevance scoring
    const scored = PATHOLOGY_TESTS.map((test) => {
      let score = 0;
      const nameLower = test.name.toLowerCase();
      const codeLower = test.code.toLowerCase();
      const descLower = test.description.toLowerCase();
      const purposeLower = test.clinicalPurpose.toLowerCase();
      const categoryLower = test.category.toLowerCase();
      const aliases = test.aliases?.map((a) => a.toLowerCase()) || [];

      // 1. Exact alias match (e.g., "cbc")
      if (aliases.includes(q)) {
        score += 150;
      }

      // 2. Exact acronym in parentheses, e.g. "(CBC)"
      if (nameLower.includes(`(${q})`)) {
        score += 120;
      }

      // 3. Name starts with query
      if (nameLower.startsWith(q)) {
        score += 100;
      }

      // 4. Code match
      if (codeLower === q || codeLower.includes(q)) {
        score += 90;
      }

      // 5. Name contains query
      if (nameLower.includes(q)) {
        score += 80;
      }

      // 6. Any alias contains query or query contains alias
      if (aliases.some((a) => a.includes(q) || q.includes(a))) {
        score += 70;
      }

      // 7. Category match
      if (categoryLower.includes(q)) {
        score += 40;
      }

      // 8. Description or clinical purpose match
      if (descLower.includes(q) || purposeLower.includes(q)) {
        score += 30;
      }

      return { test, score };
    }).filter((item) => item.score > 0);

    // Sort by score descending so exact match is at position 0
    scored.sort((a, b) => b.score - a.score);

    return scored.map((item) => item.test);
  }, [searchQuery, selectedCategory]);

  const filteredPackages = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();

    if (!q) {
      if (selectedCategory !== 'all' && selectedCategory !== 'packages') {
        return [];
      }
      return HEALTH_PACKAGES;
    }

    return HEALTH_PACKAGES.filter((pkg) => {
      const nameLower = pkg.name.toLowerCase();
      const descLower = pkg.description.toLowerCase();
      const includesTest = pkg.testsIncluded.some((t) => t.toLowerCase().includes(q));
      return nameLower.includes(q) || descLower.includes(q) || includesTest;
    });
  }, [searchQuery, selectedCategory]);

  const handleBookClick = (testName: string) => {
    setSelectedTestForModal(testName);
    setIsBookingModalOpen(true);
  };

  const handleSelectQuickPill = (query: string) => {
    setSearchQuery(query);
    setSelectedCategory('all');
  };

  const clearSearch = () => {
    setSearchQuery('');
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      {/* Header Section */}
      <section className="bg-gradient-to-b from-slate-900 via-slate-900 to-blue-950 text-white py-12 sm:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-3">
            <span className="text-xs font-bold text-teal-400 tracking-wider uppercase flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              Directory & Catalog
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              Pathology Tests & Packages
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Explore our comprehensive range of clinical pathology tests, emergency fever assays, organ panels, and preventive health packages available 24/7 at CareFirst Pathology Laboratory.
            </p>
          </div>

          {/* Search Box */}
          <div className="mt-8 max-w-2xl space-y-3">
            <div className="relative">
              <Search className="w-5 h-5 absolute left-4 top-3.5 text-slate-400" />
              <input
                type="text"
                placeholder="Search tests (e.g. CBC, Blood Sugar, Lipid, Thyroid, Dengue, Urine, Full Body)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-10 py-3.5 rounded-2xl bg-white text-slate-900 placeholder-slate-400 text-sm shadow-lg focus:outline-hidden focus:ring-2 focus:ring-teal-400 border border-slate-200"
              />
              {searchQuery && (
                <button
                  onClick={clearSearch}
                  className="absolute right-3.5 top-3.5 text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
                  aria-label="Clear search query"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Quick Search Chips */}
            <div className="flex items-center gap-1.5 flex-wrap pt-1 text-xs text-slate-300">
              <span className="text-[11px] text-teal-300 font-semibold mr-1">Quick Search:</span>
              {QUICK_SEARCH_PILLS.map((pill) => {
                const isActive = searchQuery.toLowerCase().trim() === pill.query.toLowerCase();
                return (
                  <button
                    key={pill.query}
                    onClick={() => handleSelectQuickPill(pill.query)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors cursor-pointer border ${
                      isActive
                        ? 'bg-teal-500 text-slate-950 font-bold border-teal-400 shadow-xs'
                        : 'bg-slate-800/80 hover:bg-slate-700 text-slate-200 border-slate-700/60'
                    }`}
                  >
                    {pill.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Category Tabs */}
      <div className="sticky top-20 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 overflow-x-auto py-3 no-scrollbar scroll-smooth">
            {TEST_CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat.id && !isSearching;
              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    setSelectedCategory(cat.id);
                    if (isSearching) {
                      setSearchQuery('');
                    }
                  }}
                  className={`px-4 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-slate-900 text-white font-bold shadow-xs'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Catalog Display */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-10">

        {/* Active Search Summary Bar */}
        {isSearching && (
          <div className="mb-8 p-4 rounded-2xl bg-teal-50 border border-teal-200 flex flex-wrap items-center justify-between gap-3 shadow-xs">
            <div className="flex items-center gap-2 text-slate-800 text-xs sm:text-sm">
              <span className="font-bold text-teal-800 flex items-center gap-1">
                <Search className="w-4 h-4 text-teal-700" />
                Search Results:
              </span>
              <span>
                Found <strong className="text-teal-900">{filteredTests.length}</strong> individual test{filteredTests.length === 1 ? '' : 's'}
                {filteredPackages.length > 0 && (
                  <> and <strong className="text-teal-900">{filteredPackages.length}</strong> health package{filteredPackages.length === 1 ? '' : 's'}</>
                )}
                {' '}matching <span className="bg-white px-2 py-0.5 rounded border border-teal-200 font-semibold text-teal-950">&quot;{searchQuery}&quot;</span>
              </span>
            </div>
            <button
              onClick={clearSearch}
              className="text-xs font-bold text-teal-800 bg-white hover:bg-teal-100 border border-teal-300 px-3 py-1.5 rounded-xl cursor-pointer transition-colors flex items-center gap-1"
            >
              Clear Search <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Quality Banner Card (Shown ONLY when not searching to avoid pushing search results down) */}
        {!isSearching && selectedCategory === 'all' && (
          <div className="mb-10 rounded-3xl overflow-hidden bg-gradient-to-r from-slate-900 via-slate-800 to-teal-950 text-white border border-slate-700/60 shadow-md">
            <div className="grid grid-cols-1 md:grid-cols-12 items-center">
              <div className="p-6 sm:p-8 md:col-span-8 space-y-2.5">
                <span className="px-2.5 py-1 rounded-full bg-teal-500/20 text-teal-300 font-bold text-[11px] border border-teal-500/30">
                  Quality Diagnostic Testing
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-white">
                  Calibrated Clinical Laboratory Equipment
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed">
                  All hematology, biochemistry, and serology assays are processed using automated analyzers with multi-level quality controls for reliable, clinical accuracy.
                </p>
              </div>
              <div className="md:col-span-4 h-48 md:h-full relative min-h-[170px]">
                <Image
                  src="/images/lab-tech.jpg"
                  alt="Pathologist analyzing medical samples with precision"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        )}

        {/* IF USER IS SEARCHING: Show Individual Tests FIRST so CBC appears immediately at top! */}
        {isSearching && (
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  Matching Pathology Tests ({filteredTests.length})
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Direct test assays performed in-house with barcoded vacutainer tubes.
                </p>
              </div>
            </div>

            {filteredTests.length === 0 ? (
              <div className="bg-white rounded-2xl p-8 text-center border border-slate-200">
                <AlertCircle className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                <p className="text-sm font-semibold text-slate-700">No individual test named &quot;{searchQuery}&quot;</p>
                <p className="text-xs text-slate-500 mt-1">Please check our packages below or call our 24/7 desk.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTests.map((test, index) => {
                  const isTopMatch = index === 0;
                  return (
                    <div
                      key={test.id}
                      className={`bg-white rounded-2xl p-6 border transition-all flex flex-col justify-between ${
                        isTopMatch
                          ? 'border-2 border-teal-500 ring-4 ring-teal-500/10 shadow-lg bg-gradient-to-b from-teal-50/30 to-white'
                          : 'border-slate-200 hover:border-teal-400 hover:shadow-md'
                      }`}
                    >
                      <div>
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className="text-[11px] font-semibold text-teal-700 bg-teal-50 px-2.5 py-0.5 rounded-full border border-teal-200/60">
                              {test.category}
                            </span>
                            {isTopMatch && (
                              <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100 border border-emerald-300 px-2 py-0.5 rounded-full flex items-center gap-1 shadow-xs">
                                🎯 Direct Match
                              </span>
                            )}
                          </div>
                          <span className="text-[11px] font-mono text-slate-600 bg-slate-100 px-2 py-0.5 rounded shrink-0">
                            {test.code}
                          </span>
                        </div>

                        <h3 className="text-base font-bold text-slate-900 mt-2">
                          {test.name}
                        </h3>

                        <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                          {test.description}
                        </p>

                        <div className="mt-4 pt-3 border-t border-slate-100 text-xs space-y-1.5 text-slate-600">
                          <div className="flex justify-between">
                            <span className="text-slate-500">Parameters:</span>
                            <span className="font-semibold text-slate-800">{test.parametersCount} Parameters</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-500">Sample Type:</span>
                            <span className="font-medium text-slate-800">{test.sampleType}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-500">Report In:</span>
                            <span className="font-semibold text-teal-700">{test.turnaroundTime}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-500">Fasting:</span>
                            <span className={`font-medium ${test.fastingRequired ? 'text-amber-800' : 'text-slate-700'}`}>
                              {test.fastingRequired ? 'Required' : 'Not Required'}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="mt-5 pt-3 border-t border-slate-100 flex items-center gap-2">
                        <button
                          onClick={() => setActiveDetailTest(test)}
                          className="px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
                        >
                          View Details
                        </button>
                        <button
                          onClick={() => handleBookClick(test.name)}
                          className="flex-1 py-2 px-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold transition-colors cursor-pointer text-center"
                        >
                          Book Test
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Health Packages Display */}
        {filteredPackages.length > 0 && (
          <div className="mb-14">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  {isSearching ? `Health Packages including "${searchQuery}" (${filteredPackages.length})` : `Preventive Health Packages (${filteredPackages.length})`}
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  {isSearching 
                    ? `Comprehensive multi-test profiles that include ${searchQuery.toUpperCase()} along with other organ panels.`
                    : 'Cost-effective comprehensive profiles with free doorstep sample collection.'}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPackages.map((pkg) => (
                <div
                  key={pkg.id}
                  className={`rounded-2xl p-6 flex flex-col justify-between bg-white border ${
                    pkg.isPopular ? 'border-teal-400 shadow-md ring-1 ring-teal-400/20' : 'border-slate-200 shadow-xs'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between text-xs mb-2">
                      <span className="font-semibold text-teal-700 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                        {pkg.parametersCount} Parameters
                      </span>
                      <span className="text-slate-600 font-medium">{pkg.suitableFor}</span>
                    </div>

                    <h3 className="text-base font-bold text-slate-900 mt-2">
                      {pkg.name}
                    </h3>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      {pkg.description}
                    </p>

                    <div className="mt-4 pt-3 border-t border-slate-100 space-y-2">
                      <p className="text-xs font-bold text-slate-700">Included Tests:</p>
                      <ul className="text-xs text-slate-600 space-y-1">
                        {pkg.testsIncluded.slice(0, 4).map((t, idx) => (
                          <li key={idx} className="flex items-start gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0 mt-0.5" />
                            <span>{t}</span>
                          </li>
                        ))}
                        {pkg.testsIncluded.length > 4 && (
                          <li className="text-[11px] text-teal-700 font-medium pl-5">
                            + {pkg.testsIncluded.length - 4} more specialized tests
                          </li>
                        )}
                      </ul>
                    </div>

                    <div className="mt-4 p-2.5 rounded-lg bg-slate-50 text-[11px] text-slate-600 border border-slate-100 space-y-1">
                      <p><strong>Fasting:</strong> {pkg.fastingDuration}</p>
                      <p><strong>Reports:</strong> {pkg.turnaroundTime}</p>
                    </div>
                  </div>

                  <div className="mt-6 pt-3 border-t border-slate-100 flex items-center gap-2">
                    <button
                      onClick={() => handleBookClick(pkg.name)}
                      className="flex-1 py-2.5 px-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold transition-colors cursor-pointer"
                    >
                      Book Package
                    </button>
                    <a
                      href={`https://wa.me/${LAB_DETAILS.contact.whatsapp}?text=${encodeURIComponent(
                        `Hi CareFirst Lab, please share pricing and details for ${pkg.name}.`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 rounded-xl border border-emerald-300 bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                      title="Enquire on WhatsApp"
                    >
                      <MessageSquare className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* When NOT searching: Show Individual Tests in standard layout */}
        {!isSearching && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  Individual Pathology Tests ({filteredTests.length})
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Processed with calibrated automated analyzers & barcoded vacutainer tubes.
                </p>
              </div>
            </div>

            {filteredTests.length === 0 && filteredPackages.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 text-center border border-slate-200">
                <AlertCircle className="w-10 h-10 text-slate-400 mx-auto mb-3" />
                <h3 className="text-base font-bold text-slate-800">No matching tests found</h3>
                <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
                  We perform almost all routine and specialized clinical pathology tests upon prescription. Please contact our 24/7 desk to confirm test availability.
                </p>
                <div className="mt-5 flex justify-center gap-3">
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('all');
                    }}
                    className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold cursor-pointer"
                  >
                    Reset Filter
                  </button>
                  <a
                    href={`tel:${LAB_DETAILS.contact.phoneIntl}`}
                    className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold"
                  >
                    Call Lab: {LAB_DETAILS.contact.phone}
                  </a>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTests.map((test) => (
                  <div
                    key={test.id}
                    className="bg-white rounded-2xl p-6 border border-slate-200 hover:border-teal-400 hover:shadow-md transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <span className="text-[11px] font-semibold text-teal-700 bg-teal-50 px-2.5 py-0.5 rounded-full border border-teal-200/60">
                          {test.category}
                        </span>
                        <span className="text-[11px] font-mono text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                          {test.code}
                        </span>
                      </div>

                      <h3 className="text-base font-bold text-slate-900 mt-2">
                        {test.name}
                      </h3>

                      <p className="text-xs text-slate-600 mt-2 line-clamp-2 leading-relaxed">
                        {test.description}
                      </p>

                      <div className="mt-4 pt-3 border-t border-slate-100 text-xs space-y-1.5 text-slate-600">
                        <div className="flex justify-between">
                          <span className="text-slate-500">Parameters:</span>
                          <span className="font-semibold text-slate-800">{test.parametersCount} Parameters</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500">Sample Type:</span>
                          <span className="font-medium text-slate-800">{test.sampleType}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500">Report In:</span>
                          <span className="font-semibold text-teal-700">{test.turnaroundTime}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500">Fasting:</span>
                          <span className={`font-medium ${test.fastingRequired ? 'text-amber-800' : 'text-slate-700'}`}>
                            {test.fastingRequired ? 'Required' : 'Not Required'}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-5 pt-3 border-t border-slate-100 flex items-center gap-2">
                      <button
                        onClick={() => setActiveDetailTest(test)}
                        className="px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
                      >
                        View Details
                      </button>
                      <button
                        onClick={() => handleBookClick(test.name)}
                        className="flex-1 py-2 px-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold transition-colors cursor-pointer text-center"
                      >
                        Book Test
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Global Empty State if user searched and nothing matched at all */}
        {isSearching && filteredTests.length === 0 && filteredPackages.length === 0 && (
          <div className="bg-white rounded-2xl p-12 text-center border border-slate-200">
            <AlertCircle className="w-10 h-10 text-slate-400 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-800">No matching test found for &quot;{searchQuery}&quot;</h3>
            <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
              We perform all clinical tests on doctor recommendation. Please send your prescription or call our 24/7 reception desk.
            </p>
            <div className="mt-5 flex justify-center gap-3">
              <button
                onClick={clearSearch}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold cursor-pointer"
              >
                Clear Search
              </button>
              <a
                href={`tel:${LAB_DETAILS.contact.phoneIntl}`}
                className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold"
              >
                Call Lab: {LAB_DETAILS.contact.phone}
              </a>
            </div>
          </div>
        )}

        {/* Pricing Honesty Banner */}
        <div className="mt-16 bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xs">
          <div className="space-y-1">
            <h4 className="text-base font-bold text-slate-900">
              Need custom test panel pricing or doctor prescription review?
            </h4>
            <p className="text-xs text-slate-600">
              In accordance with our patient-first policy, we provide transparent, affordable rates with no hidden costs. Send your doctor prescription for a quick estimate.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <a
              href={`https://wa.me/${LAB_DETAILS.contact.whatsapp}?text=${encodeURIComponent(
                'Hi CareFirst Lab, I have a doctor prescription. Please let me know the test availability, fasting instructions, and charges.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-colors"
            >
              <MessageSquare className="w-4 h-4" />
              Send Prescription on WhatsApp
            </a>
          </div>
        </div>

      </div>

      {/* Test Detail Modal */}
      {activeDetailTest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 space-y-4">
            <div className="flex items-start justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-[11px] font-semibold text-teal-700 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                  {activeDetailTest.category}
                </span>
                <h3 className="text-lg font-bold text-slate-900 mt-1">{activeDetailTest.name}</h3>
              </div>
              <button
                onClick={() => setActiveDetailTest(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-700">
              <div>
                <h4 className="font-bold text-slate-900">Clinical Purpose:</h4>
                <p className="text-slate-600 mt-0.5 leading-relaxed">{activeDetailTest.clinicalPurpose}</p>
              </div>

              <div>
                <h4 className="font-bold text-slate-900">What It Tests:</h4>
                <p className="text-slate-600 mt-0.5 leading-relaxed">{activeDetailTest.description}</p>
              </div>

              <div className="bg-slate-50 rounded-xl p-3 border border-slate-200 space-y-1.5">
                <p><strong>Sample Specimen:</strong> {activeDetailTest.sampleType}</p>
                <p><strong>Turnaround Time (TAT):</strong> {activeDetailTest.turnaroundTime}</p>
                <p><strong>Fasting Requirement:</strong> {activeDetailTest.preparationNotes}</p>
              </div>
            </div>

            <div className="pt-2 flex gap-3">
              <button
                onClick={() => {
                  const testName = activeDetailTest.name;
                  setActiveDetailTest(null);
                  handleBookClick(testName);
                }}
                className="flex-1 py-2.5 px-4 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs cursor-pointer"
              >
                Book This Test
              </button>
              <button
                onClick={() => setActiveDetailTest(null)}
                className="py-2.5 px-4 rounded-xl border border-slate-300 text-slate-700 font-semibold text-xs cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Global Booking Modal */}
      <QuickBookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        preselectedTest={selectedTestForModal}
      />
    </div>
  );
}
