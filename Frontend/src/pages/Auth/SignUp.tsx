import { ApiRegister, authenticate } from "@/libs/Utils/ApiHelpers";

import { useState, ChangeEvent } from "react";
import { useRouter } from "next/router";
import { UserDataInterface, UserInterface } from "@/libs/Utils/Interfaces";
import Swal from "sweetalert2";

const appName = process.env.NEXT_PUBLIC_APP_NAME;

function SignUp() {
  const [error, setError] = useState("");
  const router = useRouter();

  const initialUserDetails: UserInterface = {
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
  const [userDetails, setUserDetail] =
    useState<UserInterface>(initialUserDetails);

  const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    try {
      // Handle the returned data here
      const { success, data, error } = await ApiRegister(userDetails);

      if (success) {
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Registration successful!",
        });
        console.log(data)
        if(data && data.data){
          localStorage.setItem("access_token", data.data.access_token);
          router.push("/");
        }
      } else {
        if (typeof error === "object") {
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

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setError("");
    const { name, value } = event.target;
    setUserDetail((prevCredentials) => ({
      ...prevCredentials,
      [name]: value,
    }));
  };

  return (
    <main className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 pt-8 mx-auto md:h-screen pt:mt-0 dark:bg-gray-900">
        <a
          href="/"
          className="flex items-center justify-center mb-8 text-2xl font-semibold lg:mb-10 dark:text-white"
        >
          <img
            src="https://flowbite-admin-dashboard.vercel.app/images/logo.svg"
            className="mr-4 h-11"
            alt="FlowBite Logo"
          />
          <span>{appName}</span>
        </a>
        {/* Card */}
        <div className="w-full max-w-xl p-6 space-y-8 sm:p-8 bg-white rounded-lg shadow dark:bg-gray-800">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Create a Free Account
          </h2>
          {error && (
            <div
              className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              {" "}
              {error}{" "}
            </div>
          )}
          <form className="mt-8 space-y-6" action="#">
            <div className="grid grid-cols-6 gap-6">
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="first_name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  First Name
                </label>
                <input
                  type="text"
                  name="first_name"
                  id="first_name"
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Bonnie"
                  required
                  value={userDetails.first_name}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="last_name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  name="last_name"
                  id="last_name"
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Green"
                  required
                  value={userDetails.last_name}
                  onChange={handleInputChange}
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
                  onChange={handleInputChange}
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
                  onChange={handleInputChange}
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
                  onChange={handleInputChange}
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
                  onChange={handleInputChange}
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="••••••••"
                  required
                  value={userDetails.password}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="password_confirmed"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Confirm password
                </label>
                <input
                  type="password"
                  name="password_confirmed"
                  id="password_confirmed"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  required
                  value={userDetails.password_confirmed}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="remember"
                  aria-describedby="remember"
                  name="remember"
                  type="checkbox"
                  className="w-4 h-4 border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:focus:ring-primary-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"
                  required
                />
              </div>
              <div className="ml-3 text-sm">
                <label
                  htmlFor="remember"
                  className="font-medium text-gray-900 dark:text-white"
                >
                  I accept the{" "}
                  <a
                    href="#"
                    className="text-primary-700 hover:underline dark:text-primary-500"
                  >
                    Terms and Conditions
                  </a>
                </label>
              </div>
            </div>

            <button
              onClick={handleSubmit}
              className="w-full px-5 py-3 text-base font-medium text-center text-white bg-primary-700 rounded-lg hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 sm:w-auto dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              Create account
            </button>
            <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Already have an account?{" "}
              <a
                href="/login"
                className="text-primary-700 hover:underline dark:text-primary-500"
              >
                Login here
              </a>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}

export default SignUp;
