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
  const [auth, setAuth] = useState<boolean>(false);
  const initialUserDetails: UserDataInterface = {
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
    password: "",
    password_confirmed: "",
  };
  const [user, setUser] = useState<UserDataInterface>(initialUserDetails);

  useEffect(() => {
    fetchData();
    DynamicFlowbite;
  }, []);

  const fetchData = useCallback(async () => {
    try {
      const response = await ApiGetUserDetail();
      if (response && response.data.data) {
        setUser(response.data.data);
        setAuth(true);
      }
    } catch (error) {
      location.href = "/login";
    }
  }, []);
  return (
    <>
     <Nav user={user} />
      <Sidebar  />
      <Content>{auth && children}</Content>
    </>
  );
};

export default Authenticated;
