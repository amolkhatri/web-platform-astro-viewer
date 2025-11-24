import { f as createComponent, r as renderComponent, h as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_CKXQ4CEk.mjs';
import 'piccolore';
import { $ as $$Layout } from '../chunks/Layout_C8NW-q5z.mjs';
import $$Header from '../chunks/Header_BfGsf6uN.mjs';
import $$Hero from '../chunks/Hero_DDgxMkhJ.mjs';
import $$VehicleGrid from '../chunks/VehicleGrid_DL6UczG8.mjs';
import $$ContentSection from '../chunks/ContentSection_B4tfCl0O.mjs';
import $$Footer from '../chunks/Footer_hhjJki6t.mjs';
import { h as homeData } from '../chunks/home_BXm4EkaR.mjs';
export { renderers } from '../renderers.mjs';

const $$Index = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Header", $$Header, { ...homeData.header })} ${maybeRenderHead()}<main> ${renderComponent($$result2, "Hero", $$Hero, { ...homeData.hero })} ${renderComponent($$result2, "VehicleGrid", $$VehicleGrid, { ...homeData.vehicleGrid })} ${homeData.contentSections.map((section, index) => renderTemplate`${renderComponent($$result2, "ContentSection", $$ContentSection, { ...section, "reverse": index % 2 !== 0 })}`)} </main> ${renderComponent($$result2, "Footer", $$Footer, { ...homeData.footer })} ` })}`;
}, "/Users/amolkhatri/projects/astro-websites-platform/viewer/src/pages/index.astro", void 0);

const $$file = "/Users/amolkhatri/projects/astro-websites-platform/viewer/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Index,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
