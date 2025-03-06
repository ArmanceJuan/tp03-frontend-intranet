import React from "react";
import { Input } from "../components/layout/Input";
import { Button } from "antd";

const Login = () => {
  return (
    <div className="form-container">
      <h1>Login</h1>
      <p>Login to your account</p>
      <div className="all-input">
        <Input label="Email" name="email" type="text" />
        <Input label="Password" name="password" type="password" />
        <Button type="primary" size="large" style={{ padding: 20, width: 200 }}>
          Login
        </Button>
      </div>
    </div>
  );
};

export default Login;
