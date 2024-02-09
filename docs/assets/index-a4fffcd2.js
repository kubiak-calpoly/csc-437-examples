import { i as init, r as register } from './runtime-61be59ec.js';
import { _ as __vitePreload } from './preload-helper-f74f8cca.js';

init({"who_am_i":"Reactive Programming","author":"The Unbundled Dev","copyright_year":2023,"page_views":9999,"toolbox":{"available":["Rectangle","Triangle","Circle","Polygon","Line","Path","Text"],"selected":"Rectangle","current_index":0},"features":{"fp-moorea":{"feature_name":"Moorea","feature_type":"island","country":"French Polynesia","currency":{"full_name":"French Polynesian Franc","abbrev":"FRP"},"budget":{"hotel_nightly":100,"breakfast":10,"lunch":20,"dinner":40},"climate":"tropical","ratings":{"star_1":0,"star_2":1,"star_3":5,"star_4":30,"star_5":95}}}});
__vitePreload(() => import('./templates.html-1d5df397.js'),true?[]:void 0)
          .then((mod) => register(mod, "templates.html.js", "html", (resource, container) => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(resource.default, 'text/html');
            const body = doc.body;
            for ( let def = body.firstElementChild; def; def=body.firstElementChild ) {
              container.appendChild(def); }
          }));
__vitePreload(() => import('./scenes.html-ef385599.js'),true?[]:void 0)
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
__vitePreload(() => import('./module-77310df4.js'),true?[]:void 0)
          .then((mod) => register(mod, "Kram_2d2d545b_reactive", "js", null));
