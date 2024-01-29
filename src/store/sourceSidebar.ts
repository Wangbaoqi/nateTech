import { sourceRoutesItemType } from '@/config/routes';
import { create } from 'zustand';

type State = {
  sidebar: sourceRoutesItemType[];
};

type Action = {
  setSidebar: (sidebar: sourceRoutesItemType[]) => void;
  setSidebarExpanded: (path: string) => void;
};

const updateSidebar = (state: State, path: string) => {
  const sidebar = state.sidebar;

  const findItem = (list: sourceRoutesItemType[]) => {
    list.forEach((item) => {
      if (item.path === path) {
        item.collapsed = !item.collapsed;
      }
      if (item.items) {
        findItem(item.items);
      }
    });
  };

  findItem(sidebar);

  return {
    sidebar
  };
};

export const useSourceSidebar = create<State & Action>((set) => ({
  sidebar: [],
  setSidebar: (sidebar) => set({ sidebar }),
  setSidebarExpanded: (path: string) =>
    set((state) => updateSidebar(state, path))
}));
