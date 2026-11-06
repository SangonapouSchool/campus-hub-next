import type { IconName } from "@/components/Icon";

export const student = {
  firstName: "Ana",
  fullName: "Ana López",
  initials: "AL",
  semester: "3er semestre",
};

export const semesterProgress = {
  completed: 72,
  inProgress: 20,
  pending: 8,
  average: 8.6,
};

export interface Activity {
  id: string;
  icon: IconName;
  text: string;
  time: string;
}

export const recentActivity: Activity[] = [
  { id: "a1", icon: "archivo", text: "Subiste «avance.pdf» a Diseño de Interfaces", time: "Hace 2 h" },
  { id: "a2", icon: "comentario", text: "Nuevo comentario en Estructuras de Datos", time: "Hace 5 h" },
  { id: "a3", icon: "estrella", text: "Calificación nueva en Matemáticas Discretas", time: "Ayer" },
];

export const navItems: { label: string; icon: IconName; href: string }[] = [
  { label: "Inicio", icon: "inicio", href: "/" },
  { label: "Tareas", icon: "tareas", href: "#" },
  { label: "Calendario", icon: "calendario", href: "#" },
  { label: "Materias", icon: "materias", href: "#" },
  { label: "Calificaciones", icon: "calificaciones", href: "#" },
];

/** «Martes 5 de noviembre», en la zona horaria del campus. */
export function formatToday(date: Date = new Date()): string {
  const text = new Intl.DateTimeFormat("es-MX", {
    weekday: "long",
    day: "numeric",
    month: "long",
    timeZone: "America/Mexico_City",
  })
    .format(date)
    .replace(",", "");
  return text.charAt(0).toUpperCase() + text.slice(1);
}
