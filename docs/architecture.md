# Arquitectura: Campus Hub (Next.js y Tailwind CSS)

Aplicación de una sola página con App Router. La página se renderiza en el
servidor; solo la parte de tareas (agregar y marcar) se ejecuta en el cliente.

## Organización

| Ruta | Responsabilidad |
| --- | --- |
| `src/app/layout.tsx` | Layout raíz, idioma `es`, carga de la fuente local y del CSS global. |
| `src/app/page.tsx` | Página de inicio: compone la barra lateral y el panel, y calcula la fecha del saludo en cada visita. |
| `src/app/globals.css` | Entrada de Tailwind y tokens de diseño (`@theme`): colores, radios y anchos del diseño de Figma. |
| `src/app/fonts/` | Archivo de la fuente Plus Jakarta Sans (variable, subconjunto latino). |
| `src/components/Sidebar.tsx` | Navegación: barra lateral en escritorio y barra inferior en móvil. |
| `src/components/TaskDashboard.tsx` | Componente cliente con el estado de las tareas: saludo, tarjetas de dato, formulario y lista. |
| `src/components/AddTaskForm.tsx` | Formulario «Agregar tarea» con validación y mensajes de error. |
| `src/components/TaskCard.tsx`, `StatCard.tsx` | Tarjetas reutilizables (equivalen a los componentes de Figma). |
| `src/components/ProgressCard.tsx`, `ActivityCard.tsx` | Columna lateral (Server Components). |
| `src/components/Icon.tsx` | Íconos SVG con los mismos trazos que en Figma. |
| `src/lib/tasks.ts` | Dominio de tareas: tipos, datos de ejemplo, orden, textos de fecha y validación. |
| `src/lib/dashboard.ts` | Datos de ejemplo del estudiante, del progreso y de la actividad; formato de fecha. |
| `docs/` | Diseño de referencia, capturas, especificación y entregables. |

## Flujo principal

1. `page.tsx` (servidor) lee los datos de ejemplo y la fecha, y renderiza `ProgressCard` y `ActivityCard`.
2. Pasa las tareas iniciales a `TaskDashboard` (cliente) y la columna lateral ya renderizada como `aside`.
3. Al pulsar «Agregar tarea», `AddTaskForm` valida la entrada con `validateNewTask`.
   Si es válida, `TaskDashboard` agrega la tarea al estado; la lista se reordena con
   `sortTasks` y se recalculan el saludo, «Pendientes» y «Próxima entrega».

## Límites entre partes

- Los componentes de presentación no contienen reglas de negocio; las reglas (orden, textos de fecha, validación) están en `src/lib/tasks.ts`.
- Solo `TaskDashboard` y `AddTaskForm` son componentes cliente. La columna lateral se pasa como prop ya renderizada para que siga en el servidor.
- No hay persistencia: las tareas agregadas se pierden al recargar. Si se agrega almacenamiento, documenta aquí su flujo y valida en el servidor.

## Decisiones y motivos

- **Tokens en `@theme`:** Tailwind genera a la vez variables CSS (`--color-primario`) y clases (`bg-primario`), así que código y Figma comparten los mismos nombres.
- **Fuente local:** la descarga de Google Fonts al compilar fallaba en este equipo y se usaba una fuente de respaldo; con `next/font/local` la tipografía no depende de la red.
- **Fecha dinámica (`force-dynamic`):** el saludo muestra el día real de la visita y no el día de la compilación.
- **Formulario en línea:** el diseño no tenía un formulario. Se agregó la versión mínima, con el mismo estilo de tarjeta, para que «Agregar tarea» funcione.
