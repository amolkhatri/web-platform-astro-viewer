import { f as createComponent, g as createAstro, m as maybeRenderHead, h as renderTemplate } from './astro/server_CKXQ4CEk.mjs';
import 'piccolore';
import 'clsx';
/* empty css                          */

const $$Astro = createAstro();
const $$HeroSection = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$HeroSection;
  const { title, subtitle } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<section class="hero" data-astro-cid-bhgcymcd> <h1 data-astro-cid-bhgcymcd>${title}</h1> <p data-astro-cid-bhgcymcd>${subtitle}</p> </section> `;
}, "/Users/amolkhatri/projects/astro-websites-platform/viewer/src/components/blocks/HeroSection.astro", void 0);

const $$file = "/Users/amolkhatri/projects/astro-websites-platform/viewer/src/components/blocks/HeroSection.astro";
const $$url = undefined;

export { $$HeroSection as default, $$file as file, $$url as url };
