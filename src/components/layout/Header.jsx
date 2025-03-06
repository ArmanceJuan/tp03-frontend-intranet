import React from "react";
import { NavLink } from "react-router-dom";
import { Space } from "antd";
import "../../css/layout.scss";

const AppHeader = () => {
  const user = {
    firstname: "Marie",
    lastname: "Dupont",
    email: "marie.dupont@gmail.com",
    phone: "0612345678",
    birthdate: "1995-01-01",
    city: "Paris",
    country: "France",
    photo:
      "https://i.pinimg.com/736x/67/b2/cc/67b2cc4e28fcf735c303f1d43c1bd698.jpg",
    category: "Marketing",
    isAdmin: true,
  };
  return (
    <header>
      <Space direction="horizontal">
        <h1>Header</h1>
        <nav>
          <ul>
            <Space direction="horizontal">
              <li>
                <NavLink to="/">Home</NavLink>
              </li>
              <li>
                <NavLink to="/users">Users</NavLink>
              </li>
              <li>
                <NavLink to="/users/add">Add user</NavLink>
              </li>
              <li>
                <NavLink to="/users/:id/view">Account</NavLink>
              </li>
              <li>
                <NavLink to="/login">Logout</NavLink>
              </li>
            </Space>
          </ul>
        </nav>
      </Space>
    </header>
  );
};

export default AppHeader;
