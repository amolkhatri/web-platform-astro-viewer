import { f as createComponent, g as createAstro, m as maybeRenderHead, r as renderComponent, h as renderTemplate } from '../chunks/astro/server_CKXQ4CEk.mjs';
import 'piccolore';
import $$HeroSection from '../chunks/HeroSection_i77Yv7x_.mjs';
import $$FeaturesGrid from '../chunks/FeaturesGrid_CA5f2RuQ.mjs';
import $$NewsletterSignup from '../chunks/NewsletterSignup_lw7ibWa_.mjs';
import { $ as $$FallbackBlock } from '../chunks/FallbackBlock_IjmFPWgU.mjs';
import $$Header from '../chunks/Header_BfGsf6uN.mjs';
import $$Hero from '../chunks/Hero_DDgxMkhJ.mjs';
import $$VehicleGrid from '../chunks/VehicleGrid_DL6UczG8.mjs';
import $$ContentSection from '../chunks/ContentSection_B4tfCl0O.mjs';
import $$Footer from '../chunks/Footer_hhjJki6t.mjs';
import $$DynamicRenderer from '../chunks/DynamicRenderer_D-DaFd0A.mjs';
import { i as isBot } from '../chunks/isBot_BzP1LUpg.mjs';
/* empty css                                  */
import { $ as $$Layout } from '../chunks/Layout_C8NW-q5z.mjs';
export { renderers } from '../renderers.mjs';

const $$Astro$1 = createAstro();
const $$PageBuilder = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$PageBuilder;
  const { blocks = [] } = Astro2.props;
  const userAgent = Astro2.request.headers.get("user-agent") || "";
  const isBotRequest = isBot(userAgent);
  return renderTemplate`${maybeRenderHead()}<div class="dynamic-page-container"> ${blocks.map((block) => {
    switch (block.type) {
      case "HeroSection":
        return block.serverIsland && !isBotRequest ? renderTemplate`${renderComponent($$result, "HeroSection", $$HeroSection, { ...block.data, "server:defer": true, "server:component-directive": "defer", "server:component-path": "/Users/amolkhatri/projects/astro-websites-platform/viewer/src/components/blocks/HeroSection.astro", "server:component-export": "default" })}` : renderTemplate`${renderComponent($$result, "HeroSection", $$HeroSection, { ...block.data })}`;
      case "FeaturesGrid":
        return block.serverIsland && !isBotRequest ? renderTemplate`${renderComponent($$result, "FeaturesGrid", $$FeaturesGrid, { ...block.data, "server:defer": true, "server:component-directive": "defer", "server:component-path": "/Users/amolkhatri/projects/astro-websites-platform/viewer/src/components/blocks/FeaturesGrid.astro", "server:component-export": "default" })}` : renderTemplate`${renderComponent($$result, "FeaturesGrid", $$FeaturesGrid, { ...block.data })}`;
      case "NewsletterSignup":
        return block.serverIsland && !isBotRequest ? renderTemplate`${renderComponent($$result, "NewsletterSignup", $$NewsletterSignup, { ...block.data, "server:defer": true, "server:component-directive": "defer", "server:component-path": "/Users/amolkhatri/projects/astro-websites-platform/viewer/src/components/blocks/NewsletterSignup.astro", "server:component-export": "default" })}` : renderTemplate`${renderComponent($$result, "NewsletterSignup", $$NewsletterSignup, { ...block.data })}`;
      case "Header":
        return block.serverIsland && !isBotRequest ? renderTemplate`${renderComponent($$result, "Header", $$Header, { ...block.data, "server:defer": true, "server:component-directive": "defer", "server:component-path": "/Users/amolkhatri/projects/astro-websites-platform/viewer/src/components/Header.astro", "server:component-export": "default" })}` : renderTemplate`${renderComponent($$result, "Header", $$Header, { ...block.data })}`;
      case "Hero":
        return block.serverIsland && !isBotRequest ? renderTemplate`${renderComponent($$result, "Hero", $$Hero, { ...block.data, "server:defer": true, "server:component-directive": "defer", "server:component-path": "/Users/amolkhatri/projects/astro-websites-platform/viewer/src/components/Hero.astro", "server:component-export": "default" })}` : renderTemplate`${renderComponent($$result, "Hero", $$Hero, { ...block.data })}`;
      case "VehicleGrid":
        return block.serverIsland && !isBotRequest ? renderTemplate`${renderComponent($$result, "VehicleGrid", $$VehicleGrid, { ...block.data, "server:defer": true, "server:component-directive": "defer", "server:component-path": "/Users/amolkhatri/projects/astro-websites-platform/viewer/src/components/VehicleGrid.astro", "server:component-export": "default" })}` : renderTemplate`${renderComponent($$result, "VehicleGrid", $$VehicleGrid, { ...block.data })}`;
      case "ContentSection":
        return block.serverIsland && !isBotRequest ? renderTemplate`${renderComponent($$result, "ContentSection", $$ContentSection, { ...block.data, "server:defer": true, "server:component-directive": "defer", "server:component-path": "/Users/amolkhatri/projects/astro-websites-platform/viewer/src/components/ContentSection.astro", "server:component-export": "default" })}` : renderTemplate`${renderComponent($$result, "ContentSection", $$ContentSection, { ...block.data })}`;
      case "Footer":
        return block.serverIsland && !isBotRequest ? renderTemplate`${renderComponent($$result, "Footer", $$Footer, { ...block.data, "server:defer": true, "server:component-directive": "defer", "server:component-path": "/Users/amolkhatri/projects/astro-websites-platform/viewer/src/components/Footer.astro", "server:component-export": "default" })}` : renderTemplate`${renderComponent($$result, "Footer", $$Footer, { ...block.data })}`;
      case "DynamicRenderer":
        return block.serverIsland && !isBotRequest ? renderTemplate`${renderComponent($$result, "DynamicRenderer", $$DynamicRenderer, { ...block.data, "server:defer": true, "server:component-directive": "defer", "server:component-path": "/Users/amolkhatri/projects/astro-websites-platform/viewer/src/components/DynamicRenderer.astro", "server:component-export": "default" })}` : renderTemplate`${renderComponent($$result, "DynamicRenderer", $$DynamicRenderer, { ...block.data })}`;
      default:
        return renderTemplate`${renderComponent($$result, "FallbackBlock", $$FallbackBlock, { ...block.data, "type": block.type })}`;
    }
  })} </div>`;
}, "/Users/amolkhatri/projects/astro-websites-platform/viewer/src/components/PageBuilder.astro", "self");

const $$Astro = createAstro();
const $$ = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$;
  const { slug } = Astro2.params;
  const response = await fetch(`http://localhost:4321/api/pages/${slug}`);
  const pageData = await response.json();
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": pageData ? pageData.title : "Page Not Found" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<main> ${renderTemplate`${renderComponent($$result2, "PageBuilder", $$PageBuilder, { "blocks": pageData.blocks })}`} </main> ` })}`;
}, "/Users/amolkhatri/projects/astro-websites-platform/viewer/src/pages/[...slug].astro", void 0);

const $$file = "/Users/amolkhatri/projects/astro-websites-platform/viewer/src/pages/[...slug].astro";
const $$url = "/[...slug]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
