import { f as createComponent, g as createAstro, h as renderTemplate, as as unescapeHTML, m as maybeRenderHead } from './astro/server_CKXQ4CEk.mjs';
import 'piccolore';
import 'clsx';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro = createAstro();
const $$DynamicRenderer = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$DynamicRenderer;
  const { html, css = "", js = "" } = Astro2.props;
  return renderTemplate(_a || (_a = __template(["<style>", "</style>", "<div>", "</div> <script>", "<\/script>"])), unescapeHTML(css), maybeRenderHead(), unescapeHTML(html), unescapeHTML(js));
}, "/Users/amolkhatri/projects/astro-websites-platform/viewer/src/components/DynamicRenderer.astro", void 0);

const $$file = "/Users/amolkhatri/projects/astro-websites-platform/viewer/src/components/DynamicRenderer.astro";
const $$url = undefined;

export { $$DynamicRenderer as default, $$file as file, $$url as url };
