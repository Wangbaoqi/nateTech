import {
  IconPuzzle,
  IconNotepadDash,
  IconReact,
  IconWebHook,
  IconRoute,
  IconOrbit,
  IconBugPlay,
  IconFormInput,
  IconWaypoints,
  IconFrame,
  IconComponent,
  IconCombine,
  IconCodeSquare
} from '@/components/icons/';
export type sourceRoutesType = {
  [key: string]: sourceRoutesItemType[];
};

export type sourceRoutesItemType = {
  name?: string;
  path: string;
  collapsed?: boolean;
  icon?: any;
  items?: sourceRoutesItemType[];
};

export const sourceRoutes: sourceRoutesType = {
  react: [
    {
      name: 'react',
      path: '/docs/react',
      icon: IconReact
    },
    {
      name: 'Components',
      path: '/docs/react/components',
      collapsed: false,
      icon: IconComponent,
      items: [
        {
          name: 'component cycle',
          collapsed: false,
          icon: '',
          path: '/docs/react/components/lifecycle'
        }
      ]
    },
    {
      name: 'Rendering',
      path: '/docs/react/rendering',
      collapsed: false,
      icon: IconNotepadDash,
      items: [
        {
          name: 'component cycle',
          collapsed: false,
          icon: '',
          path: '/docs/react/rendering/lifecycle'
        },
        {
          name: 'component cycle',
          collapsed: false,
          icon: '',
          path: '/docs/react/rendering/lifecycle'
        }
      ]
    },
    {
      name: 'Hooks',
      path: '/docs/react/hooks',
      collapsed: false,
      icon: IconWebHook,
      items: [
        {
          name: 'component cycle',
          collapsed: false,
          icon: '',
          path: '/docs/react/rendering/lifecycle'
        },
        {
          name: 'component cycle',
          collapsed: false,
          icon: '',
          path: '/docs/react/rendering/lifecycle'
        }
      ]
    },
    {
      name: 'Routers',
      path: '/docs/react/Routers',
      collapsed: false,
      icon: IconRoute,
      items: [
        {
          name: 'component cycle',
          collapsed: false,
          icon: '',
          path: '/docs/react/rendering/lifecycle'
        },
        {
          name: 'component cycle',
          collapsed: false,
          icon: '',
          path: '/docs/react/rendering/lifecycle'
        }
      ]
    },
    {
      name: 'State Management',
      path: '/docs/react/Routers',
      collapsed: false,
      icon: IconOrbit,
      items: [
        {
          name: 'component cycle',
          collapsed: false,
          icon: '',
          path: '/docs/react/rendering/lifecycle'
        },
        {
          name: 'component cycle',
          collapsed: false,
          icon: '',
          path: '/docs/react/rendering/lifecycle'
        }
      ]
    },
    {
      name: 'Styling',
      path: '/docs/react/styling',
      collapsed: false,
      icon: IconPuzzle,
      items: [
        {
          name: 'component cycle',
          collapsed: false,
          icon: '',
          path: '/docs/react/rendering/lifecycle'
        },
        {
          name: 'component cycle',
          collapsed: false,
          icon: '',
          path: '/docs/react/rendering/lifecycle'
        }
      ]
    },
    {
      name: 'API Calls',
      path: '/docs/react/api',
      collapsed: false,
      icon: IconWaypoints,
      items: [
        {
          name: 'component cycle',
          collapsed: false,
          icon: '',
          path: '/docs/react/rendering/lifecycle'
        },
        {
          name: 'component cycle',
          collapsed: false,
          icon: '',
          path: '/docs/react/rendering/lifecycle'
        }
      ]
    },
    {
      name: 'Testing',
      path: '/docs/react/testing',
      collapsed: false,
      icon: IconBugPlay,
      items: [
        {
          name: 'component cycle',
          collapsed: false,
          icon: '',
          path: '/docs/react/rendering/lifecycle'
        },
        {
          name: 'component cycle',
          collapsed: false,
          icon: '',
          path: '/docs/react/rendering/lifecycle'
        }
      ]
    },
    {
      name: 'Frameworks',
      path: '/docs/react/frameworks',
      collapsed: false,
      icon: IconFrame,
      items: [
        {
          name: 'component cycle',
          collapsed: false,
          icon: '',
          path: '/docs/react/rendering/lifecycle'
        },
        {
          name: 'component cycle',
          collapsed: false,
          icon: '',
          path: '/docs/react/rendering/lifecycle'
        }
      ]
    },
    {
      name: 'Advanced Topics',
      path: '/docs/react/topics',
      collapsed: false,
      icon: IconCombine,
      items: [
        {
          name: 'Form',
          collapsed: false,
          icon: IconFormInput,
          path: '/docs/react/rendering/lifecycle'
        },
        {
          name: 'component cycle',
          collapsed: false,
          icon: '',
          path: '/docs/react/rendering/lifecycle'
        }
      ]
    },
    {
      name: 'SourceCode Series',
      path: '/docs/react/source',
      collapsed: false,
      icon: IconCodeSquare,
      items: [
        {
          name: 'Form',
          collapsed: false,
          icon: IconFormInput,
          path: '/docs/react/rendering/lifecycle'
        },
        {
          name: 'component cycle',
          collapsed: false,
          icon: '',
          path: '/docs/react/rendering/lifecycle'
        }
      ]
    }
  ]
};
