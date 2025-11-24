import { f as createComponent, g as createAstro, m as maybeRenderHead, j as addAttribute, h as renderTemplate } from './astro/server_CKXQ4CEk.mjs';
import 'piccolore';
import 'clsx';
/* empty css                          */

const $$Astro = createAstro();
const $$Header = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Header;
  const { logo, nav, phone } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<header class="header" data-astro-cid-3ef6ksr2> <div class="header-container" data-astro-cid-3ef6ksr2> <a href="/" class="logo-link" data-astro-cid-3ef6ksr2> <!-- <img src={logo.src} alt={logo.alt} class="h-10 w-auto transition-transform duration-300 group-hover:scale-105" /> --> <div class="logo-text" data-astro-cid-3ef6ksr2>Passport Mazda</div> </a> <nav class="nav-menu" data-astro-cid-3ef6ksr2> ${nav.map((item) => renderTemplate`<a${addAttribute(item.href, "href")} class="nav-link" data-astro-cid-3ef6ksr2> ${item.label} </a>`)} </nav> <div class="contact-wrapper" data-astro-cid-3ef6ksr2> <a${addAttribute(`tel:${phone}`, "href")} class="contact-button" data-astro-cid-3ef6ksr2> <div class="contact-icon-wrapper" data-astro-cid-3ef6ksr2> <svg xmlns="http://www.w3.org/2000/svg" class="contact-icon" viewBox="0 0 20 20" fill="currentColor" data-astro-cid-3ef6ksr2> <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" data-astro-cid-3ef6ksr2></path> </svg> </div> <span class="contact-text" data-astro-cid-3ef6ksr2>${phone}</span> </a> </div> <button class="mobile-menu-button" data-astro-cid-3ef6ksr2> <svg xmlns="http://www.w3.org/2000/svg" class="menu-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-astro-cid-3ef6ksr2> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" data-astro-cid-3ef6ksr2></path> </svg> </button> </div> </header> `;
}, "/Users/amolkhatri/projects/astro-websites-platform/viewer/src/components/Header.astro", void 0);

const $$file = "/Users/amolkhatri/projects/astro-websites-platform/viewer/src/components/Header.astro";
const $$url = undefined;

export { $$Header as default, $$file as file, $$url as url };
