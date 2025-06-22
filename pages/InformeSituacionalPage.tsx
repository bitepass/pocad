
import React, { useState, useCallback } from 'react';
import { PresentationChartLineIcon, CheckCircleIcon, ExclamationCircleIcon } from '../components/icons/Icons';

// Mock API function for generating report
const generateSituationalReport = async (params: { startDate: string; endDate: string; zones: string[]; reportType: string }): Promise<{ success: boolean; message: string; reportUrl?: string }> => {
  await new Promise(resolve => setTimeout(resolve, 2500)); // Simulate generation time
  console.log("Generating report with params:", params);
  if (params.zones.includes("error_zone")) {
    return { success: false, message: "Error al generar el informe: Parámetros inválidos para la zona." };
  }
  // Simulate a downloadable report URL (e.g., a link to a generated Word/PDF file)
  return { success: true, message: "Informe situacional generado exitosamente.", reportUrl: "/mock-reports/situational_report_Q3_2024.docx" };
};

export const InformeSituacionalPage: React.FC = () => {
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [selectedZones, setSelectedZones] = useState<string[]>([]);
  const [reportType, setReportType] = useState<string>('mensual');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState<boolean | null>(null);
  const [generatedReportUrl, setGeneratedReportUrl] = useState<string | null>(null);

  const handleZoneChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const zone = event.target.value;
    setSelectedZones(prev => 
      prev.includes(zone) ? prev.filter(z => z !== zone) : [...prev, zone]
    );
  }, []);

  const handleSubmit = useCallback(async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!startDate || !endDate || selectedZones.length === 0) {
      setStatusMessage("Por favor, complete todos los campos requeridos (fechas y al menos una zona).");
      setIsSuccess(false);
      return;
    }

    setIsGenerating(true);
    setStatusMessage("Generando informe situacional...");
    setIsSuccess(null);
    setGeneratedReportUrl(null);

    try {
      const result = await generateSituationalReport({ startDate, endDate, zones: selectedZones, reportType });
      setStatusMessage(result.message);
      setIsSuccess(result.success);
      if (result.success && result.reportUrl) {
        setGeneratedReportUrl(result.reportUrl);
      }
    } catch (error) {
      console.error("Error generating report:", error);
      setStatusMessage("Error de conexión o respuesta inesperada del servidor.");
      setIsSuccess(false);
    } finally {
      setIsGenerating(false);
    }
  }, [startDate, endDate, selectedZones, reportType]);

  const availableZones = ["Zona Norte", "Zona Sur", "Zona Centro", "Zona Este", "Zona Oeste", "error_zone"];

  return (
    <div className="space-y-8 animate-fadeIn">
      <header className="pb-4 border-b border-neutral-DEFAULT dark:border-gray-700">
        <h1 className="text-3xl font-bold text-primary-DEFAULT dark:text-primary-light">Generador de Informe Situacional</h1>
        <p className="text-md text-text-mutedLight dark:text-text-mutedDark mt-1">
          Genere informes situacionales (bajo demanda) basados en los parámetros seleccionados.
        </p>
      </header>

      <div className="bg-background-light dark:bg-background-altDark p-6 sm:p-8 rounded-xl shadow-lg">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="start-date" className="block text-sm font-medium text-text-light dark:text-text-dark">Fecha de Inicio</label>
              <input type="date" id="start-date" value={startDate} onChange={(e) => setStartDate(e.target.value)} required 
                     className="mt-1 block w-full pl-3 pr-2 py-2 text-base border-neutral-DEFAULT dark:border-gray-600 dark:bg-gray-700 dark:text-text-dark focus:outline-none focus:ring-primary-light focus:border-primary-light sm:text-sm rounded-md"/>
            </div>
            <div>
              <label htmlFor="end-date" className="block text-sm font-medium text-text-light dark:text-text-dark">Fecha de Fin</label>
              <input type="date" id="end-date" value={endDate} onChange={(e) => setEndDate(e.target.value)} required
                     className="mt-1 block w-full pl-3 pr-2 py-2 text-base border-neutral-DEFAULT dark:border-gray-600 dark:bg-gray-700 dark:text-text-dark focus:outline-none focus:ring-primary-light focus:border-primary-light sm:text-sm rounded-md"/>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-light dark:text-text-dark">Jurisdicciones (seleccione al menos una)</label>
            <div className="mt-2 grid grid-cols-2 sm:grid-cols-3 gap-4 max-h-48 overflow-y-auto p-2 border border-neutral-DEFAULT dark:border-gray-600 rounded-md">
              {availableZones.map(zone => (
                <label key={zone} className="flex items-center space-x-2 p-2 rounded-md hover:bg-neutral-light/50 dark:hover:bg-gray-600/50 transition-colors cursor-pointer">
                  <input type="checkbox" value={zone} checked={selectedZones.includes(zone)} onChange={handleZoneChange}
                         className="form-checkbox h-5 w-5 text-primary-DEFAULT dark:text-primary-light bg-gray-700 border-gray-600 focus:ring-primary-light"/>
                  <span className="text-sm text-text-light dark:text-text-dark">{zone}</span>
                </label>
              ))}
            </div>
          </div>
          
          <div>
            <label htmlFor="report-type" className="block text-sm font-medium text-text-light dark:text-text-dark">Tipo de Informe</label>
            <select id="report-type" value={reportType} onChange={(e) => setReportType(e.target.value)}
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-neutral-DEFAULT dark:border-gray-600 dark:bg-gray-700 dark:text-text-dark focus:outline-none focus:ring-primary-light focus:border-primary-light sm:text-sm rounded-md">
              <option value="mensual">Mensual</option>
              <option value="trimestral">Trimestral</option>
              <option value="anual">Anual</option>
              <option value="personalizado">Personalizado por Partido</option>
            </select>
          </div>

          <div>
            <button
              type="submit"
              disabled={isGenerating}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-primary-DEFAULT hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-light disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isGenerating ? (
                <>
                  <PresentationChartLineIcon className="animate-spin h-5 w-5 mr-3" />
                  Generando Informe...
                </>
              ) : 'Generar Informe'}
            </button>
          </div>
        </form>

        {statusMessage && (
          <div className={`mt-6 p-4 rounded-md flex items-start ${isSuccess ? 'bg-green-100 dark:bg-green-900/50 border-green-500' : 'bg-red-100 dark:bg-red-900/50 border-red-500'} border-l-4`}>
            {isSuccess ? <CheckCircleIcon className="h-6 w-6 text-green-500 dark:text-green-400 mr-3" /> : <ExclamationCircleIcon className="h-6 w-6 text-red-500 dark:text-red-400 mr-3" />}
            <div className="flex-grow">
              <p className={`text-sm ${isSuccess ? 'text-green-700 dark:text-green-300' : 'text-red-700 dark:text-red-300'}`}>{statusMessage}</p>
              {isSuccess && generatedReportUrl && (
                <a 
                  href={generatedReportUrl} 
                  download 
                  className="mt-2 inline-block text-sm font-medium text-primary-DEFAULT dark:text-primary-light hover:underline"
                >
                  Descargar Informe (Simulado)
                </a>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
