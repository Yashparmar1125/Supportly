import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// Mock Vercel Analytics endpoints locally to prevent Vite SPA HTML fallback SyntaxError
function vercelAnalyticsDevPlugin(): Plugin {
  return {
    name: 'vercel-analytics-dev-stub',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url && req.url.startsWith('/_vercel/insights')) {
          if (req.url.includes('.js')) {
            res.setHeader('Content-Type', 'application/javascript');
            res.end('// [Vercel Web Analytics] Local dev stub');
            return;
          }
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ ok: true }));
          return;
        }
        next();
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), tailwindcss(), vercelAnalyticsDevPlugin()],
});