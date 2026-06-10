"use client";
import { UseAuth } from "../../context/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Spinner from "../../components/Spinner";

export default function InternalLayout({ children }) {
  const [auth] = UseAuth();
  const [ok, setOk] = useState(false);

  useEffect(() => {
    if (auth?.token) {
      setOk(true);
    } else {
      setOk(false);
    }
  }, [auth?.token]);

  if (!ok) return <Spinner />;
  return <>{children}</>;
}
