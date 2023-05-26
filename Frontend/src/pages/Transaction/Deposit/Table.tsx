import DynamicHeroIcon from "@/libs/Icons";
import { formatCurrency, invoiceStatusToBadge } from "@/libs/Utils/Helpers";
import LoadingIndicator from "@/libs/components/LoadingIndicator";

interface Props {
  data: any;
  selectAll: boolean;
  handleSelectAll?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSelect: (id: number, checked: boolean) => void;
  handleEdit?: (data: any) => (e: React.MouseEvent<HTMLButtonElement>) => void;
  handleDelete?: (data: any) => (e: React.MouseEvent<HTMLButtonElement>) => void;
  handleSort: (field: string) => void;
  showAction: boolean;
  columns: column[];
  isLoading: boolean;
}


interface column {
  name: string;
  data: string;
  sorting: boolean;
  visible: boolean;
}

const Table: React.FC<Props> = ({
  data,
  selectAll,
  handleSelectAll,
  handleSelect,
  handleEdit,
  handleDelete,
  handleSort,
  showAction,
  columns,
  isLoading,
}) => {
  const handleSortClick =
    (field: string) => (event: React.MouseEvent<HTMLTableCellElement>) => {
      event.preventDefault();
      handleSort(field);
    };

  return (
    <div className="shadow max-h-64 overflow-y-auto">
      <table className="min-w-full divide-y divide-gray-200 table-fixed dark:divide-gray-600">
        <LoadingIndicator show={isLoading} />
        <thead className="bg-gray-100 dark:bg-gray-700">
          <tr>
            <th scope="col" className="p-4">
              <div className="flex items-center">
                <input
                  id="checkbox-all"
                  aria-describedby="checkbox-1"
                  type="checkbox"
                  checked={selectAll}
                  onChange={handleSelectAll}
                  className="w-4 h-4 border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:focus:ring-primary-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"
                />
                <label htmlFor="checkbox-all" className="sr-only">
                  checkbox
                </label>
              </div>
            </th>
            {columns &&
              columns.map((column, index) => (
                <th
                  key={index}
                  scope="col"
                  onClick={
                    column.sorting == true
                      ? handleSortClick(column.data)
                      : () => {}
                  }
                  className="p-4 text-xs font-medium text-left cursor-pointer select-none user text-gray-500 uppercase dark:text-gray-400"
                >
                  {column.name}
                </th>
              ))}
            {showAction && (
              <th
                scope="col"
                className="p-4 text-xs font-medium text-left cursor-pointer select-none user text-gray-500 uppercase dark:text-gray-400"
              >
                Action
              </th>
            )}
          </tr>
        </thead>

        <tbody className="max-h-64 overflow-y-auto bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
          {data &&
            data.map((dataItem: any) => (
              <tr
                key={dataItem.id}
                className="hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <td className="w-4 p-4 select-none">
                  <div className="flex items-center">
                    <input
                      id="checkbox-194556"
                      aria-describedby="checkbox-1"
                      type="checkbox"
                      checked={dataItem.selected ? dataItem.selected : false}
                      onChange={(e) =>
                        handleSelect(dataItem.id, e.target.checked)
                      }
                      className="w-4 h-4 border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:focus:ring-primary-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label
                      htmlFor="checkbox-194556"
                      className="sr-only select-none"
                    >
                      checkbox
                    </label>
                  </div>
                </td>

                <td className="p-4 text-base font-normal text-gray-900 whitespace-nowrap dark:text-white">
                  {dataItem.created_at}
                </td>
                <td className="p-4 text-base font-normal text-gray-900 whitespace-nowrap dark:text-white">
                  {dataItem.bank_account_number}
                </td>
                <td className="p-4 text-base font-normal text-gray-900 whitespace-nowrap dark:text-white">
                  {dataItem.currency}
                </td>
                <td className="p-4 text-base font-normal text-gray-900 whitespace-nowrap dark:text-white">
                  {formatCurrency(dataItem.amount)}
                </td>
                <td
                  className="p-4 text-base font-normal text-gray-900 whitespace-nowrap dark:text-white"
                  dangerouslySetInnerHTML={{
                    __html: invoiceStatusToBadge(dataItem.status),
                  }}
                />
                {showAction && (
                  <td className="p-4 space-x-2 whitespace-nowrap">
                    <button
                      type="button"
                      id="updateProductButton"
                      onClick={handleEdit && handleEdit(dataItem)}
                      className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                    >
                      <DynamicHeroIcon
                        icon="PencilSquareIcon"
                        className="w-4 h-4"
                      />
                    </button>
                    <button
                      type="button"
                      id="deleteProductButton"
                      onClick={handleDelete && handleDelete(dataItem)}
                      className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:ring-red-300 dark:focus:ring-red-900"
                    >
                      <DynamicHeroIcon icon="TrashIcon" className="w-4 h-4" />
                    </button>
                  </td>
                )}
              </tr>
            ))}
          <tr className="hover:bg-gray-100 dark:hover:bg-gray-700"></tr>
        </tbody>
      </table>
    </div>
  );
};

export default Table;
