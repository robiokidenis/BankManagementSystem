import { useState } from "react";

type Tab = {
  title: string;
  content: JSX.Element;
  icon:any
};

type Props = {
  tabs: Tab[];
};

const TabComponent: React.FC<Props> = ({ tabs }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleTabClick = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <div className="border-b p-2 border-gray-200 dark:border-gray-700">
      <ul className="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400">
        {tabs.map((tab, index) => (
          <li className="mr-2" key={index}>
            <button
              className={`inline-flex p-4 border-b-2 rounded-t-lg   ${
                activeIndex === index
                  ? "text-blue-600 border-blue-600 active dark:text-blue-500 dark:border-blue-500"
                  : "text-gray-500 border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 group"
              }`}
              onClick={() => handleTabClick(index)}
            >
                {tab.icon}
              {tab.title}
            </button>
          </li>
        ))}
      </ul>
      <div className="mt-4">{tabs[activeIndex].content}</div>
    </div>
  );
};

export default TabComponent;
