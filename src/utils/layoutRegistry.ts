
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
];

export function getLayoutDefinition(id: string): LayoutDefinition | undefined {
  return layoutRegistry.find((layout) => layout.id === id);
}
