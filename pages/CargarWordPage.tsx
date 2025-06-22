
import React, { useState, useCallback, ChangeEvent } from 'react';
import { UploadIcon, CheckCircleIcon, ExclamationCircleIcon } from '../components/icons/Icons';

// Mock API function for Word files
const processWordFile = async (file: File, jurisdiction: string): Promise<{ success: boolean; message: string; }> => {
  await new Promise(resolve => setTimeout(resolve, 1500));
  if (file.name.includes("error") || jurisdiction === "error") {
    return { success: false, message: `Error al procesar el informe Word para ${jurisdiction}.` };
  }
  return { success: true, message: `Informe Word para ${jurisdiction} cargado exitosamente.` };
};

export const CargarWordPage: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [jurisdiction, setJurisdiction] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState<boolean | null>(null);

  const handleFileChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
      setStatusMessage(null);
      setIsSuccess(null);
    }
  }, []);

  const handleJurisdictionChange = useCallback((event: ChangeEvent<HTMLSelectElement>) => {
    setJurisdiction(event.target.value);
  }, []);

  const handleSubmit = useCallback(async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!selectedFile) {
      setStatusMessage("Por favor, seleccione un archivo Word.");
      setIsSuccess(false);
      return;
    }
    if (!jurisdiction) {
      setStatusMessage("Por favor, seleccione una jurisdicción.");
      setIsSuccess(false);
      return;
    }

    setIsProcessing(true);
    setStatusMessage("Procesando archivo Word...");
    setIsSuccess(null);

    try {
      // Actual API call:
      // const formData = new FormData();
      // formData.append('word_file', selectedFile);
      // formData.append('jurisdiction', jurisdiction);
      // const response = await fetch('/upload-word-jurisdictional', { method: 'POST', body: formData });
      // const result = await response.json();
      
      const result = await processWordFile(selectedFile, jurisdiction); // Using mock

      setStatusMessage(result.message);
      setIsSuccess(result.success);
      if (result.success) {
        setSelectedFile(null); // Clear file input on success
        // Consider resetting jurisdiction or keeping it for multiple uploads
      }
    } catch (error) {
      console.error("Error processing Word file:", error);
      setStatusMessage("Error de conexión o respuesta inesperada del servidor.");
      setIsSuccess(false);
    } finally {
      setIsProcessing(false);
    }
  }, [selectedFile, jurisdiction]);

  return (
    <div className="space-y-8 animate-fadeIn">
      <header className="pb-4 border-b border-neutral-DEFAULT dark:border-gray-700">
        <h1 className="text-3xl font-bold text-primary-DEFAULT dark:text-primary-light">Carga de Informes Word Jurisdiccionales</h1>
        <p className="text-md text-text-mutedLight dark:text-text-mutedDark mt-1">
          Suba informes breves en formato Word (.docx, .doc) asociados a una jurisdicción específica.
        </p>
      </header>

      <div className="bg-background-light dark:bg-background-altDark p-6 sm:p-8 rounded-xl shadow-lg">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="jurisdiction-select" className="block text-sm font-medium text-text-light dark:text-text-dark mb-1">
              Jurisdicción
            </label>
            <select
              id="jurisdiction-select"
              value={jurisdiction}
              onChange={handleJurisdictionChange}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-neutral-DEFAULT dark:border-gray-600 dark:bg-gray-700 dark:text-text-dark focus:outline-none focus:ring-primary-light focus:border-primary-light sm:text-sm rounded-md"
              required
            >
              <option value="" disabled>Seleccione una jurisdicción</option>
              <option value="Comisaría 1ra">Comisaría 1ra</option>
              <option value="Comisaría 2da">Comisaría 2da</option>
              <option value="División Norte">División Norte</option>
              <option value="División Sur">División Sur</option>
              <option value="error">Jurisdicción de Prueba Error</option> {/* For testing error */}
            </select>
          </div>

          <div>
            <label htmlFor="word-upload" className="block text-sm font-medium text-text-light dark:text-text-dark mb-1">
              Seleccionar archivo Word (.docx, .doc)
            </label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-neutral-DEFAULT dark:border-gray-600 border-dashed rounded-md">
              <div className="space-y-1 text-center">
                <UploadIcon className="mx-auto h-12 w-12 text-text-mutedLight dark:text-text-mutedDark" />
                <div className="flex text-sm text-text-mutedLight dark:text-text-mutedDark">
                  <label
                    htmlFor="word-upload-input"
                    className="relative cursor-pointer bg-background-light dark:bg-background-altDark rounded-md font-medium text-primary-DEFAULT dark:text-primary-light hover:text-primary-dark dark:hover:text-primary-DEFAULT focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-light"
                  >
                    <span>Cargar un archivo</span>
                    <input id="word-upload-input" name="word-upload" type="file" className="sr-only" onChange={handleFileChange} accept=".docx, .doc" />
                  </label>
                  <p className="pl-1">o arrastrar y soltar</p>
                </div>
                {selectedFile ? (
                  <p className="text-xs text-text-light dark:text-text-dark">{selectedFile.name}</p>
                ) : (
                  <p className="text-xs text-text-mutedLight dark:text-text-mutedDark">Hasta 5MB</p>
                )}
              </div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isProcessing || !selectedFile || !jurisdiction}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-primary-DEFAULT hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-light disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isProcessing ? 'Cargando Informe...' : 'Cargar Informe Word'}
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
    </div>
  );
};
