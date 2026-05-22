import { facilities } from "@/data/facilities";

export function Facilities() {
  return (
    <section id="facilities" className="relative bg-background py-24">
      <div className="mx-auto max-w-6xl px-5">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-leaf">
            What we offer
          </span>
          <h2 className="mt-3 font-display text-4xl font-bold text-forest md:text-5xl">
            Everything you need, thoughtfully included.
          </h2>
          <p className="mt-4 text-muted-foreground">
            Nine well-considered facilities so you can focus on your studies,
            career and life — without worrying about the little things.
          </p>
        </div>

        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {facilities.map((f) => {
            const Icon = f.icon;
            return (
              <li
                key={f.title}
                className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 transition hover:-translate-y-1 hover:border-leaf/50 hover:shadow-soft"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-forest/5 text-forest transition group-hover:bg-gradient-forest group-hover:text-cream">
                  <Icon className="h-6 w-6" strokeWidth={1.75} />
                </div>
                <h3 className="mt-5 font-display text-xl font-semibold text-forest">
                  {f.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {f.description}
                </p>
                <span
                  aria-hidden
                  className="absolute -bottom-10 -right-10 h-32 w-32 rounded-full bg-leaf/0 transition group-hover:bg-leaf/10"
                />
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
