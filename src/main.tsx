import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom';

import './i18n.ts';
import { router } from './routes/router.tsx';

import "./assets/sass/main.scss"
import "./assets/sass/fontface.scss"


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
