# Campus Hub

Panel de inicio para estudiantes: tareas pendientes, próxima entrega, progreso del
semestre y actividad reciente. Implementado a partir del diseño de Figma
[Campus Hub](https://www.figma.com/design/MLtAymzDRXPkzoqJ8g399Y).

## Cómo ejecutarlo

Requisitos: Node.js 20 o superior y npm.

```bash
npm install
npm run dev
```

Abre <http://localhost:3000>.

Otros comandos:

- `npm run lint`: revisa el código con ESLint.
- `npm run build`: compila la versión de producción (también verifica los tipos).

## Qué validar

- El botón **Agregar tarea** abre un formulario. Si lo envías vacío, aparece
  «Escribe el nombre de la tarea.». Una tarea válida se agrega a la lista ordenada
  por fecha, y se actualizan el saludo, «Pendientes» y «Próxima entrega».
- El círculo de cada tarea la marca como completada o pendiente.
- A 375 px de ancho (herramientas de desarrollador → modo dispositivo) la
  navegación pasa a una barra inferior y no hay scroll horizontal.

## Documentación

- [docs/entrega.md](docs/entrega.md): entregables de la práctica (paleta, Gestalt,
  comparación con Figma, capturas y reflexión).
- [docs/especificacion.md](docs/especificacion.md): especificación de interfaz
  sacada del diseño (Prompt 1).
- [docs/architecture.md](docs/architecture.md): organización del código.
- [AGENTS.md](AGENTS.md): guía para trabajar con un agente de programación.
