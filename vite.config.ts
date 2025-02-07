import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    port: 3001,
  },
  publicDir: 'src/assets',
  base: '/',
  build: {
    rollupOptions: {
      input: {
        main: './src/index.html',
        courses: './src/pages/kurser.html',
        admin: './src/pages/admin.html',
        courseDetails: './src/pages/course-details.html',
      },
    },
  },
});
