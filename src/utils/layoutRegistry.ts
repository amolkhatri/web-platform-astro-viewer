
export interface LayoutDefinition {
  id: string;
  label: string;
  description: string;
  componentPath: string; // Path relative to src/layouts or absolute import path
}

export const layoutRegistry: LayoutDefinition[] = [
  {
    id: 'default',
    label: 'Default Layout',
    description: 'Standard layout with header and footer',
    componentPath: '/src/layouts/Layout.astro',
  },
  {
    id: 'minimal',
    label: 'Minimal Layout',
    description: 'Simplified layout for landing pages',
    componentPath: '/src/layouts/MinimalLayout.astro',
  },
  {
    id: 'sidebar',
    label: 'Sidebar Layout',
    description: 'Layout with a sidebar for navigation',
    componentPath: '/src/layouts/SidebarLayout.astro',
  },
  {
    id: 'main',
    label: 'Main Layout',
    description: 'Layout with search header and footer',
    componentPath: '/src/layouts/MainLayout.astro',
  },
  {
    id: 'vehicle-multislot',
    label: 'Vehicle Detail Multi-slot',
    description: 'Layout with header, vehicle photo and 8 content blocks',
    componentPath: '/src/layouts/multipleSlot.astro',
  },
  {
    id: 'layout1',
    label: 'Layout 1 - Split Rows',
    description: 'Two split rows (1/3 + 2/3 and 2/3 + 1/3) with full-width rows between',
    componentPath: '/src/layouts/DO/Layout1.astro',
  },
  {
    id: 'layout2',
    label: 'Layout 2 - Sidebar',
    description: 'Left sidebar (3 blocks) with main content area (5 blocks)',
    componentPath: '/src/layouts/DO/Layout2.astro',
  },
  {
    id: 'layout3',
    label: 'Layout 3 - Three Column',
    description: 'Hero + two rows of 3 columns each with a full-width section between',
    componentPath: '/src/layouts/DO/Layout3.astro',
  },
  {
    id: 'layout4',
    label: 'Layout 4 - Magazine',
    description: 'Featured section (large + 2 small) + banner + 4-column grid',
    componentPath: '/src/layouts/DO/Layout4.astro',
  },
  {
    id: 'layout5',
    label: 'Layout 5 - Dashboard',
    description: '4 stat cards + chart section (2/3 + 1/3) + 2-column bottom',
    componentPath: '/src/layouts/DO/Layout5.astro',
  },
  {
    id: 'layout6',
    label: 'Layout 6 - Masonry',
    description: 'CSS Grid masonry-style with varying block sizes',
    componentPath: '/src/layouts/DO/Layout6.astro',
  },
];

export function getLayoutDefinition(id: string): LayoutDefinition | undefined {
  return layoutRegistry.find((layout) => layout.id === id);
}
