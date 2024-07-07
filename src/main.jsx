// src/index.jsx
import React from 'react';
import { createRoot } from 'react-dom/client'; // Importa createRoot desde react-dom/client
import App from './App';
import { AuthProvider } from './components/contexts/AuthContext';

const root = createRoot(document.getElementById('root')); // Crea una raíz para la aplicación
root.render(
  <AuthProvider>
  <React.StrictMode>
    <App />
  </React.StrictMode>
</AuthProvider>
); 
    
