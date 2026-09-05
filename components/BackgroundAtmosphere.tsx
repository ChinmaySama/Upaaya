export function BackgroundAtmosphere() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[#FAFAFA]">
      {/* Precision Subtle Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0, 0, 0, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 0, 0, 0.03) 1px, transparent 1px)",
          backgroundSize: "36px 36px",
        }}
      />
      {/* Soft warm ambient light orbs */}
      <div className="absolute -left-32 -top-32 h-[40rem] w-[40rem] animate-pulse-slow rounded-full bg-gradient-to-br from-amber-100/30 via-orange-50/20 to-transparent blur-[140px]" />
      <div className="absolute -bottom-40 -right-32 h-[45rem] w-[45rem] animate-pulse-slow rounded-full bg-gradient-to-tl from-zinc-200/40 via-stone-100/30 to-transparent blur-[150px] [animation-delay:3s]" />
      <div className="absolute left-1/2 top-1/3 -translate-x-1/2 h-[35rem] w-[35rem] rounded-full bg-zinc-100/50 blur-[160px]" />
    </div>
  );
}
