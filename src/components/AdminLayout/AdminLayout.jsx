import React from "react";
import Header from "./AdminHeader";
import AdminHeader from "./AdminHeader";

const AdminLayout = ({ children }) => {
  return (
    <>
      <AdminHeader />
      <main>{children}</main>
    </>
  );
};

export default AdminLayout;
