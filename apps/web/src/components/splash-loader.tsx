export function SplashLoader() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-surface">
      <span className="text-3xl font-bold tracking-tight">
        <span className="text-text-primary">Metra</span>
        <span className="text-accent">nik</span>
      </span>
      <span
        aria-hidden
        className="h-10 w-10 animate-spin rounded-full border-2 border-border border-t-accent"
      />
    </div>
  );
}
