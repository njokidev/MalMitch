import {
  Car,
  HeartPulse,
  Shield,
  Home,
  Briefcase,
  PlaneTakeoff,
  PhoneCall,
  FileText,
  ShieldCheck,
  Wallet,
  Award,
  Clock,
  MapPin,
  Users,
} from "lucide-react";

export const NAV_LINKS = [
  { href: "#cover", label: "Cover" },
  { href: "#claims", label: "Claims" },
  { href: "#why-us", label: "Why Malmitch" },
  { href: "#reviews", label: "Reviews" },
  { href: "#faq", label: "FAQ" },
  { href: "#contact", label: "Contact" },
];

/* Each cover type also drives the quote wizard: `detail` is the
   cover-specific question asked in step 2. */
export const SERVICES = [
  {
    id: "motor",
    icon: Car,
    title: "Motor",
    longTitle: "Motor Insurance",
    tagline: "Private cars, boda bodas, matatus and fleets.",
    desc: "Comprehensive and third-party cover backed by a repair network across Nairobi and beyond, with an assessor at your garage fast when something happens.",
    forWho: "Private owners, ride-hailing drivers, PSV operators and SACCO fleets.",
    includes: [
      "Comprehensive or third-party only",
      "24-hour towing & recovery",
      "Excess protector & political violence add-ons",
      "Courtesy car option",
      "Windscreen & entertainment system cover",
    ],
    detail: {
      label: "Vehicle make, model & year",
      placeholder: "e.g. Toyota Fielder 2016",
    },
  },
  {
    id: "health",
    icon: HeartPulse,
    title: "Health",
    longTitle: "Health & Medical",
    tagline: "Top up SHA with private inpatient & outpatient care.",
    desc: "Individual and family plans that fill the gaps SHA leaves, with cashless admission at partner hospitals countrywide.",
    forWho: "Individuals, young families, retirees and employers covering staff.",
    includes: [
      "Inpatient with cashless admission",
      "Outpatient & specialist visits",
      "Maternity, dental & optical options",
      "Chronic & pre-existing condition guidance",
      "Last-expense benefit",
    ],
    detail: {
      label: "Who needs cover?",
      placeholder: "e.g. Me, my spouse and 2 children",
    },
  },
  {
    id: "life",
    icon: Shield,
    title: "Life & Education",
    longTitle: "Life & Education",
    tagline: "Protect your family's income and school fees.",
    desc: "Term life, whole life and education endowment plans that keep your family's plans on track — whatever happens.",
    forWho: "Parents, breadwinners and anyone with a loan or dependants.",
    includes: [
      "Term & whole-life cover",
      "Education endowment plans",
      "School-fees protection rider",
      "Critical illness add-on",
      "Mortgage & loan protection",
    ],
    detail: {
      label: "What are you planning for?",
      placeholder: "e.g. University fees for 2 children",
    },
  },
  {
    id: "property",
    icon: Home,
    title: "Home & Property",
    longTitle: "Home & Property",
    tagline: "Your house, rentals and contents — in all 47 counties.",
    desc: "Fire, burglary and all-risk cover for homes, rental units and business premises, with domestic-worker cover built in.",
    forWho: "Homeowners, tenants, landlords and property developers.",
    includes: [
      "Buildings & contents cover",
      "Fire, burglary & theft",
      "All-risks for phones & laptops",
      "Domestic worker (WIBA) cover",
      "Landlord loss-of-rent option",
    ],
    detail: {
      label: "Property type & location",
      placeholder: "e.g. 3-bedroom house in Ruiru",
    },
  },
  {
    id: "business",
    icon: Briefcase,
    title: "Business & SME",
    longTitle: "Business & SME",
    tagline: "Shops, salons, SACCOs and growing companies.",
    desc: "Tailored packages that keep you compliant and trading — from WIBA and staff medical to stock, equipment and liability.",
    forWho: "Sole traders, SMEs, transport SACCOs and corporates.",
    includes: [
      "WIBA & employer's liability",
      "Group staff medical & life",
      "Stock, equipment & money cover",
      "Public & product liability",
      "Goods-in-transit & fidelity guarantee",
    ],
    detail: {
      label: "Type of business & number of staff",
      placeholder: "e.g. Hardware shop, 6 staff",
    },
  },
  {
    id: "travel",
    icon: PlaneTakeoff,
    title: "Travel",
    longTitle: "Travel Insurance",
    tagline: "Study, business or safari — at home and abroad.",
    desc: "Single-trip and annual travel cover with visa-compliant certificates and 24-hour emergency assistance wherever you are.",
    forWho: "Students, business travellers, families and tour groups.",
    includes: [
      "Schengen & visa-compliant certificates",
      "Emergency medical & evacuation",
      "Lost baggage & trip cancellation",
      "Student & annual multi-trip plans",
      "24/7 worldwide assistance line",
    ],
    detail: {
      label: "Destination & travel dates",
      placeholder: "e.g. Germany, 3 – 20 March",
    },
  },
];

export const STATS = [
  { icon: Award, end: 12, suffix: "+", label: "Years guiding Kenyan families" },
  { icon: Clock, end: 91, suffix: "%", label: "Claims paid within 72 hours of approval" },
  { icon: MapPin, end: 30, suffix: "+", label: "Counties with active cover" },
  { icon: Users, end: 8400, suffix: "+", label: "Policyholders on our books" },
];

export const CLAIMS_STEPS = [
  {
    icon: PhoneCall,
    title: "Report it",
    time: "Same day",
    desc: "Call your named agent or the 24-hour claims line. We open your file immediately — no forms to chase first.",
  },
  {
    icon: FileText,
    title: "Send documents",
    time: "Via WhatsApp",
    desc: "Photos, a police abstract if needed, and your policy number. Snap and send — we handle the paperwork.",
  },
  {
    icon: ShieldCheck,
    title: "Assessment",
    time: "Within 24 hrs",
    desc: "An assessor is assigned within a day. For motor claims that usually means a visit to your garage.",
  },
  {
    icon: Wallet,
    title: "Get paid",
    time: "72-hr promise",
    desc: "Approved claims are paid by M-PESA or bank transfer — 91% within 72 hours of approval.",
  },
];

export const COMPARISON = [
  { label: "One named agent who knows your file", us: true, them: false },
  { label: "Quotes compared across several IRA-registered insurers", us: true, them: false },
  { label: "Claims handled for you, start to finish", us: true, them: false },
  { label: "Help in Kiswahili or English", us: true, them: "Sometimes" },
  { label: "Renewal reminders before cover lapses", us: true, them: "Sometimes" },
  { label: "Pay monthly by M-PESA", us: true, them: "Sometimes" },
];

export const TESTIMONIALS = [
  {
    name: "Wanjiru Kamau",
    place: "Motor cover · Nairobi",
    quote:
      "My car was rear-ended on Thika Road on a Friday evening. My agent picked up, and the assessor was at the garage by Monday morning. No back and forth.",
  },
  {
    name: "Otieno Ochieng",
    place: "Business cover · Kisumu",
    quote:
      "Malmitch set up WIBA and medical cover for my hardware staff in one afternoon. Renewal reminders come by SMS, and I pay straight from M‑PESA.",
  },
  {
    name: "Amina Hassan",
    place: "Health & Life cover · Mombasa",
    quote:
      "I finally understood what my cover actually pays for. They walked me through it in Kiswahili, no jargon, and the family plan fit our budget.",
  },
];

export const FAQS = [
  {
    q: "Is Malmitch itself an insurer?",
    a: "No — Malmitch is a licensed insurance agency. We place your cover with underwriters registered by the Insurance Regulatory Authority (IRA) and manage the relationship on your behalf, including renewals and claims.",
  },
  {
    q: "Does it cost more to buy through an agent?",
    a: "No. Our commission is paid by the insurer, so you pay the same premium you would going direct — and you get a named agent, comparison quotes and claims support on top.",
  },
  {
    q: "Does health cover work alongside my SHA contributions?",
    a: "Yes. Our health plans are designed as a top-up to the Social Health Authority (SHA), covering gaps like private inpatient rooms, specialist outpatient visits and services SHA doesn't fully reimburse.",
  },
  {
    q: "How do I pay my premium? Can I pay monthly?",
    a: "By M-PESA Paybill, bank transfer, or standing order. Many policies can be paid in monthly instalments. You'll get an SMS receipt and a reminder before every due date — no surprise lapses.",
  },
  {
    q: "What documents do I need to make a motor claim?",
    a: "Usually photos of the damage, your driving licence, logbook copy, a police abstract (for accidents or theft) and your policy number. Your agent will confirm exactly what your insurer needs — you can send everything over WhatsApp.",
  },
  {
    q: "What happens if my claim is rejected?",
    a: "Your named agent will walk you through the underwriter's reason in plain language and help you appeal or resubmit where there are grounds to. You're never left to interpret a rejection letter alone.",
  },
  {
    q: "Can I get cover outside Nairobi?",
    a: "Yes — we place and service policies in 30+ counties. Claims support and assessors are available countrywide, not just around our Westlands office.",
  },
];
