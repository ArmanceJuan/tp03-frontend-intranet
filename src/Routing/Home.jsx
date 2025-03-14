import React from "react";
import { Button, Space, Card, Row, Col, Spin, Empty } from "antd";
import { useGetRandomUserQuery } from "../store/apiSlice.jsx";

// OK
// Revoir un peu la mise en forme

const Home = () => {
  const { data, refetch, isLoading } = useGetRandomUserQuery();

  const handleGreetSomeone = () => {
    refetch();
  };

  if (isLoading) {
    return (
      <Space
        direction="vertical"
        align="center"
        style={{ width: "100%", marginTop: 100 }}
      >
        <Spin size="large" />
        <p>We search for a collaborator</p>
      </Space>
    );
  }

  if (!data || !data.user) {
    return (
      <Space
        direction="vertical"
        align="center"
        style={{ width: "100%", marginTop: 100 }}
      >
        <Empty description="Oops, we can't find a collaborator, you are alone :(" />
        <Button onClick={refetch} type="primary">
          Réessayer
        </Button>
      </Space>
    );
  }

  const user = data.user;

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
            <p>
              {user.birthdate && new Date(user.birthdate).toLocaleDateString()}
            </p>
          </Col>
        </Row>
      </Card>
      <Button
        type="primary"
        style={{ padding: 20, width: 400 }}
        size="large"
        onClick={handleGreetSomeone}
      >
        Greet someone else
      </Button>
    </Space>
  );
};

export default Home;
