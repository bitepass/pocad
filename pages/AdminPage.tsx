
import React from 'react';
import { CogIcon } from '../components/icons/Icons';

export const AdminPage: React.FC = () => {
  // Mock data for settings
  const settings = [
    { id: 'user_management', name: 'Gestión de Usuarios', description: 'Administrar usuarios y permisos de acceso.' },
    { id: 'system_logs', name: 'Registros del Sistema', description: 'Ver registros de actividad y errores del sistema.' },
    { id: 'data_sources', name: 'Fuentes de Datos', description: 'Configurar conexiones a fuentes de datos OSINT e internas.' },
    { id: 'backup_restore', name: 'Copia de Seguridad y Restauración', description: 'Gestionar copias de seguridad de la base de datos.' },
    { id: 'api_keys', name: 'Claves API Externas', description: 'Administrar claves API para servicios externos (mapas, OCR, etc.).' },
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      <header className="pb-4 border-b border-neutral-DEFAULT dark:border-gray-700">
        <h1 className="text-3xl font-bold text-primary-DEFAULT dark:text-primary-light">Administración del Sistema</h1>
        <p className="text-md text-text-mutedLight dark:text-text-mutedDark mt-1">
          Configuraciones generales, gestión de usuarios y mantenimiento de la plataforma POCAD.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {settings.map(setting => (
          <div key={setting.id} className="bg-background-light dark:bg-background-altDark p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center mb-3">
              <CogIcon className="w-8 h-8 text-secondary-DEFAULT mr-3" />
              <h2 className="text-xl font-semibold text-primary-DEFAULT dark:text-primary-light">{setting.name}</h2>
            </div>
            <p className="text-sm text-text-mutedLight dark:text-text-mutedDark mb-4">{setting.description}</p>
            <button className="px-4 py-2 text-sm font-medium text-white bg-primary-DEFAULT hover:bg-primary-dark rounded-md transition-colors disabled:opacity-50"
                    disabled={true} /* Functionality to be implemented */ >
              Configurar (Próximamente)
            </button>
          </div>
        ))}
      </div>
      
      <div className="mt-8 bg-background-light dark:bg-background-altDark p-6 rounded-xl shadow-lg">
        <h2 className="text-xl font-semibold text-primary-DEFAULT dark:text-primary-light mb-4">Implementación Sugerida</h2>
        <ul className="list-disc list-inside space-y-2 text-text-light dark:text-text-dark">
            <li>Servidor con Docker (RAM 8GB ideal)</li>
            <li>Acceso VPN o LAN (Entorno cerrado)</li>
            <li>Sistema en servidor físico o nube cerrada</li>
            <li>Mantenimiento técnico regular</li>
        </ul>
      </div>

       <p className="text-sm text-text-mutedLight dark:text-text-mutedDark">
        Nota: Las opciones de administración son representaciones. Se requiere implementar la lógica y funcionalidades correspondientes.
      </p>
    </div>
  );
};
