import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

// Avoid multiple createRoot calls by checking React's internal property
// @ts-ignore
let root = rootElement._reactRootContainer
  // @ts-ignore
  ? ReactDOM.createRoot(rootElement, { hydrate: true }) // fallback for hydration, rarely needed
  // @ts-ignore
  : (rootElement._reactRoot = ReactDOM.createRoot(rootElement));

// @ts-ignore
root = rootElement._reactRoot || root;

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
