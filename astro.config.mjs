import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

function rehypeNormalizeImagePaths() {
  return (tree) => {
    function visit(node, index, parent) {
      if (node && node.children && Array.isArray(node.children)) {
        for (let i = 0; i < node.children.length; i++) {
          const child = node.children[i];
          if (child.type === 'element' && child.tagName === 'img' && child.properties && child.properties.src) {
            let src = String(child.properties.src);
            if (src.includes('public/images/')) {
              src = src.replace(/^.*public\/images\//, '/images/');
            } else if (src.startsWith('images/')) {
              src = '/' + src;
            }
            child.properties.src = src;

            // Wrap img node with a span wrapper and add watermark element
            const wrapper = {
              type: 'element',
              tagName: 'span',
              properties: { className: ['blog-img-wrap'] },
              children: [
                child,
                {
                  type: 'element',
                  tagName: 'span',
                  properties: { className: ['blog-img-watermark'] },
                  children: [{ type: 'text', value: 'tawanda.space/blog' }]
                }
              ]
            };
            node.children[i] = wrapper;
          } else {
            visit(child, i, node);
          }
        }
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