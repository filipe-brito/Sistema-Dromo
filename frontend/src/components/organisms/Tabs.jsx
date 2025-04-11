import { useState } from "react";

export const Tab = ({ tabs, defaultTab = 0 }) => {
  const [activeTab, setActiveTab] = useState(defaultTab);

  return (
    <div className="relative w-full">
      {/* 🔹 Aba sobreposta */}
      <div className="flex gap-1 relative mx-2">
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(index)}
            className={`px-1 rounded-t-md font-semibold border cursor-pointer flex gap-2 items-center ${
              index === activeTab
                ? "text-neutral-100 bg-green-700 border-transparent"
                : "text-neutral-100/50 bg-transparent border-green-400/60 rounded transition-colors duration-300 hover:text-neutral-100"
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>
      {/* 🔹 Conteúdo com borda total */}
      <div className="p-1 border-2 border-green-700 rounded-md">
        {tabs[activeTab].content}
      </div>
    </div>
  );
};
