import DynamicHeroIcon from "@/libs/Icons";
import { ApiGetUserDetail } from "@/libs/Utils/ApiHelpers";
import { formatCurrency } from "@/libs/Utils/Helpers";
import { UserDataInterface } from "@/libs/Utils/Interfaces";
import Breadcrumb from "@/libs/components/BreadCrumb";
import Authenticated from "@/libs/components/layouts/Authenticated";
import { useCallback, useEffect, useState } from "react";
import Link from "next/link";

function index() {
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
  const [showBalance, setShowBalance] = useState<boolean>(false);
  const [loading, setIsLoading] = useState<boolean>(false);

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

  return (
    <Authenticated>
      <div className="flex flex-col h-100">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="grid grid-cols-1 px-4 pt-6 xl:grid-cols-3 xl:gap-4 dark:bg-gray-900">
              <div className="mb-4 col-span-full xl:mb-2">
                <Breadcrumb className="flex mb-5" />

                <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">
                  Bank Account
                </h1>
              </div>
              {/* Right Content */}
              <div className="col-span-full xl:col-auto">
                <div className="p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2 dark:border-gray-700 sm:p-6 dark:bg-gray-800">
                  <ul className="mb-0 divide-y divide-gray-200 dark:divide-gray-700">
                    <li className="py-4  select-none">
                      <div className="flex justify-between xl:block 2xl:flex align-center 2xl:space-x-4">
                        <div className="flex space-x-4 xl:mb-4 2xl:mb-0">
                          <div>
                            <img
                              className="w-20 h-20 rounded-full"
                              src="https://flowbite-admin-dashboard.vercel.app/images/users/bonnie-green.png"
                              alt="Avatar"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-base font-semibold text-gray-900 leading-none truncate mb-2 mt-1 dark:text-white">
                              {userDetails.name}
                            </p>
                            <p className="mb-1 text-sm font-normal truncate text-primary-700 dark:text-primary-500">
                              {userDetails.address}, {userDetails.city}
                            </p>
                            <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                              {userDetails.country}
                            </p>
                          </div>
                        </div>
                        <div className="mb-4">
                          <label
                            htmlFor="settings-language"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                          >
                            Account number
                          </label>

                          <h3 className="mb-4 text-xl font-semibold border rounded-lg p-2 text-center  text-gray-900 dark:text-white">
                            {userDetails.bank_account?.account_number ??''}
                          </h3>
                        </div>
                        <label
                          htmlFor="settings-language"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Current Balance
                        </label>
                        <div
                          className="flex content-between justify-between"
                          onClick={() => setShowBalance(!showBalance)}
                        >
                          <h3 className="mb-4 text-2xl w-full font-bold dark:text-white ">
                            {showBalance ? (
                              formatCurrency(userDetails.bank_account.balance)
                            ) : (
                              <span className="text-gray-700 text-2xl  mt-5">
                                ******
                              </span>
                            )}
                          </h3>
                          <span onClick={() => setShowBalance(!showBalance)}>
                            <DynamicHeroIcon
                              icon={showBalance ? "EyeIcon" : "EyeSlashIcon"}
                              className="h-5 w-5 ml-2 mt-1 text-gray-400 justify-end"
                            />
                          </span>
                        </div>

                        <div className="mt-5 inline-flex items-center w-auto xl:w-full 2xl:w-auto">
                          <div className="w-full">
                            <Link href="/Transaction/Deposit" passHref>
                              <button className="w-full text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                                Deposit
                              </button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
                {/* <div className="p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2 dark:border-gray-700 sm:p-6 dark:bg-gray-800">
                  <h3 className="mb-4 text-xl font-semibold dark:text-white">
                    Language &amp; Time
                  </h3>
                  <div className="mb-4">
                    <label
                      htmlFor="settings-language"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Select language
                    </label>
                    <select
                      id="settings-language"
                      name="countries"
                      className="bg-gray-50 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    >
                      <option>English (US)</option>
                      <option>Italiano</option>
                      <option>Français (France)</option>
                      <option>正體字</option>
                      <option>Español (España)</option>
                      <option>Deutsch</option>
                      <option>Português (Brasil)</option>
                    </select>
                  </div>
                  <div className="mb-6">
                    <label
                      htmlFor="settings-timezone"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Time Zone
                    </label>
                    <select
                      id="settings-timezone"
                      name="countries"
                      className="bg-gray-50 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    >
                      <option>GMT+0 Greenwich Mean Time (GMT)</option>
                      <option>GMT+1 Central European Time (CET)</option>
                      <option>GMT+2 Eastern European Time (EET)</option>
                      <option>GMT+3 Moscow Time (MSK)</option>
                      <option>GMT+5 Pakistan Standard Time (PKT)</option>
                      <option>GMT+8 China Standard Time (CST)</option>
                      <option>
                        GMT+10 Eastern Australia Standard Time (AEST)
                      </option>
                    </select>
                  </div>
                  <div>
                    <button className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                      Save all
                    </button>
                  </div>
                </div> */}
              </div>
              <div className="col-span-2">
                <div className="p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2 dark:border-gray-700 sm:p-6 dark:bg-gray-800">
                  <h3 className="mb-4 text-xl font-semibold dark:text-white">
                    General information
                  </h3>
                  <form action="#">
                    <div className="grid grid-cols-6 gap-6">
                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="first-name"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          First Name
                        </label>
                        <input
                          type="text"
                          name="first-name"
                          id="first-name"
                          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                          placeholder="Bonnie"
                          required
                          value={userDetails.first_name}
                        />
                      </div>
                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="last-name"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Last Name
                        </label>
                        <input
                          type="text"
                          name="last-name"
                          id="last-name"
                          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                          placeholder="Green"
                          required
                          value={userDetails.last_name}
                        />
                      </div>
                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="country"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Country
                        </label>
                        <input
                          type="text"
                          name="country"
                          id="country"
                          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                          placeholder="United States"
                          value={userDetails.country}
                        />
                      </div>
                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="city"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          City
                        </label>
                        <input
                          type="text"
                          name="city"
                          id="city"
                          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                          placeholder="e.g. San Francisco"
                          value={userDetails.city}
                        />
                      </div>
                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="address"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Address
                        </label>
                        <input
                          type="text"
                          name="address"
                          id="address"
                          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                          placeholder="e.g. California"
                          value={userDetails.address}
                        />
                      </div>
                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="email"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Email
                        </label>
                        <input
                          type="email"
                          name="email"
                          id="email"
                          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                          placeholder="example@company.com"
                          required
                          value={userDetails.email}
                        />
                      </div>
                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="phone-number"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Phone Number
                        </label>
                        <input
                          type="text"
                          name="phone-number"
                          id="phone-number"
                          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                          placeholder="e.g. +(12)3456 789"
                          value={userDetails.phone_number}
                        />
                      </div>
                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="birthday"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Birthday
                        </label>
                        <input
                          type="date"
                          name="birthday"
                          id="birthday"
                          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                          placeholder="15/08/1990"
                          value={userDetails.birthday}
                        />
                      </div>
                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="organization"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Organization
                        </label>
                        <input
                          type="text"
                          name="organization"
                          id="organization"
                          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                          placeholder="Company Name"
                          value={userDetails.organization}
                        />
                      </div>
                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="role"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Role
                        </label>
                        <input
                          type="text"
                          name="role"
                          id="role"
                          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                          placeholder="Developer"
                          value={userDetails.role}
                        />
                      </div>
                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="department"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Department
                        </label>
                        <input
                          type="text"
                          name="department"
                          id="department"
                          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                          placeholder="Development"
                          value={userDetails.department}
                        />
                      </div>
                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="zip-code"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Zip/postal code
                        </label>
                        <input
                          type="number"
                          name="zip-code"
                          id="zip-code"
                          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                          placeholder="123456"
                          value={userDetails.zip_code}
                        />
                      </div>
                    
                    </div>
                  </form>
                </div>
                {/* <div className="p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2 dark:border-gray-700 sm:p-6 dark:bg-gray-800">
                  <h3 className="mb-4 text-xl font-semibold dark:text-white">
                    Password information
                  </h3>
                  <form action="#">
                    <div className="grid grid-cols-6 gap-6">
                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="current-password"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Current password
                        </label>
                        <input
                          type="text"
                          name="current-password"
                          id="current-password"
                          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                          placeholder="••••••••"
                          required
                        />
                      </div>
                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="password"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          New password
                        </label>
                        <input
                          data-popover-target="popover-password"
                          data-popover-placement="bottom"
                          type="password"
                          id="password"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="••••••••"
                          required
                        />
                        <div
                          data-popover
                          id="popover-password"
                          role="tooltip"
                          className="absolute z-10 invisible inline-block text-sm font-light text-gray-500 transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-sm opacity-0 w-72 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400"
                          data-popper-placement="top"
                          data-popper-reference-hidden
                          data-popper-escaped
                          style={{
                            position: "absolute",
                            inset: "auto auto 0px 0px",
                            margin: 0,
                            transform: "translate(810px, -1792px)",
                          }}
                        >
                          <div className="p-3 space-y-2">
                            <h3 className="font-semibold text-gray-900 dark:text-white">
                              Must have at least 6 characters
                            </h3>
                            <div className="grid grid-cols-4 gap-2">
                              <div className="h-1 bg-orange-300 dark:bg-orange-400" />
                              <div className="h-1 bg-orange-300 dark:bg-orange-400" />
                              <div className="h-1 bg-gray-200 dark:bg-gray-600" />
                              <div className="h-1 bg-gray-200 dark:bg-gray-600" />
                            </div>
                            <p>It’s better to have:</p>
                            <ul>
                              <li className="flex items-center mb-1">
                                <svg
                                  className="w-4 h-4 mr-2 text-green-400 dark:text-green-500"
                                  aria-hidden="true"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                                Upper &amp; lower case letters
                              </li>
                              <li className="flex items-center mb-1">
                                <svg
                                  className="w-4 h-4 mr-2 text-gray-300 dark:text-gray-400"
                                  aria-hidden="true"
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
                                A symbol (#$&amp;)
                              </li>
                              <li className="flex items-center">
                                <svg
                                  className="w-4 h-4 mr-2 text-gray-300 dark:text-gray-400"
                                  aria-hidden="true"
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
                                A longer password (min. 12 chars.)
                              </li>
                            </ul>
                          </div>
                          <div
                            data-popper-arrow
                            style={{
                              position: "absolute",
                              left: 0,
                              transform: "translate(139px, 0px)",
                            }}
                          />
                        </div>
                      </div>
                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="confirm-password"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Confirm password
                        </label>
                        <input
                          type="text"
                          name="confirm-password"
                          id="confirm-password"
                          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                          placeholder="••••••••"
                          required
                        />
                      </div>
                      <div className="col-span-6 sm:col-full">
                        <button
                          className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                          type="submit"
                        >
                          Save all
                        </button>
                      </div>
                    </div>
                  </form>
                </div> */}
              </div>
              {/* end Right Content */}
            </div>
          </div>
        </div>
      </div>
    </Authenticated>
  );
}

export default index;
