import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

// Fuente local (variable, pesos 400–800, subconjunto latino) para no depender de
// descargar Google Fonts al compilar: en este equipo esa descarga fallaba y Next
// usaba una fuente de respaldo distinta a la del diseño.
const jakarta = localFont({
  src: "./fonts/PlusJakartaSans-latin.woff2",
  variable: "--font-jakarta",
  weight: "400 800",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Campus Hub",
  description: "Tus tareas, próximas entregas y progreso del semestre en un vistazo.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={jakarta.variable}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
