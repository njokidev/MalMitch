import { useRef, useState } from "react";
import { ArrowRight, Check, Users } from "lucide-react";
import { SERVICES } from "../data/content";
import { Reveal, SectionHeading } from "../components/ui";

export default function Cover({ onPickCover }) {
  const [activeId, setActiveId] = useState(SERVICES[0].id);
  const tabRefs = useRef({});
  const active = SERVICES.find((s) => s.id === activeId);
  const Icon = active.icon;

  // Arrow-key navigation between tabs (WAI-ARIA tabs pattern)
  const onKeyDown = (e) => {
    const i = SERVICES.findIndex((s) => s.id === activeId);
    let next = null;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") next = (i + 1) % SERVICES.length;
    if (e.key === "ArrowLeft" || e.key === "ArrowUp") next = (i - 1 + SERVICES.length) % SERVICES.length;
    if (e.key === "Home") next = 0;
    if (e.key === "End") next = SERVICES.length - 1;
    if (next === null) return;
    e.preventDefault();
    const id = SERVICES[next].id;
    setActiveId(id);
    tabRefs.current[id]?.focus();
  };

  return (
    <section id="cover" className="scroll-mt-20 bg-mist px-5 py-20 sm:px-8 md:py-28">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Cover we arrange"
          title="Six ways we protect what you've built"
          intro="We compare policies from IRA-registered insurers and recommend the one that fits — then handle renewals and claims for you."
        />

        <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-[18rem_minmax(0,1fr)] lg:gap-8">
          {/* Tabs */}
          <Reveal className="min-w-0">
            <div
              role="tablist"
              aria-label="Types of cover"
              aria-orientation="vertical"
              onKeyDown={onKeyDown}
              className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 pb-1 lg:mx-0 lg:flex-col lg:overflow-visible lg:px-0"
            >
              {SERVICES.map((s) => {
                const TabIcon = s.icon;
                const selected = s.id === activeId;
                return (
                  <button
                    key={s.id}
                    ref={(el) => (tabRefs.current[s.id] = el)}
                    role="tab"
                    id={`tab-${s.id}`}
                    aria-selected={selected}
                    aria-controls={`panel-${s.id}`}
                    tabIndex={selected ? 0 : -1}
                    onClick={() => setActiveId(s.id)}
                    className={`group flex shrink-0 items-center gap-3 rounded-2xl border px-4 py-3 text-left transition lg:px-5 lg:py-4 ${
                      selected
                        ? "border-forest bg-forest text-white shadow-lg"
                        : "border-line bg-white text-forest hover:border-mint"
                    }`}
                  >
                    <span
                      className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl transition ${
                        selected ? "bg-glow text-forest-deep" : "bg-sage text-mint"
                      }`}
                    >
                      <TabIcon size={18} />
                    </span>
                    <span className="text-sm font-semibold whitespace-nowrap lg:text-base">
                      {s.longTitle}
                    </span>
                    <ArrowRight
                      size={16}
                      className={`ml-auto hidden transition lg:block ${
                        selected ? "translate-x-0 text-glow opacity-100" : "-translate-x-1 opacity-0"
                      }`}
                    />
                  </button>
                );
              })}
            </div>
          </Reveal>

          {/* Panel */}
          <Reveal delay={100} className="min-w-0">
            <div
              key={active.id}
              role="tabpanel"
              id={`panel-${active.id}`}
              aria-labelledby={`tab-${active.id}`}
              className="relative h-full overflow-hidden rounded-[1.75rem] border border-line bg-white p-7 sm:p-10"
            >
              <Icon
                aria-hidden="true"
                strokeWidth={1}
                className="pointer-events-none absolute -right-10 -top-10 h-64 w-64 text-sage"
              />
              <div className="relative animate-fade-in">
                <span className="grid h-14 w-14 place-items-center rounded-2xl bg-sage text-mint">
                  <Icon size={26} />
                </span>
                <h3 className="mt-6 font-display text-3xl font-medium text-forest sm:text-4xl">
                  {active.longTitle}
                </h3>
                <p className="mt-2 text-lg font-medium text-mint">{active.tagline}</p>
                <p className="mt-4 max-w-2xl leading-relaxed text-body">{active.desc}</p>

                <div className="mt-6 flex items-start gap-3 rounded-2xl bg-mist p-4 text-sm text-body">
                  <Users size={18} className="mt-0.5 shrink-0 text-mint" />
                  <p>
                    <span className="font-semibold text-forest">Ideal for: </span>
                    {active.forWho}
                  </p>
                </div>

                <ul className="mt-7 grid gap-x-8 gap-y-3 sm:grid-cols-2">
                  {active.includes.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-ink sm:text-base">
                      <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-mint text-white">
                        <Check size={12} strokeWidth={3} />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>

                <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <button type="button" onClick={() => onPickCover(active.id)} className="btn-primary">
                    Get a {active.title.toLowerCase()} quote <ArrowRight size={16} />
                  </button>
                  <p className="text-sm text-muted">Free, no obligation · reply within 1 business day</p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
