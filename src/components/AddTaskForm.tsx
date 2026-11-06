"use client";

import { useState, type FormEvent } from "react";
import { MAX_TITLE_LENGTH, SUBJECTS, validateNewTask, type Task } from "@/lib/tasks";

interface AddTaskFormProps {
  id: string;
  onAdd: (task: Omit<Task, "id">) => void;
  onCancel: () => void;
}

const fieldClass =
  "rounded-control border border-borde bg-superficie px-3 py-2.5 text-[15px] text-texto focus-visible:outline-3 focus-visible:outline-offset-1 focus-visible:outline-primario";

export function AddTaskForm({ id, onAdd, onCancel }: AddTaskFormProps) {
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState<string>(SUBJECTS[0]);
  const [dueInDays, setDueInDays] = useState("7");
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const result = validateNewTask({ title, subject, dueInDays });
    if (!result.ok) {
      setError(result.error);
      return;
    }
    onAdd(result.task);
  }

  return (
    <form
      id={id}
      onSubmit={handleSubmit}
      noValidate
      aria-label="Nueva tarea"
      className="flex flex-col gap-4 rounded-tarjeta border border-borde bg-superficie p-5"
    >
      <div className="grid gap-4 sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_120px]">
        <label className="flex flex-col gap-1.5 text-sm font-semibold text-texto-sec">
          Tarea
          <input
            autoFocus
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            maxLength={MAX_TITLE_LENGTH}
            placeholder="Ej. Lectura capítulo 4"
            aria-invalid={error !== null && !title.trim()}
            className={fieldClass}
          />
        </label>
        <label className="flex flex-col gap-1.5 text-sm font-semibold text-texto-sec">
          Materia
          <select value={subject} onChange={(e) => setSubject(e.target.value)} className={fieldClass}>
            {SUBJECTS.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </label>
        <label className="flex flex-col gap-1.5 text-sm font-semibold text-texto-sec">
          Entrega en (días)
          <input
            type="number"
            inputMode="numeric"
            min={0}
            max={365}
            value={dueInDays}
            onChange={(e) => setDueInDays(e.target.value)}
            className={fieldClass}
          />
        </label>
      </div>
      {error && (
        <p role="alert" className="text-sm font-semibold text-alerta">
          {error}
        </p>
      )}
      <div className="flex flex-wrap justify-end gap-2">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-boton px-4 py-2.5 text-[15px] font-bold text-texto-sec hover:bg-tinte-neutro focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-primario"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="rounded-boton bg-primario px-5 py-2.5 text-[15px] font-bold text-superficie hover:brightness-110 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-primario"
        >
          Guardar tarea
        </button>
      </div>
    </form>
  );
}
