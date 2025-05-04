import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.svg";
import { MdLanguage } from "react-icons/md";

export default function CustomerLayout({ children }: { children: React.ReactNode }) {
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const langRef = useRef(null);
  const userRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (langRef.current && !(langRef.current as any).contains(e.target)) {
        setShowLangMenu(false);
      }
      if (userRef.current && !(userRef.current as any).contains(e.target)) {
        setShowUserMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="font-opensans min-h-screen flex flex-col">
      <header className="relative w-full h-20 px-4 md:px-10 xl:px-20 flex items-center justify-between bg-white shadow">
        {/* IZQUIERDA: Logo + Nombre */}
        <div className="flex items-center gap-2">
          <img src={logo} alt="Quivo" className="h-8" />
          <span className="text-teal-700 text-xl font-bold">Quivo</span>
        </div>

        {/* CENTRO: Texto centrado */}
        <div className="absolute left-1/2 -translate-x-1/2 text-sm font-medium text-gray-600 hidden md:block">
          Reserva tu alojamiento con Quivo
        </div>

        {/* DERECHA: Icono idioma + Login */}
        <div className="flex items-center gap-3">
          <div className="relative" ref={langRef}>
            <button
              onClick={() => setShowLangMenu(!showLangMenu)}
              className="text-gray-700 hover:text-teal-600"
              title="Cambiar idioma"
            >
              <MdLanguage className="text-xl" />
            </button>
            {showLangMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded shadow-md text-sm z-50">
                <button className="w-full text-left px-4 py-2 hover:bg-gray-100">Español</button>
                <button className="w-full text-left px-4 py-2 hover:bg-gray-100">English</button>
              </div>
            )}
          </div>

          <div className="relative" ref={userRef}>
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="px-4 py-1 rounded bg-teal-600 text-white text-sm font-bold hover:bg-teal-700 transition"
            >
              Login
            </button>
            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded shadow-md text-sm z-50">
                <Link to="/login" className="block px-4 py-2 hover:bg-gray-100">Inicia sesión</Link>
                <Link to="/register" className="block px-4 py-2 hover:bg-gray-100">Regístrate</Link>
                <hr className="my-1 border-t border-gray-300" />
                <button className="w-full text-left px-4 py-2 hover:bg-gray-100">Organiza una experiencia</button>
                <button className="w-full text-left px-4 py-2 hover:bg-gray-100">Centro de ayuda</button>
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="flex-1 px-4 md:px-10 xl:px-20 py-8 w-full max-w-screen-2xl mx-auto">
        {children}
      </main>

      <footer className="bg-gray-100 text-center text-sm text-gray-500 py-4 px-4 md:px-10 xl:px-20">
        © {new Date().getFullYear()} Quivo. Todos los derechos reservados.
      </footer>
    </div>
  );
}
