import { STATUS_LABEL, dueLabel, type Task, type TaskStatus } from "@/lib/tasks";

// Clases completas por estado (Tailwind no detecta clases construidas con plantillas).
const CHIP_CLASSES: Record<TaskStatus, string> = {
  "en-progreso": "bg-tinte-primario text-primario",
  pendiente: "bg-tinte-neutro text-texto-sec",
  completada: "bg-tinte-secundario text-exito",
};

interface TaskCardProps {
  task: Task;
  onToggle: (id: string) => void;
}

export function TaskCard({ task, onToggle }: TaskCardProps) {
  const done = task.status === "completada";
  return (
    <li className="flex items-start gap-4 rounded-tarjeta border border-borde bg-superficie px-4 py-4 sm:items-center sm:px-5 sm:py-[18px]">
      <button
        type="button"
        onClick={() => onToggle(task.id)}
        aria-pressed={done}
        aria-label={done ? `Marcar «${task.title}» como pendiente` : `Marcar «${task.title}» como completada`}
        className={`size-[22px] shrink-0 rounded-full border-2 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-primario ${
          done ? "border-secundario bg-secundario" : "border-borde hover:border-secundario"
        }`}
      />
      {/* En móvil la fecha y el chip bajan debajo del título para que la materia
          y el título usen todo el ancho; desde sm vuelven a la derecha como en Figma. */}
      <div className="flex min-w-0 flex-1 flex-col gap-2.5 sm:flex-row sm:items-center sm:gap-4">
        <div className="flex min-w-0 flex-1 flex-col gap-1">
          <span className="text-xs font-bold uppercase tracking-[0.06em] text-texto-sec">{task.subject}</span>
          <span className={`text-[17px] font-bold break-words ${done ? "text-texto-sec" : ""}`}>{task.title}</span>
        </div>
        <div className="flex shrink-0 flex-row-reverse items-center justify-end gap-2 sm:flex-col sm:items-end sm:gap-1.5 sm:text-right">
          <span className="text-sm font-medium text-texto-sec">{dueLabel(task)}</span>
          <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${CHIP_CLASSES[task.status]}`}>
            {STATUS_LABEL[task.status]}
          </span>
        </div>
      </div>
    </li>
  );
}
