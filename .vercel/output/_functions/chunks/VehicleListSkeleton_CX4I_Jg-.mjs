import { f as createComponent, m as maybeRenderHead, h as renderTemplate, g as createAstro, r as renderComponent } from './astro/server_CKXQ4CEk.mjs';
import 'piccolore';
/* empty css                          */
import 'clsx';

const $$VehicleCardSkeleton = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<div class="vehicle-card-skeleton skeleton-pulse"> <div class="skeleton-image"></div> <div class="skeleton-content"> <div class="skeleton-header"> <div class="skeleton-line short"></div> <div class="skeleton-line medium"></div> </div> <div class="skeleton-specs"> <div class="skeleton-spec-item"></div> <div class="skeleton-spec-item"></div> <div class="skeleton-spec-item"></div> <div class="skeleton-spec-item"></div> </div> <div class="skeleton-actions"> <div class="skeleton-button"></div> <div class="skeleton-button"></div> </div> </div> </div>`;
}, "/Users/amolkhatri/projects/astro-websites-platform/viewer/src/components/VehicleCardSkeleton.astro", void 0);

const $$Astro = createAstro();
const $$VehicleListSkeleton = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$VehicleListSkeleton;
  const { count = 6 } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div class="vehicle-list-skeleton"> ${Array.from({ length: count }).map(() => renderTemplate`${renderComponent($$result, "VehicleCardSkeleton", $$VehicleCardSkeleton, {})}`)} </div>`;
}, "/Users/amolkhatri/projects/astro-websites-platform/viewer/src/components/VehicleListSkeleton.astro", void 0);

export { $$VehicleListSkeleton as $ };
