import React from "react";
import { useState } from "react";
import { Button } from "antd";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../store/apiSlice.jsx";
import { setToken } from "../store/authSlice.jsx";
import { Input } from "../components/layout/Input";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, { isLoading }] = useLoginMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await login({ email, password });
      localStorage.setItem("token", result.token);
      dispatch(setToken(result.token));
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="form-container">
      <h1>Login</h1>
      <p>Login to your account</p>
      <form action="submit" onSubmit={handleSubmit}>
        <div className="all-input">
          <Input
            label="Email"
            name="email"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            label="Password"
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            style={{ padding: 20, width: 200 }}
            disabled={!email || !password}
          >
            Login
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Login;
