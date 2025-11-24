import { renderers } from './renderers.mjs';
import { c as createExports, s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_LsW2uJ3T.mjs';
import { manifest } from './manifest_C2rntowJ.mjs';

const serverIslandMap = new Map([
	['VehicleList', () => import('./chunks/VehicleList_WiFC1iFv.mjs')],
	['HeroSection', () => import('./chunks/HeroSection_i77Yv7x_.mjs')],
	['FeaturesGrid', () => import('./chunks/FeaturesGrid_CA5f2RuQ.mjs')],
	['NewsletterSignup', () => import('./chunks/NewsletterSignup_lw7ibWa_.mjs')],
	['Header', () => import('./chunks/Header_BfGsf6uN.mjs')],
	['Hero', () => import('./chunks/Hero_DDgxMkhJ.mjs')],
	['VehicleGrid', () => import('./chunks/VehicleGrid_DL6UczG8.mjs')],
	['ContentSection', () => import('./chunks/ContentSection_B4tfCl0O.mjs')],
	['Footer', () => import('./chunks/Footer_hhjJki6t.mjs')],
	['DynamicRenderer', () => import('./chunks/DynamicRenderer_D-DaFd0A.mjs')],
]);;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/api/components.astro.mjs');
const _page2 = () => import('./pages/api/pages/_slug_.astro.mjs');
const _page3 = () => import('./pages/api/pages.astro.mjs');
const _page4 = () => import('./pages/api/render.astro.mjs');
const _page5 = () => import('./pages/searchnew.astro.mjs');
const _page6 = () => import('./pages/searchused.astro.mjs');
const _page7 = () => import('./pages/skeleton-test.astro.mjs');
const _page8 = () => import('./pages/test-dynamic.astro.mjs');
const _page9 = () => import('./pages/vehicle/_id_.astro.mjs');
const _page10 = () => import('./pages/index.astro.mjs');
const _page11 = () => import('./pages/_---slug_.astro.mjs');
const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/api/components.ts", _page1],
    ["src/pages/api/pages/[slug].ts", _page2],
    ["src/pages/api/pages/index.ts", _page3],
    ["src/pages/api/render.ts", _page4],
    ["src/pages/searchnew.astro", _page5],
    ["src/pages/searchused.astro", _page6],
    ["src/pages/skeleton-test.astro", _page7],
    ["src/pages/test-dynamic.astro", _page8],
    ["src/pages/vehicle/[id].astro", _page9],
    ["src/pages/index.astro", _page10],
    ["src/pages/[...slug].astro", _page11]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./noop-entrypoint.mjs'),
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "cffbc9be-82ed-4899-8ec7-adfcb7ae86a5",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (Object.prototype.hasOwnProperty.call(serverEntrypointModule, _start)) ;

export { __astrojsSsrVirtualEntry as default, pageMap };
