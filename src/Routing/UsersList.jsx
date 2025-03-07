import React from "react";
import { useState, useEffect } from "react";
import { Button, Space, Card, Row, Col, message } from "antd";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../store/authSlice.jsx";
import {
  useGetAllUsersQuery,
  useDeleteUserMutation,
} from "../store/apiSlice.jsx";
import { useNavigate } from "react-router-dom";

import "../css/index.scss";

const UsersList = () => {
  const currentUser = useSelector(selectCurrentUser);
  const navigate = useNavigate();

  const { data, refetch } = useGetAllUsersQuery();
  const [deleteUser] = useDeleteUserMutation();

  const [searchTerm, setSearchTerm] = useState("");
  const [searchBy, setSearchBy] = useState("name");
  const [searchFilterCategory, setSearchFilterCategory] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);

  const usersData = data?.users || [];
  const userId = usersData.map((user) => user._id);

  const getFilteredUsers = () => {
    if (!usersData.length) return [];
    return usersData.filter((user) => {
      let filterMatch = true;
      if (searchTerm) {
        const term = searchTerm.toLowerCase();
        if (searchBy === "name") {
          filterMatch =
            user.firstname.toLowerCase().includes(term) ||
            user.lastname.toLowerCase().includes(term) ||
            `${user.firstname} ${user.lastname}`.toLowerCase().includes(term);
        } else if (searchBy === "location") {
          filterMatch =
            user.city.toLowerCase().includes(term) ||
            user.country.toLowerCase().includes(term);
        }
      }

      let filterCategoryMatch = true;
      if (searchFilterCategory) {
        filterCategoryMatch = user.category === searchFilterCategory;
      }
      return filterMatch && filterCategoryMatch;
    });
  };

  const filteredUsersData = getFilteredUsers();

  const handleEdit = (userId) => {
    navigate(`/user/${userId}/edit`);
  };

  const handleDelete = async (userId) => {
    try {
      await deleteUser(userId).unwrap();
      message.success("User deleted successfully");
      refetch();
    } catch (error) {
      console.log(error);
      message.error("Error deleting user");
    }
  };

  return (
    <div>
      <Space direction="vertical" align="center">
        <h1>Welcome</h1>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="search-by-container">
            <div className="search-select">
              <label htmlFor="Search by">Search by : </label>
              <select
                name="Search by"
                id="Search by"
                value={searchBy}
                onChange={(e) => setSearchBy(e.target.value)}
              >
                <option value="name">Name</option>
                <option value="location">Location</option>
              </select>
            </div>
            <div className="search-select">
              <label htmlFor="">Category : </label>
              <select
                name="category"
                id="category"
                value={searchFilterCategory}
                onChange={(e) => setSearchFilterCategory(e.target.value)}
              >
                <option value="All">All</option>
                <option value="Marketing">Marketing</option>
                <option value="Technique">Technique</option>
                <option value="Client">Client</option>
              </select>
            </div>
            <Button
              type="primary"
              size="small"
              onClick={() => {
                setSearchTerm(""),
                  setSearchBy("name"),
                  setSearchFilterCategory("");
              }}
            >
              Clear filters
            </Button>
            <span>Found: {filteredUsers.length} users</span>
          </div>
        </div>
        <div className="container">
          <Space size={16} wrap>
            {filteredUsersData.length > 0 ? (
              filteredUsersData.map((user) => (
                <Card
                  title={`${user.firstname} ${user.lastname}`}
                  variant="borderless"
                  style={{ width: 500 }}
                  extra={<span>{user.category}</span>}
                >
                  <Row gutter={16}>
                    <Col span={12}>
                      <img
                        src={user.photo}
                        alt="user"
                        style={{
                          width: "100%",
                          height: "100%",
                          borderRadius: 10,
                        }}
                      />
                    </Col>
                    <Col span={12}>
                      <div>
                        <p>
                          {user.birthdate &&
                            new Date(user.birthdate).toLocaleDateString()}
                        </p>
                        <p>{user.email}</p>
                        <p>{user.phone}</p>
                        <p>
                          {user.city}, {user.country}
                        </p>
                      </div>
                      {currentUser?.isAdmin ? (
                        <div>
                          <Space direction="horizontal">
                            <Button
                              type="primary"
                              size="middle"
                              onClick={() => handleEdit(user._id)}
                            >
                              Edit
                            </Button>
                            <Button
                              type="primary"
                              size="middle"
                              onClick={() => handleDelete(user._id)}
                            >
                              Delete
                            </Button>
                          </Space>
                        </div>
                      ) : null}
                    </Col>
                  </Row>
                </Card>
              ))
            ) : (
              <div>No users found</div>
            )}
          </Space>
        </div>
      </Space>
    </div>
  );
};

export default UsersList;
