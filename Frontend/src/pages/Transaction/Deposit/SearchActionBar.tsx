import DynamicHeroIcon from "@/libs/Icons";
import { FC, ChangeEvent, MouseEvent } from "react";

interface Props {
  searchQuery: string;
  handleSearchInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleDelete?: (event: MouseEvent<HTMLButtonElement>) => void;
  handleRefresh: (event: MouseEvent<HTMLButtonElement>) => void;
  handleAdd: (event: MouseEvent<HTMLButtonElement>) => void;
}

const SearchActionBar: FC<Props> = ({
  searchQuery,
  handleSearchInputChange,
  handleDelete,
  handleRefresh,
  handleAdd,
}) => {
  return (
    <div className="items-center justify-between block sm:flex md:divide-x md:divide-gray-100 dark:divide-gray-700">
      <div className="flex items-center mb-4 sm:mb-0">
        <form className="sm:pr-3" action="#" method="GET">
          <label htmlFor="products-search" className="sr-only">
            Search
          </label>
          <div className="relative w-48 mt-1 sm:w-64 xl:w-96">
            <input
              type="text"
              name="search"
              id="products-search"
              onChange={handleSearchInputChange}
              value={searchQuery}
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              placeholder="Search for "
            />
          </div>
        </form>
        <div className="flex items-center w-full sm:justify-end">
          <div className="flex pl-2 space-x-1">
            <button className="inline-flex justify-center p-1 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
              <DynamicHeroIcon icon="Cog8ToothIcon" className="w-6 h-6" />
            </button>
            {handleDelete && (
              <button
                onClick={handleDelete}
                className="inline-flex justify-center p-1 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                <DynamicHeroIcon icon="TrashIcon" className="w-6 h-6" />
              </button>
            )}
            <button
              title="Refresh Table"
              onClick={handleRefresh}
              className="inline-flex justify-center p-1 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              <DynamicHeroIcon icon="ArrowPathIcon" className="w-6 h-6" />
            </button>
            <button className="inline-flex justify-center p-1 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
              <DynamicHeroIcon
                icon="EllipsisVerticalIcon"
                className="w-6 h-6"
              />
            </button>
          </div>
        </div>
      </div>
      <button
        id="createProductButton"
        className="text-white flex bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
        type="button"
        onClick={handleAdd}
      >
        <DynamicHeroIcon
          icon="CurrencyDollarIcon"
          className="w-4 h-4 mr-2 mt-0.5"
        />
        Deposit
      </button>
    </div>
  );
};

export default SearchActionBar;
