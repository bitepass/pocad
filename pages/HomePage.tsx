
import React from 'react';
import { ChartBarIcon, DocumentTextIcon, CogIcon } from '../components/icons/Icons';

export const HomePage: React.FC = () => {
  return (
    <div className="animate-fadeIn">
      <header className="mb-10">
        <h1 className="text-4xl font-bold text-primary-DEFAULT dark:text-primary-light mb-2">
          Bienvenido a POCAD
        </h1>
        <p className="text-xl text-text-mutedLight dark:text-text-mutedDark">
          Plataforma OSINT, Clasificación y Análisis Delictual.
        </p>
      </header>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-text-light dark:text-text-dark border-b-2 border-primary-light/50 pb-2">
          Propósito Institucional
        </h2>
        <p className="text-lg leading-relaxed text-text-light dark:text-text-dark bg-background-light dark:bg-background-altDark p-6 rounded-lg shadow-md">
          Centralizar, estructurar y visualizar información criminal obtenida desde fuentes OSINT y canales internos, 
          con el fin de generar inteligencia situacional automatizada y visual, organizada por jurisdicción policial.
        </p>
      </section>

      <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        <FeatureCard
          icon={<DocumentTextIcon className="w-12 h-12 text-secondary-DEFAULT" />}
          title="Clasificador de Delitos"
          description="Automatiza la clasificación de delitos a partir de relatos, optimizando el análisis."
        />
        <FeatureCard
          icon={<ChartBarIcon className="w-12 h-12 text-secondary-DEFAULT" />}
          title="Visualizador Interactivo"
          description="Explora datos delictuales mediante mapas y gráficos dinámicos para una mejor comprensión."
        />
        <FeatureCard
          icon={<CogIcon className="w-12 h-12 text-secondary-DEFAULT" />}
          title="Gestión Eficiente"
          description="Carga informes, genera reportes situacionales y administra la plataforma de forma centralizada."
        />
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-6 text-text-light dark:text-text-dark border-b-2 border-primary-light/50 pb-2">
          Visión a Futuro
        </h2>
        <ul className="list-disc list-inside space-y-3 text-lg text-text-light dark:text-text-dark bg-background-light dark:bg-background-altDark p-6 rounded-lg shadow-md">
          <li>Integración con OCR para la digitalización de documentos.</li>
          <li>Motor de alertas inteligentes para la detección temprana de patrones.</li>
          <li>Reconocimiento de entidades en los relatos para enriquecer el análisis.</li>
          <li>Interconexión con sistemas policiales internos para un flujo de información integrado.</li>
          <li>App móvil cerrada para acceso en campo.</li>
          <li>Historial de evolución criminal para seguimiento a largo plazo.</li>
          <li>Módulo de consultas institucionales avanzado.</li>
        </ul>
      </section>
    </div>
  );
};

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => (
  <div className="bg-background-light dark:bg-background-altDark p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col items-center text-center">
    <div className="mb-4 p-3 bg-secondary-light/20 rounded-full">
      {icon}
    </div>
    <h3 className="text-xl font-semibold mb-2 text-primary-DEFAULT dark:text-primary-light">{title}</h3>
    <p className="text-text-mutedLight dark:text-text-mutedDark leading-relaxed">{description}</p>
  </div>
);
