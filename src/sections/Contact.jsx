import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  Clock,
  Mail,
  MapPin,
  Navigation,
  Phone,
} from "lucide-react";
import { SERVICES } from "../data/content";
import { SITE, mapEmbedSrc, mapLink, whatsappLink } from "../data/site";
import { Reveal, SectionHeading, WhatsAppIcon } from "../components/ui";

const STEPS = ["Cover", "Details", "Your contact"];
const TIMING = ["As soon as possible", "Within the next month", "Just comparing prices"];
const CHANNELS = ["WhatsApp", "Phone call", "Email"];

// Kenyan mobile: 07XX / 01XX / +2547XX / 2541XX
const isKenyanPhone = (v) => /^(?:\+?254|0)(?:7|1)\d{8}$/.test(v.replace(/[\s-]/g, ""));

function buildMessage(cover, f) {
  return [
    `Hello Malmitch, I'd like a quote for *${cover.longTitle}*.`,
    "",
    `${cover.detail.label}: ${f.detail || "—"}`,
    `When I need cover: ${f.timing}`,
    f.message ? `Notes: ${f.message}` : null,
    "",
    `Name: ${f.name}`,
    `Phone: ${f.phone}`,
    f.email ? `Email: ${f.email}` : null,
    `Best way to reach me: ${f.channel}`,
  ]
    .filter((l) => l !== null)
    .join("\n");
}

function Stepper({ step }) {
  return (
    <ol className="flex items-center gap-2" aria-label="Quote progress">
      {STEPS.map((label, i) => {
        const done = i < step;
        const current = i === step;
        return (
          <li key={label} className="flex flex-1 items-center gap-2" aria-current={current ? "step" : undefined}>
            <span
              className={`grid h-7 w-7 shrink-0 place-items-center rounded-full text-xs font-bold transition ${
                done ? "bg-mint text-white" : current ? "bg-forest text-white" : "bg-sage text-muted"
              }`}
            >
              {done ? <Check size={14} strokeWidth={3} /> : i + 1}
            </span>
            <span className={`hidden text-xs font-semibold sm:block ${current ? "text-forest" : "text-muted"}`}>
              {label}
            </span>
            {i < STEPS.length - 1 && (
              <span className={`h-px flex-1 ${done ? "bg-mint" : "bg-line"}`} aria-hidden="true" />
            )}
          </li>
        );
      })}
    </ol>
  );
}

function Label({ htmlFor, children, optional }) {
  return (
    <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-semibold text-forest">
      {children} {optional && <span className="font-normal text-muted">(optional)</span>}
    </label>
  );
}

function QuoteWizard({ coverId, setCoverId, step, setStep }) {
  const [form, setForm] = useState({
    detail: "",
    timing: TIMING[0],
    message: "",
    name: "",
    phone: "",
    email: "",
    channel: CHANNELS[0],
  });
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(null);

  const cover = SERVICES.find((s) => s.id === coverId);
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const validateContact = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Please tell us your name.";
    if (!isKenyanPhone(form.phone)) e.phone = "Enter a Kenyan mobile number, e.g. 0712 345 678.";
    if (form.email && !/^\S+@\S+\.\S+$/.test(form.email)) e.email = "That email doesn't look right.";
    if (form.channel === "Email" && !form.email) e.email = "Add an email so we can reply there.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (step < 2) {
      setStep(step + 1);
      return;
    }
    if (!validateContact()) return;
    const message = buildMessage(cover, form);
    setSent(message);
    window.open(whatsappLink(message), "_blank", "noopener,noreferrer");
  };

  if (sent) {
    return (
      <div className="py-8 text-center" role="status">
        <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-sage text-mint">
          <CheckCircle2 size={32} />
        </span>
        <h3 className="mt-5 font-display text-3xl font-medium text-forest">Asante, {form.name.split(" ")[0]}!</h3>
        <p className="mx-auto mt-2 max-w-md text-body">
          Your quote request has opened in WhatsApp — just tap <strong>Send</strong> and an agent will
          reply within one business day.
        </p>
        <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
          <a href={whatsappLink(sent)} target="_blank" rel="noopener noreferrer" className="btn-primary">
            <WhatsAppIcon size={16} /> Open WhatsApp again
          </a>
          <a
            href={`mailto:${SITE.email}?subject=${encodeURIComponent(
              `Quote request: ${cover.longTitle}`
            )}&body=${encodeURIComponent(sent.replaceAll("*", ""))}`}
            className="btn-outline"
          >
            <Mail size={16} /> Send by email instead
          </a>
        </div>
        <button
          type="button"
          onClick={() => {
            setSent(null);
            setStep(0);
          }}
          className="mt-6 text-sm font-semibold text-mint hover:text-forest"
        >
          Start another quote
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate>
      <Stepper step={step} />

      <div className="mt-8 min-h-[19rem]">
        {step === 0 && (
          <fieldset>
            <legend className="font-display text-2xl font-medium text-forest">
              What would you like to cover?
            </legend>
            <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {SERVICES.map((s) => {
                const Icon = s.icon;
                const selected = s.id === coverId;
                return (
                  <label
                    key={s.id}
                    className={`relative flex cursor-pointer flex-col gap-3 rounded-2xl border p-4 transition has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-mint ${
                      selected ? "border-forest bg-forest text-white" : "border-line bg-white hover:border-mint"
                    }`}
                  >
                    <input
                      type="radio"
                      name="cover"
                      value={s.id}
                      checked={selected}
                      onChange={() => setCoverId(s.id)}
                      className="sr-only"
                    />
                    <span
                      className={`grid h-10 w-10 place-items-center rounded-xl ${
                        selected ? "bg-glow text-forest-deep" : "bg-sage text-mint"
                      }`}
                    >
                      <Icon size={20} />
                    </span>
                    <span className="text-sm font-semibold">{s.longTitle}</span>
                    {selected && (
                      <Check size={16} strokeWidth={3} className="absolute top-4 right-4 text-glow" />
                    )}
                  </label>
                );
              })}
            </div>
          </fieldset>
        )}

        {step === 1 && (
          <div className="grid gap-5">
            <p className="font-display text-2xl font-medium text-forest">
              Tell us a little about your {cover.title.toLowerCase()} cover
            </p>
            <div>
              <Label htmlFor="detail">{cover.detail.label}</Label>
              <input
                id="detail"
                className="field"
                value={form.detail}
                onChange={set("detail")}
                placeholder={cover.detail.placeholder}
              />
            </div>
            <fieldset>
              <legend className="mb-2 text-sm font-semibold text-forest">When do you need cover?</legend>
              <div className="flex flex-wrap gap-2">
                {TIMING.map((t) => (
                  <label
                    key={t}
                    className={`cursor-pointer rounded-full border px-4 py-2 text-sm font-medium transition has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-mint ${
                      form.timing === t ? "border-forest bg-forest text-white" : "border-line text-body hover:border-mint"
                    }`}
                  >
                    <input
                      type="radio"
                      name="timing"
                      value={t}
                      checked={form.timing === t}
                      onChange={set("timing")}
                      className="sr-only"
                    />
                    {t}
                  </label>
                ))}
              </div>
            </fieldset>
            <div>
              <Label htmlFor="message" optional>
                Anything else we should know?
              </Label>
              <textarea
                id="message"
                rows={3}
                className="field resize-none"
                value={form.message}
                onChange={set("message")}
                placeholder="Current insurer, renewal date, budget…"
              />
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="grid gap-5 sm:grid-cols-2">
            <p className="font-display text-2xl font-medium text-forest sm:col-span-2">
              Where should we send your quote?
            </p>
            <div>
              <Label htmlFor="name">Full name</Label>
              <input
                id="name"
                className="field"
                value={form.name}
                onChange={set("name")}
                placeholder="Jane Wanjiru"
                autoComplete="name"
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? "name-err" : undefined}
                autoFocus
              />
              {errors.name && <p id="name-err" className="mt-1.5 text-xs font-medium text-red-700">{errors.name}</p>}
            </div>
            <div>
              <Label htmlFor="phone">Phone number</Label>
              <input
                id="phone"
                type="tel"
                inputMode="tel"
                className="field"
                value={form.phone}
                onChange={set("phone")}
                placeholder="0712 345 678"
                autoComplete="tel"
                aria-invalid={!!errors.phone}
                aria-describedby={errors.phone ? "phone-err" : undefined}
              />
              {errors.phone && <p id="phone-err" className="mt-1.5 text-xs font-medium text-red-700">{errors.phone}</p>}
            </div>
            <div className="sm:col-span-2">
              <Label htmlFor="email" optional={form.channel !== "Email"}>
                Email
              </Label>
              <input
                id="email"
                type="email"
                className="field"
                value={form.email}
                onChange={set("email")}
                placeholder="jane@example.com"
                autoComplete="email"
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? "email-err" : undefined}
              />
              {errors.email && <p id="email-err" className="mt-1.5 text-xs font-medium text-red-700">{errors.email}</p>}
            </div>
            <fieldset className="sm:col-span-2">
              <legend className="mb-2 text-sm font-semibold text-forest">Best way to reach you</legend>
              <div className="flex flex-wrap gap-2">
                {CHANNELS.map((c) => (
                  <label
                    key={c}
                    className={`cursor-pointer rounded-full border px-4 py-2 text-sm font-medium transition has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-mint ${
                      form.channel === c ? "border-forest bg-forest text-white" : "border-line text-body hover:border-mint"
                    }`}
                  >
                    <input
                      type="radio"
                      name="channel"
                      value={c}
                      checked={form.channel === c}
                      onChange={set("channel")}
                      className="sr-only"
                    />
                    {c}
                  </label>
                ))}
              </div>
            </fieldset>
          </div>
        )}
      </div>

      <div className="mt-8 flex items-center justify-between gap-4 border-t border-line pt-6">
        {step > 0 ? (
          <button
            type="button"
            onClick={() => setStep(step - 1)}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-muted hover:text-forest"
          >
            <ArrowLeft size={16} /> Back
          </button>
        ) : (
          <span className="text-xs text-muted">Takes about a minute</span>
        )}
        <button type="submit" className="btn-primary">
          {step < 2 ? (
            <>
              Continue <ArrowRight size={16} />
            </>
          ) : (
            <>
              <WhatsAppIcon size={16} /> Send my request
            </>
          )}
        </button>
      </div>
    </form>
  );
}

export default function Contact(props) {
  return (
    <section id="contact" className="scroll-mt-20 bg-white px-5 py-20 sm:px-8 md:py-28">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Get a free quote"
          title="Let's find the right cover"
          intro="Three quick steps. An agent will compare options for you and reply within one business day."
        />

        <div className="mt-14 grid gap-8 lg:grid-cols-[1.25fr_0.75fr]">
          <Reveal>
            <div className="rounded-[1.75rem] border border-line bg-white p-6 shadow-[0_30px_60px_-40px_rgba(8,42,32,0.45)] sm:p-9">
              <QuoteWizard {...props} />
            </div>
          </Reveal>

          <Reveal delay={120} className="grid content-start gap-4">
            <a
              href={SITE.phoneHref}
              className="group flex items-center gap-4 rounded-2xl bg-forest p-5 text-white transition hover:bg-forest-2"
            >
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-glow text-forest-deep">
                <Phone size={20} />
              </span>
              <span>
                <span className="block text-xs text-pale">Call an agent</span>
                <span className="block font-display text-xl">{SITE.phoneDisplay}</span>
              </span>
              <ArrowRight size={18} className="ml-auto text-glow transition group-hover:translate-x-1" />
            </a>
            <a
              href={whatsappLink("Hello Malmitch, I'd like some help with insurance.")}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 rounded-2xl border border-line p-5 transition hover:border-mint"
            >
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-whatsapp/15 text-[#128c4a]">
                <WhatsAppIcon size={22} />
              </span>
              <span>
                <span className="block text-xs text-muted">Chat on WhatsApp</span>
                <span className="block font-semibold text-forest">Usually replies in minutes</span>
              </span>
              <ArrowRight size={18} className="ml-auto text-mint transition group-hover:translate-x-1" />
            </a>
            <a
              href={`mailto:${SITE.email}`}
              className="group flex items-center gap-4 rounded-2xl border border-line p-5 transition hover:border-mint"
            >
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-sage text-mint">
                <Mail size={20} />
              </span>
              <span>
                <span className="block text-xs text-muted">Email us</span>
                <span className="block font-semibold text-forest">{SITE.email}</span>
              </span>
              <ArrowRight size={18} className="ml-auto text-mint transition group-hover:translate-x-1" />
            </a>

            <div className="rounded-2xl border border-line p-5">
              <div className="flex items-start gap-3">
                <Clock size={18} className="mt-0.5 text-mint" />
                <dl className="grid flex-1 grid-cols-[auto_1fr] gap-x-4 gap-y-1.5 text-sm">
                  {SITE.hours.map((h) => (
                    <div key={h.days} className="contents">
                      <dt className="font-semibold text-forest">{h.days}</dt>
                      <dd className="text-right text-body">{h.time}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Map */}
        <Reveal delay={100}>
          <div className="weave-light relative mt-8 overflow-hidden rounded-[1.75rem] border border-line bg-sage">
            <iframe
              title="Map showing the Malmitch office at Fortune Plaza, Westlands"
              src={mapEmbedSrc}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-72 w-full grayscale-[35%] md:h-80"
            />
            <div className="absolute bottom-4 left-4 right-4 flex flex-col gap-3 rounded-2xl bg-white/95 p-5 shadow-xl backdrop-blur sm:right-auto sm:max-w-sm">
              <div className="flex items-start gap-3">
                <MapPin size={20} className="mt-0.5 shrink-0 text-mint" />
                <div>
                  <p className="font-semibold text-forest">{SITE.address.line1}</p>
                  <p className="text-sm text-muted">{SITE.address.line2}</p>
                </div>
              </div>
              <a
                href={mapLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-mint hover:text-forest"
              >
                <Navigation size={14} /> Get directions
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
