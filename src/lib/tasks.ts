export type TaskStatus = "pendiente" | "en-progreso" | "completada";

export interface Task {
  id: string;
  subject: string;
  title: string;
  /** Días hasta la entrega; negativo si ya pasó (por ejemplo, -1 = ayer). */
  dueInDays: number;
  status: TaskStatus;
}

export interface NewTaskInput {
  title: string;
  subject: string;
  dueInDays: string;
}

export const SUBJECTS = [
  "Diseño de Interfaces",
  "Estructuras de Datos",
  "Matemáticas Discretas",
  "Bases de Datos",
] as const;

export const STATUS_LABEL: Record<TaskStatus, string> = {
  pendiente: "Pendiente",
  "en-progreso": "En progreso",
  completada: "Completada",
};

export const initialTasks: Task[] = [
  { id: "t1", subject: "Diseño de Interfaces", title: "Proyecto final", dueInDays: 2, status: "en-progreso" },
  { id: "t2", subject: "Estructuras de Datos", title: "Tarea 3", dueInDays: 4, status: "pendiente" },
  { id: "t3", subject: "Matemáticas Discretas", title: "Ejercicios 5 a 8", dueInDays: 8, status: "pendiente" },
  { id: "t4", subject: "Bases de Datos", title: "Práctica de consultas", dueInDays: -1, status: "completada" },
];

export const MAX_TITLE_LENGTH = 80;

function daysPhrase(days: number): string {
  if (days === 0) return "hoy";
  if (days === 1) return "mañana";
  return `en ${days} días`;
}

/** Texto de la fecha que aparece en la tarjeta: «Entrega en 2 días», «Entregada ayer»… */
export function dueLabel(task: Task): string {
  if (task.status === "completada") {
    if (task.dueInDays === -1) return "Entregada ayer";
    if (task.dueInDays < -1) return `Entregada hace ${-task.dueInDays} días`;
    return "Entregada hoy";
  }
  if (task.dueInDays < 0) return `Venció hace ${-task.dueInDays} ${task.dueInDays === -1 ? "día" : "días"}`;
  return `Entrega ${daysPhrase(task.dueInDays)}`;
}

/** Versión corta para la tarjeta de «Próxima entrega»: «En 2 días», «Hoy», «Mañana». */
export function dueShort(days: number): string {
  const phrase = daysPhrase(days);
  return phrase.charAt(0).toUpperCase() + phrase.slice(1);
}

export function urgencyPhrase(days: number): string {
  return daysPhrase(days);
}

/** Pendientes primero, ordenadas por fecha de entrega; las completadas al final. */
export function sortTasks(tasks: Task[]): Task[] {
  return [...tasks].sort((a, b) => {
    const aDone = a.status === "completada";
    const bDone = b.status === "completada";
    if (aDone !== bDone) return aDone ? 1 : -1;
    return aDone ? b.dueInDays - a.dueInDays : a.dueInDays - b.dueInDays;
  });
}

export function nextDueTask(tasks: Task[]): Task | undefined {
  return sortTasks(tasks).find((t) => t.status !== "completada");
}

type Validation = { ok: true; task: Omit<Task, "id"> } | { ok: false; error: string };

/** Valida lo que el usuario escribió en el formulario antes de crear la tarea. */
export function validateNewTask(input: NewTaskInput): Validation {
  const title = input.title.trim();
  if (!title) return { ok: false, error: "Escribe el nombre de la tarea." };
  if (title.length > MAX_TITLE_LENGTH) {
    return { ok: false, error: `El nombre puede tener hasta ${MAX_TITLE_LENGTH} caracteres.` };
  }
  if (!(SUBJECTS as readonly string[]).includes(input.subject)) {
    return { ok: false, error: "Elige una materia de la lista." };
  }
  const days = Number(input.dueInDays);
  if (input.dueInDays.trim() === "" || !Number.isInteger(days) || days < 0 || days > 365) {
    return { ok: false, error: "Indica en cuántos días se entrega (de 0 a 365)." };
  }
  return { ok: true, task: { title, subject: input.subject, dueInDays: days, status: "pendiente" } };
}
