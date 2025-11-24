import { f as createComponent, g as createAstro, m as maybeRenderHead, h as renderTemplate } from './astro/server_CKXQ4CEk.mjs';
import 'piccolore';
import 'clsx';
/* empty css                          */

const $$Astro = createAstro();
const $$FallbackBlock = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$FallbackBlock;
  const { type } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div class="fallback" data-astro-cid-san4zynk> <p data-astro-cid-san4zynk>Unknown block type: <strong data-astro-cid-san4zynk>${type}</strong></p> </div> `;
}, "/Users/amolkhatri/projects/astro-websites-platform/viewer/src/components/blocks/FallbackBlock.astro", void 0);

export { $$FallbackBlock as $ };
