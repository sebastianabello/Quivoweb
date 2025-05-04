import React, { ReactNode } from "react";
import { Link } from "react-router-dom";

export default function CustomerLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
        <div className="text-2xl font-bold text-teal-600 flex items-center gap-2">
          <img src="/logo.svg" alt="Quivo" className="h-8" />
          <Link to="/">Quivo</Link>
        </div>
        <Link
          to="/login"
          className="text-sm font-medium text-teal-700 hover:underline"
        >
          Iniciar sesión
        </Link>
      </header>

      <main className="flex-1 px-6 py-8 max-w-screen-xl mx-auto w-full">
        {children}
      </main>

      <footer className="bg-gray-100 text-center text-sm text-gray-500 py-4">
        © {new Date().getFullYear()} Quivo. Todos los derechos reservados.
      </footer>
    </div>
  );
}
