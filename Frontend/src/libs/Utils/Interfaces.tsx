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
  bank_account?: BankAccountInterface;
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

interface Customer {
  id: number;
  first_name: string;
  last_name: string;
  ktp: string;
  email: string;
  phone_number: string;
  ppp_username: string;
  ppp_password: string;
  address: string;
  service_plan: {
    id: number;
    name: string;
    description: string;
    price: string;
    speed: string;
  };
  unpaid_billing: string;
  is_active: boolean;
  is_online: boolean;
  server: number;
  selected: boolean;
}

interface CustomerListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Customer[];
  limit: number;
  offset: number;
}

interface CustomerCreate {
  id: number | null;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  address: string;
  ktp: string;
  service_plan: number;
  is_active: boolean;
  ppp_username: string;
  ppp_password: string;
}

interface ServicePlan {
  id: number | null;
  name: string;
  title: string;
  description: string;
  price: string;
  speed: string;
  discount_percent: number;
  selected: boolean;
}

interface BiilingInterface {
  id: number | null;
  customer: string;
  invoice_number: string;
  service_plan: string;
  start_date: string;
  end_date: string;
  due_date: string;
  amount: string;
  status: string;
  speed: string;
  selected: boolean;
}
interface InvoiceInterface {
  id: number | null;
  customer: number;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  invoice_number: string;
  invoice_date: string;
  total_amount: string;
  total_amount_due: string;
  amount_paid: string;
  due_date: string;
  invoice_status: string;
  selected: boolean;
}

interface ServerInterface {
  id: number | null;
  name: string;
  location: string;
  host: string;
  port: string;
  username: string;
  password: string;
  selected: boolean;
}

interface ServerResourceInterface {
  uptime: string;
  version: string;
  "build-time": string;
  "factory-software": string;
  "free-memory": string;
  "total-memory": string;
  cpu: string;
  "cpu-count": string;
  "cpu-frequency": string;
  "cpu-load": string;
  "free-hdd-space": string;
  "total-hdd-space": string;
  "architecture-name": string;
  "board-name": string;
  platform: string;
}
interface BillingeInterface {
  id: string;
  billing_title: string;
  billing_date: string;
  periode: string;
  start_date: string;
  end_date: string;
  customer: string;
  customer_email: string;
  customer_name: string;
  amount: string;
  service_plan: string;
  serviceplan_name: string;
  invoice_status: string;
  selected: boolean;
}

interface Quote {
  id: number;
  text: string;
  author: string;
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

export type {
  UserDataInterface,
  BankAccountInterface,
  DepositHistoryInteface,
  TransactionHistoryInteface,
  TransferInterface,
  ApiResponse,
  CustomerCreate,
  Customer,
  CustomerListResponse,
  ServicePlan,
  ErrorResponse,
  BiilingInterface,
  InvoiceInterface,
  ServerInterface,
  ServerResourceInterface,
  Quote,
  SidebarItem,
  BillingeInterface,
};
