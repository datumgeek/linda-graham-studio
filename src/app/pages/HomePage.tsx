export function HomePage() {
  return (
    <div
      className="hero min-h-[calc(100vh-4rem)]"
      style={{
        backgroundImage: 'url(/images/IllusiveReality-1024x682.jpg)',
      }}
    >
      <div className="hero-overlay bg-opacity-30" />
      <div className="hero-content text-center text-neutral-content">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold text-white drop-shadow-lg">
            Linda Graham
          </h1>
          <p className="py-6 text-white/90 drop-shadow">Studio</p>
        </div>
      </div>
    </div>
  );
}
