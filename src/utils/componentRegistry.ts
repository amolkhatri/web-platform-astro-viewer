/**
 * Component Registry - Single Source of Truth for all components
 * This defines all available components, their schemas, and default configurations
 */

export type FieldType = 'text' | 'textarea' | 'number' | 'url' | 'array' | 'object' | 'array-of-objects';

export interface ComponentField {
  name: string;
  type: FieldType;
  label: string;
  placeholder?: string;
  required?: boolean;

  // For array type
  itemType?: 'text' | 'textarea' | 'number' | 'url';
  addButtonText?: string;

  // For object and array-of-objects types
  fields?: ComponentField[];
}

export interface ComponentDefinition {
  type: string;
  label: string;
  description: string;
  category: 'layout' | 'content' | 'dynamic';
  icon?: string;
  fields: ComponentField[];
  defaultData: Record<string, any>;
}

export const componentRegistry: ComponentDefinition[] = [
  {
    type: 'HeroSection',
    label: 'Hero Section (Old)',
    description: 'Legacy hero section component',
    category: 'content',
    icon: '🎯',
    fields: [
      {
        name: 'title',
        type: 'text',
        label: 'Title',
        placeholder: 'Enter hero title',
        required: true
      },
      {
        name: 'subtitle',
        type: 'textarea',
        label: 'Subtitle',
        placeholder: 'Enter hero subtitle'
      }
    ],
    defaultData: {
      title: 'New Hero Section',
      subtitle: 'Add your subtitle here'
    }
  },

  {
    type: 'FeaturesGrid',
    label: 'Features Grid',
    description: 'Grid of feature items',
    category: 'content',
    icon: '📋',
    fields: [
      {
        name: 'items',
        type: 'array',
        itemType: 'text',
        label: 'Features',
        addButtonText: '+ Add Feature'
      }
    ],
    defaultData: {
      items: ['Feature 1', 'Feature 2', 'Feature 3']
    }
  },

  {
    type: 'NewsletterSignup',
    label: 'Newsletter Signup',
    description: 'Newsletter subscription form',
    category: 'content',
    icon: '📧',
    fields: [
      {
        name: 'ctaText',
        type: 'text',
        label: 'CTA Button Text',
        placeholder: 'Enter button text'
      }
    ],
    defaultData: {
      ctaText: 'Subscribe'
    }
  },

  {
    type: 'Header',
    label: 'Header',
    description: 'Site header with logo and navigation',
    category: 'layout',
    icon: '🎨',
    fields: [
      {
        name: 'logo',
        type: 'object',
        label: 'Logo',
        fields: [
          {
            name: 'src',
            type: 'url',
            label: 'Logo URL',
            placeholder: 'https://...',
            required: true
          },
          {
            name: 'alt',
            type: 'text',
            label: 'Alt Text',
            placeholder: 'Logo description'
          }
        ]
      },
      {
        name: 'nav',
        type: 'array-of-objects',
        label: 'Navigation Items',
        addButtonText: '+ Add Nav Item',
        fields: [
          {
            name: 'label',
            type: 'text',
            label: 'Label',
            placeholder: 'Menu item label',
            required: true
          },
          {
            name: 'href',
            type: 'text',
            label: 'Link',
            placeholder: '/path',
            required: true
          }
        ]
      },
      {
        name: 'phone',
        type: 'text',
        label: 'Phone Number',
        placeholder: '301-423-2200'
      }
    ],
    defaultData: {
      logo: {
        src: 'https://www.passportmazda.com/assets/logos/passport-mazda-logo.png',
        alt: 'Passport Mazda'
      },
      nav: [
        { label: 'New', href: '/new-inventory' },
        { label: 'Pre-Owned', href: '/used-inventory' },
        { label: 'Specials', href: '/specials' }
      ],
      phone: '301-423-2200'
    }
  },

  {
    type: 'Hero',
    label: 'Hero',
    description: 'Hero banner with search',
    category: 'content',
    icon: '🖼️',
    fields: [
      {
        name: 'title',
        type: 'text',
        label: 'Title',
        placeholder: 'Enter hero title',
        required: true
      },
      {
        name: 'image',
        type: 'url',
        label: 'Background Image URL',
        placeholder: 'https://...'
      },
      {
        name: 'search',
        type: 'object',
        label: 'Search Box',
        fields: [
          {
            name: 'placeholder',
            type: 'text',
            label: 'Placeholder Text',
            placeholder: 'Search placeholder'
          }
        ]
      }
    ],
    defaultData: {
      title: 'Find Your Next Mazda',
      image: 'https://di-uploads-pod5.dealerinspire.com/passportmazda/uploads/2023/08/24-Mazda-CX-90-PHEV-Hero-Banner-Desktop.jpg',
      search: {
        placeholder: 'Search by Model, Year, or Keyword'
      }
    }
  },

  {
    type: 'VehicleGrid',
    label: 'Vehicle Grid',
    description: 'Grid of vehicle cards',
    category: 'content',
    icon: '🚗',
    fields: [
      {
        name: 'title',
        type: 'text',
        label: 'Title',
        placeholder: 'Section title'
      },
      {
        name: 'description',
        type: 'textarea',
        label: 'Description',
        placeholder: 'Section description'
      },
      {
        name: 'vehicles',
        type: 'array-of-objects',
        label: 'Vehicles',
        addButtonText: '+ Add Vehicle',
        fields: [
          {
            name: 'model',
            type: 'text',
            label: 'Model',
            placeholder: 'Mazda CX-5',
            required: true
          },
          {
            name: 'available',
            type: 'number',
            label: 'Available Count',
            placeholder: '0'
          },
          {
            name: 'image',
            type: 'url',
            label: 'Image URL',
            placeholder: 'https://...'
          }
        ]
      }
    ],
    defaultData: {
      title: 'Incredible New Mazda Vehicles',
      description: 'Check out our latest inventory.',
      vehicles: [
        {
          model: 'Mazda CX-30',
          available: 31,
          image: 'https://pictures.dealer.com/p/passportmazda/0894/089489610a0e0a170155656565656565.jpg'
        },
        {
          model: 'Mazda CX-5',
          available: 71,
          image: 'https://pictures.dealer.com/p/passportmazda/1234/1234567890abcdef1234567890abcdef.jpg'
        }
      ]
    }
  },

  {
    type: 'ContentSection',
    label: 'Content Section',
    description: 'Content block with image',
    category: 'content',
    icon: '📄',
    fields: [
      {
        name: 'title',
        type: 'text',
        label: 'Title',
        placeholder: 'Section title',
        required: true
      },
      {
        name: 'content',
        type: 'textarea',
        label: 'Content',
        placeholder: 'Section content',
        required: true
      },
      {
        name: 'link',
        type: 'object',
        label: 'Call to Action Link',
        fields: [
          {
            name: 'label',
            type: 'text',
            label: 'Link Label',
            placeholder: 'Learn More'
          },
          {
            name: 'href',
            type: 'text',
            label: 'Link URL',
            placeholder: '/page'
          }
        ]
      },
      {
        name: 'image',
        type: 'url',
        label: 'Image URL',
        placeholder: 'https://...',
        required: true
      }
    ],
    defaultData: {
      title: 'Mazda Certified Pre-Owned',
      content: 'Only the best-maintained late-model vehicles make the Mazda Certified Pre-Owned (CPO) vehicle cut.',
      link: { label: 'Search Certified', href: '/certified' },
      image: 'https://di-uploads-pod5.dealerinspire.com/passportmazda/uploads/2023/08/Mazda-CPO-Banner.jpg'
    }
  },

  {
    type: 'CertifiedSection',
    label: 'Certified Section',
    description: 'Premium content block with configurable image position (left/right) and black background',
    category: 'content',
    icon: '⭐',
    fields: [
      {
        name: 'title',
        type: 'text',
        label: 'Title',
        placeholder: 'Section title',
        required: true
      },
      {
        name: 'description',
        type: 'textarea',
        label: 'Description',
        placeholder: 'Section description',
        required: true
      },
      {
        name: 'image',
        type: 'url',
        label: 'Image URL',
        placeholder: 'https://...',
        required: true
      },
      {
        name: 'imagePosition',
        type: 'text',
        label: 'Image Position (left or right)',
        placeholder: 'left'
      },
      {
        name: 'link',
        type: 'object',
        label: 'Call to Action Link (Optional)',
        fields: [
          {
            name: 'label',
            type: 'text',
            label: 'Link Label',
            placeholder: 'Learn More'
          },
          {
            name: 'href',
            type: 'text',
            label: 'Link URL',
            placeholder: '/page'
          }
        ]
      }
    ],
    defaultData: {
      title: 'Mazda Certified Pre-Owned',
      description: 'Only the best-maintained late-model vehicles make the Mazda Certified Pre-Owned (CPO) vehicle cut. To be eligible, the maximum is a genuine 160-point inspection. From major components, each vehicle is scrutinized and tested.',
      image: '/src/assets/nissan-rogue-research.png',
      imagePosition: 'left',
      link: { label: 'Learn Certified', href: '/certified' }
    }
  },

  {
    type: 'Footer',
    label: 'Footer',
    description: 'Site footer with contact info',
    category: 'layout',
    icon: '📍',
    fields: [
      {
        name: 'address',
        type: 'text',
        label: 'Address',
        placeholder: 'Street address'
      },
      {
        name: 'phone',
        type: 'text',
        label: 'Phone Number',
        placeholder: '240-695-5601'
      },
      {
        name: 'hours',
        type: 'array-of-objects',
        label: 'Business Hours',
        addButtonText: '+ Add Hours',
        fields: [
          {
            name: 'department',
            type: 'text',
            label: 'Department',
            placeholder: 'Sales'
          },
          {
            name: 'time',
            type: 'text',
            label: 'Hours',
            placeholder: 'Mon-Fri 9am-8pm'
          }
        ]
      }
    ],
    defaultData: {
      address: '5050 Auth Way, Suitland, MD 20746',
      phone: '240-695-5601',
      hours: [
        { department: 'Sales', time: 'Mon-Fri 9am-8pm' },
        { department: 'Service', time: 'Mon-Fri 7am-6pm' }
      ]
    }
  },

  {
    type: 'DynamicRenderer',
    label: 'Dynamic Renderer',
    description: 'Custom HTML/CSS/JS component',
    category: 'dynamic',
    icon: '⚡',
    fields: [
      {
        name: 'html',
        type: 'textarea',
        label: 'HTML',
        placeholder: '<h2>Hello World</h2>'
      },
      {
        name: 'css',
        type: 'textarea',
        label: 'CSS',
        placeholder: 'h2 { color: blue; }'
      },
      {
        name: 'js',
        type: 'textarea',
        label: 'JavaScript',
        placeholder: 'console.log("Hello");'
      }
    ],
    defaultData: {
      html: '<h2>Hello World</h2>',
      css: 'h2 { color: blue; }',
      js: 'console.log("Hello from Dynamic Renderer");'
    }
  }
];

/**
 * Get component definition by type
 */
export function getComponentDefinition(type: string): ComponentDefinition | undefined {
  return componentRegistry.find(comp => comp.type === type);
}

/**
 * Get all component types
 */
export function getComponentTypes(): string[] {
  return componentRegistry.map(comp => comp.type);
}
