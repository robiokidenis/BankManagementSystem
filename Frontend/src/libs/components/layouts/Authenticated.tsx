import React, { ReactNode, useCallback, useEffect, useState } from "react";
import Nav from "./Nav";
import Sidebar from "./Sidebar";
import Content from "./Content";
import dynamic from "next/dynamic";
import { ApiGetUserDetail } from "@/libs/Utils/ApiHelpers";
import { UserDataInterface } from "@/libs/Utils/Interfaces";

interface ContentProps {
  children: ReactNode;
}
const DynamicFlowbite = dynamic(
  () => import("flowbite").then((module) => module.initDrawers) as any,
  {
    ssr: false, // disable server-side rendering
  }
);
const Authenticated: React.FC<ContentProps> = ({ children }) => {

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
  const [user, setUser] = useState<UserDataInterface>(initialUserDetails);

  const fetchData = useCallback(async () => {
    try {
      const response = await ApiGetUserDetail();
      if (response && response.data.data) {
        setUser(response.data.data);
      }
    } catch (error) {

    }
  }, [setUser]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <>
      <Nav user={user} />
      <Sidebar />
      <Content>{children}</Content>
    </>
  );
};

export default Authenticated;
