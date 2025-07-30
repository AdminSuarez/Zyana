type HeroProps = {
  title: string;
  subtitle?: string;
};

export function Hero({ title, subtitle }: HeroProps) {
  return (
    <section className="py-16 text-center cosmic-gradient min-h-screen flex items-center justify-center">
      <div className="space-y-6 animate-pulse">
        <div className="text-6xl mb-8">🌟</div>
        <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-cosmic-gold to-cosmic-purple bg-clip-text text-transparent">
          {title}
        </h1>
        {subtitle && (
          <p className="text-xl opacity-90 max-w-2xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        )}
        <div className="flex justify-center space-x-4 text-3xl">
          <span className="animate-bounce">🌙</span>
          <span className="animate-bounce delay-150">⭐</span>
          <span className="animate-bounce delay-300">🔮</span>
        </div>
      </div>
    </section>
  );
}