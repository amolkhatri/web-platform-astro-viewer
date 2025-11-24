import { f as createComponent, g as createAstro, m as maybeRenderHead, j as addAttribute, h as renderTemplate } from './astro/server_CKXQ4CEk.mjs';
import 'piccolore';
import 'clsx';
/* empty css                          */

const $$Astro = createAstro();
const $$Hero = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Hero;
  const { title, image, search } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<section class="hero-section" data-astro-cid-bbe6dxrz> <div class="hero-bg" data-astro-cid-bbe6dxrz> <img${addAttribute(image, "src")} alt="Hero Background" class="hero-image" loading="eager" data-astro-cid-bbe6dxrz> <div class="hero-overlay" data-astro-cid-bbe6dxrz></div> </div> <div class="hero-content" data-astro-cid-bbe6dxrz> <h1 class="hero-title" data-astro-cid-bbe6dxrz> ${title} </h1> <div class="search-widget" data-astro-cid-bbe6dxrz> <div class="search-form" data-astro-cid-bbe6dxrz> <input type="text"${addAttribute(search.placeholder, "placeholder")} class="search-input" data-astro-cid-bbe6dxrz> <button class="search-button" data-astro-cid-bbe6dxrz> Search </button> </div> <div class="search-links" data-astro-cid-bbe6dxrz> <a href="#" class="search-link" data-astro-cid-bbe6dxrz> <span class="search-link-dot" data-astro-cid-bbe6dxrz></span> Search New
</a> <a href="#" class="search-link" data-astro-cid-bbe6dxrz> <span class="search-link-dot" data-astro-cid-bbe6dxrz></span> Search Used
</a> <a href="#" class="search-link" data-astro-cid-bbe6dxrz> <span class="search-link-dot" data-astro-cid-bbe6dxrz></span> Certified Pre-Owned
</a> </div> </div> </div> </section> `;
}, "/Users/amolkhatri/projects/astro-websites-platform/viewer/src/components/Hero.astro", void 0);

const $$file = "/Users/amolkhatri/projects/astro-websites-platform/viewer/src/components/Hero.astro";
const $$url = undefined;

export { $$Hero as default, $$file as file, $$url as url };
