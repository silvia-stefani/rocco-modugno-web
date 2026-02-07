import React from "react"
import '../assets/sass/global.scss'

import { Metadata } from "next/types";
import App from "./app";

/**
 * Metadata configuration for the entire website.
 * Includes SEO tags, Open Graph data for social sharing, and viewport settings.
 */
export const metadata: Metadata = {
  title: "Rocco Modugno | Creative Graphic Designer",
  description: "Discover Rocco Modugno’s portfolio, showcasing expertise in editorial design, visual communication, creative coding, and design consulting.",
  applicationName: "Rocco Modugno Portfolio",
  authors: [
    {
      name: "Rocco Modugno",
      url: "https://rlmodugno.com"
    },
    {
      name: "Silvia Stefani",
      url: "https://silviastefani.com"
    }
  ],
  openGraph: {
    title: 'Rocco Modugno | Editorial Design & Visual Communication | rlmodugno',
    description: 'Explore projects in editorial design, typography, visual communication, and creative coding by Rocco Modugno.',
    url: 'https://rlmodugno.com',
    siteName: "Rocco Modugno Portfolio",
    images: [
      {
        url: 'https://rlmodugno.com/storie_d_arte_e_di_critica/sac_img_1.jpg',
        width: 1200,
        height: 630,
        alt: 'Preview of Rocco Modugno’s portfolio',
      },
    ],
    locale: "en_EN",
    type: 'website',
  },
  viewport: 'width=device-width, initial-scale=1',
  icons: {
    icon: '/favicon.ico',
  },
  robots: {
    index: true,
    follow: true,
  },
  metadataBase: new URL('https://rlmodugno.com'),
  formatDetection: {
    email: true,
    address: false,
    telephone: false,
  },
}

/**
 * RootLayout component that wraps every page.
 * It provides the basic HTML structure and sets up global styles.
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  // Credits in the browser console
  console.log(`
  Website Development by Silvia Stefani: https://silviastefani.com
  · Web Design: Rocco Modugno + Silvia Stefani
  · Code: Silvia Stefani
  · Date: January 2024
  · Language: Typescript
  · Tools: Next & React
  `);

  return (
    <html lang="en">
      <body>
        {/* The App component provides global context and wrappers */}
        <App>{children}</App> 
      </body>
    </html>
  )
}