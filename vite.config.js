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
        description: 'neodb 收藏单 筛选: 全选、已标记、未标记，排序: 年份、人数、评分, 升序、降序, 便于寻找出收藏单中未标记的条目',
        match: ['https://neodb.social/collection/*'],
      },
    }),
  ],
});
