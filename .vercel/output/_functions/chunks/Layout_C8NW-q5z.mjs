import { f as createComponent, g as createAstro, j as addAttribute, i as renderScript, h as renderTemplate, r as renderComponent, k as renderHead, l as renderSlot } from './astro/server_CKXQ4CEk.mjs';
import 'piccolore';
import 'clsx';
/* empty css                          */

const $$Astro$1 = createAstro();
const $$ClientRouter = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$ClientRouter;
  const { fallback = "animate" } = Astro2.props;
  return renderTemplate`<meta name="astro-view-transitions-enabled" content="true"><meta name="astro-view-transitions-fallback"${addAttribute(fallback, "content")}>${renderScript($$result, "/Users/amolkhatri/projects/astro-websites-platform/viewer/node_modules/astro/components/ClientRouter.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/amolkhatri/projects/astro-websites-platform/viewer/node_modules/astro/components/ClientRouter.astro", void 0);

const $$Astro = createAstro();
const $$Layout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Layout;
  return renderTemplate`<html lang="en"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="generator"${addAttribute(Astro2.generator, "content")}><title>Astro Basics</title>${renderComponent($$result, "ClientRouter", $$ClientRouter, {})}${renderHead()}</head> <body> <!-- <DeviceBanner /> --> ${renderSlot($$result, $$slots["default"])} </body></html>`;
}, "/Users/amolkhatri/projects/astro-websites-platform/viewer/src/layouts/Layout.astro", void 0);

export { $$Layout as $ };
