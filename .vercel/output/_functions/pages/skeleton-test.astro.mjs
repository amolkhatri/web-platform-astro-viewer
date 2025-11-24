import { f as createComponent, r as renderComponent, h as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_CKXQ4CEk.mjs';
import 'piccolore';
import { $ as $$Layout } from '../chunks/Layout_C8NW-q5z.mjs';
import { $ as $$VehicleListSkeleton } from '../chunks/VehicleListSkeleton_CX4I_Jg-.mjs';
export { renderers } from '../renderers.mjs';

const $$SkeletonTest = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Skeleton Test" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="container mx-auto p-4"> <h1 class="text-2xl font-bold mb-4">Vehicle List Skeleton Test</h1> ${renderComponent($$result2, "VehicleListSkeleton", $$VehicleListSkeleton, { "count": 6 })} </main> ` })}`;
}, "/Users/amolkhatri/projects/astro-websites-platform/viewer/src/pages/skeleton-test.astro", void 0);

const $$file = "/Users/amolkhatri/projects/astro-websites-platform/viewer/src/pages/skeleton-test.astro";
const $$url = "/skeleton-test";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$SkeletonTest,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
