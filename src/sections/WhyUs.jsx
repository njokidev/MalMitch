import { Check, Minus, Building2 } from "lucide-react";
import { COMPARISON, STATS } from "../data/content";
import { Counter, LogoMark, Reveal, SectionHeading } from "../components/ui";

function Cell({ value, highlight }) {
  if (value === true)
    return (
      <span
        className={`mx-auto grid h-7 w-7 place-items-center rounded-full ${
          highlight ? "bg-glow text-forest-deep" : "bg-sage text-mint"
        }`}
      >
        <Check size={15} strokeWidth={3} />
        <span className="sr-only">Yes</span>
      </span>
    );
  if (value === false)
    return (
      <span className="mx-auto grid h-7 w-7 place-items-center rounded-full bg-mist text-muted/60">
        <Minus size={15} strokeWidth={3} />
        <span className="sr-only">No</span>
      </span>
    );
  return <span className={`text-xs font-semibold ${highlight ? "text-glow" : "text-muted"}`}>{value}</span>;
}

export default function WhyUs() {
  return (
    <>
      <section id="why-us" className="scroll-mt-20 bg-white px-5 py-20 sm:px-8 md:py-28">
        <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <SectionHeading
              align="left"
              eyebrow="Why Malmitch"
              title="Bima you can actually reach on the phone."
              intro="Malmitch was built on a simple frustration: too many Kenyans only hear from their insurer when a premium is due. We place your cover with IRA-registered underwriters, then stay on your file — from the first quote to the last shilling of your claim."
            />
            <Reveal delay={200}>
              <div className="mt-8 rounded-2xl border border-line bg-mist p-5">
                <p className="text-sm leading-relaxed text-body">
                  <span className="font-semibold text-forest">No extra cost to you.</span> Our
                  commission is paid by the insurer, so you pay the same premium as going direct —
                  and get an advocate on your side.
                </p>
              </div>
            </Reveal>
          </div>

          <Reveal delay={120}>
            <div className="overflow-hidden rounded-[1.75rem] border border-line bg-white shadow-[0_30px_60px_-40px_rgba(8,42,32,0.45)]">
              <table className="w-full text-left">
                <caption className="sr-only">
                  Comparison of buying through Malmitch versus going direct to an insurer
                </caption>
                <thead>
                  <tr>
                    <th scope="col" className="p-4 sm:p-5">
                      <span className="sr-only">Feature</span>
                    </th>
                    <th scope="col" className="w-[4.75rem] bg-forest px-2 py-4 text-center sm:w-36 sm:p-5">
                      <span className="flex flex-col items-center gap-1.5">
                        <LogoMark size={26} />
                        <span className="text-xs font-semibold text-white sm:text-sm">Malmitch</span>
                      </span>
                    </th>
                    <th scope="col" className="w-[4.75rem] px-2 py-4 text-center sm:w-36 sm:p-5">
                      <span className="flex flex-col items-center gap-1.5">
                        <Building2 size={22} className="text-muted" />
                        <span className="text-xs font-semibold text-muted sm:text-sm">
                          Going direct
                        </span>
                      </span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {COMPARISON.map((row) => (
                    <tr key={row.label} className="border-t border-line">
                      <th scope="row" className="p-4 text-sm font-medium text-ink sm:p-5 sm:text-base">
                        {row.label}
                      </th>
                      <td className="bg-forest px-2 py-4 text-center sm:p-5">
                        <Cell value={row.us} highlight />
                      </td>
                      <td className="px-2 py-4 text-center sm:p-5">
                        <Cell value={row.them} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Stats band */}
      <section aria-label="Malmitch in numbers" className="weave bg-forest px-5 py-16 sm:px-8 md:py-20">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-px overflow-hidden rounded-3xl bg-white/10 lg:grid-cols-4">
          {STATS.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <Reveal key={stat.label} delay={i * 80} className="bg-forest p-6 sm:p-8">
                <Icon size={22} className="text-glow" />
                <p className="mt-5 font-display text-4xl font-medium text-white sm:text-5xl">
                  <Counter end={stat.end} suffix={stat.suffix} />
                </p>
                <p className="mt-2 text-sm leading-snug text-pale">{stat.label}</p>
              </Reveal>
            );
          })}
        </div>
      </section>
    </>
  );
}
