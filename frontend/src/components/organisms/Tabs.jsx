import { useState } from "react";

export const Tab = ({ tabs, defaultTab = 0 }) => {
  const [activeTab, setActiveTab] = useState(defaultTab);

  return (
    <div className="w-full">
      <div className="flex border border-yellow-500">
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(index)}
            className={`p-2 font-medium ${
              index === activeTab
                ? "text-red-500 border-b-2 border-red-500"
                : "text-green-500"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div>{tabs[activeTab].content}</div>
    </div>
  );
};
