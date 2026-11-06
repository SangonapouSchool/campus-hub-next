import { semesterProgress } from "@/lib/dashboard";

const SIZE = 132;
const STROKE = 16;
const RADIUS = (SIZE - STROKE) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

const SEGMENTS = [
  { label: "Completado", value: semesterProgress.completed, stroke: "stroke-primario", dot: "bg-primario" },
  { label: "En progreso", value: semesterProgress.inProgress, stroke: "stroke-secundario", dot: "bg-secundario" },
  { label: "Pendiente", value: semesterProgress.pending, stroke: "stroke-tinte-neutro", dot: "bg-tinte-neutro" },
];

function ProgressRing() {
  let offset = 0;
  return (
    <div className="relative size-[132px] shrink-0">
      <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="-rotate-90" aria-hidden="true">
        {SEGMENTS.map((s) => {
          const length = (CIRCUMFERENCE * s.value) / 100;
          const circle = (
            <circle
              key={s.label}
              cx={SIZE / 2}
              cy={SIZE / 2}
              r={RADIUS}
              fill="none"
              strokeWidth={STROKE}
              className={s.stroke}
              strokeDasharray={`${length} ${CIRCUMFERENCE}`}
              strokeDashoffset={-offset}
            />
          );
          offset += length;
          return circle;
        })}
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-[26px] font-extrabold leading-tight">{semesterProgress.completed}%</span>
        <span className="text-[11px] font-semibold text-texto-sec">completado</span>
      </div>
    </div>
  );
}

export function ProgressCard() {
  return (
    <section
      aria-labelledby="progreso-titulo"
      className="flex flex-col gap-5 rounded-panel border border-borde bg-superficie p-6"
    >
      <h2 id="progreso-titulo" className="text-lg font-bold">
        Progreso del semestre
      </h2>
      <div className="flex items-center gap-6">
        <ProgressRing />
        <ul className="flex flex-1 flex-col gap-3">
          {SEGMENTS.map((s) => (
            <li key={s.label} className="flex items-center gap-2 text-sm">
              <span className={`size-2.5 rounded-full ${s.dot}`} aria-hidden="true" />
              <span className="flex-1 font-medium text-texto-sec">{s.label}</span>
              <span className="font-bold">{s.value}%</span>
            </li>
          ))}
        </ul>
      </div>
      <hr className="border-borde" />
      <div className="flex items-center justify-between">
        <span className="text-[15px] font-semibold text-texto-sec">Promedio general</span>
        <span className="text-[28px] font-extrabold">{semesterProgress.average.toFixed(1)}</span>
      </div>
    </section>
  );
}
