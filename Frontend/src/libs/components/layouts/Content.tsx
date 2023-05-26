import React, { ReactNode } from "react";
import Footer from "./Footer";

interface ContentProps {
  children: ReactNode;
}
const Content: React.FC<ContentProps> = ({ children }) => {
  return (
    <div
      id="min-content"
      className="relative w-80 h-full overflow-y-auto bg-gray-50 lg:ml-64 dark:bg-gray-900"
    >
      <main className="h-80 mb-10">{children}</main>
      <div>

      <Footer/>

      </div>
    </div>
  );
};

export default Content;
