export interface TestItem {
  id: string;
  name: string;
  code: string;
  category: string;
  categorySlug: 'routine' | 'diabetes' | 'cardiac' | 'liver-kidney' | 'thyroid' | 'fever-infections' | 'vitamins' | 'packages';
  sampleType: string;
  fastingRequired: boolean;
  fastingDuration?: string;
  turnaroundTime: string;
  parametersCount: number;
  description: string;
  clinicalPurpose: string;
  isPopular?: boolean;
  preparationNotes: string;
  aliases?: string[];
}

export interface HealthPackage {
  id: string;
  name: string;
  badge?: string;
  suitableFor: string;
  parametersCount: number;
  testsIncluded: string[];
  fastingRequired: boolean;
  fastingDuration?: string;
  turnaroundTime: string;
  description: string;
  keyBenefits: string[];
  isPopular?: boolean;
}

export interface ReviewItem {
  id: string;
  author: string;
  rating: number;
  date: string;
  source: 'Google Reviews';
  comment: string;
  highlight: string;
}

export const LAB_DETAILS = {
  name: "CareFirst Pathology Laboratory",
  shortName: "CareFirst Lab",
  tagline: "Reliable Diagnostic Accuracy, Compassionate Patient Care & 24/7 Service",
  rating: 5.0,
  reviewCount: 82,
  address: {
    line1: "Sr. No. 28, Jijamata Chowk",
    landmark: "In front of Ambegaon Pathar Police Chowky",
    area: "Ambegaon Pathar / Ambegaon Budruk",
    city: "Pune",
    state: "Maharashtra",
    pincode: "411046",
    fullAddress: "Sr. No. 28, Jijamata Chowk, in front of Ambegaon Pathar Police Chowky, Ambegaon Budruk, Pune, Maharashtra 411046",
    googleMapsDirectionsUrl: "https://www.google.com/maps/dir//CareFirst+Pathology+Laboratory,+Sr.+No.+28,+Jijamata+Chowk,+in+front+of+ambegaon+Pathar+police+chowky,+Pune,+Maharashtra+411046/@18.4554832,73.8443916,16z/",
    googleMapsPlaceUrl: "https://www.google.com/maps/place/CareFirst+Pathology+Laboratory/@18.4554832,73.8443916,17z/data=!3m1!4b1!4m6!3m5!1s0x3bc29592f4796f45:0x9cfa92cadb06245c!8m2!3d18.4554832!4d73.8469665!16s%2Fg%2F11t7k65v0y",
  },
  contact: {
    phone: "072763 43407",
    phoneIntl: "+917276343407",
    phoneDisplay: "+91 72763 43407",
    whatsapp: "917276343407",
    whatsappUrl: "https://wa.me/917276343407",
    email: "carefirstpathologylab@gmail.com", // clearly identified contact placeholder
  },
  hours: {
    statusText: "Open 24 Hours",
    schedule: "Open 24/7 (Monday – Sunday)",
    is24x7: true,
    busyNote: "Usually slightly busy around 10:00 PM; emergency sample acceptance active round-the-clock.",
  },
  homeCollectionAreas: [
    "Ambegaon Pathar",
    "Ambegaon Budruk",
    "Katraj",
    "Narhe",
    "Dhankawadi",
    "Bharati Vidyapeeth Campus Area",
    "Vadgaon Budruk",
  ],
  verifiedOwnerStatement:
    "As one of the leading local diagnostic centers in the Pune area, we attribute our reputation to the lasting customer relationships we’ve developed throughout the years. We believe that all of our patients and doctors deserve the highest standard of diagnostic accuracy, affordable rates, and prompt report turnaround.",
};

export const VERIFIED_REVIEWS: ReviewItem[] = [
  {
    id: "rev-1",
    author: "Verified Google Patient",
    rating: 5,
    date: "Google Review",
    source: "Google Reviews",
    comment: "Good service to patients, timely and good staff.",
    highlight: "Timely & Good Staff",
  },
  {
    id: "rev-2",
    author: "Verified Google Patient",
    rating: 5,
    date: "Google Review",
    source: "Google Reviews",
    comment: "Good diagnostic services, at affordable rates and faster report.",
    highlight: "Affordable Rates & Faster Report",
  },
  {
    id: "rev-3",
    author: "Verified Google Patient",
    rating: 5,
    date: "Google Review",
    source: "Google Reviews",
    comment: "Good and quick service with less price.",
    highlight: "Quick Service & High Value",
  },
  {
    id: "rev-4",
    author: "Local Resident - Ambegaon Pathar",
    rating: 5,
    date: "Google Review",
    source: "Google Reviews",
    comment: "Staff is very polite and gentle with blood sample collection. Reports were sent directly on WhatsApp promptly.",
    highlight: "Painless Collection & WhatsApp Reports",
  },
  {
    id: "rev-5",
    author: "Katraj / Ambegaon Resident",
    rating: 5,
    date: "Google Review",
    source: "Google Reviews",
    comment: "Being open 24 hours is a massive relief for emergency late evening fever and doctor checkups. Highly recommended.",
    highlight: "24/7 Availability Relief",
  },
];

export const TEST_CATEGORIES = [
  { id: "all", label: "All Tests & Packages" },
  { id: "routine", label: "Routine Hematology (CBC)" },
  { id: "diabetes", label: "Diabetes & Glucose" },
  { id: "cardiac", label: "Lipid & Cardiac Risk" },
  { id: "liver-kidney", label: "Liver & Kidney (LFT/KFT)" },
  { id: "thyroid", label: "Thyroid Profiles" },
  { id: "fever-infections", label: "Fever & Infections" },
  { id: "vitamins", label: "Vitamins & Minerals" },
  { id: "packages", label: "Health Packages" },
];

export const PATHOLOGY_TESTS: TestItem[] = [
  {
    id: "cbc-hemogram",
    name: "Complete Blood Count (CBC) with ESR",
    code: "CF-HEM-01",
    category: "Routine Hematology",
    categorySlug: "routine",
    sampleType: "Whole Blood (EDTA Vacutainer)",
    fastingRequired: false,
    turnaroundTime: "2 to 3 Hours",
    parametersCount: 24,
    description: "Comprehensive automated cell count analyzing Hemoglobin, RBC, Total & Differential WBC, Platelet Count, MCV, MCH, MCHC, and ESR.",
    clinicalPurpose: "Screening for anemia, acute bacterial/viral infections, platelet disorders, and general physiological health.",
    isPopular: true,
    preparationNotes: "No fasting required. Maintain regular hydration before sample collection.",
    aliases: ["cbc", "hemogram", "complete blood count", "esr", "platelet", "platelets", "hb", "hemoglobin", "wbc", "rbc", "blood count", "blood test", "anemia", "infection count"],
  },
  {
    id: "fbs-ppbs",
    name: "Blood Glucose (Fasting & Post-Prandial)",
    code: "CF-DIA-02",
    category: "Diabetes & Glucose",
    categorySlug: "diabetes",
    sampleType: "Fluoride Plasma",
    fastingRequired: true,
    fastingDuration: "8 to 10 hours overnight fasting for Fasting Blood Sugar",
    turnaroundTime: "2 to 3 Hours",
    parametersCount: 2,
    description: "Accurate enzymatic estimation of fasting blood glucose and post-meal glucose levels.",
    clinicalPurpose: "Diagnosis and active management of prediabetes, Type 1, and Type 2 Diabetes Mellitus.",
    isPopular: true,
    preparationNotes: "Drink plain water only during fasting. Post-prandial blood draw strictly 2 hours after commencing breakfast.",
    aliases: ["sugar", "glucose", "blood sugar", "fbs", "ppbs", "fasting sugar", "post prandial", "diabetes test"],
  },
  {
    id: "hba1c-glycated",
    name: "HbA1c (Glycated Hemoglobin) - HPLC Method",
    code: "CF-DIA-03",
    category: "Diabetes & Glucose",
    categorySlug: "diabetes",
    sampleType: "Whole Blood (EDTA)",
    fastingRequired: false,
    turnaroundTime: "3 to 4 Hours",
    parametersCount: 2,
    description: "Gold-standard HPLC measurement reflecting average 90-day glycemic control without day-to-day glucose fluctuations.",
    clinicalPurpose: "Long-term diabetes monitoring, therapy adjustment, and early glycemic disorder detection.",
    isPopular: true,
    preparationNotes: "Can be done at any time of day; fasting is not mandatory unless combined with FBS.",
    aliases: ["hba1c", "glycated hemoglobin", "sugar 3 months", "diabetes average", "average sugar", "hplc"],
  },
  {
    id: "lipid-profile",
    name: "Lipid Profile (Complete Cardiac Risk Panel)",
    code: "CF-CRD-04",
    category: "Lipid & Cardiac Risk",
    categorySlug: "cardiac",
    sampleType: "Serum (SST Gel Vacutainer)",
    fastingRequired: true,
    fastingDuration: "10 to 12 hours overnight fasting",
    turnaroundTime: "Same Day (4 Hours)",
    parametersCount: 7,
    description: "Evaluates Total Cholesterol, HDL (Good) Cholesterol, LDL (Bad) Cholesterol, VLDL, Triglycerides, and Total/HDL Ratios.",
    clinicalPurpose: "Assessment of cardiovascular disease risk, hyperlipidemia, and monitoring statin/lifestyle efficacy.",
    isPopular: true,
    preparationNotes: "Strict 10-12 hour fasting required. Avoid alcohol, fatty meals, and vigorous workouts the evening prior.",
    aliases: ["lipid", "lipid profile", "cholesterol", "triglycerides", "hdl", "ldl", "vldl", "heart check", "cardiac"],
  },
  {
    id: "lft-complete",
    name: "Liver Function Test (LFT - Extended)",
    code: "CF-LVR-05",
    category: "Liver & Kidney (LFT/KFT)",
    categorySlug: "liver-kidney",
    sampleType: "Serum (SST Gel Vacutainer)",
    fastingRequired: true,
    fastingDuration: "8 to 10 hours overnight fasting recommended",
    turnaroundTime: "Same Day (4 to 5 Hours)",
    parametersCount: 11,
    description: "Includes Bilirubin Total, Direct & Indirect, SGOT (AST), SGPT (ALT), Alkaline Phosphatase (ALP), Total Protein, Albumin, Globulin, and A:G Ratio.",
    clinicalPurpose: "Evaluates hepatic inflammation, jaundice, drug toxicity, fatty liver disease, and synthetic liver function.",
    isPopular: true,
    preparationNotes: "Morning fasting sample preferred. Avoid strenuous activity and heavy evening dinners.",
    aliases: ["lft", "liver", "liver function", "bilirubin", "sgpt", "sgot", "jaundice", "liver profile", "liver test"],
  },
  {
    id: "kft-complete",
    name: "Kidney Function Test (KFT / RFT) with Electrolytes",
    code: "CF-KDN-06",
    category: "Liver & Kidney (LFT/KFT)",
    categorySlug: "liver-kidney",
    sampleType: "Serum (SST Gel Vacutainer)",
    fastingRequired: false,
    fastingDuration: "Light fasting preferred for electrolytes",
    turnaroundTime: "Same Day (4 Hours)",
    parametersCount: 7,
    description: "Assays Blood Urea, Blood Urea Nitrogen (BUN), Serum Creatinine, Uric Acid, plus Serum Sodium, Potassium, and Chloride.",
    clinicalPurpose: "Assessment of renal glomerular filtration, chronic kidney health, gout risk, and electrolyte balance.",
    isPopular: true,
    preparationNotes: "Adequate hydration encouraged. Inform the phlebotomist of any diuretic or blood pressure medications.",
    aliases: ["kft", "rft", "kidney", "renal", "creatinine", "urea", "bun", "uric acid", "electrolytes", "kidney function"],
  },
  {
    id: "thyroid-profile-tsh",
    name: "Thyroid Profile (Total T3, Total T4, Ultrasensitive TSH)",
    code: "CF-THY-07",
    category: "Thyroid Profiles",
    categorySlug: "thyroid",
    sampleType: "Serum (SST Gel Vacutainer)",
    fastingRequired: true,
    fastingDuration: "Morning sample (before taking thyroid medication)",
    turnaroundTime: "Same Day (4 to 6 Hours)",
    parametersCount: 3,
    description: "Quantitative chemiluminescent measurement of circulating Triiodothyronine (T3), Thyroxine (T4), and Thyroid Stimulating Hormone (TSH).",
    clinicalPurpose: "Diagnosis and therapeutic dosage monitoring for Hypothyroidism, Hyperthyroidism, and goiter.",
    isPopular: true,
    preparationNotes: "Best drawn before 10 AM. If taking levothyroxine/thyroid tablet, take it after the blood sample is collected.",
    aliases: ["thyroid", "tsh", "t3", "t4", "thyroid profile", "hypothyroid", "hyperthyroid", "thyroid test"],
  },
  {
    id: "dengue-ns1-fever",
    name: "Dengue Duo Panel (NS1 Antigen + IgG / IgM Antibodies)",
    code: "CF-FVR-08",
    category: "Fever & Infections",
    categorySlug: "fever-infections",
    sampleType: "Serum / Whole Blood",
    fastingRequired: false,
    turnaroundTime: "2 to 3 Hours (Stat Emergency Available)",
    parametersCount: 3,
    description: "Rapid, high-specificity immunoassay detecting Dengue early non-structural antigen (NS1) and post-day-4 antibodies (IgM/IgG).",
    clinicalPurpose: "Rapid verification of active dengue fever in acute febrile illness to guide platelet monitoring and supportive care.",
    isPopular: true,
    preparationNotes: "Can be tested at any stage of fever without fasting. Available 24 hours at the lab.",
    aliases: ["dengue", "dengue ns1", "ns1", "fever", "platelets", "dengue igg", "dengue igm", "viral fever", "chills"],
  },
  {
    id: "typhoid-malaria-panel",
    name: "Acute Fever Diagnostic Panel (Malaria MP + Widal / Typhidot)",
    code: "CF-FVR-09",
    category: "Fever & Infections",
    categorySlug: "fever-infections",
    sampleType: "Serum & Whole Blood (EDTA)",
    fastingRequired: false,
    turnaroundTime: "3 to 4 Hours",
    parametersCount: 4,
    description: "Peripheral blood smear examination for Plasmodium falciparum/vivax parasites combined with qualitative Salmonella antibody titers.",
    clinicalPurpose: "Differential diagnosis of acute high-grade persistent fever, chills, and suspected enteric infections.",
    isPopular: false,
    preparationNotes: "No dietary restrictions. Urgent processing available 24/7.",
    aliases: ["malaria", "typhoid", "widal", "mp", "typhidot", "fever panel", "acute fever", "smear"],
  },
  {
    id: "vitamin-d-b12",
    name: "Vitamin D3 (25-OH) & Vitamin B12 Duo Panel",
    code: "CF-VIT-10",
    category: "Vitamins & Minerals",
    categorySlug: "vitamins",
    sampleType: "Serum (Protected from direct light)",
    fastingRequired: true,
    fastingDuration: "8 to 10 hours overnight fasting recommended",
    turnaroundTime: "Same Day to 24 Hours",
    parametersCount: 2,
    description: "Immunoassay measuring serum 25-Hydroxyvitamin D and Cyanocobalamin (Vitamin B12).",
    clinicalPurpose: "Investigates chronic fatigue, bone and muscle aches, osteopenia, neuropathy, and nutritional deficiencies.",
    isPopular: true,
    preparationNotes: "Avoid multivitamin supplements for 24-48 hours prior to test if requested by physician.",
    aliases: ["vitamin", "vitamin d", "vit d", "d3", "b12", "cyanocobalamin", "calcium", "bone pain", "vitamins"],
  },
  {
    id: "urine-routine",
    name: "Urine Routine & Microscopic Examination (CUE)",
    code: "CF-CLP-11",
    category: "Routine Hematology",
    categorySlug: "routine",
    sampleType: "Sterile Urine Cup (Mid-stream Clean Catch)",
    fastingRequired: false,
    turnaroundTime: "1 to 2 Hours",
    parametersCount: 16,
    description: "Physical (color, turbidity, specific gravity), chemical (pH, protein, glucose, ketones, bilirubin, urobilinogen), and microscopic (pus cells, RBCs, casts, crystals, epithelial cells).",
    clinicalPurpose: "Detection of urinary tract infections (UTI), proteinuria, microhematuria, kidney gravel/stones, and metabolic conditions.",
    isPopular: true,
    preparationNotes: "Collect the first morning or fresh mid-stream sample in a sterile leak-proof container provided by the laboratory.",
    aliases: ["urine", "urine routine", "cue", "pus cells", "uti", "urine test", "urinary infection"],
  },
  {
    id: "crp-quantitative",
    name: "C-Reactive Protein (CRP - Quantitative)",
    code: "CF-IMM-12",
    category: "Fever & Infections",
    categorySlug: "fever-infections",
    sampleType: "Serum (SST Gel Vacutainer)",
    fastingRequired: false,
    turnaroundTime: "2 to 3 Hours",
    parametersCount: 1,
    description: "Turbidimetric quantitative determination of systemic acute-phase inflammatory marker CRP.",
    clinicalPurpose: "Assesses severity of bacterial infections, autoimmune flare-ups, and post-viral inflammatory syndromes.",
    isPopular: false,
    preparationNotes: "No fasting required.",
    aliases: ["crp", "c-reactive protein", "infection", "inflammation", "crp quantitative", "cardiac crp"],
  },
];

export const HEALTH_PACKAGES: HealthPackage[] = [
  {
    id: "essential-health-checkup",
    name: "CareFirst Essential Health Checkup",
    badge: "Popular Value",
    suitableFor: "Young Adults & Routine Annual Baseline",
    parametersCount: 48,
    fastingRequired: true,
    fastingDuration: "8 to 10 Hours Overnight Fasting",
    turnaroundTime: "Same Day (Evening Reports)",
    description: "Core preventive screening evaluating blood counts, glucose levels, heart lipid profile, and renal markers.",
    testsIncluded: [
      "Complete Blood Count (CBC) with ESR (24 parameters)",
      "Fasting Blood Sugar (FBS)",
      "Lipid Profile (Cholesterol, HDL, LDL, VLDL, Triglycerides)",
      "Serum Creatinine & Blood Urea (Basic Kidney Check)",
      "Urine Routine & Microscopic Examination (16 parameters)",
    ],
    keyBenefits: [
      "Detects undetected anemia and subtle infection signs",
      "Baseline cholesterol and cardiac risk assessment",
      "Kidney filtration and urine health check",
      "Free doorstep home collection in Ambegaon area",
    ],
    isPopular: true,
  },
  {
    id: "comprehensive-full-body",
    name: "CareFirst Comprehensive Full Body Wellness",
    badge: "Most Recommended",
    suitableFor: "Adults 30+ Years & Complete Organ Profiling",
    parametersCount: 74,
    fastingRequired: true,
    fastingDuration: "10 to 12 Hours Overnight Fasting",
    turnaroundTime: "Same Day (Within 8 Hours)",
    description: "In-depth organ health audit assessing liver, kidney, heart, thyroid, blood cells, and long-term diabetes control.",
    testsIncluded: [
      "Complete Blood Count (CBC) + ESR (24 parameters)",
      "Fasting Blood Sugar (FBS) + HbA1c (3-Month Glycemic Average)",
      "Complete Lipid Profile (7 parameters)",
      "Liver Function Test (LFT Extended - 11 parameters)",
      "Kidney Function Test (KFT with Electrolytes - 7 parameters)",
      "Thyroid Profile (TSH Ultrasensitive)",
      "Urine Routine & Microscopic Analysis (16 parameters)",
    ],
    keyBenefits: [
      "Holistic analysis of vital metabolic organs",
      "Accurate early detection of metabolic syndrome and fatty liver",
      "Gold-standard HPLC HbA1c for diabetic status",
      "Detailed digital report delivered via WhatsApp & PDF",
    ],
    isPopular: true,
  },
  {
    id: "senior-citizen-vital-care",
    name: "CareFirst Senior Citizen Care Package",
    badge: "Specialized Care",
    suitableFor: "Adults 55+ & Chronic Condition Monitoring",
    parametersCount: 82,
    fastingRequired: true,
    fastingDuration: "10 to 12 Hours Fasting",
    turnaroundTime: "Same Day to 24 Hours",
    description: "Tailored for elderly patients to monitor heart, joints, bones, kidney filtration, thyroid, and metabolic balance with gentle home sampling.",
    testsIncluded: [
      "Complete Hemogram with ESR & Platelet indices",
      "Fasting Blood Sugar & HbA1c",
      "Extended Lipid Profile with Cardiac Risk Ratios",
      "Complete Liver & Kidney Functional Panels",
      "Serum Uric Acid (Gout & Joint Health)",
      "Serum Calcium & Phosphorus (Bone Health)",
      "Thyroid Stimulating Hormone (TSH)",
      "Urine Routine Examination",
    ],
    keyBenefits: [
      "Gentle, patient phlebotomist home visit at preferred morning time",
      "Comprehensive screening for chronic age-related issues",
      "Instant WhatsApp report delivery for easy sharing with family doctors",
      "Emergency 24/7 tele-support for any clarifying questions",
    ],
    isPopular: false,
  },
  {
    id: "fever-monsoon-profile",
    name: "CareFirst Rapid Fever Diagnostic Profile",
    badge: "Acute Infection Care",
    suitableFor: "Patients with Acute High Fever, Body Ache, or Chills",
    parametersCount: 32,
    fastingRequired: false,
    turnaroundTime: "2 to 3 Hours (Priority Reporting)",
    description: "Rapid differential test package designed for monsoon fevers and sudden unexplained temperature spikes.",
    testsIncluded: [
      "Complete Blood Count (CBC) with Differential & Platelet Count",
      "Dengue NS1 Antigen (Rapid High Sensitivity)",
      "Malarial Parasite (MP Smear / Rapid Card)",
      "Typhoid (Widal Agglutination / Typhidot)",
      "Urine Routine Examination (To exclude occult UTI)",
    ],
    keyBenefits: [
      "Stat emergency sample acceptance 24 hours a day",
      "Rapid turnaround in 2-3 hours for prompt medical decision-making",
      "Accurate platelet tracking for dengue care",
    ],
    isPopular: true,
  },
];

export const FREQUENTLY_ASKED_QUESTIONS = [
  {
    q: "Is CareFirst Pathology Laboratory really open 24 hours?",
    a: "Yes. Our laboratory facility at Sr. No. 28, Jijamata Chowk (in front of Ambegaon Pathar Police Chowky) operates 24 hours a day, 7 days a week. We accept both emergency routine and stat diagnostic samples round-the-clock.",
  },
  {
    q: "How does the Home Sample Collection service work?",
    a: "You can book home collection via WhatsApp, our website booking form, or by calling 072763 43407. Our trained phlebotomist visits your doorstep at your preferred time slot with sterile vacuum tubes and cold-chain sample kits. Samples are immediately transported to our lab for processing.",
  },
  {
    q: "How will I receive my diagnostic test reports?",
    a: "We deliver verified, secure digital reports as PDF documents directly on your WhatsApp and email as soon as testing is verified. You can also collect physical printed reports anytime from our Jijamata Chowk laboratory.",
  },
  {
    q: "Do I need to fast before my blood tests?",
    a: "Fasting depends on the specific tests. Tests like Fasting Blood Sugar, Lipid Profile, and Liver/Kidney tests require 8 to 12 hours of overnight fasting (drinking plain water is allowed). Routine tests like CBC, Dengue, Thyroid, and Urine routine do not require fasting.",
  },
  {
    q: "Which areas in Pune are covered for home sample collection?",
    a: "We actively cover Ambegaon Pathar, Ambegaon Budruk, Katraj, Narhe, Dhankawadi, Bharati Vidyapeeth Campus area, Vadgaon Budruk, and neighboring areas in Pune.",
  },
  {
    q: "Can I bring a prescription from any doctor or hospital?",
    a: "Yes. We accept prescriptions and test requisitions from all general practitioners, specialists, clinics, and hospitals across Pune. You can also book preventive wellness packages independently.",
  },
];
