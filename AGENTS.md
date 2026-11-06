# Guía para trabajar en este proyecto

## Contexto y arquitectura
- Este proyecto es una aplicación web para: que un estudiante vea de un vistazo sus tareas pendientes, su próxima entrega y su progreso del semestre (Campus Hub).
- La referencia visual es el diseño de Figma (página «2 · Color», marco «Campus Hub — Final») y su captura en `docs/diseno/figma-final.png`. No agregues elementos visuales que no estén en el diseño sin consultar.
- Lee el README, [docs/architecture.md](docs/architecture.md) y el código relacionado antes de cambiar algo.
- Actualiza la arquitectura si cambias la organización o las responsabilidades del sistema.

## Tecnologías a usar
- TypeScript con modo estricto, React 19 y Next.js 15 con App Router.
- Tailwind CSS 4 para los estilos. Los tokens de diseño (colores, radios, anchos) viven en `@theme` dentro de `src/app/globals.css`.
- Fuente Plus Jakarta Sans servida localmente desde `src/app/fonts/` con `next/font/local`.
- npm como gestor de dependencias; conserva `package-lock.json`.
- Usa las versiones declaradas en `package.json` y el archivo de bloqueo. No actualices versiones principales ni agregues tecnologías sin consultar.
- Almacenamiento: sin base de datos. Las tareas nuevas viven en el estado del cliente y se pierden al recargar. Define la persistencia en la arquitectura antes de incorporarla.

## Estándares de código
- Usa componentes y tipos con nombres en PascalCase; funciones y variables en camelCase.
- Define tipos para las props; evita `any` y reutiliza los tipos del dominio (`src/lib/tasks.ts`).
- Mantén los componentes pequeños y separa la lógica de negocio de la presentación.
- Usa Server Components por defecto. Añade `"use client"` solo cuando necesites estado, eventos o APIs del navegador.
- Mantén secretos y acceso a datos privados en el servidor; no los expongas mediante variables `NEXT_PUBLIC_*`.
- Usa HTML semántico, etiquetas en formularios y estados de foco visibles.
- Usa clases completas de Tailwind: evita construirlas como `bg-${color}-500`; mapea variantes a clases literales.
- Usa los tokens del proyecto (`bg-primario`, `text-texto-sec`, `rounded-tarjeta`…) en lugar de colores sueltos.
- Valida las entradas del usuario y muestra errores comprensibles.
- Al cambiar comportamiento, agrega o ajusta pruebas si el proyecto ya tiene una suite (por ahora no tiene).

## Cómo trabajar
1. Haz cambios pequeños y sigue las convenciones existentes.
2. Evita dependencias nuevas si lo disponible resuelve la tarea.
3. Ejecuta `npm run lint` y `npm run build`. No inventes comandos ni resultados.
4. Para cambios visuales, verifica la pantalla en móvil (375 px) y escritorio (1440 px), incluidos los estados de error y de lista vacía.
5. Explica qué cambiaste, cómo lo verificaste y qué quedó pendiente.

## Límites
- Pide confirmación antes de borrar datos o modificar producción.
- No incluyas contraseñas ni claves en el código o en tus respuestas.
- Si no pudiste ejecutar una verificación, dilo.
