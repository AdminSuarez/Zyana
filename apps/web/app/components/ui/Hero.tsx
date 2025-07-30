type HeroProps = {
  title: string;
  subtitle?: string;
};

export function Hero({ title, subtitle }: HeroProps) {
  return (
    <section className="py-16 text-center">
      <h1 className="text-4xl font-bold mb-2">{title}</h1>
      {subtitle && <p className="text-lg opacity-80">{subtitle}</p>}
    </section>
  );
}