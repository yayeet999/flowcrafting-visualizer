
import { create } from 'zustand';

export interface DiagramState {
  code: string;
  renderKey: number;
  zoomLevel: number;
  isDarkTheme: boolean;
  panOffset: { x: number; y: number };
  activeTemplate: string | null;
  splitPosition: number;
}

interface DiagramStore extends DiagramState {
  setCode: (code: string) => void;
  triggerRender: () => void;
  setZoomLevel: (level: number) => void;
  toggleTheme: () => void;
  setPanOffset: (offset: { x: number; y: number }) => void;
  setActiveTemplate: (templateId: string | null) => void;
  setSplitPosition: (position: number) => void;
  resetView: () => void;
}

export const defaultDiagram = `graph TD
    A[Start] --> B{Is it working?}
    B -->|Yes| C[Great!]
    B -->|No| D[Debug]
    D --> B
`;

const useStore = create<DiagramStore>((set) => ({
  // Initial state
  code: defaultDiagram,
  renderKey: 0,
  zoomLevel: 1,
  isDarkTheme: false,
  panOffset: { x: 0, y: 0 },
  activeTemplate: null,
  splitPosition: 50,

  // Actions
  setCode: (code) => set({ code }),
  
  triggerRender: () => set((state) => ({ 
    renderKey: state.renderKey + 1 
  })),
  
  setZoomLevel: (level) => set({ 
    zoomLevel: Math.max(0.1, Math.min(2, level)) 
  }),
  
  toggleTheme: () => set((state) => ({ 
    isDarkTheme: !state.isDarkTheme 
  })),
  
  setPanOffset: (offset) => set({ panOffset: offset }),
  
  setActiveTemplate: (templateId) => set({ activeTemplate: templateId }),
  
  setSplitPosition: (position) => set({ 
    splitPosition: Math.max(20, Math.min(80, position)) 
  }),
  
  resetView: () => set({ 
    zoomLevel: 1, 
    panOffset: { x: 0, y: 0 } 
  }),
}));

export default useStore;
