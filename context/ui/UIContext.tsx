import { createContext } from "react";

export interface ContextProps {
  sideMenuOpen: boolean;
  isAddingEntry: boolean;
  isDragging: boolean;
  
  openSideMenu: () => void;
  closeSideMenu: () => void;
  startDragging: () => void;
  endDragging: () => void;
  setIsAddingEntry: (isAdding: boolean) => void
}
export const UIContext = createContext({} as ContextProps);
