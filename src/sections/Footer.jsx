import { ArrowRight, ArrowUp, Phone } from "lucide-react";
import { FaFacebook, FaInstagram, FaLinkedin, FaXTwitter } from "react-icons/fa6";
import { NAV_LINKS, SERVICES } from "../data/content";
import { SITE, whatsappLink } from "../data/site";
import { Logo, Reveal, WhatsAppIcon } from "../components/ui";

const SOCIAL_ICONS = [
  ["facebook", FaFacebook, "Facebook"],
  ["instagram", FaInstagram, "Instagram"],
  ["linkedin", FaLinkedin, "LinkedIn"],
  ["x", FaXTwitter, "X (Twitter)"],
];

export function CtaBand() {
  return (
    <section className="bg-white px-5 pb-20 sm:px-8 md:pb-28">
      <Reveal>
        <div className="weave relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-forest px-7 py-12 sm:px-12 md:py-16">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-32 -right-24 h-80 w-80 rounded-full bg-glow/20 blur-[90px]"
          />
          <div className="relative flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
            <div>
              <h2 className="max-w-xl font-display text-3xl leading-tight font-medium text-white sm:text-4xl">
                Ready to protect what matters? <em className="text-glow">Karibu.</em>
              </h2>
              <p className="mt-3 max-w-lg text-pale">
                Speak to an agent today — no call centres, just a straight answer.
              </p>
            </div>
            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              <a href="#contact" className="btn-glow">
                Get a free quote <ArrowRight size={16} />
              </a>
              <a href={SITE.phoneHref} className="btn-ghost-light">
                <Phone size={16} /> {SITE.phoneDisplay}
              </a>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

export default function Footer() {
  const socials = SOCIAL_ICONS.filter(([key]) => SITE.social[key]);
  return (
    <footer className="bg-forest-deep px-5 pt-16 pb-28 text-pale sm:px-8 lg:pb-10">
      <div className="mx-auto grid max-w-7xl gap-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
        <div>
          <Logo onDark />
          <p className="mt-5 max-w-xs text-sm leading-relaxed">
            Independent insurance advice for Kenyan families and businesses since {SITE.founded}.
            Licensed by the Insurance Regulatory Authority.
          </p>
          {socials.length > 0 && (
            <div className="mt-6 flex gap-2">
              {socials.map(([key, Icon, label]) => (
                <a
                  key={key}
                  href={SITE.social[key]}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Malmitch on ${label}`}
                  className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-white transition hover:border-glow hover:text-glow"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          )}
        </div>

        <nav aria-label="Cover">
          <h2 className="text-xs font-semibold tracking-[0.18em] text-glow uppercase">Cover</h2>
          <ul className="mt-5 space-y-3 text-sm">
            {SERVICES.map((s) => (
              <li key={s.id}>
                <a href="#cover" className="transition hover:text-white">
                  {s.longTitle}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Company">
          <h2 className="text-xs font-semibold tracking-[0.18em] text-glow uppercase">Company</h2>
          <ul className="mt-5 space-y-3 text-sm">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="transition hover:text-white">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="text-xs font-semibold tracking-[0.18em] text-glow uppercase">Visit or call</h2>
          <address className="mt-5 space-y-3 text-sm not-italic">
            <p>
              {SITE.address.line1}
              <br />
              {SITE.address.line2}
            </p>
            <p>
              <a href={SITE.phoneHref} className="text-white hover:text-glow">
                {SITE.phoneDisplay}
              </a>
            </p>
            <p>
              <a href={`mailto:${SITE.email}`} className="hover:text-white">
                {SITE.email}
              </a>
            </p>
            <p>{SITE.hoursShort}</p>
          </address>
        </div>
      </div>

      <div className="mx-auto mt-14 flex max-w-7xl flex-col items-start justify-between gap-4 border-t border-white/10 pt-6 text-xs sm:flex-row sm:items-center">
        <p>
          © {new Date().getFullYear()} {SITE.name}. Regulated by the Insurance Regulatory Authority
          (IRA), Kenya.
        </p>
        <a href="#top" className="inline-flex items-center gap-1.5 font-semibold text-white hover:text-glow">
          Back to top <ArrowUp size={14} />
        </a>
      </div>
    </footer>
  );
}

/* Floating WhatsApp (desktop) + sticky action bar (mobile) */
export function QuickActions() {
  const msg = whatsappLink("Hello Malmitch, I'd like some help with insurance.");
  return (
    <>
      <a
        href={msg}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Malmitch on WhatsApp"
        className="group fixed right-6 bottom-6 z-40 hidden items-center gap-0 rounded-full bg-whatsapp p-4 text-white shadow-[0_14px_30px_-10px_rgba(37,211,102,0.7)] transition-all hover:gap-2 hover:pr-5 lg:flex"
      >
        <WhatsAppIcon size={26} />
        <span className="max-w-0 overflow-hidden text-sm font-semibold whitespace-nowrap transition-all duration-300 group-hover:max-w-40">
          Chat with an agent
        </span>
      </a>

      <nav
        aria-label="Quick actions"
        className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-3 border-t border-line bg-white/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-md lg:hidden"
      >
        <a href={SITE.phoneHref} className="flex flex-col items-center gap-1 py-2.5 text-xs font-semibold text-forest">
          <Phone size={20} className="text-mint" /> Call
        </a>
        <a
          href={msg}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center gap-1 py-2.5 text-xs font-semibold text-forest"
        >
          <WhatsAppIcon size={20} className="text-[#128c4a]" /> WhatsApp
        </a>
        <a
          href="#contact"
          className="m-1.5 flex flex-col items-center justify-center gap-1 rounded-xl bg-forest py-1.5 text-xs font-semibold text-white"
        >
          <ArrowRight size={18} className="text-glow" /> Free quote
        </a>
      </nav>
    </>
  );
}
