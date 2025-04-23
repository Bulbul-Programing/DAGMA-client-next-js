import React, { ReactNode } from "react";

import { Navbar } from "@/src/components/navbar";
import Footer from "@/src/components/Footer";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="container p-0 mx-auto max-w-7xl flex-grow">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
};

export default layout;
