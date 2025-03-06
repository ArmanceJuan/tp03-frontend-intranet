import React from "react";
import { Button, Space, Card, Row, Col } from "antd";
import "../css/index.scss";

const UsersList = () => {
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
    {
      id: "2",
      gender: "female",
      firstname: "Maïwenn",
      lastname: "Louis",
      email: "maïwenn.louis@example.com",
      password: "$2b$10$.lfa1NRJAxvA/8FjGh8ImuUsgSwfkCIkEOaBigMn6qjdrniW9.Fb6",
      phone: "01-04-22-90-78",
      birthdate: "1986-02-10",
      city: "Toulon",
      country: "France",
      photo: "https://randomuser.me/api/portraits/women/21.jpg",
      category: "Marketing",
      isAdmin: false,
    },
    {
      id: "3",
      gender: "male",
      firstname: "Mathis",
      lastname: "Rolland",
      email: "mathis.rolland@example.com",
      password: "$2b$10$diOlTKrNfdmm/u6GOjZ.aeBAjFmzeOz7zoUKx.FaBgRut52UTzgSG",
      phone: "03-15-28-83-79",
      birthdate: "1982-11-11",
      city: "Villeurbanne",
      country: "France",
      photo: "https://randomuser.me/api/portraits/men/3.jpg",
      category: "Technique",
      isAdmin: false,
    },
    {
      id: "4",
      gender: "female",
      firstname: "Cassandre",
      lastname: "Roy",
      email: "cassandre.roy@example.com",
      password: "$2b$10$FrxK0pOLxSmKxoQ.D1tEyuO3bOcLyqePHzpt0UhNjX0YAzmO5WVgy",
      phone: "02-64-83-52-15",
      birthdate: "1992-04-14",
      city: "Colombes",
      country: "France",
      photo: "https://randomuser.me/api/portraits/women/75.jpg",
      category: "Client",
      isAdmin: false,
    },
    {
      id: "5",
      gender: "female",
      firstname: "Gabrielle",
      lastname: "Legrand",
      email: "gabrielle.legrand@example.com",
      password: "$2b$10$ufroWKXB8OHJ3e81lOfyPOz1FJxlji8vfOKjXVzKXfBayooB9ftne",
      phone: "05-01-56-55-14",
      birthdate: "1986-07-29",
      city: "Marseille",
      country: "France",
      photo: "https://randomuser.me/api/portraits/women/2.jpg",
      category: "Technique",
      isAdmin: false,
    },
    {
      id: "6",
      gender: "female",
      firstname: "Alyssia",
      lastname: "Gaillard",
      email: "alyssia.gaillard@example.com",
      password: "$2b$10$NxNjTP7Bz5vR.nwZh3vcHuUvihZna.b8L79nEyqJ6cZlIuwAMyI8S",
      phone: "04-26-97-61-14",
      birthdate: "1989-04-17",
      city: "Villeurbanne",
      country: "France",
      photo: "https://randomuser.me/api/portraits/women/90.jpg",
      category: "Technique",
      isAdmin: false,
    },
    {
      id: "7",
      gender: "female",
      firstname: "Kiara",
      lastname: "Rey",
      email: "kiara.rey@example.com",
      password: "$2b$10$IIVoIxJfh5oPu7Y33lcRX.RTkCrmoRlFlmN4YtB3m4fl4bf79ZnlO",
      phone: "01-73-04-03-05",
      birthdate: "1987-12-23",
      city: "Rouen",
      country: "France",
      photo: "https://randomuser.me/api/portraits/women/18.jpg",
      category: "Marketing",
      isAdmin: false,
    },
    {
      id: "8",
      gender: "female",
      firstname: "Diane",
      lastname: "Pierre",
      email: "diane.pierre@example.com",
      password: "$2b$10$RDhGVL.INWiHzm7VolYhNOe2RTIx.lzsEqt0Y2fJGXAezLjGhEQna",
      phone: "05-82-65-98-85",
      birthdate: "1993-08-13",
      city: "Asnières-sur-seine",
      country: "France",
      photo: "https://randomuser.me/api/portraits/women/90.jpg",
      category: "Client",
      isAdmin: false,
    },
  ];

  return (
    <div>
      <Space direction="vertical" align="center">
        <h1>Welcome</h1>
        <h2>Do you say hello ?</h2>
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
            {users.map((user) => (
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
                    {/* TODO: Condition de si isAdmin pour la personne connecter ou pas */}
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
