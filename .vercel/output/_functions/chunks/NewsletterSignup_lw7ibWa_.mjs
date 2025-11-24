import { f as createComponent, g as createAstro, m as maybeRenderHead, h as renderTemplate } from './astro/server_CKXQ4CEk.mjs';
import 'piccolore';
import 'clsx';
/* empty css                          */

const $$Astro = createAstro();
const $$NewsletterSignup = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$NewsletterSignup;
  const { ctaText = "Subscribe" } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<section class="newsletter" data-astro-cid-3rzgxqcc> <h2 data-astro-cid-3rzgxqcc>Stay Updated</h2> <form onsubmit="event.preventDefault(); alert('Subscribed!');" data-astro-cid-3rzgxqcc> <input type="email" placeholder="Enter your email" required data-astro-cid-3rzgxqcc> <button type="submit" data-astro-cid-3rzgxqcc>${ctaText}</button> </form> </section> `;
}, "/Users/amolkhatri/projects/astro-websites-platform/viewer/src/components/blocks/NewsletterSignup.astro", void 0);

const $$file = "/Users/amolkhatri/projects/astro-websites-platform/viewer/src/components/blocks/NewsletterSignup.astro";
const $$url = undefined;

export { $$NewsletterSignup as default, $$file as file, $$url as url };
