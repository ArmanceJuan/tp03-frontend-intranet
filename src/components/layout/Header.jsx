import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Button, message, Space } from "antd";
import { useSelector, useDispatch } from "react-redux";
import {
  selectCurrentUser,
  removeCredentials,
} from "../../store/authSlice.jsx";
import { useLogoutMutation } from "../../store/apiSlice.jsx";
import "../../css/layout.scss";

const AppHeader = () => {
  const currentUser = useSelector(selectCurrentUser);
  const [logout, { isLoading }] = useLogoutMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log("currentUser", currentUser);
  const handleLogout = async () => {
    try {
      await logout();
      dispatch(removeCredentials());
      console.log("Logout");
      message.success("Logout successful");
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
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
              {currentUser?.isAdmin ? (
                <li>
                  <NavLink to="/users/add">Add user</NavLink>
                </li>
              ) : null}
              <li>
                <NavLink to={`/users/${currentUser?.id}/view`}>Account</NavLink>
              </li>
              <li>
                <Button type="primary" onClick={handleLogout}>
                  Logout
                </Button>
              </li>
            </Space>
          </ul>
        </nav>
      </Space>
    </header>
  );
};

export default AppHeader;
