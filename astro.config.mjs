import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

function rehypeNormalizeImagePaths() {
  return (tree) => {
    function visit(node) {
      if (node.type === 'element' && node.tagName === 'img' && node.properties && node.properties.src) {
        let src = String(node.properties.src);
        if (src.includes('public/images/')) {
          src = src.replace(/^.*public\/images\//, '/images/');
        } else if (src.startsWith('images/')) {
          src = '/' + src;
        }
        node.properties.src = src;
      }
      if (node.children && Array.isArray(node.children)) {
        node.children.forEach(visit);
      }
    }
    visit(tree);
  };
}

export default defineConfig({
  site: 'https://tawanda.space',
  output: 'static',
  integrations: [tailwind()],
  markdown: {
    rehypePlugins: [rehypeNormalizeImagePaths],
  },
});