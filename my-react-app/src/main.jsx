// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux'; // Import Provider from react-redux
import store from '../src/redux/stores.js'; // Import Redux store
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import './assets/style.css'; // Your custom styles

ReactDOM.createRoot(document.getElementById('app')).render(
  <React.StrictMode>
    <Provider store={store}> {/* Wrap application with Redux Provider */}
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);