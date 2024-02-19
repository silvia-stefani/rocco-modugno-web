import React from 'react'
import ReactDOM from 'react-dom/client'

import './i18n.ts';

import "./assets/sass/main.scss";
import App from './App.tsx';

/* console.log(`
Website Development by Silvia Stefani: https://silviastefani.com
· Web Design: Rocco Modugno + Silvia Stefani
· Code: Silvia Stefani
· Date: January 2024
· Language: Typescript
· Tools: Vite & React
`); */


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
