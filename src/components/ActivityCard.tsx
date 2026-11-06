import { Icon } from "@/components/Icon";
import { recentActivity } from "@/lib/dashboard";

export function ActivityCard() {
  return (
    <section
      aria-labelledby="actividad-titulo"
      className="flex flex-col gap-[18px] rounded-panel border border-borde bg-superficie p-6"
    >
      <h2 id="actividad-titulo" className="text-lg font-bold">
        Actividad reciente
      </h2>
      <ul className="flex flex-col gap-[18px]">
        {recentActivity.map((a) => (
          <li key={a.id} className="flex items-start gap-3">
            <span className="grid size-9 shrink-0 place-items-center rounded-full bg-tinte-primario text-primario">
              <Icon name={a.icon} />
            </span>
            <span className="flex flex-col gap-0.5">
              <span className="text-sm font-medium">{a.text}</span>
              <span className="text-xs font-medium text-texto-sec">{a.time}</span>
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
