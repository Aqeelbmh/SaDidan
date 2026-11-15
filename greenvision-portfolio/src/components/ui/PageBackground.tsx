export default function PageBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      <div className="orb orb-emerald drift-a -right-40 -top-48 h-[36rem] w-[36rem]" />
      <div className="orb orb-gold drift-b -left-48 top-[42%] h-[28rem] w-[28rem]" />
      <div className="orb orb-emerald drift-b right-[12%] top-[88%] h-[24rem] w-[24rem] opacity-30" />
    </div>
  );
}
