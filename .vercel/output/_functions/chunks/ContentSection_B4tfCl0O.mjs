import { f as createComponent, g as createAstro, m as maybeRenderHead, j as addAttribute, h as renderTemplate } from './astro/server_CKXQ4CEk.mjs';
import 'piccolore';
import 'clsx';
/* empty css                          */

const $$Astro = createAstro();
const $$ContentSection = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$ContentSection;
  const { title, content, link, image, reverse = false } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<section class="content-section" data-astro-cid-2w3r3o6g> <div class="container" data-astro-cid-2w3r3o6g> <div${addAttribute(`content-wrapper ${reverse ? "reverse" : ""}`, "class")} data-astro-cid-2w3r3o6g> <div class="image-column group" data-astro-cid-2w3r3o6g> <div class="image-bg-decoration" data-astro-cid-2w3r3o6g></div> <div class="image-container" data-astro-cid-2w3r3o6g> <img${addAttribute(image, "src")}${addAttribute(title, "alt")} class="content-image" loading="lazy" data-astro-cid-2w3r3o6g> <div class="image-overlay" data-astro-cid-2w3r3o6g></div> </div> </div> <div class="text-column" data-astro-cid-2w3r3o6g> <h2 class="content-title" data-astro-cid-2w3r3o6g>${title}</h2> <p class="content-text" data-astro-cid-2w3r3o6g> ${content} </p> <a${addAttribute(link.href, "href")} class="content-link group" data-astro-cid-2w3r3o6g> <span class="link-text" data-astro-cid-2w3r3o6g>${link.label}</span> <svg xmlns="http://www.w3.org/2000/svg" class="link-icon" viewBox="0 0 20 20" fill="currentColor" data-astro-cid-2w3r3o6g> <path fill-rule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd" data-astro-cid-2w3r3o6g></path> </svg> </a> </div> </div> </div> </section> `;
}, "/Users/amolkhatri/projects/astro-websites-platform/viewer/src/components/ContentSection.astro", void 0);

const $$file = "/Users/amolkhatri/projects/astro-websites-platform/viewer/src/components/ContentSection.astro";
const $$url = undefined;

export { $$ContentSection as default, $$file as file, $$url as url };
