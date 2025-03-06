import React from "react";
import { Button, Space, Card, Row, Col } from "antd";
import { useGetRandomUserQuery } from "../store/apiSlice.jsx";

const Home = () => {
  const { data, refetch } = useGetRandomUserQuery();

  const handleGreetSomeone = () => {
    refetch();
  };

  // const user = [
  //   {
  //     id: "1",
  //     gender: "male",
  //     firstname: "Owen",
  //     lastname: "Lopez",
  //     email: "owen.lopez@example.com",
  //     password: "$2b$10$IExQBXEZVifvfEOWvWsmO.4.OocNb7zQzurQerwOQh1tZx/3okSp.",
  //     phone: "02-37-79-78-39",
  //     birthdate: "1992-12-26",
  //     city: "Villeurbanne",
  //     country: "France",
  //     photo: "https://randomuser.me/api/portraits/men/40.jpg",
  //     category: "Marketing",
  //     isAdmin: false,
  //   },
  // ];

  const user = data?.user;
  const firstname = user?.firstname;
  const lastname = user?.lastname;
  const category = user?.category;
  const email = user?.email;
  const phone = user?.phone;
  const birthdate = user?.birthdate;
  const city = user?.city;
  const country = user?.country;
  const photo = user?.photo;

  return (
    <Space direction="vertical" align="center">
      <h1>Welcome</h1>
      <h2>Do you say hello ?</h2>
      <Card
        title={`${firstname} ${lastname}`}
        variant="borderless"
        style={{ width: 400 }}
        extra={<span>{category}</span>}
      >
        <Row gutter={16}>
          <Col span={12}>
            <img
              src={photo}
              alt="user"
              style={{ width: "100%", height: "100%" }}
            />
          </Col>
          <Col span={12}>
            <p>{email}</p>
            <p>{phone}</p>
            <p>
              {city}, {country}
            </p>
            <p>{birthdate}</p>
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
