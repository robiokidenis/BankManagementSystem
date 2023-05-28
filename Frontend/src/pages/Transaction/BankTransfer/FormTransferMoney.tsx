import React, { useCallback, useEffect, useState } from "react";
import {
  TransferInterface,
  UserDataInterface,
} from "@/libs/Utils/Interfaces";
import { Dialog } from "@headlessui/react";
import {
  ApiGetUserDetail,
  ApiPostTransfer,
} from "@/libs/Utils/ApiHelpers";
import Swal from "sweetalert2";
import UserSelect from "@/libs/components/Partials/UserSelect";
interface Props {
  isModalOpen: boolean;
  handleCloseModal: () => void;
  callBackRefresh?: () => void;
}

const FormTransferMoney: React.FC<Props> = ({
  isModalOpen,
  handleCloseModal,
  callBackRefresh,
}) => {
  const [errors, setErrors] = useState<Record<string, string[]>>({});

  const initialUserDetails: UserDataInterface = {
    id: 0,
    first_name: "",
    last_name: "",
    name: "",
    address: "",
    country: "",
    phone_number: "",
    birthday: "",
    organization: "",
    city: "",
    department: "",
    role: "",
    zip_code: "",
    email: "",
    register_date: "",
    bank_account: {
      id: 0,
      account_number: 0,
      balance: 0,
      currency: "",
      currency_symbol: "",
      user_id: 0,
      name: "",
      created_at: "",
      updated_at: "",
      deleted_at: null,
    },
  };
  const [userDetails, setUserDetail] =
    useState<UserDataInterface>(initialUserDetails);
  const [loading, setIsLoading] = useState<boolean>(false);
  const [amount, setAmount] = useState<number | undefined>(0);
  const [recipient, setRecipient] = useState<number | undefined>(0);


  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await ApiGetUserDetail();
      if (response && response.data.data) {
        console.log(response.data.data);
        setUserDetail(response.data.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleRefresh = () => {
    callBackRefresh && callBackRefresh();
  };
  const amounts = [10, 50, 100, 200];

  const handleSubmit = async () => {
    try {
      // Handle the returned data here
      const { success, data, error } = await ApiPostTransfer({
        amount: amount,
        recipient_account_number: recipient,
      });

      if (success) {
        handleCloseModal;
        handleRefresh();
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Transfer successfully!",
        });
      } else {
        if (typeof error === "object") {
          setErrors(error as Record<string, string[]>);
          console.log(errors);
          Swal.fire({
            icon: "error",
            title: "Error",
            text: (error as { error: string }).error,
          });
        }
      }
    } catch (error: unknown) {
      
      Swal.fire({
        icon: "error",
        title: "Error message",
        text: "An error occurred while processing your request.",
      });
    }
  };

  return (
    <Dialog
      open={isModalOpen ?? false}
      onClose={()=>{handleCloseModal }}
      as="div"
      className={
        "fixed top-0 right-0 left-0 z-50 h-modal overflow-y-auto overflow-x-hidden md:inset-0 md:h-full items-center justify-center flex bg-gray-900 bg-opacity-50 dark:bg-opacity-80"
      }
    >
      <div className="relative h-full w-full p-4 md:h-auto max-w-xl">
        <div className="relative rounded-lg bg-white shadow dark:bg-gray-700">
          <div className="relative bg-white rounded-lg shadow h-100 dark:bg-gray-800">
            <div className="flex items-start justify-between p-5 border-b rounded-t dark:border-gray-700">
              <h3 className="text-xl font-semibold dark:text-white">
                Money Transfer
              </h3>
              <button
                onClick={handleCloseModal}
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-700 dark:hover:text-white"
                data-modal-toggle="add-user-modal"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
            <div className="p-6 mb-6 space-y-6 h-100">
              <form action="#">
                <div className="grid grid-cols-12 gap-4">
                  <div className="col-span-12 sm:col-span-3">
                    <label
                      htmlFor="first-name"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      How much would you like to send?
                    </label>
                    <input
                      type="number"
                      name="amount"
                      value={amount}
                      onChange={(e) => setAmount(Number(e.target.value))}
                      className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="10"
                      required
                      max={userDetails.bank_account?.balance}
                    />
 {/* {errors.error && (
                      <p className="mt-1 text-sm text-red-600 dark:text-red-500">
                        {errors.error}
                      </p>
                    )} */}
                    <div className="flex justify-between">
                      <p className="mt-2 pt-2 text-sm text-gray-600 dark:text-white-500">
                        Available Balance:
                      </p>
                      <div className="flex cursor-pointer">
                        {amounts.map((amount) => (
                          <p
                            key={amount}
                            className="mt-3 mr-2 text-sm hover:text-blue-700 border-[#E7EAEE] cursor-pointer truncate rounded-[20px] border p-1 text-gray-600 dark:text-white-500"
                            onClick={() => setAmount(amount)}
                          >
                            ${amount}
                          </p>
                        ))}
                        <p
                         className="mt-3 mr-2 text-sm hover:text-blue-700 border-[#E7EAEE] cursor-pointer truncate rounded-[20px] border p-1 text-gray-600 dark:text-white-500"
                          onClick={() =>
                            setAmount(userDetails.bank_account?.balance)
                          }
                        >
                          ${userDetails.bank_account?.balance}
                        </p>
                      </div>
                    </div>
                   
                  </div>
                  <UserSelect
                    onChange={(e) => setRecipient(Number(e.target.value))}
                    selectedId={recipient}
                    showError={false}
                  />
                </div>
              </form>
            </div>
            <div className="items-center p-6 border-t border-gray-200 rounded-b dark:border-gray-700">
              <button
                onClick={handleSubmit}
                className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                type="submit"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default FormTransferMoney;
