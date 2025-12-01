import { createContext, useContext, useState, ReactNode } from 'react';

interface TabsContextValue {
  activeTab: string;
  setActiveTab: (id: string) => void;
}

const TabsContext = createContext<TabsContextValue | undefined>(undefined);

function useTabs() {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error('Tabs compound components must be used within Tabs');
  }
  return context;
}

// Tabs Root Component
interface TabsProps {
  defaultTab: string;
  children: ReactNode;
}

export function Tabs({ defaultTab, children }: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab);

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className="w-full">
        {children}
      </div>
    </TabsContext.Provider>
  );
}

// TabList Component
interface TabListProps {
  children: ReactNode;
}

Tabs.List = function TabList({ children }: TabListProps) {
  return (
    <div className="flex border-b-2 border-gray-200 mb-4">
      {children}
    </div>
  );
};

// Tab Component
interface TabProps {
  id: string;
  children: ReactNode;
}

Tabs.Tab = function Tab({ id, children }: TabProps) {
  const { activeTab, setActiveTab } = useTabs();
  const isActive = activeTab === id;

  return (
    <button
      onClick={() => setActiveTab(id)}
      className={`px-6 py-3 font-bold transition-colors ${
        isActive
          ? 'text-blue-600 border-b-2 border-blue-600'
          : 'text-gray-600 hover:text-gray-800'
      }`}
    >
      {children}
    </button>
  );
};

// TabPanel Component
interface TabPanelProps {
  id: string;
  children: ReactNode;
}

Tabs.Panel = function TabPanel({ id, children }: TabPanelProps) {
  const { activeTab } = useTabs();

  if (activeTab !== id) return null;

  return <div className="py-4">{children}</div>;
};