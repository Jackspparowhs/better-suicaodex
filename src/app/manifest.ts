import type { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Manga by PirateRuler.com', // CHANGED: New Brand Name
    short_name: 'PirateRuler', // CHANGED: Short name for homescreen icons
    description: 'The premier manga reading application', // CHANGED: Translated description
    start_url: '/',
    display: 'standalone',
    // background_color: '#ffffff',
    // theme_color: '#000000',
    icons: [
      {
        src: '/icon/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}
