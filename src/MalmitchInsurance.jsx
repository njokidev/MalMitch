import React, { useEffect, useRef, useState } from "react";
import {
  Menu,
  X,
  Phone,
  Mail,
  MapPin,
  Clock,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Car,
  HeartPulse,
  Shield,
  Home,
  Briefcase,
  PlaneTakeoff,
  Star,
  Users,
  Award,
  ChevronRight,
  ChevronDown,
  Send,
  Quote,
  FileText,
  PhoneCall,
  Wallet,
  BadgeCheck,
  ShieldCheck,
  Smartphone,
} from "lucide-react";

import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaXTwitter,
} from "react-icons/fa6";

/* ---------------------------------------------------------------
   Design tokens (Malmitch Insurance Agency)
   White base, green-only palette, restrained.

   Paper        #FFFFFF   page background
   Mist         #F6FAF8   alternating section tint
   Sage Tint    #EAF3EE   card / soft surface
   Sage Border  #D6E7DD   hairlines, dividers
   Forest       #0E3B2E   primary text-on-light, headings, nav
   Forest Deep  #082A20   deepest shade / footer
   Mint         #1F7A54   links, icons, secondary actions
   Mint Bright  #2F9468   hover state
   Ink          #16231D   body copy
   Muted        #5C6E64   secondary copy
------------------------------------------------------------------*/

const NAV_LINKS = [
  { href: "#about", label: "About" },
  { href: "#services", label: "Cover" },
  { href: "#claims", label: "Claims" },
  { href: "#why-us", label: "Why Us" },
  { href: "#testimonials", label: "Reviews" },
  { href: "#faq", label: "FAQ" },
];

const SERVICES = [
  {
    icon: Car,
    title: "Motor Insurance",
    desc: "Comprehensive and third-party cover for private cars, boda bodas and PSV matatus, backed by a repair network across Nairobi and beyond.",
    points: ["24-hour towing & recovery", "Excess protector add-on"],
  },
  {
    icon: HeartPulse,
    title: "Health & Medical",
    desc: "Inpatient and outpatient plans that top up your SHA cover, with cashless admission at partner hospitals countrywide.",
    points: ["Cashless admission network", "Maternity & dental options"],
  },
  {
    icon: Shield,
    title: "Life & Education",
    desc: "Life cover and education endowment plans that keep your family's income and your children's school fees secure.",
    points: ["Guaranteed payout terms", "School fees protection rider"],
  },
  {
    icon: Home,
    title: "Property & Home",
    desc: "Fire, burglary and all-risk cover for your house, rental units or business premises, in any of Kenya's 47 counties.",
    points: ["Landlord & tenant options", "Domestic worker cover included"],
  },
  {
    icon: Briefcase,
    title: "Business & SME",
    desc: "Tailored cover for shops, salons, transport SACCOs and growing SMEs, including staff medical and WIBA compliance.",
    points: ["WIBA-compliant staff cover", "Stock & equipment protection"],
  },
  {
    icon: PlaneTakeoff,
    title: "Travel Insurance",
    desc: "Short and long-stay travel cover for study, business or safari, with 24-hour emergency assistance on the road.",
    points: ["Visa-compliant certificates", "Emergency evacuation cover"],
  },
];

const STATS = [
  { icon: Award, end: 12, suffix: "+", label: "Years guiding Kenyan families" },
  { icon: Clock, end: 91, suffix: "%", label: "Claims settled within 72 hours" },
  { icon: MapPin, end: 30, suffix: "+", label: "Counties with active cover" },
  { icon: Users, end: 8400, suffix: "+", label: "Policyholders on our books" },
];

const CLAIMS_STEPS = [
  {
    icon: PhoneCall,
    title: "Report the incident",
    desc: "Call your named agent or our claims line. We open your file the same day, no forms to chase first.",
  },
  {
    icon: FileText,
    title: "Send your documents",
    desc: "Photos, a police abstract if needed, and your policy number — submitted over WhatsApp or email.",
  },
  {
    icon: ShieldCheck,
    title: "Assessment",
    desc: "An assessor is assigned within 24 hours. For motor claims, this usually means a garage visit.",
  },
  {
    icon: Wallet,
    title: "Payout",
    desc: "Approved claims are settled by M-PESA or bank transfer — 91% within 72 hours of approval.",
  },
];

const TESTIMONIALS = [
  {
    name: "Wanjiru Kamau",
    place: "Motor cover · Nairobi",
    quote:
      "My car was rear-ended on Thika Road on a Friday evening. My agent picked up, and the assessor was at the garage by Monday morning. No back and forth.",
    avatar: "https://i.pravatar.cc/150?img=32",
  },
  {
    name: "Otieno Ochieng",
    place: "Business cover · Kisumu",
    quote:
      "Malmitch set up WIBA and medical cover for my hardware staff in one afternoon. Renewal reminders come by SMS, and I pay straight from M-PESA.",
    avatar: "https://i.pravatar.cc/150?img=47",
  },
  {
    name: "Amina Hassan",
    place: "Health & Life cover · Mombasa",
    quote:
      "I finally understood what my cover actually pays for. They walked me through it in Kiswahili, no jargon, and the family plan fit our budget.",
    avatar: "https://i.pravatar.cc/150?img=5",
  },
];

const FAQS = [
  {
    q: "Is Malmitch itself an insurer?",
    a: "No — Malmitch is a licensed insurance agency. We place your cover with underwriters registered by the Insurance Regulatory Authority (IRA) and manage the relationship on your behalf, including renewals and claims.",
  },
  {
    q: "Does health cover work alongside my SHA contributions?",
    a: "Yes. Our health plans are designed as a top-up to the Social Health Authority (SHA), covering gaps like private inpatient rooms, specialist outpatient visits and services SHA doesn't fully reimburse.",
  },
  {
    q: "How do I pay my premium?",
    a: "By M-PESA Paybill, bank transfer, or a standing order for monthly premiums. You'll get an SMS receipt and a renewal reminder before every due date — no surprise lapses.",
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

/* ---------------------------------------------------------------
   Reveal-on-scroll wrapper
------------------------------------------------------------------*/
function Reveal({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal ${visible ? "reveal-visible" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

/* ---------------------------------------------------------------
   Animated stat counter
------------------------------------------------------------------*/
function Counter({ end, suffix = "", duration = 1500 }) {
  const ref = useRef(null);
  const [count, setCount] = useState(0);
  const startedRef = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !startedRef.current) {
          startedRef.current = true;
          const start = performance.now();
          const tick = (now) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * end));
            if (progress < 1) requestAnimationFrame(tick);
            else setCount(end);
          };
          requestAnimationFrame(tick);
          observer.unobserve(el);
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [end, duration]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

/* ---------------------------------------------------------------
   Logo mark — shield with a woven stripe motif
------------------------------------------------------------------*/
function LogoMark({ size = 40, onDark = false }) {
  const line1 = onDark ? "#F6FAF8" : "#FFFFFF";
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <path
        d="M24 3 L42 10 V22 C42 33 34.5 41 24 45 C13.5 41 6 33 6 22 V10 Z"
        fill="#0E3B2E"
        stroke="#1F7A54"
        strokeWidth="1.5"
      />
      <path d="M13 16 L20 34" stroke={line1} strokeWidth="2.4" strokeLinecap="round" />
      <path d="M20 14 L27 32" stroke="#2F9468" strokeWidth="2.4" strokeLinecap="round" />
      <path d="M27 16 L34 30" stroke={line1} strokeWidth="2.4" strokeLinecap="round" />
    </svg>
  );
}

/* ---------------------------------------------------------------
   FAQ accordion item
------------------------------------------------------------------*/
function FaqItem({ faq, isOpen, onToggle }) {
  return (
    <div
      className="border-b"
      style={{ borderColor: "#D6E7DD" }}
    >
      <button
        onClick={onToggle}
        className="focus-ring w-full flex items-center justify-between gap-4 py-5 text-left rounded-md"
        aria-expanded={isOpen}
      >
        <span className="font-display text-base sm:text-lg font-medium" style={{ color: "#0E3B2E" }}>
          {faq.q}
        </span>
        <ChevronDown
          size={20}
          style={{
            color: "#1F7A54",
            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 250ms ease",
            flexShrink: 0,
          }}
        />
      </button>
      <div
        className="overflow-hidden transition-all duration-300"
        style={{ maxHeight: isOpen ? "220px" : "0px" }}
      >
        <p className="pb-5 pr-8 text-sm leading-relaxed" style={{ color: "#5C6E64" }}>
          {faq.a}
        </p>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------
   Main App
------------------------------------------------------------------*/
export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);
  const [formState, setFormState] = useState({
    name: "",
    phone: "",
    email: "",
    interest: "Motor Insurance",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleChange = (e) => {
    setFormState((s) => ({ ...s, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div style={{ fontFamily: "'Inter', ui-sans-serif, system-ui", color: "#16231D", backgroundColor: "#FFFFFF" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600;700;800&display=swap');

        html { scroll-behavior: smooth; }
        .font-display { font-family: 'Fraunces', ui-serif, Georgia, serif; }

        .reveal {
          opacity: 0;
          transform: translateY(28px);
          transition: opacity 700ms cubic-bezier(0.16,1,0.3,1), transform 700ms cubic-bezier(0.16,1,0.3,1);
        }
        .reveal-visible { opacity: 1; transform: translateY(0); }

        .weave-bg {
          background-image: repeating-linear-gradient(115deg, rgba(31,122,84,0.05) 0px, rgba(31,122,84,0.05) 2px, transparent 2px, transparent 44px);
        }

        .service-card { transition: transform 300ms ease, box-shadow 300ms ease, border-color 300ms ease; }
        .service-card:hover { transform: translateY(-6px); border-color: #1F7A54; box-shadow: 0 24px 44px -24px rgba(14,59,46,0.28); }

        .btn-primary { transition: transform 200ms ease, box-shadow 200ms ease, background-color 200ms ease; }
        .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 14px 26px -12px rgba(14,59,46,0.4); background-color: #123F30; }

        .btn-outline { transition: background-color 200ms ease, color 200ms ease, transform 200ms ease, border-color 200ms ease; }
        .btn-outline:hover { transform: translateY(-2px); border-color: #1F7A54; color: #1F7A54; }

        .nav-link { position: relative; }
        .nav-link::after {
          content: ""; position: absolute; left: 0; right: 0; bottom: -4px; height: 2px;
          background-color: #1F7A54; transform: scaleX(0); transform-origin: left; transition: transform 250ms ease;
        }
        .nav-link:hover::after { transform: scaleX(1); }

        .step-card { transition: transform 300ms ease, box-shadow 300ms ease; }
        .step-card:hover { transform: translateY(-4px); box-shadow: 0 20px 36px -22px rgba(14,59,46,0.22); }

        .focus-ring:focus-visible { outline: 2px solid #1F7A54; outline-offset: 3px; }

        @media (prefers-reduced-motion: reduce) {
          .reveal { opacity: 1 !important; transform: none !important; transition: none !important; }
          .service-card:hover, .btn-primary:hover, .btn-outline:hover, .step-card:hover { transform: none !important; }
        }
      `}</style>

      {/* Skip link */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:bg-white focus:text-[#0E3B2E] focus:px-4 focus:py-2 focus:rounded-md focus:font-semibold"
      >
        Skip to main content
      </a>

      {/* ---------------- NAV ---------------- */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "shadow-sm" : ""}`}
        style={{
          backgroundColor: "rgba(255,255,255,0.92)",
          backdropFilter: "blur(10px)",
          borderBottom: scrolled ? "1px solid #D6E7DD" : "1px solid transparent",
        }}
      >
        <nav className="max-w-7xl mx-auto px-5 sm:px-8 flex items-center justify-between h-16 md:h-20">
          <a href="#top" className="flex items-center gap-2.5 focus-ring rounded-md">
            <LogoMark size={34} />
            <span className="font-display text-lg md:text-xl font-semibold tracking-tight" style={{ color: "#0E3B2E" }}>
              Malmitch <span style={{ color: "#1F7A54" }}>Insurance</span>
            </span>
          </a>

          <ul className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="nav-link focus-ring rounded-md text-sm font-medium tracking-wide"
                  style={{ color: "#2C3B34" }}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="hidden lg:flex items-center gap-4">
            <a
              href="tel:+254700123456"
              className="flex items-center gap-2 text-sm font-medium focus-ring rounded-md"
              style={{ color: "#0E3B2E" }}
            >
              <Phone size={16} style={{ color: "#1F7A54" }} />
              0700 123 456
            </a>
            <a
              href="#contact"
              className="btn-primary focus-ring rounded-full px-5 py-2.5 text-sm font-semibold"
              style={{ backgroundColor: "#0E3B2E", color: "#FFFFFF" }}
            >
              Get a Quote
            </a>
          </div>

          <button
            className="lg:hidden focus-ring rounded-md p-2"
            style={{ color: "#0E3B2E" }}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            {menuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </nav>

        {/* Mobile menu */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ${menuOpen ? "max-h-96" : "max-h-0"}`}
          style={{ backgroundColor: "#FFFFFF", borderTop: "1px solid #D6E7DD" }}
        >
          <ul className="px-6 py-4 flex flex-col gap-4">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="block text-base font-medium focus-ring rounded-md"
                  style={{ color: "#0E3B2E" }}
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="#contact"
                onClick={() => setMenuOpen(false)}
                className="inline-block rounded-full px-5 py-2.5 text-sm font-semibold"
                style={{ backgroundColor: "#0E3B2E", color: "#FFFFFF" }}
              >
                Get a Quote
              </a>
            </li>
          </ul>
        </div>
      </header>

      <main id="main">
        {/* ---------------- HERO ---------------- */}
        <section
          id="top"
          className="weave-bg relative pt-32 pb-16 md:pt-44 md:pb-24 px-5 sm:px-8"
          style={{ backgroundColor: "#F6FAF8" }}
        >
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Reveal>
                <span
                  className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase px-3 py-1.5 rounded-full"
                  style={{ backgroundColor: "#EAF3EE", color: "#0E3B2E", border: "1px solid #D6E7DD" }}
                >
                  <BadgeCheck size={14} style={{ color: "#1F7A54" }} />
                  Licensed by the IRA · Kenya
                </span>
              </Reveal>
              <Reveal delay={100}>
                <h1
                  className="font-display mt-5 text-4xl sm:text-5xl md:text-6xl font-semibold leading-[1.08] tracking-tight"
                  style={{ color: "#0E3B2E" }}
                >
                  Insurance that moves the way Nairobi moves.
                </h1>
              </Reveal>
              <Reveal delay={200}>
                <p className="mt-6 text-base md:text-lg max-w-xl leading-relaxed" style={{ color: "#3E4C45" }}>
                  Malmitch pairs licensed Kenyan cover with real people who pick up the phone —
                  for your car, your health, your home and your business. No call centres, no
                  guesswork.
                </p>
              </Reveal>
              <Reveal delay={300}>
                <div className="mt-8 flex flex-wrap gap-4">
                  <a
                    href="#contact"
                    className="btn-primary focus-ring rounded-full px-7 py-3.5 text-sm font-semibold inline-flex items-center gap-2"
                    style={{ backgroundColor: "#0E3B2E", color: "#FFFFFF" }}
                  >
                    Get a Free Quote <ArrowRight size={16} />
                  </a>
                  <a
                    href="tel:+254700123456"
                    className="btn-outline focus-ring rounded-full px-7 py-3.5 text-sm font-semibold inline-flex items-center gap-2 border"
                    style={{ borderColor: "#D6E7DD", color: "#0E3B2E", backgroundColor: "#FFFFFF" }}
                  >
                    <Phone size={16} /> Talk to an Agent
                  </a>
                </div>
              </Reveal>

              <Reveal delay={380}>
                <div className="mt-10 grid grid-cols-3 gap-6 max-w-md">
                  <div>
                    <p className="font-display text-2xl font-semibold" style={{ color: "#0E3B2E" }}>12+</p>
                    <p className="text-xs mt-1" style={{ color: "#5C6E64" }}>years in business</p>
                  </div>
                  <div>
                    <p className="font-display text-2xl font-semibold" style={{ color: "#0E3B2E" }}>8,400+</p>
                    <p className="text-xs mt-1" style={{ color: "#5C6E64" }}>policyholders</p>
                  </div>
                  <div>
                    <p className="font-display text-2xl font-semibold" style={{ color: "#0E3B2E" }}>72hr</p>
                    <p className="text-xs mt-1" style={{ color: "#5C6E64" }}>claim promise</p>
                  </div>
                </div>
              </Reveal>
            </div>

            <Reveal delay={200} className="relative">
              <div
                className="rounded-3xl overflow-hidden border shadow-xl"
                style={{ borderColor: "#D6E7DD" }}
              >
                <img
                  src="https://picsum.photos/seed/malmitch-family/900/1000"
                  alt="A family sitting together at home, representative of the households Malmitch covers"
                  width={900}
                  height={1000}
                  loading="eager"
                  decoding="async"
                  className="w-full h-[340px] sm:h-[420px] lg:h-[460px] object-cover"
                />
              </div>
              <div
                className="absolute -bottom-6 -left-6 rounded-2xl px-5 py-4 shadow-lg hidden sm:block"
                style={{ backgroundColor: "#0E3B2E" }}
              >
                <p className="text-xs uppercase tracking-widest font-semibold" style={{ color: "#8FB0A0" }}>
                  Claim promise
                </p>
                <p className="font-display text-2xl font-semibold" style={{ color: "#FFFFFF" }}>
                  72 hours
                </p>
              </div>
            </Reveal>
          </div>

          {/* Trust bar */}
          <Reveal delay={350}>
            <div
              className="max-w-7xl mx-auto mt-14 pt-6 border-t flex flex-wrap gap-x-8 gap-y-3 justify-center text-xs sm:text-sm font-medium tracking-wide"
              style={{ borderColor: "#D6E7DD", color: "#5C6E64" }}
            >
              <span className="inline-flex items-center gap-1.5"><ShieldCheck size={14} style={{ color: "#1F7A54" }} /> Regulated by the IRA</span>
              <span className="hidden sm:inline">·</span>
              <span className="inline-flex items-center gap-1.5"><MapPin size={14} style={{ color: "#1F7A54" }} /> 30+ Counties Covered</span>
              <span className="hidden sm:inline">·</span>
              <span className="inline-flex items-center gap-1.5"><Smartphone size={14} style={{ color: "#1F7A54" }} /> Pay by M-PESA</span>
              <span className="hidden sm:inline">·</span>
              <span className="inline-flex items-center gap-1.5"><Clock size={14} style={{ color: "#1F7A54" }} /> 72-Hour Claim Promise</span>
            </div>
          </Reveal>
        </section>

        {/* ---------------- ABOUT ---------------- */}
        <section id="about" className="scroll-mt-20 px-5 sm:px-8 py-20 md:py-28" style={{ backgroundColor: "#FFFFFF" }}>
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-14 items-center">
            <Reveal>
              <div className="rounded-3xl overflow-hidden shadow-lg border" style={{ borderColor: "#D6E7DD" }}>
                <img
                  src="https://picsum.photos/seed/malmitch-office/1000/1100"
                  alt="Malmitch agents at work in the Nairobi office"
                  width={1000}
                  height={1100}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-[320px] sm:h-[400px] lg:h-[440px] object-cover"
                />
              </div>
            </Reveal>
            <Reveal delay={100}>
              <span className="text-xs font-semibold tracking-[0.2em] uppercase" style={{ color: "#1F7A54" }}>
                About Malmitch
              </span>
              <h2 className="font-display mt-3 text-3xl md:text-4xl font-semibold leading-tight" style={{ color: "#0E3B2E" }}>
                Bima you can actually reach on the phone.
              </h2>
              <p className="mt-5 text-base leading-relaxed" style={{ color: "#3E4C45" }}>
                Malmitch Insurance Agency was built on a simple frustration: too many Kenyans
                only hear from their insurer when a premium is due. We place your cover with
                underwriters registered by the Insurance Regulatory Authority, then stay on
                your file — from the first quote to the last shilling of your claim.
              </p>
              <ul className="mt-6 space-y-3">
                {[
                  "Independent advice across motor, health, life, property, business and travel",
                  "Claims desk that answers in Kiswahili or English",
                  "Premiums payable by M-PESA, bank or standing order",
                  "One named agent assigned to every policyholder",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2 size={20} style={{ color: "#1F7A54" }} className="mt-0.5 shrink-0" />
                    <span className="text-sm sm:text-base" style={{ color: "#3E4C45" }}>
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </section>

        {/* ---------------- SERVICES ---------------- */}
        <section id="services" className="scroll-mt-20 px-5 sm:px-8 py-20 md:py-28" style={{ backgroundColor: "#F6FAF8" }}>
          <div className="max-w-7xl mx-auto">
            <Reveal className="max-w-2xl mx-auto text-center">
              <span className="text-xs font-semibold tracking-[0.2em] uppercase" style={{ color: "#1F7A54" }}>
                Cover We Arrange
              </span>
              <h2 className="font-display mt-3 text-3xl md:text-4xl font-semibold" style={{ color: "#0E3B2E" }}>
                Six ways we protect what you've built
              </h2>
            </Reveal>

            <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {SERVICES.map((service, i) => {
                const Icon = service.icon;
                return (
                  <Reveal key={service.title} delay={i * 80}>
                    <div
                      className="service-card h-full rounded-2xl p-7 border bg-white"
                      style={{ borderColor: "#D6E7DD" }}
                    >
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center"
                        style={{ backgroundColor: "#EAF3EE" }}
                      >
                        <Icon size={22} style={{ color: "#1F7A54" }} />
                      </div>
                      <h3 className="font-display mt-5 text-xl font-semibold" style={{ color: "#0E3B2E" }}>
                        {service.title}
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed" style={{ color: "#5C6E64" }}>
                        {service.desc}
                      </p>
                      <ul className="mt-4 space-y-1.5">
                        {service.points.map((p) => (
                          <li key={p} className="flex items-center gap-2 text-xs font-medium" style={{ color: "#3E4C45" }}>
                            <span className="w-1 h-1 rounded-full shrink-0" style={{ backgroundColor: "#1F7A54" }} />
                            {p}
                          </li>
                        ))}
                      </ul>
                      <a
                        href="#contact"
                        className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold focus-ring rounded-md"
                        style={{ color: "#1F7A54" }}
                      >
                        Get covered <ChevronRight size={15} />
                      </a>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* ---------------- CLAIMS PROCESS ---------------- */}
        <section id="claims" className="scroll-mt-20 px-5 sm:px-8 py-20 md:py-28" style={{ backgroundColor: "#FFFFFF" }}>
          <div className="max-w-7xl mx-auto">
            <Reveal className="max-w-2xl mx-auto text-center">
              <span className="text-xs font-semibold tracking-[0.2em] uppercase" style={{ color: "#1F7A54" }}>
                How Claims Work
              </span>
              <h2 className="font-display mt-3 text-3xl md:text-4xl font-semibold" style={{ color: "#0E3B2E" }}>
                Four steps from incident to payout
              </h2>
              <p className="mt-4 text-base leading-relaxed" style={{ color: "#5C6E64" }}>
                The same process our agents walk every policyholder through — nothing hidden,
                nothing outsourced to a call centre.
              </p>
            </Reveal>

            <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {CLAIMS_STEPS.map((step, i) => {
                const Icon = step.icon;
                return (
                  <Reveal key={step.title} delay={i * 90}>
                    <div className="step-card h-full rounded-2xl p-6 relative" style={{ backgroundColor: "#EAF3EE" }}>
                      <span
                        className="font-display text-4xl font-semibold block"
                        style={{ color: "#C9DDD1" }}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div
                        className="w-11 h-11 -mt-3 rounded-xl flex items-center justify-center bg-white shadow-sm"
                      >
                        <Icon size={20} style={{ color: "#1F7A54" }} />
                      </div>
                      <h3 className="font-display mt-4 text-lg font-semibold" style={{ color: "#0E3B2E" }}>
                        {step.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed" style={{ color: "#3E4C45" }}>
                        {step.desc}
                      </p>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* ---------------- WHY US / STATS ---------------- */}
        <section id="why-us" className="scroll-mt-20 px-5 sm:px-8 py-20 md:py-24" style={{ backgroundColor: "#0E3B2E" }}>
          <div className="max-w-7xl mx-auto">
            <Reveal className="max-w-2xl">
              <span className="text-xs font-semibold tracking-[0.2em] uppercase" style={{ color: "#8FB0A0" }}>
                Why Kenyans Choose Malmitch
              </span>
              <h2 className="font-display mt-3 text-3xl md:text-4xl font-semibold" style={{ color: "#FFFFFF" }}>
                Numbers our policyholders can call and verify
              </h2>
            </Reveal>

            <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-6">
              {STATS.map((stat, i) => {
                const Icon = stat.icon;
                return (
                  <Reveal key={stat.label} delay={i * 90}>
                    <div className="rounded-2xl p-6 h-full" style={{ backgroundColor: "#123F30" }}>
                      <Icon size={22} style={{ color: "#5FBE8F" }} />
                      <p className="font-display mt-4 text-3xl sm:text-4xl font-semibold" style={{ color: "#FFFFFF" }}>
                        <Counter end={stat.end} suffix={stat.suffix} />
                      </p>
                      <p className="mt-2 text-xs sm:text-sm font-medium" style={{ color: "#B9D2C6" }}>
                        {stat.label}
                      </p>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* ---------------- TESTIMONIALS ---------------- */}
        <section id="testimonials" className="scroll-mt-20 px-5 sm:px-8 py-20 md:py-28" style={{ backgroundColor: "#F6FAF8" }}>
          <div className="max-w-7xl mx-auto">
            <Reveal className="max-w-2xl mx-auto text-center">
              <span className="text-xs font-semibold tracking-[0.2em] uppercase" style={{ color: "#1F7A54" }}>
                From Our Policyholders
              </span>
              <h2 className="font-display mt-3 text-3xl md:text-4xl font-semibold" style={{ color: "#0E3B2E" }}>
                Real cover, real people
              </h2>
            </Reveal>

            <div className="mt-14 grid md:grid-cols-3 gap-6">
              {TESTIMONIALS.map((t, i) => (
                <Reveal key={t.name} delay={i * 100}>
                  <div className="h-full rounded-2xl p-7 bg-white border" style={{ borderColor: "#D6E7DD" }}>
                    <Quote size={26} style={{ color: "#1F7A54" }} />
                    <p className="mt-4 text-sm leading-relaxed" style={{ color: "#3E4C45" }}>
                      {t.quote}
                    </p>
                    <div className="mt-6 flex items-center gap-3">
                      <img
                        src={t.avatar}
                        alt={`Portrait of ${t.name}`}
                        width={44}
                        height={44}
                        loading="lazy"
                        className="w-11 h-11 rounded-full object-cover"
                        style={{ border: "2px solid #1F7A54" }}
                      />
                      <div>
                        <p className="text-sm font-semibold" style={{ color: "#0E3B2E" }}>
                          {t.name}
                        </p>
                        <p className="text-xs" style={{ color: "#5C6E64" }}>
                          {t.place}
                        </p>
                      </div>
                    </div>
                    <div className="mt-4 flex gap-1" aria-label="5 out of 5 stars">
                      {Array.from({ length: 5 }).map((_, idx) => (
                        <Star key={idx} size={14} fill="#1F7A54" style={{ color: "#1F7A54" }} />
                      ))}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ---------------- FAQ ---------------- */}
        <section id="faq" className="scroll-mt-20 px-5 sm:px-8 py-20 md:py-28" style={{ backgroundColor: "#FFFFFF" }}>
          <div className="max-w-4xl mx-auto">
            <Reveal className="text-center">
              <span className="text-xs font-semibold tracking-[0.2em] uppercase" style={{ color: "#1F7A54" }}>
                Common Questions
              </span>
              <h2 className="font-display mt-3 text-3xl md:text-4xl font-semibold" style={{ color: "#0E3B2E" }}>
                Before you call, a few answers
              </h2>
            </Reveal>

            <Reveal delay={100}>
              <div className="mt-12">
                {FAQS.map((faq, i) => (
                  <FaqItem
                    key={faq.q}
                    faq={faq}
                    isOpen={openFaq === i}
                    onToggle={() => setOpenFaq(openFaq === i ? -1 : i)}
                  />
                ))}
              </div>
            </Reveal>

            <Reveal delay={150}>
              <p className="mt-8 text-center text-sm" style={{ color: "#5C6E64" }}>
                Still have a question?{" "}
                <a href="#contact" className="font-semibold focus-ring rounded-md inline-flex items-center gap-1" style={{ color: "#1F7A54" }}>
                  Ask an agent <ArrowUpRight size={14} />
                </a>
              </p>
            </Reveal>
          </div>
        </section>

        {/* ---------------- CTA BANNER ---------------- */}
        <section className="px-5 sm:px-8 py-16" style={{ backgroundColor: "#0E3B2E" }}>
          <Reveal className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
            <div>
              <h2 className="font-display text-2xl md:text-3xl font-semibold" style={{ color: "#FFFFFF" }}>
                Ready to protect what matters?
              </h2>
              <p className="mt-2 text-sm md:text-base" style={{ color: "#B9D2C6" }}>
                Speak to an agent today — no call centres, just a straight answer.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <a href="tel:+254700123456" className="font-display text-xl font-semibold" style={{ color: "#FFFFFF" }}>
                0700 123 456
              </a>
              <a
                href="#contact"
                className="btn-outline focus-ring rounded-full px-6 py-3 text-sm font-semibold inline-flex items-center gap-2"
                style={{ backgroundColor: "#FFFFFF", color: "#0E3B2E", border: "1px solid transparent" }}
              >
                Request a Callback <ArrowRight size={16} />
              </a>
            </div>
          </Reveal>
        </section>

        {/* ---------------- CONTACT ---------------- */}
        <section id="contact" className="scroll-mt-20 px-5 sm:px-8 py-20 md:py-28" style={{ backgroundColor: "#F6FAF8" }}>
          <div className="max-w-7xl mx-auto grid lg:grid-cols-5 gap-12">
            <Reveal className="lg:col-span-2">
              <span className="text-xs font-semibold tracking-[0.2em] uppercase" style={{ color: "#1F7A54" }}>
                Get In Touch
              </span>
              <h2 className="font-display mt-3 text-3xl md:text-4xl font-semibold" style={{ color: "#0E3B2E" }}>
                Request your free quote
              </h2>
              <p className="mt-4 text-sm leading-relaxed" style={{ color: "#3E4C45" }}>
                Tell us what you'd like covered and an agent will call you back within one
                business day.
              </p>

              <div className="mt-8 space-y-5">
                <div className="flex items-start gap-3">
                  <Phone size={19} style={{ color: "#1F7A54" }} className="mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold" style={{ color: "#0E3B2E" }}>
                      0700 123 456
                    </p>
                    <p className="text-xs" style={{ color: "#5C6E64" }}>
                      Mon–Sat, 8:00am–6:00pm
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail size={19} style={{ color: "#1F7A54" }} className="mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold" style={{ color: "#0E3B2E" }}>
                      info@malmitch.co.ke
                    </p>
                    <p className="text-xs" style={{ color: "#5C6E64" }}>
                      We reply within one business day
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin size={19} style={{ color: "#1F7A54" }} className="mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold" style={{ color: "#0E3B2E" }}>
                      3rd Floor, Fortune Plaza, Westlands
                    </p>
                    <p className="text-xs" style={{ color: "#5C6E64" }}>
                      Nairobi, Kenya
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex gap-3">
                {[FaFacebook, FaInstagram, FaXTwitter].map((Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    aria-label="Malmitch on social media"
                    className="focus-ring w-10 h-10 rounded-full flex items-center justify-center bg-white border"
                    style={{ borderColor: "#D6E7DD", color: "#0E3B2E" }}
                  >
                    <Icon size={17} />
                  </a>
                ))}
              </div>
            </Reveal>

            <Reveal delay={100} className="lg:col-span-3">
              <div className="rounded-3xl p-7 sm:p-9 shadow-lg bg-white border" style={{ borderColor: "#D6E7DD" }}>
                {submitted ? (
                  <div className="text-center py-14">
                    <CheckCircle2 size={44} style={{ color: "#1F7A54" }} className="mx-auto" />
                    <h3 className="font-display mt-4 text-2xl font-semibold" style={{ color: "#0E3B2E" }}>
                      Asante! Request received.
                    </h3>
                    <p className="mt-2 text-sm" style={{ color: "#5C6E64" }}>
                      An agent will call you back within one business day.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="grid sm:grid-cols-2 gap-5">
                    <div className="sm:col-span-1">
                      <label htmlFor="name" className="block text-xs font-semibold mb-1.5" style={{ color: "#0E3B2E" }}>
                        Full name
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={formState.name}
                        onChange={handleChange}
                        placeholder="Jane Wanjiru"
                        className="focus-ring w-full rounded-lg px-4 py-2.5 text-sm outline-none"
                        style={{ backgroundColor: "#F6FAF8", color: "#16231D", border: "1px solid #D6E7DD" }}
                      />
                    </div>
                    <div className="sm:col-span-1">
                      <label htmlFor="phone" className="block text-xs font-semibold mb-1.5" style={{ color: "#0E3B2E" }}>
                        Phone number
                      </label>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        required
                        value={formState.phone}
                        onChange={handleChange}
                        placeholder="+254 7XX XXX XXX"
                        className="focus-ring w-full rounded-lg px-4 py-2.5 text-sm outline-none"
                        style={{ backgroundColor: "#F6FAF8", color: "#16231D", border: "1px solid #D6E7DD" }}
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label htmlFor="email" className="block text-xs font-semibold mb-1.5" style={{ color: "#0E3B2E" }}>
                        Email address
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formState.email}
                        onChange={handleChange}
                        placeholder="jane@example.com"
                        className="focus-ring w-full rounded-lg px-4 py-2.5 text-sm outline-none"
                        style={{ backgroundColor: "#F6FAF8", color: "#16231D", border: "1px solid #D6E7DD" }}
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label htmlFor="interest" className="block text-xs font-semibold mb-1.5" style={{ color: "#0E3B2E" }}>
                        Cover I'm interested in
                      </label>
                      <select
                        id="interest"
                        name="interest"
                        value={formState.interest}
                        onChange={handleChange}
                        className="focus-ring w-full rounded-lg px-4 py-2.5 text-sm outline-none"
                        style={{ backgroundColor: "#F6FAF8", color: "#16231D", border: "1px solid #D6E7DD" }}
                      >
                        {SERVICES.map((s) => (
                          <option key={s.title} value={s.title}>
                            {s.title}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="sm:col-span-2">
                      <label htmlFor="message" className="block text-xs font-semibold mb-1.5" style={{ color: "#0E3B2E" }}>
                        Message (optional)
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={3}
                        value={formState.message}
                        onChange={handleChange}
                        placeholder="Tell us a bit about what you need covered..."
                        className="focus-ring w-full rounded-lg px-4 py-2.5 text-sm outline-none resize-none"
                        style={{ backgroundColor: "#F6FAF8", color: "#16231D", border: "1px solid #D6E7DD" }}
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <button
                        type="submit"
                        className="btn-primary focus-ring w-full sm:w-auto rounded-full px-8 py-3 text-sm font-semibold inline-flex items-center justify-center gap-2"
                        style={{ backgroundColor: "#0E3B2E", color: "#FFFFFF" }}
                      >
                        Request a Free Quote <Send size={16} />
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      {/* ---------------- FOOTER ---------------- */}
      <footer className="px-5 sm:px-8 pt-16 pb-8" style={{ backgroundColor: "#082A20" }}>
        <div className="max-w-7xl mx-auto grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2.5">
              <LogoMark size={32} onDark />
              <span className="font-display text-lg font-semibold" style={{ color: "#FFFFFF" }}>
                Malmitch
              </span>
            </div>
            <p className="mt-4 text-sm leading-relaxed" style={{ color: "#8FB0A0" }}>
              Independent insurance advice for Kenyan families and businesses, since 2013.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-semibold tracking-[0.15em] uppercase" style={{ color: "#5FBE8F" }}>
              Cover
            </h4>
            <ul className="mt-4 space-y-2.5">
              {SERVICES.map((s) => (
                <li key={s.title}>
                  <a href="#services" className="text-sm focus-ring rounded-md" style={{ color: "#B9D2C6" }}>
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold tracking-[0.15em] uppercase" style={{ color: "#5FBE8F" }}>
              Company
            </h4>
            <ul className="mt-4 space-y-2.5">
              {[
                ["About Us", "#about"],
                ["How Claims Work", "#claims"],
                ["Why Malmitch", "#why-us"],
                ["Client Reviews", "#testimonials"],
                ["FAQ", "#faq"],
                ["Contact", "#contact"],
              ].map(([label, href]) => (
                <li key={label}>
                  <a href={href} className="text-sm focus-ring rounded-md" style={{ color: "#B9D2C6" }}>
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold tracking-[0.15em] uppercase" style={{ color: "#5FBE8F" }}>
              Reach Us
            </h4>
            <ul className="mt-4 space-y-2.5 text-sm" style={{ color: "#B9D2C6" }}>
              <li>3rd Floor, Fortune Plaza, Westlands, Nairobi</li>
              <li>0700 123 456</li>
              <li>info@malmitch.co.ke</li>
            </ul>
          </div>
        </div>

        <div
          className="max-w-7xl mx-auto mt-12 pt-6 border-t flex flex-col sm:flex-row items-center justify-between gap-3 text-xs"
          style={{ borderColor: "rgba(247,244,236,0.1)", color: "#6E9683" }}
        >
          <p>© 2026 Malmitch Insurance Agency. Regulated by the Insurance Regulatory Authority (IRA), Kenya.</p>
          <div className="flex gap-5">
            <a href="#" className="focus-ring rounded-md">Privacy Policy</a>
            <a href="#" className="focus-ring rounded-md">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
}