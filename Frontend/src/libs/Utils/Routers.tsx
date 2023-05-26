import { SidebarItem } from "./Interfaces";

const Routers: SidebarItem[] = [
    { label: "Dashboard", icon: "ChartPieIcon", path: "/" },
    { label: "Bank Account",icon: "CurrencyDollarIcon", path: "/BankAccount" },
    {
      label: "Transaction",
      icon: "BanknotesIcon",
      path: "/Transaction",
      children: [
        { label: "Deposit", path: "/Transaction/Deposit" },
        { label: "Bank Transfer", path: "/Transaction/BankTransfer" },
        { label: "History", path: "/Transaction/History" },
        // { label: "Cash Flow", path: "/Finance/CashFlow" }
      ],
    },

    { label: "Setting", icon: "Cog8ToothIcon", path: "/Setting" },
  ];

  export default Routers