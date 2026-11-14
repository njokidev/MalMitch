import { useState } from "react";
import { Plus, MessageCircle, ArrowRight } from "lucide-react";
import { FAQS } from "../data/content";
import { whatsappLink } from "../data/site";
import { Reveal, SectionHeading } from "../components/ui";

function FaqItem({ faq, id, open, onToggle }) {
  return (
    <div className="border-b border-line">
      <h3>
        <button
          type="button"
          id={`faq-q-${id}`}
          aria-expanded={open}
          aria-controls={`faq-a-${id}`}
          onClick={onToggle}
          className="flex w-full items-center justify-between gap-6 py-6 text-left"
        >
          <span className="font-display text-lg font-medium text-forest sm:text-xl">{faq.q}</span>
          <span
            className={`grid h-9 w-9 shrink-0 place-items-center rounded-full border transition duration-300 ${
              open ? "rotate-45 border-forest bg-forest text-white" : "border-line text-mint"
            }`}
          >
            <Plus size={18} />
          </span>
        </button>
      </h3>
      <div
        id={`faq-a-${id}`}
        role="region"
        aria-labelledby={`faq-q-${id}`}
        className={`grid transition-[grid-template-rows] duration-300 ease-out ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <p className="pr-12 pb-6 leading-relaxed text-body">{faq.a}</p>
        </div>
      </div>
    </div>
  );
}

export default function Faq() {
  const [open, setOpen] = useState(0);
  return (
    <section id="faq" className="scroll-mt-20 bg-mist px-5 py-20 sm:px-8 md:py-28">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading
            align="left"
            eyebrow="Common questions"
            title="Before you call, a few answers"
          />
          <Reveal delay={200}>
            <div className="mt-8 rounded-2xl border border-line bg-white p-6">
              <MessageCircle className="text-mint" size={24} />
              <p className="mt-3 font-semibold text-forest">Still not sure?</p>
              <p className="mt-1 text-sm text-muted">
                Ask us anything on WhatsApp — a real agent replies, not a bot.
              </p>
              <a
                href={whatsappLink("Hello Malmitch, I have a question: ")}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-mint hover:text-forest"
              >
                Ask an agent <ArrowRight size={15} />
              </a>
            </div>
          </Reveal>
        </div>

        <Reveal delay={100}>
          <div className="border-t border-line">
            {FAQS.map((faq, i) => (
              <FaqItem
                key={faq.q}
                id={i}
                faq={faq}
                open={open === i}
                onToggle={() => setOpen(open === i ? -1 : i)}
              />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
