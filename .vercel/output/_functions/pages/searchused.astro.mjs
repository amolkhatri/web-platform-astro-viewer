import { f as createComponent, g as createAstro, r as renderComponent, h as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_CKXQ4CEk.mjs';
import 'piccolore';
import { $ as $$Layout } from '../chunks/Layout_C8NW-q5z.mjs';
import $$Header from '../chunks/Header_BfGsf6uN.mjs';
import $$Footer from '../chunks/Footer_hhjJki6t.mjs';
import { p as parseFilters, f as filterVehicles, c as calculateFilterCounts, $ as $$SearchFilter, a as $$SortBar } from '../chunks/SortBar_1oeBZCKs.mjs';
import $$VehicleList from '../chunks/VehicleList_WiFC1iFv.mjs';
import { $ as $$VehicleListSkeleton } from '../chunks/VehicleListSkeleton_CX4I_Jg-.mjs';
import { v as vehiclesData } from '../chunks/vehicles_C8-E-Q8y.mjs';
import { i as isBot } from '../chunks/isBot_BzP1LUpg.mjs';
import { h as homeData } from '../chunks/home_BXm4EkaR.mjs';
/* empty css                                      */
/* empty css                                  */
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro();
const $$Searchused = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Searchused;
  const allVehicles = vehiclesData;
  const currentFilters = parseFilters(Astro2.url.searchParams);
  const filteredVehicles = filterVehicles(allVehicles, currentFilters);
  const filterCounts = calculateFilterCounts(allVehicles, currentFilters);
  const userAgent = Astro2.request.headers.get("user-agent") || "";
  const isBotRequest = isBot(userAgent);
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Search Used Inventory | Passport Mazda", "data-astro-cid-scwapxea": true }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Header", $$Header, { ...homeData.header, "data-astro-cid-scwapxea": true })} ${maybeRenderHead()}<main class="search-page-main" data-astro-cid-scwapxea> <div class="container mx-auto px-4 py-8" data-astro-cid-scwapxea> <div class="page-header mb-6" data-astro-cid-scwapxea> <h1 class="text-3xl font-bold text-gray-900" data-astro-cid-scwapxea>
Used Mazda Inventory
</h1> </div> <div class="search-layout" data-astro-cid-scwapxea> <!-- Sidebar --> <div class="search-sidebar" data-astro-cid-scwapxea> ${renderComponent($$result2, "SearchFilter", $$SearchFilter, { "currentFilters": currentFilters, "filterCounts": filterCounts, "data-astro-cid-scwapxea": true })} </div> <!-- Content --> <div class="search-content" data-astro-cid-scwapxea> ${renderComponent($$result2, "SortBar", $$SortBar, { "count": filteredVehicles.length, "data-astro-cid-scwapxea": true })} ${isBotRequest ? renderTemplate`${renderComponent($$result2, "VehicleList", $$VehicleList, { "vehicles": filteredVehicles, "data-astro-cid-scwapxea": true })}` : renderTemplate`${renderComponent($$result2, "VehicleList", $$VehicleList, { "server:defer": true, "vehicles": filteredVehicles, "server:component-directive": "defer", "server:component-path": "/Users/amolkhatri/projects/astro-websites-platform/viewer/src/components/VehicleList.astro", "server:component-export": "default", "data-astro-cid-scwapxea": true }, { "fallback": ($$result3) => renderTemplate`${renderComponent($$result3, "VehicleListSkeleton", $$VehicleListSkeleton, { "slot": "fallback", "data-astro-cid-scwapxea": true })}` })}`} </div> </div> </div> </main> ${renderComponent($$result2, "Footer", $$Footer, { ...homeData.footer, "data-astro-cid-scwapxea": true })} ` })} `;
}, "/Users/amolkhatri/projects/astro-websites-platform/viewer/src/pages/searchused.astro", "self");

const $$file = "/Users/amolkhatri/projects/astro-websites-platform/viewer/src/pages/searchused.astro";
const $$url = "/searchused";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Searchused,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
