import { i as init, r as register } from './runtime-61be59ec.js';
import { _ as __vitePreload } from './preload-helper-f74f8cca.js';

init({});
__vitePreload(() => import('./templates.html-4b9d0077.js'),true?[]:void 0)
          .then((mod) => register(mod, "templates.html.js", "html", (resource, container) => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(resource.default, 'text/html');
            const body = doc.body;
            for ( let def = body.firstElementChild; def; def=body.firstElementChild ) {
              container.appendChild(def); }
          }));
__vitePreload(() => import('./scenes.html-7501357c.js'),true?[]:void 0)
          .then((mod) => register(mod, "scenes.html.js", "html", (resource, container) => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(resource.default, 'text/html');
            const body = doc.body;
            const scenes = Object.fromEntries(
              Array.prototype.map.call(body.children, (node) => [
              node && node.dataset.scene, node ])
              .filter(([num]) => Boolean(num)));
            return function render (n, container) {
              const scene = scenes[n];
              if( scene ) {
                for( let child = scene.firstElementChild; child; child = scene.firstElementChild ) {
                  if ( child.tagName === 'SCRIPT' ) {
                    const text = child.firstChild;
                    scene.removeChild(child);
                    child = document.createElement('script');
                    child.appendChild(text);
                  } 
                  container.appendChild(child); 
                }
              } 
            }
          }));
__vitePreload(() => import('./styles.css-113fb7df.js'),true?[]:void 0)
          .then((mod) => register(mod, "styles.css.js", "css", (resource, container) => {
          let sheet = document.createElement("style");
          sheet.innerHTML = resource.default;
          container.appendChild(sheet);
        }));
__vitePreload(() => import('./module-014fa4b2.js'),true?["assets/module-014fa4b2.js","assets/lit-element-a480b217.js"]:void 0)
          .then((mod) => register(mod, "Kram_46bc579d_webc", "js", null));
__vitePreload(() => import('./module-d815c0d7.js'),true?["assets/module-d815c0d7.js","assets/lit-element-a480b217.js"]:void 0)
          .then((mod) => register(mod, "Kram_46bc579d_webc", "ts", null));
