import { f as createComponent, g as createAstro, m as maybeRenderHead, h as renderTemplate } from './astro/server_CKXQ4CEk.mjs';
import 'piccolore';
import 'clsx';
/* empty css                          */

const $$Astro = createAstro();
const $$VehicleGrid = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$VehicleGrid;
  const { title, description, vehicles } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<section class="vehicle-grid-section" data-astro-cid-fpdz4nhe> <div class="container" data-astro-cid-fpdz4nhe> <div class="section-header" data-astro-cid-fpdz4nhe> <h2 class="section-title" data-astro-cid-fpdz4nhe>${title}</h2> <p class="section-description" data-astro-cid-fpdz4nhe>${description}</p> </div> <div class="grid-container" data-astro-cid-fpdz4nhe> ${vehicles.map((vehicle) => renderTemplate`<div class="vehicle-card group" data-astro-cid-fpdz4nhe> <div class="card-image-wrapper" data-astro-cid-fpdz4nhe> <!-- Placeholder image logic if real image fails or is placeholder --> <div class="placeholder-image" data-astro-cid-fpdz4nhe> <span class="placeholder-icon" data-astro-cid-fpdz4nhe>🚗</span> </div> <!-- <img src={vehicle.image} alt={vehicle.model} class="w-full h-full object-cover group-hover:scale-105 transition duration-500" /> --> <div class="stock-badge" data-astro-cid-fpdz4nhe>
In Stock
</div> </div> <div class="card-content" data-astro-cid-fpdz4nhe> <h3 class="vehicle-title" data-astro-cid-fpdz4nhe>${vehicle.model}</h3> <p class="vehicle-availability" data-astro-cid-fpdz4nhe> <span class="availability-dot" data-astro-cid-fpdz4nhe></span> ${vehicle.available} Available
</p> <a href="#" class="view-inventory-btn" data-astro-cid-fpdz4nhe>
View Inventory
</a> </div> </div>`)} </div> </div> </section> `;
}, "/Users/amolkhatri/projects/astro-websites-platform/viewer/src/components/VehicleGrid.astro", void 0);

const $$file = "/Users/amolkhatri/projects/astro-websites-platform/viewer/src/components/VehicleGrid.astro";
const $$url = undefined;

export { $$VehicleGrid as default, $$file as file, $$url as url };
