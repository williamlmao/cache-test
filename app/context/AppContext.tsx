import { createContext, useContext, ReactNode } from 'react';

interface AppContextType {
  // Add your context state and methods here
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppContextProvider');
  }
  return context;
}

interface AppContextProviderProps {
  children: ReactNode;
}

export function AppContextProvider({ children }: AppContextProviderProps) {
  // Add your context state and methods here
  const value = {
    // Add your context values here
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
} 