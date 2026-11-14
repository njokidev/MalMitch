import { useEffect, useRef } from "react";
import {
  ArrowRight,
  BadgeCheck,
  CheckCircle2,
  Clock,
  Languages,
  MapPin,
  Phone,
  ShieldCheck,
  Smartphone,
  UserRound,
} from "lucide-react";
import { SERVICES } from "../data/content";
import { SITE } from "../data/site";
import { Reveal } from "../components/ui";

const TRUST = [
  { icon: ShieldCheck, text: "Licensed by the IRA" },
  { icon: Smartphone, text: "Pay by M-PESA" },
  { icon: Clock, text: "72-hour claim promise" },
  { icon: MapPin, text: "30+ counties covered" },
  { icon: Languages, text: "Kiswahili & English" },
  { icon: Phone, text: "24/7 claims line" },
];

function HeroVideo() {
  const ref = useRef(null);
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      v.pause();
      v.removeAttribute("autoplay");
    }
  }, []);
  return (
    <video
      ref={ref}
      className="h-full w-full object-cover object-[58%_60%]"
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      poster="/images/handshake-poster.webp"
      aria-hidden="true"
    >
      <source src="/videos/handshake.mp4" type="video/mp4" />
    </video>
  );
}

export default function Hero({ onPickCover }) {
  return (
    <section
      id="top"
      className="weave relative overflow-hidden bg-forest-deep pt-28 text-white md:pt-40"
    >
      {/* glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 -top-40 h-[38rem] w-[38rem] rounded-full bg-mint/30 blur-[120px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-60 -left-40 h-[30rem] w-[30rem] rounded-full bg-glow/10 blur-[120px]"
      />

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 pb-16 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:pb-24">
        <div>
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-glow">
              <BadgeCheck size={14} />
              IRA-licensed agency · Est. {SITE.founded}
            </span>
          </Reveal>

          <Reveal delay={80}>
            <h1 className="mt-6 text-balance font-display text-[2.6rem] leading-[1.02] font-medium tracking-tight sm:text-6xl lg:text-[4.4rem]">
              Insurance that moves the way{" "}
              <em className="font-normal text-glow">Nairobi</em> moves.
            </h1>
          </Reveal>

          <Reveal delay={160}>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-pale md:text-lg">
              Licensed Kenyan cover for your car, health, home and business — with one named
              agent who picks up the phone, compares insurers for you and stays with you until
              your claim is paid.
            </p>
          </Reveal>

          <Reveal delay={240}>
            <div className="mt-9">
              <p className="text-sm font-medium text-white/70">What would you like to cover?</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {SERVICES.map((s) => {
                  const Icon = s.icon;
                  return (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => onPickCover(s.id)}
                      className="group inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-4 py-2.5 text-sm font-medium text-white transition hover:-translate-y-0.5 hover:border-glow hover:bg-glow hover:text-forest-deep"
                    >
                      <Icon size={16} className="text-glow transition group-hover:text-forest-deep" />
                      {s.title}
                    </button>
                  );
                })}
              </div>
            </div>
          </Reveal>

          <Reveal delay={320}>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href="#contact" className="btn-glow">
                Get a free quote <ArrowRight size={16} />
              </a>
              <a href={SITE.phoneHref} className="btn-ghost-light">
                <Phone size={16} /> Talk to an agent · {SITE.phoneDisplay}
              </a>
            </div>
          </Reveal>
        </div>

        {/* Visual */}
        <Reveal delay={200} className="relative mx-auto w-full max-w-lg lg:max-w-none">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-white/10 bg-forest shadow-[0_40px_80px_-30px_rgba(0,0,0,0.6)] sm:aspect-[5/5] lg:aspect-[4/5]">
            <HeroVideo />
            <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/85 via-forest-deep/10 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
              <p className="font-display text-2xl leading-snug text-white sm:text-[1.7rem]">
                “Every policy starts with a conversation — and ends with a handshake.”
              </p>
            </div>
          </div>

          {/* floating: claim paid */}
          <div className="absolute -left-3 top-8 w-64 animate-float rounded-2xl bg-white p-4 text-ink shadow-2xl sm:-left-10">
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-sage text-mint">
                <CheckCircle2 size={20} />
              </span>
              <div>
                <p className="text-sm font-semibold text-forest">Claim approved</p>
                <p className="text-xs text-muted">Paid to M-PESA within 72 hrs</p>
              </div>
            </div>
          </div>

          {/* floating: named agent */}
          <div
            className="absolute -right-2 top-[42%] hidden w-56 animate-float rounded-2xl border border-white/10 bg-forest-2/95 p-4 shadow-2xl backdrop-blur sm:block sm:-right-8"
            style={{ animationDelay: "1.5s" }}
          >
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-glow text-forest-deep">
                <UserRound size={20} />
              </span>
              <div>
                <p className="text-sm font-semibold text-white">Your named agent</p>
                <p className="text-xs text-pale">One person, start to finish</p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>

      {/* Trust marquee */}
      <div className="relative border-t border-white/10 bg-forest-deep/60 py-4">
        <div className="group flex overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)]">
          <ul className="flex shrink-0 animate-marquee items-center gap-12 pr-12 motion-reduce:animate-none">
            {[...TRUST, ...TRUST].map(({ icon: Icon, text }, i) => (
              <li
                key={i}
                aria-hidden={i >= TRUST.length ? "true" : undefined}
                className="flex shrink-0 items-center gap-2 text-sm font-medium whitespace-nowrap text-pale"
              >
                <Icon size={16} className="text-glow" />
                {text}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
