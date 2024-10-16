import React from "react"
import '../assets/sass/global.scss'

import { Metadata } from "next/types";
import App from "./app";

export const metadata: Metadata = {
  title: 'Rocco Modugno',
  description: 'My App is a...',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  console.log(`
  Website Development by Silvia Stefani: https://silviastefani.com
  · Web Design: Rocco Modugno + Silvia Stefani
  · Code: Silvia Stefani
  · Date: January 2024
  · Language: Typescript
  · Tools: Vite & React
  `);

  return (
    <html lang="en">
      <body>
        <App>{children}</App> 
      </body>
    </html>
  )
}