import { useState } from "react";

export const Tab = ({ tabs, defaultTab = 0 }) => {
  const [activeTab, setActiveTab] = useState(defaultTab);

  return (
    <div className="w-full">
      <div className="flex">
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(index)}
            className={`p-1 ${
              index === activeTab
                ? "text-blue-400 border-b-2 border-bluw-400"
                : "text-green-400"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="p-2">{tabs[activeTab].content}</div>
    </div>
  );
};
