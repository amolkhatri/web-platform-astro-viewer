import { f as createComponent, r as renderComponent, h as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_CKXQ4CEk.mjs';
import 'piccolore';
import { $ as $$Layout } from '../chunks/Layout_C8NW-q5z.mjs';
import $$DynamicRenderer from '../chunks/DynamicRenderer_D-DaFd0A.mjs';
export { renderers } from '../renderers.mjs';

const $$TestDynamic = createComponent(($$result, $$props, $$slots) => {
  const testHtml = '<h1 id="test-heading">Hello Dynamic World</h1><button id="test-btn">Click Me</button>';
  const testCss = "#test-heading { color: red; } #test-btn { padding: 10px; background: blue; color: white; }";
  const testJs = 'document.getElementById("test-btn").addEventListener("click", () => alert("Clicked!")); console.log("Dynamic JS loaded");';
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Test Dynamic Renderer" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main> <h2>Testing Dynamic Renderer</h2> ${renderComponent($$result2, "DynamicRenderer", $$DynamicRenderer, { "html": testHtml, "css": testCss, "js": testJs })} </main> ` })}`;
}, "/Users/amolkhatri/projects/astro-websites-platform/viewer/src/pages/test-dynamic.astro", void 0);

const $$file = "/Users/amolkhatri/projects/astro-websites-platform/viewer/src/pages/test-dynamic.astro";
const $$url = "/test-dynamic";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$TestDynamic,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
