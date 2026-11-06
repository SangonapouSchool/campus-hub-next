# Especificación de interfaz: Campus Hub (Prompt 1)

Fuente: marco «Campus Hub — Final» (1440 × 1024) del archivo de Figma
[Campus Hub](https://www.figma.com/design/MLtAymzDRXPkzoqJ8g399Y). Captura: `docs/diseno/figma-final.png`.

## 1. Estructura de la página

- **Barra lateral** (248 px, fondo Superficie, borde derecho): logo, navegación
  (Inicio activo, Tareas, Calendario, Materias, Calificaciones) y tarjeta de usuario abajo.
- **Contenido** (padding 40 / 48 px, separación vertical 32 px):
  - **Bienvenida:** fecha, «¡Hola, Ana!», resumen de pendientes; a la derecha, el botón «Agregar tarea».
  - **Cuerpo** en dos columnas (separación de 32 px):
    - Izquierda (flexible): 3 tarjetas de dato, el encabezado «Tus tareas» con «Ver todas» y la lista de tarjetas de tarea.
    - Derecha (372 px): tarjeta «Progreso del semestre» y tarjeta «Actividad reciente».

## 2. Componentes reutilizables

| Componente | Propiedades |
| --- | --- |
| Elemento de navegación | Etiqueta, Ícono; estado activo |
| Tarjeta de tarea | Materia, Tarea, Entrega, Estado (En progreso, Pendiente, Completada) |
| Tarjeta de dato | Etiqueta, Valor, Detalle; variante urgente (borde y valor en Alerta) |
| Actividad | Ícono, Descripción, Tiempo |
| Ícono | inicio, tareas, calendario, materias, calificaciones, agregar, archivo, comentario, estrella |

## 3. Jerarquía tipográfica (Plus Jakarta Sans)

| Uso | Tamaño / peso |
| --- | --- |
| Saludo (H1) | 36 / ExtraBold |
| Valor de tarjeta de dato | 30 / ExtraBold |
| Promedio, porcentaje del anillo | 28 y 26 / ExtraBold |
| Título de sección «Tus tareas» | 22 / Bold |
| Título de tarjeta lateral | 18 / Bold |
| Título de tarea | 17 / Bold |
| Resumen, navegación, botón | 16 y 15 / Medium–Bold |
| Fecha de entrega, actividad | 14 / Medium |
| Materia y etiquetas (MAYÚSCULAS, +6 % de espaciado) | 12 / Bold |

## 4. Colores y su función

Ver la tabla de la paleta en [entrega.md](entrega.md#2-paleta).

## 5. Márgenes, separaciones y alineaciones

- Radios: botón 12, tarjeta 14, panel 16, chip 999.
- Padding: tarjetas de tarea 18 / 20; tarjetas de dato 18 / 20; paneles laterales 24.
- Separaciones: entre tarjetas de tarea 12; entre bloques de una columna 24; entre columnas 32.
- Alineación: todo el contenido izquierdo comparte el borde x = 296; la fecha y el chip de cada tarea se alinean a la derecha.

## 6. Principios Gestalt

Proximidad, semejanza, figura-fondo, continuidad y cierre. Están señalados en la página
«3 · Gestalt» de Figma y en [entrega.md](entrega.md#3-principios-gestalt).

## Puntos que no se pueden determinar con certeza desde el diseño

- **Comportamiento de «Agregar tarea»:** el diseño no muestra el formulario.
  *Decisión:* un formulario en línea arriba de la lista, con el estilo de tarjeta y tres campos: tarea, materia y días para la entrega.
- **Móvil:** solo hay un marco de escritorio.
  *Decisión:* una columna y la navegación como barra inferior (ver la comparación en entrega.md).
- **Fecha:** el diseño muestra «Martes 5 de noviembre» como ejemplo.
  *Decisión:* la app muestra la fecha real.
- **«Ver todas» y los demás destinos de la navegación:** no existen otras pantallas, así que son enlaces de marcador de posición.
- **Círculo de la tarjeta de tarea:** en el diseño parece una casilla.
  *Decisión:* marca la tarea como completada o pendiente.
