import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import viteImagemin from 'vite-plugin-imagemin'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),
    viteImagemin({
      gifsicle: { 
        optimizationLevel: 3 
      },
      optipng: { 
        optimizationLevel: 7 
      },
      mozjpeg: { 
        quality: 80 
      },
      pngquant: { 
        quality: [0.6, 0.8] 
      },
      svgo: {
        plugins: [
          { removeViewBox: false },
          { removeEmptyAttrs: true },
        ],
      },
    }),
  ],
})
