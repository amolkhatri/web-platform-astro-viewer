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
/* empty css                                     */
/* empty css                                  */
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro();
const $$Searchnew = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Searchnew;
  const allVehicles = vehiclesData;
  const currentFilters = parseFilters(Astro2.url.searchParams);
  const filteredVehicles = filterVehicles(allVehicles, currentFilters);
  const filterCounts = calculateFilterCounts(allVehicles, currentFilters);
  const userAgent = Astro2.request.headers.get("user-agent") || "";
  const isBotRequest = isBot(userAgent);
  console.log("is bot request" + isBotRequest);
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Search New Inventory | Passport Mazda", "data-astro-cid-ccmielqy": true }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Header", $$Header, { ...homeData.header, "data-astro-cid-ccmielqy": true })} ${maybeRenderHead()}<main class="search-page-main" data-astro-cid-ccmielqy> <div class="container mx-auto px-4 py-8" data-astro-cid-ccmielqy> <div class="page-header mb-6" data-astro-cid-ccmielqy> <h1 class="text-3xl font-bold text-gray-900" data-astro-cid-ccmielqy>
New Mazda Inventory
</h1> </div> <div class="search-layout" data-astro-cid-ccmielqy> <!-- Sidebar --> <div class="search-sidebar" data-astro-cid-ccmielqy> ${renderComponent($$result2, "SearchFilter", $$SearchFilter, { "currentFilters": currentFilters, "filterCounts": filterCounts, "data-astro-cid-ccmielqy": true })} </div> <!-- Content --> <div class="search-content" data-astro-cid-ccmielqy> ${renderComponent($$result2, "SortBar", $$SortBar, { "count": filteredVehicles.length, "data-astro-cid-ccmielqy": true })} ${isBotRequest ? renderTemplate`${renderComponent($$result2, "VehicleList", $$VehicleList, { "vehicles": filteredVehicles, "data-astro-cid-ccmielqy": true })}` : renderTemplate`${renderComponent($$result2, "VehicleList", $$VehicleList, { "server:defer": true, "vehicles": filteredVehicles, "server:component-directive": "defer", "server:component-path": "/Users/amolkhatri/projects/astro-websites-platform/viewer/src/components/VehicleList.astro", "server:component-export": "default", "data-astro-cid-ccmielqy": true }, { "fallback": ($$result3) => renderTemplate`${renderComponent($$result3, "VehicleListSkeleton", $$VehicleListSkeleton, { "slot": "fallback", "data-astro-cid-ccmielqy": true })}` })}`} </div> </div> </div> </main> ${renderComponent($$result2, "Footer", $$Footer, { ...homeData.footer, "data-astro-cid-ccmielqy": true })} ` })} `;
}, "/Users/amolkhatri/projects/astro-websites-platform/viewer/src/pages/searchnew.astro", "self");

const $$file = "/Users/amolkhatri/projects/astro-websites-platform/viewer/src/pages/searchnew.astro";
const $$url = "/searchnew";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Searchnew,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
