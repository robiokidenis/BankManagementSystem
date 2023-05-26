import DynamicHeroIcon from "@/libs/Icons";
import { ApiGetUserDetail } from "@/libs/Utils/ApiHelpers";
import { formatCurrency } from "@/libs/Utils/Helpers";
import { UserDataInterface } from "@/libs/Utils/Interfaces";
import Breadcrumb from "@/libs/components/BreadCrumb";
import Authenticated from "@/libs/components/layouts/Authenticated";
import { useCallback, useEffect, useState } from "react";
import Link from "next/link";

function index() {
  
  return (
    <Authenticated>
      <div className="flex flex-col h-100">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="grid grid-cols-1 px-4 pt-6 xl:grid-cols-3 xl:gap-4 dark:bg-gray-900">
              <div className="mb-4 col-span-full xl:mb-2">
                <Breadcrumb className="flex mb-5" />

                <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">
                 Settings
                </h1>
              </div>
           
            </div>
          </div>
        </div>
      </div>
    </Authenticated>
  );
}

export default index;
