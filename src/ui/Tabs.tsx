import { type ReactNode, useState, createContext, useContext } from "react";

type TabsVariant = "bordered" | "lifted" | "boxed";

type TabsSize = "xs" | "sm" | "md" | "lg";

interface TabsContextType {
  activeTab: string;
  setActiveTab: (value: string) => void;
}

const TabsContext = createContext<TabsContextType | undefined>(undefined);

interface TabsProps {
  children: ReactNode;
  defaultValue: string;
  variant?: TabsVariant;
  size?: TabsSize;
  className?: string;
}

const Tabs = ({
  children,
  defaultValue,
  variant,
  size,
  className = "",
}: TabsProps) => {
  const [activeTab, setActiveTab] = useState(defaultValue);

  const variantClasses = {
    bordered: "tabs-bordered",
    lifted: "tabs-lifted",
    boxed: "tabs-boxed",
  };

  const sizeClasses = {
    xs: "tabs-xs",
    sm: "tabs-sm",
    md: "",
    lg: "tabs-lg",
  };

  const classes = [
    "tabs",
    variant ? variantClasses[variant] : "",
    sizeClasses[size || "md"],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className={classes}>{children}</div>
    </TabsContext.Provider>
  );
};

interface TabListProps {
  children: ReactNode;
  className?: string;
}

const TabList = ({ children, className = "" }: TabListProps) => {
  return <div className={className}>{children}</div>;
};

interface TabProps {
  value: string;
  children: ReactNode;
  icon?: ReactNode;
  className?: string;
}

const Tab = ({ value, children, icon, className = "" }: TabProps) => {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error("Tab must be used within Tabs");
  }

  const { activeTab, setActiveTab } = context;
  const isActive = activeTab === value;

  return (
    <button
      type="button"
      className={`tab ${isActive ? "tab-active" : ""} ${className}`}
      onClick={() => setActiveTab(value)}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </button>
  );
};

interface TabPanelProps {
  value: string;
  children: ReactNode;
  className?: string;
}

const TabPanel = ({ value, children, className = "" }: TabPanelProps) => {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error("TabPanel must be used within Tabs");
  }

  const { activeTab } = context;

  if (activeTab !== value) {
    return null;
  }

  return <div className={className}>{children}</div>;
};

export { Tabs, TabList, Tab, TabPanel };

