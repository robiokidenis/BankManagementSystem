interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T[];
}
interface UserDataInterface {
  id?: number;
  first_name: string;
  last_name: string;
  name: string;
  address: string;
  country: string;
  phone_number: string;
  birthday: string;
  organization: string;
  city: string;
  department: string;
  role: string;
  zip_code: string;
  email: string;
  register_date?: string;
  password?: string;
  password_confirmed?: string;
  bank_account: BankAccountInterface;
}
interface UserInterface {
  id?: number;
  first_name: string;
  last_name: string;
  name: string;
  address: string;
  country: string;
  phone_number: string;
  birthday: string;
  organization: string;
  city: string;
  department: string;
  role: string;
  zip_code: string;
  email: string;
  register_date?: string;
  password?: string;
  password_confirmed?: string;
 
}

interface BankAccountInterface {
  id: number;
  account_number: number;
  balance: number;
  currency: string;
  currency_symbol: string;
  user_id: number;
  name: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}
interface TransferInterface {
  amount: number|undefined;
  recipient_account_number?: number | undefined;
}

interface DepositHistoryInteface {
  id: number;
  amount: number;
  created_at: string;
  bank_account_number: number;
  currency: string;
  currency_symbol: string;
  status: string;
}
interface TransactionHistoryInteface {
  id: number;
  amount: number;
  created_at: string;
  sender_account_number: number;
  sender_name: string;
  recipient_account_number: number;
  recipient_name: string;
  currency: string;
  currency_symbol: string;
  status: string;
}


interface ErrorResponse {
  message: string;
}

type SidebarItem = {
  label: string;
  icon?: string;
  path: string;
  children?: SidebarItem[];
};
interface Quote {
  id: number;
  text: string;
  author: string;
}
export type {
  UserDataInterface,
  UserInterface,
  BankAccountInterface,
  DepositHistoryInteface,
  TransactionHistoryInteface,
  TransferInterface,
  ApiResponse,
  ErrorResponse,
  SidebarItem,
  Quote
  
};
