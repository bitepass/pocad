
export interface User {
  id: string;
  name: string;
  email: string;
}

export interface ApiResponse<T,> {
  data?: T;
  error?: string;
  message?: string;
}

// Example: Define types for your data models if needed
// export interface Delito {
//   id: string;
//   descripcion: string;
//   tipo: string;
//   fecha: string;
//   jurisdiccion: string;
// }

// You can expand this file with more specific types as your application grows.
