import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom';

import './i18n.ts';
import { router } from './routes/router.tsx';

import "./assets/sass/main.scss";

console.log(`
Website Development by Silvia Stefani: https://silviastefani.com
· Web Design: Rocco Modugno + Silvia Stefani
· Code: Silvia Stefani
· Date: January 2024
· Language: Typescript
· Tools: Vite & React
`);


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
