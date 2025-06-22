
import React, { useState, useCallback, ChangeEvent } from 'react';
import { UploadIcon, CheckCircleIcon, ExclamationCircleIcon, DocumentDuplicateIcon } from '../components/icons/Icons'; // Assuming combined icons file

// Mock API function - replace with your actual API call
const processExcelFile = async (file: File): Promise<{ success: boolean; message: string; data?: any }> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 2000));

  // Simulate success/error
  if (file.name.includes("error")) {
    return { success: false, message: "Error simulado al procesar el archivo." };
  }
  
  // Simulate successful processing
  // In a real scenario, this would be the data returned from your Flask backend
  const classifiedData = [
    { relato: "Robo en tienda X", clasificacion: "Robo Agravado", confianza: 0.95 },
    { relato: "Incidente en calle Y", clasificacion: "Alteración del Orden Público", confianza: 0.88 },
  ];
  return { success: true, message: "Archivo procesado y clasificado exitosamente.", data: classifiedData };
};


export const ClasificadorPage: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState<boolean | null>(null);
  const [processedData, setProcessedData] = useState<any[] | null>(null);

  const handleFileChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
      setStatusMessage(null);
      setIsSuccess(null);
      setProcessedData(null);
    }
  }, []);

  const handleSubmit = useCallback(async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!selectedFile) {
      setStatusMessage("Por favor, seleccione un archivo Excel.");
      setIsSuccess(false);
      return;
    }

    setIsProcessing(true);
    setStatusMessage("Procesando archivo...");
    setIsSuccess(null);
    setProcessedData(null);

    try {
      // Here you would call your actual Flask API endpoint
      // const formData = new FormData();
      // formData.append('excel_file', selectedFile);
      // const response = await fetch('/process-excel', { method: 'POST', body: formData });
      // const result = await response.json();

      const result = await processExcelFile(selectedFile); // Using mock function

      if (result.success) {
        setStatusMessage(result.message);
        setIsSuccess(true);
        setProcessedData(result.data); // Store processed data for display
      } else {
        setStatusMessage(result.message || "Ocurrió un error al procesar el archivo.");
        setIsSuccess(false);
      }
    } catch (error) {
      console.error("Error processing file:", error);
      setStatusMessage("Error de conexión o respuesta inesperada del servidor.");
      setIsSuccess(false);
    } finally {
      setIsProcessing(false);
    }
  }, [selectedFile]);

  return (
    <div className="space-y-8 animate-fadeIn">
      <header className="pb-4 border-b border-neutral-DEFAULT dark:border-gray-700">
        <h1 className="text-3xl font-bold text-primary-DEFAULT dark:text-primary-light">Clasificador Automático de Delitos</h1>
        <p className="text-md text-text-mutedLight dark:text-text-mutedDark mt-1">
          Cargue un archivo Excel con los relatos para su clasificación automática.
        </p>
      </header>

      <div className="bg-background-light dark:bg-background-altDark p-6 sm:p-8 rounded-xl shadow-lg">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="excel-upload" className="block text-sm font-medium text-text-light dark:text-text-dark mb-1">
              Seleccionar archivo Excel (.xlsx, .xls)
            </label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-neutral-DEFAULT dark:border-gray-600 border-dashed rounded-md">
              <div className="space-y-1 text-center">
                <UploadIcon className="mx-auto h-12 w-12 text-text-mutedLight dark:text-text-mutedDark" />
                <div className="flex text-sm text-text-mutedLight dark:text-text-mutedDark">
                  <label
                    htmlFor="excel-upload-input"
                    className="relative cursor-pointer bg-background-light dark:bg-background-altDark rounded-md font-medium text-primary-DEFAULT dark:text-primary-light hover:text-primary-dark dark:hover:text-primary-DEFAULT focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-light"
                  >
                    <span>Cargar un archivo</span>
                    <input id="excel-upload-input" name="excel-upload" type="file" className="sr-only" onChange={handleFileChange} accept=".xlsx, .xls" />
                  </label>
                  <p className="pl-1">o arrastrar y soltar</p>
                </div>
                {selectedFile ? (
                  <p className="text-xs text-text-light dark:text-text-dark">{selectedFile.name}</p>
                ) : (
                  <p className="text-xs text-text-mutedLight dark:text-text-mutedDark">Hasta 10MB</p>
                )}
              </div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isProcessing || !selectedFile}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-primary-DEFAULT hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-light disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isProcessing ? 'Procesando...' : 'Clasificar Archivo'}
            </button>
          </div>
        </form>

        {statusMessage && (
          <div className={`mt-6 p-4 rounded-md flex items-start ${isSuccess ? 'bg-green-100 dark:bg-green-900/50 border-green-500' : 'bg-red-100 dark:bg-red-900/50 border-red-500'} border-l-4`}>
            {isSuccess ? <CheckCircleIcon className="h-6 w-6 text-green-500 dark:text-green-400 mr-3" /> : <ExclamationCircleIcon className="h-6 w-6 text-red-500 dark:text-red-400 mr-3" />}
            <p className={`text-sm ${isSuccess ? 'text-green-700 dark:text-green-300' : 'text-red-700 dark:text-red-300'}`}>{statusMessage}</p>
          </div>
        )}
      </div>

      {processedData && isSuccess && (
        <div className="mt-8 bg-background-light dark:bg-background-altDark p-6 sm:p-8 rounded-xl shadow-lg">
          <h2 className="text-xl font-semibold text-primary-DEFAULT dark:text-primary-light mb-4 flex items-center">
            <DocumentDuplicateIcon className="w-6 h-6 mr-2" />
            Resultados de Clasificación
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-neutral-DEFAULT dark:divide-gray-700">
              <thead className="bg-neutral-light/50 dark:bg-gray-700/50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-text-mutedLight dark:text-text-mutedDark uppercase tracking-wider">Relato</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-text-mutedLight dark:text-text-mutedDark uppercase tracking-wider">Clasificación</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-text-mutedLight dark:text-text-mutedDark uppercase tracking-wider">Confianza</th>
                </tr>
              </thead>
              <tbody className="bg-background-light dark:bg-background-altDark divide-y divide-neutral-DEFAULT dark:divide-gray-700">
                {processedData.map((item, index) => (
                  <tr key={index} className="hover:bg-neutral-light/30 dark:hover:bg-gray-700/30 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-text-light dark:text-text-dark">{item.relato}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-text-light dark:text-text-dark">{item.clasificacion}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-text-light dark:text-text-dark">{(item.confianza * 100).toFixed(0)}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
