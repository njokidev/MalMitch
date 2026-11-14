import { Quote, Star } from "lucide-react";
import { TESTIMONIALS } from "../data/content";
import { Reveal, SectionHeading } from "../components/ui";

const initials = (name) =>
  name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2);

export default function Reviews() {
  return (
    <section id="reviews" className="scroll-mt-20 bg-white px-5 py-20 sm:px-8 md:py-28">
      <div className="mx-auto max-w-7xl">
        <SectionHeading eyebrow="From our policyholders" title="Real cover, real people" />

        <div className="no-scrollbar -mx-5 mt-14 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-4 md:mx-0 md:grid md:grid-cols-3 md:overflow-visible md:px-0">
          {TESTIMONIALS.map((t, i) => (
            <Reveal
              key={t.name}
              delay={i * 100}
              className="w-[85%] shrink-0 snap-center sm:w-[60%] md:w-auto"
            >
              <figure
                className={`flex h-full flex-col rounded-[1.75rem] p-7 sm:p-8 ${
                  i === 1
                    ? "bg-forest text-white"
                    : "border border-line bg-mist text-ink"
                }`}
              >
                <div className="flex items-center justify-between">
                  <Quote size={30} className={i === 1 ? "text-glow" : "text-mint"} />
                  <div className="flex gap-0.5" role="img" aria-label="Rated 5 out of 5">
                    {Array.from({ length: 5 }).map((_, idx) => (
                      <Star
                        key={idx}
                        size={15}
                        className={i === 1 ? "fill-glow text-glow" : "fill-mint text-mint"}
                      />
                    ))}
                  </div>
                </div>
                <blockquote
                  className={`mt-6 flex-1 font-display text-lg leading-relaxed sm:text-xl ${
                    i === 1 ? "text-white" : "text-forest"
                  }`}
                >
                  “{t.quote}”
                </blockquote>
                <figcaption className="mt-8 flex items-center gap-3">
                  <span
                    aria-hidden="true"
                    className={`grid h-11 w-11 place-items-center rounded-full text-sm font-bold ${
                      i === 1 ? "bg-glow text-forest-deep" : "bg-forest text-white"
                    }`}
                  >
                    {initials(t.name)}
                  </span>
                  <span>
                    <span className={`block text-sm font-semibold ${i === 1 ? "text-white" : "text-forest"}`}>
                      {t.name}
                    </span>
                    <span className={`block text-xs ${i === 1 ? "text-pale" : "text-muted"}`}>
                      {t.place}
                    </span>
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
