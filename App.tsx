
import React, { useState, useEffect, useCallback } from 'react';
import { HashRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { ClasificadorPage } from './pages/ClasificadorPage';
import { VisualizadorPage } from './pages/VisualizadorPage';
import { CargarWordPage } from './pages/CargarWordPage';
import { InformeSituacionalPage } from './pages/InformeSituacionalPage';
import { AdminPage } from './pages/AdminPage';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import { HomeIcon, DocumentTextIcon, ChartBarIcon, DocumentAddIcon, PresentationChartLineIcon, CogIcon, MenuIcon, XIcon, SunIcon, MoonIcon } from './components/icons/Icons'; // Assuming combined icons file

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ to, icon, label, onClick }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      onClick={onClick}
      className={`flex items-center space-x-3 p-3 rounded-lg hover:bg-primary-light/20 dark:hover:bg-primary-dark/30 transition-colors duration-150 ${
        isActive ? 'bg-primary-light/30 dark:bg-primary-dark/50 text-primary-DEFAULT dark:text-primary-light font-semibold' : 'text-text-mutedDark hover:text-text-dark'
      }`}
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
};

const Sidebar: React.FC<{ isOpen: boolean; toggleSidebar: () => void }> = ({ isOpen, toggleSidebar }) => {
  const { theme, toggleTheme } = useTheme();

  const navItems = [
    { to: "/", icon: <HomeIcon className="w-6 h-6" />, label: "Inicio" },
    { to: "/clasificador", icon: <DocumentTextIcon className="w-6 h-6" />, label: "Clasificador de Delitos" },
    { to: "/visualizador", icon: <ChartBarIcon className="w-6 h-6" />, label: "Visualizador" },
    { to: "/cargar-word", icon: <DocumentAddIcon className="w-6 h-6" />, label: "Cargar Word Jurisdicción" },
    { to: "/informe", icon: <PresentationChartLineIcon className="w-6 h-6" />, label: "Informe Situacional" },
    { to: "/admin", icon: <CogIcon className="w-6 h-6" />, label: "Administración" },
  ];

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
      <aside
        className={`fixed top-0 left-0 z-40 h-full w-72 bg-background-altDark text-text-dark p-6 transform transition-transform duration-300 ease-in-out md:translate-x-0 ${
          isOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'
        } md:relative md:shadow-none md:w-72 flex flex-col`}
      >
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-primary-light">POCAD</h1>
          <button onClick={toggleSidebar} className="md:hidden text-text-mutedDark hover:text-text-dark">
            <XIcon className="w-7 h-7" />
          </button>
        </div>
        <nav className="flex-grow space-y-2">
          {navItems.map((item) => (
            <NavItem key={item.to} {...item} onClick={isOpen && window.innerWidth < 768 ? toggleSidebar : undefined} />
          ))}
        </nav>
        <div className="mt-auto pt-6 border-t border-gray-700">
           <button
            onClick={toggleTheme}
            className="w-full flex items-center justify-center p-3 rounded-lg bg-gray-700 hover:bg-gray-600 text-text-mutedDark hover:text-text-dark transition-colors"
          >
            {theme === 'dark' ? <SunIcon className="w-6 h-6 mr-2" /> : <MoonIcon className="w-6 h-6 mr-2" />}
            <span>{theme === 'dark' ? 'Modo Claro' : 'Modo Oscuro'}</span>
          </button>
        </div>
      </aside>
    </>
  );
};

const AppContent: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = useCallback(() => {
    setSidebarOpen(prev => !prev);
  }, []);

  return (
    <div className="flex h-screen bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark overflow-hidden">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      <main className="flex-1 flex flex-col overflow-y-auto">
        <header className="sticky top-0 z-20 bg-background-light dark:bg-background-dark/80 backdrop-blur-md shadow-sm p-4 md:hidden">
          <div className="flex items-center justify-between">
            <button onClick={toggleSidebar} className="text-text-light dark:text-text-dark">
              <MenuIcon className="w-7 h-7" />
            </button>
            <span className="text-xl font-semibold text-primary-DEFAULT dark:text-primary-light">POCAD</span>
             {/* Placeholder for potential header actions */}
             <div></div>
          </div>
        </header>
        <div className="p-6 flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/clasificador" element={<ClasificadorPage />} />
            <Route path="/visualizador" element={<VisualizadorPage />} />
            <Route path="/cargar-word" element={<CargarWordPage />} />
            <Route path="/informe" element={<InformeSituacionalPage />} />
            <Route path="/admin" element={<AdminPage />} />
          </Routes>
        </div>
        <footer className="text-center p-4 text-xs text-text-mutedLight dark:text-text-mutedDark border-t border-neutral-DEFAULT dark:border-gray-700">
          © {new Date().getFullYear()} Jorge Alejandro Carrizo - Plataforma POCAD. Todos los derechos reservados.
        </footer>
      </main>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <HashRouter>
        <AppContent />
      </HashRouter>
    </ThemeProvider>
  );
};

export default App;
