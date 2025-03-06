import React from "react";
import { Button, Space, Card, Row, Col, message } from "antd";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../store/authSlice.jsx";
import {
  useGetAllUsersQuery,
  useDeleteUserMutation,
} from "../store/apiSlice.jsx";
import { useNavigate } from "react-router-dom";

import "../css/index.scss";

// RESTE A FAIRE LES FILTERS
// et un peu de mise en forme

const UsersList = () => {
  const currentUser = useSelector(selectCurrentUser);
  const navigate = useNavigate();

  const { data, refetch } = useGetAllUsersQuery();
  const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation();

  const usersData = data?.users || [];
  const userId = usersData.map((user) => user._id);

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
        <div>
          <input type="text" placeholder="Search" />
          <span>Search by : </span>
          <label htmlFor="Search by">Name</label>
          <select name="Search by" id="Search by"></select>
          <label htmlFor="">Category </label>
          <select name="" id=""></select>
        </div>
        <div className="container">
          <Space size={16} wrap>
            {usersData.map((user) => (
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
            ))}
          </Space>
        </div>
      </Space>
    </div>
  );
};

export default UsersList;
