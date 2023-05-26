import DynamicHeroIcon from "../Icons";
import { Fragment, useState } from "react";
import { Menu, Transition } from "@headlessui/react";

interface Option {
  label: string;
  onClick: () => void;
}

interface DropDownProps {
  buttonText: string;
  options: Option[];
}

function DropDown({ buttonText, options }: DropDownProps) {
  const [selected, setSelected] = useState("Dashboard");

  return (
    <Menu as="div" className=" inline-block  text-left">
       <div className=" z-50">
        <Menu.Button className=" inline-flex justify-center w-full p-2 text-sm font-medium text-center text-gray-900 bg-white rounded-lg hover:bg-gray-100 focus:outline-none dark:text-white focus:ring-4 focus:ring-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
          <DynamicHeroIcon
            icon="EllipsisVerticalIcon"
            className="w-5 h-5"
          />
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 dropdown-menu w-44 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600 focus:outline-none dark:focus:ring-gray-600">
          <div className="py-2">
            {options.map((option, index) => (
              <Menu.Item >
                {({ active }) => (
                  <a
                    onClick={() => {
                      option.onClick();
                    }}
                    className={`block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white ${
                      active
                        ? "bg-gray-100 dark:bg-gray-600 dark:text-white"
                        : ""
                    }`}
                  >
                    {option.label}
                  </a>
                )}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}

export default DropDown;
