import { formatNumber } from "@/libs/Utils/Helpers";
import axios from "axios";
import { useEffect, useState } from "react";

const apiUrl = "http://127.0.0.1:8000";
interface ServicePlan {
  id: number;
  name: string;
  title: string;
  description: string;
  price: string;
  speed: string;
}

interface ServicePlanSelectProps {
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  selectedServicePlanId?: number;
  showError: boolean;
}

function ServicePlanSelect(props: ServicePlanSelectProps) {
  const { onChange, selectedServicePlanId, showError } = props;
  const [servicePlans, setServicePlans] = useState<ServicePlan[]>([]);
  const accessToken = localStorage.getItem("access_token");
  //   const [selectedServicePlanId, setSelectedServicePlanId] = useState<number>(1); // Set default service plan ID to 1

  useEffect(() => {
    async function fetchServicePlans() {
      const response = await axios.get<ServicePlan[]>(
        `${apiUrl}/api/services/serviceplans/all/`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      setServicePlans(response.data);
    }

    if (accessToken) {
      fetchServicePlans();
    }
  }, [accessToken]);

  return (
    <div className="col-span-6 sm:col-span-3">
      <label
        htmlFor="select_service_plan"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        Service Plan
      </label>
      <select
        id="select_service_plan"
        name="service_plan"
        onChange={onChange}
        value={selectedServicePlanId}
        className="bg-gray-50 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
      >
        <option>-- select --</option>
        {servicePlans && servicePlans?.map((servicePlan) => (
          <option key={servicePlan.id} value={servicePlan.id}>
            {servicePlan.name} @ {formatNumber(parseInt(servicePlan.price))}
          </option>
        ))}
      </select>
      {showError && (
        <p className="mt-1 text-sm text-red-600 dark:text-red-500">
          Please select service plan
        </p>
      )}
    </div>
  );
}

export default ServicePlanSelect;
