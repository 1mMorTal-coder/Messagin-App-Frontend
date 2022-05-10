import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { SocketProvider } from './context/SocketContext';

ReactDOM.render(
  // <React.StrictMode>
  <BrowserRouter>
    <SocketProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </SocketProvider>
  </BrowserRouter>,
  // </React.StrictMode>
  document.getElementById('root')
);
