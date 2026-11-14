import { Phone, Camera, FileCheck2, IdCard, Siren } from "lucide-react";
import { CLAIMS_STEPS } from "../data/content";
import { SITE, whatsappLink } from "../data/site";
import { Reveal, SectionHeading, WhatsAppIcon } from "../components/ui";

const CHECKLIST = [
  { icon: Camera, text: "Photos of the damage or scene" },
  { icon: Siren, text: "Police abstract (accidents & theft)" },
  { icon: IdCard, text: "ID / driving licence & logbook copy" },
  { icon: FileCheck2, text: "Your policy number" },
];

export default function Claims() {
  return (
    <section id="claims" className="weave-light scroll-mt-20 bg-mist px-5 py-20 sm:px-8 md:py-28">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="How claims work"
          title="From incident to payout in four steps"
          intro="The same process our agents walk every policyholder through — nothing hidden, nothing outsourced to a call centre."
        />

        <ol className="relative mt-16 grid gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {/* connecting line (desktop) */}
          <span
            aria-hidden="true"
            className="absolute top-7 right-[12.5%] left-[12.5%] hidden h-px bg-gradient-to-r from-line via-mint/50 to-line lg:block"
          />
          {CLAIMS_STEPS.map((step, i) => {
            const Icon = step.icon;
            return (
              <Reveal as="li" key={step.title} delay={i * 110} className="relative text-center">
                <span className="relative mx-auto grid h-14 w-14 place-items-center rounded-full border-4 border-mist bg-forest text-glow shadow-lg">
                  <Icon size={22} />
                  <span className="absolute -top-1 -right-1 grid h-6 w-6 place-items-center rounded-full bg-glow text-[0.7rem] font-bold text-forest-deep">
                    {i + 1}
                  </span>
                </span>
                <span className="mt-5 inline-block rounded-full bg-sage px-3 py-1 text-xs font-semibold text-mint">
                  {step.time}
                </span>
                <h3 className="mt-3 font-display text-xl font-medium text-forest">{step.title}</h3>
                <p className="mx-auto mt-2 max-w-xs text-sm leading-relaxed text-body">{step.desc}</p>
              </Reveal>
            );
          })}
        </ol>

        {/* Report a claim panel */}
        <Reveal delay={150}>
          <div className="mt-16 grid overflow-hidden rounded-[1.75rem] bg-forest-deep text-white lg:grid-cols-[1.1fr_0.9fr]">
            <div className="p-8 sm:p-10">
              <p className="eyebrow text-glow">Need to claim right now?</p>
              <h3 className="mt-3 font-display text-3xl font-medium sm:text-4xl">
                Our claims line is open 24 hours.
              </h3>
              <p className="mt-3 max-w-lg text-pale">
                Make sure everyone is safe first. Then call us or send your details on WhatsApp — we'll
                open your claim file straight away.
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <a href={SITE.phoneHref} className="btn-glow">
                  <Phone size={16} /> Call {SITE.phoneDisplay}
                </a>
                <a
                  href={whatsappLink(
                    "Hello Malmitch, I need to report a claim.\nPolicy number: \nWhat happened: "
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ghost-light"
                >
                  <WhatsAppIcon size={16} className="text-whatsapp" /> Report on WhatsApp
                </a>
              </div>
            </div>
            <div className="border-t border-white/10 bg-forest-2 p-8 sm:p-10 lg:border-t-0 lg:border-l">
              <p className="text-sm font-semibold text-white">Have these ready if you can:</p>
              <ul className="mt-5 space-y-4">
                {CHECKLIST.map(({ icon: Icon, text }) => (
                  <li key={text} className="flex items-center gap-3 text-sm text-pale">
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-white/5 text-glow">
                      <Icon size={17} />
                    </span>
                    {text}
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-xs text-pale/70">
                Don't have everything? Report anyway — your agent will tell you what's still needed.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
