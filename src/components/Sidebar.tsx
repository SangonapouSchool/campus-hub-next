import { Icon } from "@/components/Icon";
import { navItems, student } from "@/lib/dashboard";

/**
 * Escritorio: barra lateral fija como en el diseño de Figma.
 * Móvil: encabezado compacto arriba y la navegación como barra inferior de 5 pestañas,
 * para que no haya scroll horizontal y los destinos queden al alcance del pulgar.
 */
export function Sidebar() {
  return (
    <aside className="flex items-center justify-between border-b border-borde bg-superficie px-4 py-3 md:sticky md:top-0 md:h-screen md:w-barra md:shrink-0 md:flex-col md:items-stretch md:justify-start md:gap-8 md:border-r md:border-b-0 md:px-5 md:py-7">
      <div className="flex items-center gap-2.5 md:pl-1.5">
        <span className="grid size-[34px] place-items-center rounded-control bg-primario text-lg font-extrabold text-superficie">
          C
        </span>
        <span className="text-xl font-extrabold">Campus Hub</span>
      </div>

      <span
        className="grid size-9 place-items-center rounded-full bg-tinte-primario text-sm font-bold text-primario md:hidden"
        aria-label={student.fullName}
        role="img"
      >
        {student.initials}
      </span>

      <nav
        aria-label="Principal"
        className="fixed inset-x-0 bottom-0 z-20 border-t border-borde bg-superficie pb-[env(safe-area-inset-bottom)] md:static md:border-t-0 md:pb-0"
      >
        <ul className="grid grid-cols-5 md:flex md:flex-col md:gap-1">
          {navItems.map((item, i) => {
            const active = i === 0;
            return (
              <li key={item.label}>
                <a
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`flex flex-col items-center gap-1 px-1 py-2 text-[10px] font-semibold focus-visible:outline-3 focus-visible:-outline-offset-3 focus-visible:outline-primario md:flex-row md:gap-3 md:rounded-control md:px-3.5 md:py-3 md:text-[15px] md:focus-visible:outline-offset-2 ${
                    active
                      ? "text-primario md:bg-primario md:text-superficie"
                      : "text-texto-sec hover:text-texto md:hover:bg-tinte-neutro"
                  }`}
                >
                  <Icon name={item.icon} />
                  {item.label}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="mt-auto hidden items-center gap-3 rounded-boton bg-fondo p-3 md:flex">
        <span className="grid size-10 place-items-center rounded-full bg-tinte-primario text-sm font-bold text-primario">
          {student.initials}
        </span>
        <span className="flex flex-col">
          <span className="text-sm font-bold">{student.fullName}</span>
          <span className="text-xs font-medium text-texto-sec">{student.semester}</span>
        </span>
      </div>
    </aside>
  );
}
