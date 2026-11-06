"use client";

import { useState, type ReactNode } from "react";
import { AddTaskForm } from "@/components/AddTaskForm";
import { Icon } from "@/components/Icon";
import { StatCard } from "@/components/StatCard";
import { TaskCard } from "@/components/TaskCard";
import { dueShort, nextDueTask, sortTasks, urgencyPhrase, type Task } from "@/lib/tasks";

interface TaskDashboardProps {
  initialTasks: Task[];
  firstName: string;
  today: string;
  /** Columna lateral (progreso y actividad), renderizada en el servidor. */
  aside: ReactNode;
}

const FORM_ID = "nueva-tarea";

export function TaskDashboard({ initialTasks, firstName, today, aside }: TaskDashboardProps) {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [formOpen, setFormOpen] = useState(false);

  const sorted = sortTasks(tasks);
  const pending = tasks.filter((t) => t.status !== "completada");
  const completed = tasks.length - pending.length;
  const next = nextDueTask(tasks);

  function addTask(task: Omit<Task, "id">) {
    setTasks((prev) => [...prev, { ...task, id: crypto.randomUUID() }]);
    setFormOpen(false);
  }

  function toggleTask(id: string) {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id !== id) return t;
        // Al completarla se considera entregada hoy; al reabrirla vuelve a pendiente.
        return t.status === "completada"
          ? { ...t, status: "pendiente", dueInDays: Math.max(t.dueInDays, 0) }
          : { ...t, status: "completada", dueInDays: 0 };
      }),
    );
  }

  const summary =
    pending.length === 0
      ? "No tienes tareas pendientes. ¡Buen trabajo!"
      : `Tienes ${pending.length} ${pending.length === 1 ? "tarea pendiente" : "tareas pendientes"}. La más urgente vence ${urgencyPhrase(next!.dueInDays)}.`;

  return (
    <>
      <header className="flex flex-wrap items-center justify-between gap-6">
        <div className="flex flex-col gap-1.5">
          <p className="text-sm font-semibold text-texto-sec">{today}</p>
          <h1 className="text-3xl font-extrabold md:text-4xl">¡Hola, {firstName}!</h1>
          <p className="font-medium text-texto-sec" aria-live="polite">
            {summary}
          </p>
        </div>
        <button
          type="button"
          onClick={() => setFormOpen((o) => !o)}
          aria-expanded={formOpen}
          aria-controls={FORM_ID}
          className="flex items-center gap-2 rounded-boton bg-primario py-3.5 pr-[22px] pl-5 text-[15px] font-bold text-superficie hover:brightness-110 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-primario"
        >
          <Icon name="agregar" />
          Agregar tarea
        </button>
      </header>

      <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_var(--spacing-lateral)]">
        <div className="flex flex-col gap-6">
          {/* En móvil la próxima entrega ocupa todo el ancho y los dos datos van lado a lado,
              para que la lista de tareas aparezca sin tanto desplazamiento. */}
          <section aria-label="Resumen" className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
            {next ? (
              <StatCard
                urgent
                className="col-span-2 sm:col-span-1"
                label="Próxima entrega"
                value={dueShort(next.dueInDays)}
                detail={`${next.title} · ${next.subject}`}
              />
            ) : (
              <StatCard
                className="col-span-2 sm:col-span-1"
                label="Próxima entrega"
                value="—"
                detail="Sin entregas pendientes"
              />
            )}
            <StatCard label="Pendientes" value={String(pending.length)} detail={`de ${tasks.length} tareas activas`} />
            <StatCard label="Completadas" value={String(completed)} detail="esta semana" />
          </section>

          <section aria-labelledby="tareas-titulo" className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h2 id="tareas-titulo" className="text-[22px] font-bold">
                Tus tareas
              </h2>
              <a href="#" className="text-sm font-bold text-primario hover:underline">
                Ver todas
              </a>
            </div>
            {formOpen && <AddTaskForm id={FORM_ID} onAdd={addTask} onCancel={() => setFormOpen(false)} />}
            <ul className="flex flex-col gap-3">
              {sorted.map((t) => (
                <TaskCard key={t.id} task={t} onToggle={toggleTask} />
              ))}
            </ul>
          </section>
        </div>

        <div className="flex flex-col gap-6">{aside}</div>
      </div>
    </>
  );
}
