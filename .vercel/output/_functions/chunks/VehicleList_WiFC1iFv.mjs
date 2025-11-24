import { f as createComponent, g as createAstro, m as maybeRenderHead, j as addAttribute, r as renderComponent, h as renderTemplate } from './astro/server_CKXQ4CEk.mjs';
import 'piccolore';
/* empty css                          */
import { $ as $$Image } from './_astro_assets_BwKQHJkB.mjs';

const $$Astro$1 = createAstro();
const $$VehicleCard = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$VehicleCard;
  const { vehicle } = Astro2.props;
  const images = /* #__PURE__ */ Object.assign({"../assets/v1.webp": () => import('./v1_BfJ3H-Ys.mjs'),"../assets/v2.webp": () => import('./v2_DHy8t3Lm.mjs'),"../assets/v3.webp": () => import('./v3_BtVkYJPc.mjs'),"../assets/v4.webp": () => import('./v4_CI24R5zg.mjs')

});
  const imagePath = `../assets/${vehicle.image}`;
  if (!images[imagePath])
    throw new Error(
      `"${vehicle.image}" does not exist in glob: "src/assets/*.{jpeg,jpg,png,gif,webp}"`
    );
  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0
    }).format(price);
  };
  return renderTemplate`${maybeRenderHead()}<div class="vehicle-card-detailed"> <div class="card-image-container"> <div class="card-badges"> <span class="badge new">New</span> <span class="badge stock">${vehicle.status}</span> </div> <a${addAttribute(`/vehicle/${vehicle.id}`, "href")} class="block h-full"> ${renderComponent($$result, "Image", $$Image, { "src": images[imagePath](), "alt": `${vehicle.year} ${vehicle.make} ${vehicle.model}`, "class": "card-image", "loading": "lazy" })} </a> </div> <div class="card-details"> <div class="vehicle-header"> <div class="vehicle-year-make">${vehicle.year} ${vehicle.make}</div> <a${addAttribute(`/vehicle/${vehicle.id}`, "href")} class="hover:underline text-inherit"> <h3 class="vehicle-model-trim"> ${vehicle.model} ${vehicle.trim} </h3> </a> </div> <div class="specs-grid"> <div class="spec-item" title="Engine"> <span>⚙️</span> ${vehicle.engine} </div> <div class="spec-item" title="Transmission"> <span>🕹️</span> ${vehicle.transmission} </div> <div class="spec-item" title="Drivetrain"> <span>🚙</span> ${vehicle.drivetrain} </div> <div class="spec-item" title="MPG"> <span>⛽</span> ${vehicle.mpg} </div> <div class="spec-item" title="Exterior Color"> <span>🎨</span> ${vehicle.exteriorColor} </div> <div class="spec-item" title="Stock Number"> <span>#️⃣</span> ${vehicle.stock} </div> </div> <div class="pricing-section"> <div class="price-row"> <span class="price-label">MSRP</span> <span class="price-value msrp">${formatPrice(vehicle.msrp)}</span> </div> <div class="price-row"> <span class="price-label">Passport Price</span> <span class="price-value final">${formatPrice(vehicle.price)}</span> </div> </div> <div class="card-actions"> <a${addAttribute(`/vehicle/${vehicle.id}`, "href")} class="btn btn-outline text-center no-underline">View Details</a> <button class="btn btn-primary">Get E-Price</button> </div> </div> </div>`;
}, "/Users/amolkhatri/projects/astro-websites-platform/viewer/src/components/VehicleCard.astro", void 0);

const $$Astro = createAstro();
const $$VehicleList = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$VehicleList;
  await (async () => new Promise((resolve) => setTimeout(resolve, 3e3)))();
  const { vehicles } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div class="vehicle-list"> ${vehicles.map((vehicle) => renderTemplate`${renderComponent($$result, "VehicleCard", $$VehicleCard, { "vehicle": vehicle })}`)} </div>`;
}, "/Users/amolkhatri/projects/astro-websites-platform/viewer/src/components/VehicleList.astro", void 0);

const $$file = "/Users/amolkhatri/projects/astro-websites-platform/viewer/src/components/VehicleList.astro";
const $$url = undefined;

export { $$VehicleList as default, $$file as file, $$url as url };
