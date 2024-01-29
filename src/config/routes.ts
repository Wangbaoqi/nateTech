import { HashLinearIcon } from '@/components/icons/linear';
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
      path: '/source/react/overview',
      icon: HashLinearIcon
    },
    {
      name: 'Components',
      path: '/source/react/components',
      collapsed: false,
      items: [
        {
          name: 'react function component',
          collapsed: false,
          icon: '',
          path: '/source/react/components/function'
        },
        {
          name: 'react class component',
          collapsed: false,
          icon: '',
          path: '/source/react/components/class'
        }
      ]
    }
  ]
};
