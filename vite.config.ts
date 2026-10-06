import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_');
  const configuredUrl = env.VITE_SITE_URL || process.env.VITE_SITE_URL;
  let siteUrl: URL | undefined;
  if (configuredUrl) {
    siteUrl = new URL(configuredUrl);
    if (!['http:', 'https:'].includes(siteUrl.protocol) || siteUrl.pathname !== '/' || siteUrl.search || siteUrl.hash) {
      throw new Error('VITE_SITE_URL must be an HTTP(S) origin, such as https://your-domain.id');
    }
  }
  return {
    plugins: [react(), {
      name: 'site-discovery',
      generateBundle() {
        let robots = 'User-agent: *\nAllow: /\n';
        if (siteUrl) {
          const routes = ['/', '/sumber', '/desa/dagen', '/desa/ngringo', '/desa/sroyo'];
          const urls = routes.map((route) => `<url><loc>${new URL(route, siteUrl).href}</loc></url>`).join('\n');
          this.emitFile({ type: 'asset', fileName: 'sitemap.xml', source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n` });
          robots += `Sitemap: ${new URL('/sitemap.xml', siteUrl).href}\n`;
        }
        this.emitFile({ type: 'asset', fileName: 'robots.txt', source: robots });
      },
    }],
  };
})
