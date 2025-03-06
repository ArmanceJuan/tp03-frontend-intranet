import React from "react";
import { Button, Space, Card, Row, Col } from "antd";

const Home = () => {
  const users = [
    {
      id: "1",
      gender: "male",
      firstname: "Owen",
      lastname: "Lopez",
      email: "owen.lopez@example.com",
      password: "$2b$10$IExQBXEZVifvfEOWvWsmO.4.OocNb7zQzurQerwOQh1tZx/3okSp.",
      phone: "02-37-79-78-39",
      birthdate: "1992-12-26",
      city: "Villeurbanne",
      country: "France",
      photo: "https://randomuser.me/api/portraits/men/40.jpg",
      category: "Marketing",
      isAdmin: false,
    },
  ];

  return (
    <Space direction="vertical" align="center">
      <h1>Welcome</h1>
      <h2>Do you say hello ?</h2>
      <Card
        title={`${users[0].firstname} ${users[0].lastname}`}
        variant="borderless"
        style={{ width: 400 }}
        extra={<span>{users[0].category}</span>}
      >
        <Row gutter={16}>
          <Col span={12}>
            <img
              src={users[0].photo}
              alt="user"
              style={{ width: "100%", height: "100%" }}
            />
          </Col>
          <Col span={12}>
            <p>{users[0].email}</p>
            <p>{users[0].phone}</p>
            <p>
              {users[0].city}, {users[0].country}
            </p>
          </Col>
        </Row>
      </Card>
      <Button type="primary" style={{ padding: 20, width: 400 }} size="large">
        Greet someone else
      </Button>
    </Space>
  );
};

export default Home;
