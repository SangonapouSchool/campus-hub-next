interface StatCardProps {
  label: string;
  value: string;
  detail: string;
  urgent?: boolean;
  className?: string;
}

export function StatCard({ label, value, detail, urgent = false, className = "" }: StatCardProps) {
  return (
    <div
      className={`flex h-full flex-col gap-1.5 rounded-tarjeta bg-superficie px-4 py-4 sm:px-5 sm:py-[18px] ${
        urgent ? "border-2 border-alerta" : "border border-borde"
      } ${className}`}
    >
      <span className={`text-xs font-bold uppercase tracking-[0.06em] ${urgent ? "text-alerta" : "text-texto-sec"}`}>
        {label}
      </span>
      <span className={`text-2xl font-extrabold sm:text-3xl ${urgent ? "text-alerta" : ""}`}>{value}</span>
      <span className="text-[13px] font-medium text-texto-sec">{detail}</span>
    </div>
  );
}
