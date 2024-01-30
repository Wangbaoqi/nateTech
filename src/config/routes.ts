import { IconPuzzle, IconDiamond, IconReact } from '@/components/icons/';
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
      icon: IconPuzzle,
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
    }
  ]
};
