import { useEffect, useState } from "react";
import React from "react";
import { useRouter, usePathname } from "next/navigation";

const Spinner = ({ path = "login" }) => {
  const [count, setCount] = useState(3);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevValue) => --prevValue);
    }, 1000);
    if (count === 0) {
      router.push(`/${path}`);
    }
    return () => clearInterval(interval);
  }, [count, router, path]);
  return (
    <>
      <div
        className="d-flex flex-column justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <h1 className="Text-Center">Redirecting you in {count} seconds</h1>
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    </>
  );
};

export default Spinner;
