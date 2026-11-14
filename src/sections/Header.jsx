import { useEffect, useState } from "react";
import { Menu, X, Phone, Clock, Mail, ArrowRight } from "lucide-react";
import { NAV_LINKS } from "../data/content";
import { SITE, whatsappLink } from "../data/site";
import { Logo, WhatsAppIcon } from "../components/ui";

function useActiveSection(ids) {
  const [active, setActive] = useState("");
  useEffect(() => {
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean);
    if (!els.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ids]);
  return active;
}

const SECTION_IDS = ["top", ...NAV_LINKS.map((l) => l.href.slice(1))];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const active = useActiveSection(SECTION_IDS);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const solid = scrolled || open;

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* Utility bar */}
      <div
        className={`hidden overflow-hidden bg-forest-deep text-pale transition-all duration-300 md:block ${
          scrolled ? "max-h-0" : "max-h-10"
        }`}
      >
        <div className="mx-auto flex h-10 max-w-7xl items-center justify-between px-5 text-xs sm:px-8">
          <p className="flex items-center gap-2">
            <Clock size={13} className="text-glow" />
            {SITE.hoursShort} · <span className="text-white">Claims line open 24/7</span>
          </p>
          <div className="flex items-center gap-6">
            <a href={`mailto:${SITE.email}`} className="flex items-center gap-1.5 hover:text-white">
              <Mail size={13} className="text-glow" /> {SITE.email}
            </a>
            <a
              href={whatsappLink("Hello Malmitch, I'd like some help with insurance.")}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-white"
            >
              <WhatsAppIcon size={13} className="text-glow" /> Chat on WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* Main bar */}
      <div
        className={`border-b transition-colors duration-300 ${
          solid
            ? "border-line bg-white/95 shadow-[0_8px_30px_-20px_rgba(8,42,32,0.35)] backdrop-blur-md"
            : "border-white/10 bg-forest-deep/40 backdrop-blur-sm"
        }`}
      >
        <nav
          aria-label="Main"
          className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8 md:h-[4.5rem]"
        >
          <a href="#top" aria-label="Malmitch Insurance Agency — home" className="rounded-md">
            <Logo onDark={!solid} />
          </a>

          <ul className="hidden items-center gap-1 lg:flex">
            {NAV_LINKS.map((link) => {
              const isActive = active === link.href.slice(1);
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    aria-current={isActive ? "true" : undefined}
                    className={`rounded-full px-3.5 py-2 text-sm font-medium transition-colors ${
                      solid
                        ? isActive
                          ? "bg-sage text-forest"
                          : "text-body hover:bg-mist hover:text-forest"
                        : isActive
                        ? "bg-white/10 text-white"
                        : "text-white/80 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    {link.label}
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="hidden items-center gap-3 lg:flex">
            <a
              href={SITE.phoneHref}
              className={`flex items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold transition-colors ${
                solid ? "text-forest hover:bg-mist" : "text-white hover:bg-white/10"
              }`}
            >
              <Phone size={15} className={solid ? "text-mint" : "text-glow"} />
              {SITE.phoneDisplay}
            </a>
            <a href="#contact" className={`${solid ? "btn-primary" : "btn-glow"} !py-2.5`}>
              Get a quote <ArrowRight size={15} />
            </a>
          </div>

          <button
            type="button"
            className={`rounded-full p-2 lg:hidden ${solid ? "text-forest" : "text-white"}`}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={26} /> : <Menu size={26} />}
          </button>
        </nav>
      </div>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className={`fixed inset-x-0 bottom-0 top-16 overflow-y-auto bg-white transition-all duration-300 lg:hidden ${
          open ? "visible opacity-100" : "invisible -translate-y-2 opacity-0"
        }`}
      >
        <ul className="flex flex-col px-5 pt-4">
          {NAV_LINKS.map((link) => (
            <li key={link.href} className="border-b border-line">
              <a
                href={link.href}
                onClick={() => setOpen(false)}
                className="flex items-center justify-between py-4 font-display text-2xl text-forest"
              >
                {link.label}
                <ArrowRight size={18} className="text-mint" />
              </a>
            </li>
          ))}
        </ul>
        <div className="grid gap-3 px-5 py-6">
          <a href="#contact" onClick={() => setOpen(false)} className="btn-primary">
            Get a free quote <ArrowRight size={16} />
          </a>
          <div className="grid grid-cols-2 gap-3">
            <a href={SITE.phoneHref} className="btn-outline">
              <Phone size={16} /> Call
            </a>
            <a
              href={whatsappLink("Hello Malmitch, I'd like some help with insurance.")}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline"
            >
              <WhatsAppIcon size={16} className="text-whatsapp" /> WhatsApp
            </a>
          </div>
          <p className="pt-2 text-center text-xs text-muted">{SITE.hoursShort}</p>
        </div>
      </div>
    </header>
  );
}
