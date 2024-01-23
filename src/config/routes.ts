import { HashLinearIcon } from '@/components/icons/linear';
export type sourceRoutesType = {
  [key: string]: sourceRoutesItemType[];
};

export type sourceRoutesItemType = {
  name: string;
  path?: string;
  collapsed?: boolean;
  icon?: any;
  items?: sourceRoutesItemType[];
};

export const sourceRoutes: sourceRoutesType = {
  react: [
    {
      name: 'react',
      path: '/source/react',
      icon: HashLinearIcon
    },
    {
      name: 'TOPICS',
      collapsed: false,
      items: [
        {
          name: 'react basic',
          collapsed: false,
          icon: '',
          items: [
            {
              name: 'react api',
              path: '/source/react/api2'
            },
            {
              name: 'react api1',
              path: '/source/react/api1'
            }
          ]
        }
      ]
    },
    {
      name: 'POPULAR',
      collapsed: false,
      items: [
        {
          name: 'react basic',
          collapsed: false,
          icon: '',
          items: [
            {
              name: 'react api',
              path: '/source/react/api2'
            },
            {
              name: 'react api1',
              path: '/source/react/api1'
            }
          ]
        },
        {
          name: 'react basic',
          collapsed: false,
          icon: '',
          items: [
            {
              name: 'react api',
              path: '/source/react/api2'
            },
            {
              name: 'react api1',
              path: '/source/react/api1'
            }
          ]
        }
      ]
    }
  ]
};
