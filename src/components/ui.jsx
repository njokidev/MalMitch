import { useEffect, useState } from "react";
import { useInView } from "./useInView";

/* Fade-and-rise on scroll */
export function Reveal({ children, delay = 0, className = "", as: Tag = "div" }) {
  const [ref, inView] = useInView();
  return (
    <Tag
      ref={ref}
      className={`reveal ${inView ? "is-visible" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}

/* Count-up number */
export function Counter({ end, suffix = "", duration = 1600 }) {
  const [ref, inView] = useInView({ threshold: 0.4 });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    const total = reduce ? 0 : duration;
    let frame;
    const start = performance.now();
    const tick = (now) => {
      const p = total ? Math.min((now - start) / total, 1) : 1;
      setValue(Math.round((1 - Math.pow(1 - p, 3)) * end));
      if (p < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, end, duration]);

  return (
    <span ref={ref} aria-label={`${end.toLocaleString()}${suffix}`}>
      <span aria-hidden="true">
        {value.toLocaleString()}
        {suffix}
      </span>
    </span>
  );
}

/* Shield logo with woven stripes */
export function LogoMark({ size = 36, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M24 3 L42 10 V22 C42 33 34.5 41 24 45 C13.5 41 6 33 6 22 V10 Z"
        fill="#0E3B2E"
        stroke="#2F9468"
        strokeWidth="1.5"
      />
      <path d="M13 16 L20 34" stroke="#FFFFFF" strokeWidth="2.6" strokeLinecap="round" />
      <path d="M20 14 L27 32" stroke="#5FBE8F" strokeWidth="2.6" strokeLinecap="round" />
      <path d="M27 16 L34 30" stroke="#FFFFFF" strokeWidth="2.6" strokeLinecap="round" />
    </svg>
  );
}

export function Logo({ onDark = false }) {
  return (
    <span className="flex items-center gap-2.5">
      <LogoMark size={34} />
      <span className="flex flex-col leading-none">
        <span
          className={`font-display text-xl font-semibold tracking-tight ${
            onDark ? "text-white" : "text-forest"
          }`}
        >
          Malmitch
        </span>
        <span
          className={`mt-1 text-[0.62rem] font-semibold uppercase tracking-[0.24em] ${
            onDark ? "text-glow" : "text-mint"
          }`}
        >
          Insurance Agency
        </span>
      </span>
    </span>
  );
}

export function SectionHeading({ eyebrow, title, intro, align = "center", dark = false }) {
  const centered = align === "center";
  return (
    <div className={centered ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <Reveal>
        <span className={`eyebrow ${dark ? "text-glow" : ""}`}>{eyebrow}</span>
      </Reveal>
      <Reveal delay={80}>
        <h2 className={`h-section mt-4 ${dark ? "text-white" : ""}`}>{title}</h2>
      </Reveal>
      {intro && (
        <Reveal delay={160}>
          <p
            className={`mt-5 text-base leading-relaxed md:text-lg ${
              dark ? "text-pale" : "text-muted"
            }`}
          >
            {intro}
          </p>
        </Reveal>
      )}
    </div>
  );
}

/* WhatsApp glyph (lucide has no brand icons) */
export function WhatsAppIcon({ size = 20, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.64.07-.3-.15-1.26-.46-2.39-1.48-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.88 1.21 3.08.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35M12.05 21.5h-.01a9.4 9.4 0 0 1-4.8-1.32l-.34-.2-3.57.94.95-3.48-.22-.36a9.4 9.4 0 0 1-1.44-5.02c0-5.2 4.23-9.43 9.44-9.43 2.52 0 4.89.98 6.67 2.77a9.37 9.37 0 0 1 2.76 6.67c0 5.2-4.24 9.43-9.44 9.43m8.03-17.46A11.27 11.27 0 0 0 12.05.72C5.8.72.7 5.8.7 12.07c0 2 .52 3.95 1.52 5.67L.6 23.6l6-1.57a11.3 11.3 0 0 0 5.43 1.38h.01c6.26 0 11.35-5.09 11.35-11.35 0-3.03-1.18-5.88-3.32-8.02" />
    </svg>
  );
}
