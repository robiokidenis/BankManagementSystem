import React, { useState, useEffect } from "react";
import { Quote } from "@/libs/Utils/Interfaces";
const appName = process.env.NEXT_PUBLIC_APP_NAME;
const Footer: React.FC = () => {
  const [quote, setQuote] = useState<Quote>();



  return (
    <>
      <figure className="p-6 max-w-screen-md mx-auto text-center">
        <svg
          aria-hidden="true"
          className="w-5 h-5 mx-auto mb-3 text-gray-400 dark:text-gray-600"
          viewBox="0 0 24 27"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z"
            fill="currentColor"
          />
        </svg>
        <blockquote>
          <p className="text-xs italic font-medium text-gray-900 dark:text-white">
            {quote?.text??"Try not to become a man of success , but rather try to become a man of value."}
          </p>
        </blockquote>
        <figcaption className="flex items-center justify-center mt-6 space-x-3">
          <div className="flex items-center divide-x-2 divide-gray-500 dark:divide-gray-700">
            <cite className="pr-3 text-sm text-gray-900 dark:text-white">
              - {quote?.author ??'Unknow'}
            </cite>
          </div>
        </figcaption>
      </figure>

      <p className="my-10 text-sm text-center text-gray-500 user-select-none">
        © {new Date().getFullYear()}
        <a
          href="https://abcbank.com/"
          className="hover:underline ml-2"
          target="_blank"
        >
          {appName}
        </a>
        . All rights reserved.
      </p>
    </>
  );
};

export default Footer;
