import { Sparkles, HomeIcon, Users } from "lucide-react";

const pillars = [
  {
    icon: HomeIcon,
    title: "A second home",
    body: "Warm, well-lit rooms and shared spaces that feel lived-in — not institutional.",
  },
  {
    icon: Users,
    title: "A trusted community",
    body: "Live alongside fellow students and working women in a supportive, respectful environment.",
  },
  {
    icon: Sparkles,
    title: "Cared-for, every day",
    body: "Clean rooms, hot meals, prompt help — the small details handled, so you can focus on you.",
  },
];

export function About() {
  return (
    <section id="about" className="bg-gradient-cream py-24">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 lg:grid-cols-2 lg:items-center">
        <div>
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-leaf">
            About Happy Living
          </span>
          <h2 className="mt-3 font-display text-4xl font-bold text-forest md:text-5xl">
            A homely stay built around <em className="font-display italic">comfort, safety</em> and you.
          </h2>
          <p className="mt-5 leading-relaxed text-muted-foreground">
            Happy Living is a premium girls-only PG located in a calm,
            park-facing pocket of Roop Nagar, Delhi. We started with a simple
            idea: a place where families can confidently send their daughters,
            and where every resident feels respected, safe and looked-after.
          </p>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            From AC rooms and home-style meals to laundry, medical support and
            indoor games — every detail is designed so your day flows
            effortlessly.
          </p>
        </div>

        <div className="grid gap-4">
          {pillars.map((p) => {
            const Icon = p.icon;
            return (
              <div
                key={p.title}
                className="flex gap-4 rounded-2xl border border-forest/10 bg-card p-5 shadow-soft"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-forest text-cream">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-semibold text-forest">
                    {p.title}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">{p.body}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
