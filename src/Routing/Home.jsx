import React from "react";
import { Button, Space, Card, Row, Col } from "antd";
import { useGetRandomUserQuery } from "../store/apiSlice.jsx";

const Home = () => {
  const { data, refetch, isLoading } = useGetRandomUserQuery();
  // console.log("data", data.user);

  const handleGreetSomeone = () => {
    refetch();
  };

  const user = data?.user;

  return (
    <Space direction="vertical" align="center">
      <h1>Welcome</h1>
      <h2>Do you say hello ?</h2>
      <Card
        title={`${user.firstname} ${user.lastname}`}
        variant="borderless"
        style={{ width: 400 }}
        extra={<span>{user.category}</span>}
      >
        <Row gutter={16}>
          <Col span={12}>
            <img
              src={user.photo}
              alt="user"
              style={{ width: "100%", height: "100%" }}
            />
          </Col>
          <Col span={12}>
            <p>{user.email}</p>
            <p>{user.phone}</p>
            <p>
              {user.city}, {user.country}
            </p>
          </Col>
        </Row>
      </Card>
      <Button
        type="primary"
        style={{ padding: 20, width: 400 }}
        size="large"
        onClick={handleGreetSomeone}
        isLoading={isLoading}
      >
        Greet someone else
      </Button>
    </Space>
  );
};

export default Home;
