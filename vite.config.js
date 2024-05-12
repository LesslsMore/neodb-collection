import { defineConfig } from 'vite';
import monkey from 'vite-plugin-monkey';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    monkey({
      entry: 'src/main.js',
      userscript: {
        name: 'neodb 收藏单 筛选、排序',
        namespace: 'https://github.com/LesslsMore/neodb-collection',
        version: '0.0.1',
        author: 'lesslsmore',
        license: 'MIT',
        description: 'neodb 收藏单 筛选、排序',
        match: ['https://neodb.social/collection/*'],
      },
    }),
  ],
});
