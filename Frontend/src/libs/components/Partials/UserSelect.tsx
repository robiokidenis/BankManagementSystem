
import {
  ApiResponse,
} from "@/libs/Utils/Interfaces";
import axios from "axios";
import { useEffect, useState } from "react";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
interface UserSelect {
  id: string | undefined;
  name: string;
  account_number: string;
  user_id: string;
}

interface UserSelectProps {
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  selectedId?: number | undefined;
  showError: boolean;
  label?: string;
}

function UserSelect(props: UserSelectProps) {
  const { onChange, selectedId, showError, label } = props;
  const [usersData, setUserSelects] = useState<UserSelect[]>([]);
  const accessToken = localStorage.getItem("access_token");
  
  useEffect(() => {
    async function fetchData() {
      const response = await axios.get<ApiResponse<UserSelect>>(
        `${apiUrl}/bank-accounts/`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      setUserSelects(response.data.data);
    }

    if (accessToken) {
      fetchData();
    }
  }, [accessToken]);

  return (
    <div className="col-span-6 sm:col-span-3">
      <label
        htmlFor="select_service_plan"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        {label ?? " Select Recipient"}
      </label>
      <select
        id="select_service_plan"
        name="service_plan"
        onChange={onChange}
        value={selectedId}
        className="bg-gray-50 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
      >
        <option></option>
        {usersData &&
          usersData?.map((cs) => (
            <option key={cs.id} value={cs.account_number}>
              {cs.account_number} - {cs.name}
            </option>
          ))}
      </select>
      {showError && (
        <p className="mt-1 text-sm text-red-600 dark:text-red-500">
          Please select Recipient
        </p>
      )}
    </div>
  );
}

export default UserSelect;
