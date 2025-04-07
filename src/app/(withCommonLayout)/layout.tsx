import React, { ReactNode } from "react";

import { Navbar } from "@/src/components/navbar";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="container p-0 mx-auto max-w-7xl flex-grow">
      <Navbar />
      {children}
    </div>
  );
};

export default layout;
