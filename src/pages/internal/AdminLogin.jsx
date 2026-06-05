import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { UseAuth } from "../../context/auth";
import Layout from "../../components/Layout/Layout";
import "../../styles/AdminLogin.css";
import axios from "axios";
import { toast } from "react-hot-toast";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = UseAuth();

  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/auth/login`,
        { email, password }
      );

      if (res && res.data.success) {
        toast.success(res.data.message);
        console.log(res.data);
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate(location.state || "/internal/case-studies");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout>
      <div className="admin-login-container">
        <div className="admin-login-card">
          <h2 className="admin-title">Admin Login</h2>

          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label>Email</label>
              <input
                type="email"
                placeholder="Enter admin email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                id="exampleInputEmail"
                aria-describedby="emailHelp"
                required
              />
            </div>

            <div className="input-group">
              <label>Password</label>
              <input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                id="exampleInputPassword"
                required
              />
            </div>

            <button type="submit" className="admin-login-btn">
              Login
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default AdminLogin;
