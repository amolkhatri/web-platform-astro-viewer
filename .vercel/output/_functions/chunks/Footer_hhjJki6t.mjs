import { f as createComponent, g as createAstro, m as maybeRenderHead, h as renderTemplate } from './astro/server_CKXQ4CEk.mjs';
import 'piccolore';
import 'clsx';

const $$Astro = createAstro();
const $$Footer = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Footer;
  const { address, phone, hours } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<a href="#" class="hover:text-white hover:translate-x-1 transition-all inline-block">Service Center</a> <li> <a href="#" class="hover:text-white hover:translate-x-1 transition-all inline-block">Financing</a> </li> <li> <a href="#" class="hover:text-white hover:translate-x-1 transition-all inline-block">Contact Us</a> </li> <div class="border-t border-gray-800 mt-16 pt-8 text-center text-gray-500 text-sm"> <p>
&copy; ${(/* @__PURE__ */ new Date()).getFullYear()} Passport Mazda. All rights reserved.
</p> </div>`;
}, "/Users/amolkhatri/projects/astro-websites-platform/viewer/src/components/Footer.astro", void 0);

const $$file = "/Users/amolkhatri/projects/astro-websites-platform/viewer/src/components/Footer.astro";
const $$url = undefined;

export { $$Footer as default, $$file as file, $$url as url };
