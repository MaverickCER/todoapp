import { MetadataRoute } from 'next';

// https://nextjs.org/docs/app/api-reference/file-conventions/metadata/manifest
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'MaverickCER',
    short_name: 'MCER',
    description: 'MaverickCER - Consume Enhance Replicate',
    start_url: '/',
    display: 'standalone',
    background_color: '#161b22',
    theme_color: '#161b22',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  };
}
