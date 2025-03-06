import React from "react";
import { Button, Space, Card, Row, Col } from "antd";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../store/authSlice.jsx";
import { useGetAllUsersQuery } from "../store/apiSlice.jsx";

import "../css/index.scss";

const UsersList = () => {
  const currentUser = useSelector(selectCurrentUser);
  console.log("currentUser", currentUser);

  const { data } = useGetAllUsersQuery();

  const usersData = data?.users || [];
  console.log("usersData", usersData);

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
                      <p>{user.birthdate}</p>
                      <p>{user.email}</p>
                      <p>{user.phone}</p>
                      <p>
                        {user.city}, {user.country}
                      </p>
                    </div>
                    {currentUser?.isAdmin ? (
                      <div>
                        <Space direction="horizontal">
                          <Button type="primary" size="middle">
                            Edit
                          </Button>
                          <Button type="primary" size="middle">
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
