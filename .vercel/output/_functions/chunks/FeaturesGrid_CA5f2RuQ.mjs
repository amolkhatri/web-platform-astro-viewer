import { f as createComponent, g as createAstro, m as maybeRenderHead, h as renderTemplate } from './astro/server_CKXQ4CEk.mjs';
import 'piccolore';
import 'clsx';
/* empty css                          */

const $$Astro = createAstro();
const $$FeaturesGrid = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$FeaturesGrid;
  const { items = [] } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<section class="features" data-astro-cid-elmbhss7> ${items.map((item) => renderTemplate`<div class="feature-card" data-astro-cid-elmbhss7> <h3 data-astro-cid-elmbhss7>${item}</h3> </div>`)} </section> `;
}, "/Users/amolkhatri/projects/astro-websites-platform/viewer/src/components/blocks/FeaturesGrid.astro", void 0);

const $$file = "/Users/amolkhatri/projects/astro-websites-platform/viewer/src/components/blocks/FeaturesGrid.astro";
const $$url = undefined;

export { $$FeaturesGrid as default, $$file as file, $$url as url };
