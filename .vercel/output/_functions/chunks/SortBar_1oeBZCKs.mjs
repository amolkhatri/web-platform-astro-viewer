import { f as createComponent, g as createAstro, m as maybeRenderHead, i as renderScript, j as addAttribute, h as renderTemplate } from './astro/server_CKXQ4CEk.mjs';
import 'piccolore';
import 'clsx';
/* empty css                             */

function parseFilters(searchParams) {
  return {
    models: searchParams.get("model")?.split(",").filter(Boolean) || [],
    years: searchParams.get("year")?.split(",").filter(Boolean) || [],
    statuses: searchParams.get("status")?.split(",").filter(Boolean) || [],
    priceRanges: searchParams.get("price")?.split(",").filter(Boolean) || []
  };
}
function filterVehicles(vehicles, filters) {
  return vehicles.filter((vehicle) => {
    if (filters.models.length > 0) {
      if (!filters.models.includes(vehicle.model)) {
        return false;
      }
    }
    if (filters.years.length > 0) {
      if (!filters.years.includes(vehicle.year.toString())) {
        return false;
      }
    }
    if (filters.statuses.length > 0) {
      const normalizedStatus = vehicle.status.toLowerCase().replace(/\s+/g, "-");
      const matchesStatus = filters.statuses.some((status) => {
        const normalizedFilter = status.toLowerCase().replace(/\s+/g, "-");
        return normalizedStatus === normalizedFilter || vehicle.status === status;
      });
      if (!matchesStatus) {
        return false;
      }
    }
    if (filters.priceRanges.length > 0) {
      const matchesPrice = filters.priceRanges.some((range) => {
        return isInPriceRange(vehicle.price, range);
      });
      if (!matchesPrice) {
        return false;
      }
    }
    return true;
  });
}
function isInPriceRange(price, range) {
  const cleanRange = range.replace(/\$/g, "").replace(/\s+/g, "");
  if (cleanRange.includes("+")) {
    const min = parseFloat(cleanRange.replace("k+", "")) * 1e3;
    return price >= min;
  } else if (cleanRange.includes("-")) {
    const [minStr, maxStr] = cleanRange.split("-");
    const min = parseFloat(minStr.replace("k", "")) * 1e3;
    const max = parseFloat(maxStr.replace("k", "")) * 1e3;
    return price >= min && price <= max;
  }
  return false;
}
function calculateFilterCounts(allVehicles, currentFilters) {
  const modelCounts = /* @__PURE__ */ new Map();
  const yearCounts = /* @__PURE__ */ new Map();
  const statusCounts = /* @__PURE__ */ new Map();
  const priceRangeCounts = /* @__PURE__ */ new Map();
  const priceRanges = ["$20k - $30k", "$30k - $40k", "$40k - $50k", "$50k+"];
  allVehicles.forEach((vehicle) => {
    const modelTestFilters = { ...currentFilters, models: [vehicle.model] };
    if (wouldPassFilters(vehicle, modelTestFilters)) {
      modelCounts.set(vehicle.model, (modelCounts.get(vehicle.model) || 0) + 1);
    }
    const yearStr = vehicle.year.toString();
    const yearTestFilters = { ...currentFilters, years: [yearStr] };
    if (wouldPassFilters(vehicle, yearTestFilters)) {
      yearCounts.set(yearStr, (yearCounts.get(yearStr) || 0) + 1);
    }
    const statusTestFilters = { ...currentFilters, statuses: [vehicle.status] };
    if (wouldPassFilters(vehicle, statusTestFilters)) {
      statusCounts.set(vehicle.status, (statusCounts.get(vehicle.status) || 0) + 1);
    }
    priceRanges.forEach((range) => {
      if (isInPriceRange(vehicle.price, range)) {
        const priceTestFilters = { ...currentFilters, priceRanges: [range] };
        if (wouldPassFilters(vehicle, priceTestFilters)) {
          priceRangeCounts.set(range, (priceRangeCounts.get(range) || 0) + 1);
        }
      }
    });
  });
  return {
    models: Array.from(modelCounts.entries()).map(([label, count]) => ({ label, count })),
    years: Array.from(yearCounts.entries()).map(([label, count]) => ({ label, count })),
    statuses: Array.from(statusCounts.entries()).map(([label, count]) => ({ label, count })),
    priceRanges: priceRanges.map((label) => ({ label, count: priceRangeCounts.get(label) || 0 }))
  };
}
function wouldPassFilters(vehicle, filters) {
  const testVehicles = filterVehicles([vehicle], filters);
  return testVehicles.length > 0;
}
function isFilterActive(filters, filterType, value) {
  switch (filterType) {
    case "model":
      return filters.models.includes(value);
    case "year":
      return filters.years.includes(value);
    case "status":
      return filters.statuses.includes(value);
    case "price":
      return filters.priceRanges.includes(value);
    default:
      return false;
  }
}

const $$Astro$1 = createAstro();
const $$SearchFilter = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$SearchFilter;
  const { currentFilters, filterCounts } = Astro2.props;
  const filterCategories = [
    {
      title: "Status",
      type: "status",
      options: filterCounts.statuses.length > 0 ? filterCounts.statuses : [
        { label: "New", count: 0 },
        { label: "In Transit", count: 0 },
        { label: "In Stock", count: 0 }
      ]
    },
    {
      title: "Year",
      type: "year",
      options: filterCounts.years.length > 0 ? filterCounts.years.sort(
        (a, b) => b.label.localeCompare(a.label)
      ) : [
        { label: "2025", count: 0 },
        { label: "2024", count: 0 }
      ]
    },
    {
      title: "Model",
      type: "model",
      options: filterCounts.models.length > 0 ? filterCounts.models.sort(
        (a, b) => a.label.localeCompare(b.label)
      ) : [
        { label: "CX-5", count: 0 },
        { label: "CX-30", count: 0 },
        { label: "CX-50", count: 0 },
        { label: "CX-90", count: 0 },
        { label: "Mazda3 Sedan", count: 0 }
      ]
    },
    {
      title: "Price",
      type: "price",
      options: filterCounts.priceRanges
    }
  ];
  const hasActiveFilters = currentFilters.models.length > 0 || currentFilters.years.length > 0 || currentFilters.statuses.length > 0 || currentFilters.priceRanges.length > 0;
  const currentPath = Astro2.url.pathname;
  return renderTemplate`${maybeRenderHead()}<aside class="search-filter"> <div class="filter-header"> <h3 class="text-lg font-bold">Filters</h3> ${hasActiveFilters && renderTemplate`<a${addAttribute(currentPath, "href")} class="clear-filters">
Clear All
</a>`} </div> <div class="search-input-wrapper"> <input type="text" placeholder="Search by Make, Model, or Keyword" class="search-input"> </div> ${filterCategories.map((category) => renderTemplate`<div class="filter-section"> <div class="filter-title"> ${category.title} <span>−</span> </div> <div class="filter-options"> ${category.options.map((option) => {
    const isChecked = isFilterActive(
      currentFilters,
      category.type,
      option.label
    );
    return renderTemplate`<label class="filter-option"> <input type="checkbox" class="filter-checkbox"${addAttribute(category.type, "data-filter-type")}${addAttribute(option.label, "data-filter-value")}${addAttribute(isChecked, "checked")}> <span>${option.label}</span> <span class="filter-count">
(${option.count})
</span> </label>`;
  })} </div> </div>`)} </aside> ${renderScript($$result, "/Users/amolkhatri/projects/astro-websites-platform/viewer/src/components/SearchFilter.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/amolkhatri/projects/astro-websites-platform/viewer/src/components/SearchFilter.astro", void 0);

const $$Astro = createAstro();
const $$SortBar = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$SortBar;
  const { count } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div class="sort-bar"> <div class="results-count"> ${count} Vehicles Found
</div> <div class="sort-controls"> <label class="sort-label">Sort By:</label> <select class="sort-select"> <option>Price: Low to High</option> <option>Price: High to Low</option> <option>Year: Newest</option> <option>Year: Oldest</option> </select> </div> <div class="view-controls"> <button class="view-btn active" aria-label="Grid View"> <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg> </button> <button class="view-btn" aria-label="List View"> <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg> </button> </div> </div>`;
}, "/Users/amolkhatri/projects/astro-websites-platform/viewer/src/components/SortBar.astro", void 0);

export { $$SearchFilter as $, $$SortBar as a, calculateFilterCounts as c, filterVehicles as f, parseFilters as p };
