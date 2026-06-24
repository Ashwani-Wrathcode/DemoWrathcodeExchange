import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { store } from './Store/Slice/store';
import { GoogleOAuthProvider } from "@react-oauth/google";


const CLIENT_ID = "492849672595-fn970ptulfbcffvvc09j2fsklci94448.apps.googleusercontent.com";

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={CLIENT_ID}>
      <Provider store={store}>
        <App />
      </Provider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);

reportWebVitals();