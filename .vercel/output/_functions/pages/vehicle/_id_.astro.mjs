import { f as createComponent, g as createAstro, m as maybeRenderHead, r as renderComponent, h as renderTemplate } from '../../chunks/astro/server_CKXQ4CEk.mjs';
import 'piccolore';
import { $ as $$Layout } from '../../chunks/Layout_C8NW-q5z.mjs';
import $$Header from '../../chunks/Header_BfGsf6uN.mjs';
import $$Footer from '../../chunks/Footer_hhjJki6t.mjs';
/* empty css                                   */
import { $ as $$Image } from '../../chunks/_astro_assets_BwKQHJkB.mjs';
import { v as vehiclesData } from '../../chunks/vehicles_C8-E-Q8y.mjs';
import { h as homeData } from '../../chunks/home_BXm4EkaR.mjs';
export { renderers } from '../../renderers.mjs';

const $$Astro$1 = createAstro();
const $$VehicleDetails = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$VehicleDetails;
  const { vehicle } = Astro2.props;
  const images = /* #__PURE__ */ Object.assign({"../assets/v1.webp": () => import('../../chunks/v1_BfJ3H-Ys.mjs'),"../assets/v2.webp": () => import('../../chunks/v2_DHy8t3Lm.mjs'),"../assets/v3.webp": () => import('../../chunks/v3_BtVkYJPc.mjs'),"../assets/v4.webp": () => import('../../chunks/v4_CI24R5zg.mjs')

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
  return renderTemplate`${maybeRenderHead()}<div class="vehicle-details-container"> <div class="vehicle-details-grid"> <!-- Left Column: Gallery --> <div class="vehicle-gallery"> <div class="main-image-container"> ${renderComponent($$result, "Image", $$Image, { "src": images[imagePath](), "alt": `${vehicle.year} ${vehicle.make} ${vehicle.model}`, "class": "main-image", "loading": "lazy" })} </div> <!-- Placeholder for thumbnails since we only have one image per vehicle in data --> <div class="thumbnail-grid"> <div class="thumbnail active"> ${renderComponent($$result, "Image", $$Image, { "src": images[imagePath](), "alt": "Thumbnail 1", "loading": "lazy" })} </div> <!-- Simulating other thumbnails --> <div class="thumbnail" style="background-color: #eee;"></div> <div class="thumbnail" style="background-color: #eee;"></div> <div class="thumbnail" style="background-color: #eee;"></div> </div> </div> <!-- Right Column: Info & Price --> <div class="vehicle-info"> <div class="vehicle-title-section"> <div class="text-sm text-gray-500 mb-2"> ${vehicle.year} ${vehicle.make} </div> <h1>${vehicle.model} ${vehicle.trim}</h1> <div class="vehicle-subtitle">
VIN: ${vehicle.vin} • Stock: ${vehicle.stock} </div> </div> <div class="price-card"> <div class="price-row"> <span class="price-label">MSRP</span> <span class="price-value msrp">${formatPrice(vehicle.msrp)}</span> </div> <div class="price-row"> <span class="price-label">Passport Price</span> <span class="price-value final">${formatPrice(vehicle.price)}</span> </div> <div class="cta-buttons"> <button class="btn btn-primary">Confirm Availability</button> <button class="btn btn-outline">Schedule Test Drive</button> <button class="btn btn-outline">Start Purchase</button> <button class="btn btn-outline">Value Trade-in</button> </div> </div> <div class="quick-specs"> <h3 class="font-semibold mb-3">Key Features</h3> <ul class="space-y-2 text-gray-600"> <li>• ${vehicle.engine}</li> <li>• ${vehicle.transmission}</li> <li>• ${vehicle.drivetrain}</li> <li>• ${vehicle.mpg}</li> </ul> </div> </div> </div> <!-- Full Specs Section --> <div class="specs-section"> <h2 class="section-title">Vehicle Specifications</h2> <div class="specs-grid-detailed"> <div class="spec-box"> <span class="spec-label">Exterior Color</span> <span class="spec-value">${vehicle.exteriorColor}</span> </div> <div class="spec-box"> <span class="spec-label">Interior Color</span> <span class="spec-value">${vehicle.interiorColor}</span> </div> <div class="spec-box"> <span class="spec-label">Engine</span> <span class="spec-value">${vehicle.engine}</span> </div> <div class="spec-box"> <span class="spec-label">Transmission</span> <span class="spec-value">${vehicle.transmission}</span> </div> <div class="spec-box"> <span class="spec-label">Drivetrain</span> <span class="spec-value">${vehicle.drivetrain}</span> </div> <div class="spec-box"> <span class="spec-label">MPG</span> <span class="spec-value">${vehicle.mpg}</span> </div> <div class="spec-box"> <span class="spec-label">Stock Number</span> <span class="spec-value">${vehicle.stock}</span> </div> <div class="spec-box"> <span class="spec-label">VIN</span> <span class="spec-value">${vehicle.vin}</span> </div> </div> </div> <!-- Description Section --> <div class="description-section"> <h2 class="section-title">Vehicle Description</h2> <div class="description-content"> <p>
Experience the ${vehicle.year} ${vehicle.make} ${vehicle.model} ${vehicle.trim}. This vehicle features a powerful ${vehicle.engine} paired with a smooth ${vehicle.transmission}. Finished in ${vehicle.exteriorColor} with a ${vehicle.interiorColor} interior, it offers both style and
                comfort. With ${vehicle.drivetrain} and impressive fuel economy of
${vehicle.mpg}, it's ready for any journey.
</p> <br> <p>
Visit Passport Mazda today to test drive this ${vehicle.year} ${vehicle.make} ${vehicle.model}. Stock number ${vehicle.stock}.
</p> </div> </div> </div>`;
}, "/Users/amolkhatri/projects/astro-websites-platform/viewer/src/components/VehicleDetails.astro", void 0);

const $$Astro = createAstro();
const $$id = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$id;
  const { id } = Astro2.params;
  const vehicle = vehiclesData.find((v) => v.id === id);
  if (!vehicle) {
    return Astro2.redirect("/404");
  }
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": `${vehicle.year} ${vehicle.make} ${vehicle.model} | Passport Mazda` }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Header", $$Header, { ...homeData.header })} ${maybeRenderHead()}<main class="bg-gray-50 min-h-screen pb-12"> <div class="bg-white border-b border-gray-200 mb-8"> <div class="container mx-auto px-4 py-4"> <a href="/searchnew" class="text-blue-600 hover:underline flex items-center gap-1">
← Back to Inventory
</a> </div> </div> ${renderComponent($$result2, "VehicleDetails", $$VehicleDetails, { "vehicle": vehicle })} </main> ${renderComponent($$result2, "Footer", $$Footer, { ...homeData.footer })} ` })}`;
}, "/Users/amolkhatri/projects/astro-websites-platform/viewer/src/pages/vehicle/[id].astro", void 0);

const $$file = "/Users/amolkhatri/projects/astro-websites-platform/viewer/src/pages/vehicle/[id].astro";
const $$url = "/vehicle/[id]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$id,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
