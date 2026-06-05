import { useState, useEffect } from "react";
import { UseAuth } from "../context/auth";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Spinner from "./Spinner";

export default function PrivateRoute() {
  const [ok, setOk] = useState(false);
  const [auth, setAuth] = UseAuth();

  useEffect(() => {
    const authCheck = async () => {
      // If you have a specific endpoint to verify the token, use this:
      // const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/auth/user-auth`);
      // if (res.data.ok) setOk(true);

      // For now, we'll assume if the token exists in context, they are logged in:
      if (auth?.token) {
        setOk(true);
      } else {
        setOk(false);
      }
    };
    if (auth?.token) authCheck();
  }, [auth?.token]);

  return ok ? <Outlet /> : <Spinner />;
}
