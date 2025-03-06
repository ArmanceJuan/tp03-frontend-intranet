import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Card, Row, Col, Spin, Descriptions } from "antd";
import { useGetUserByIdQuery } from "../../store/apiSlice.jsx";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../store/authSlice.jsx";

const UserView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const currentUser = useSelector(selectCurrentUser);

  const { data, isLoading, error } = useGetUserByIdQuery(id);

  if (isLoading)
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "50vh",
        }}
      >
        <Spin size="large" />
      </div>
    );

  if (error)
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h2>Error fetching user</h2>
        <p>{error.message || JSON.stringify(error)}</p>
        <Button onClick={() => navigate("/users")}>
          Go Back to users list
        </Button>
      </div>
    );

  if (!data || !data.user)
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h2>User not found</h2>
        <Button onClick={() => navigate("/users")}>
          Go back to users list
        </Button>
      </div>
    );

  const user = data.user;

  const formattedDate = user.birthdate
    ? new Date(user.birthdate).toLocaleDateString()
    : "";

  return (
    <div
      className="user-view-container"
      style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}
    >
      <h1>User Profile</h1>

      <Card>
        <Row gutter={24}>
          <Col span={8}>
            <img
              src={user.photo}
              alt={`${user.firstname} ${user.lastname}`}
              style={{ width: "100%", borderRadius: "8px" }}
              onError={(e) => {
                e.target.src =
                  "https://i.pinimg.com/736x/67/b2/cc/67b2cc4e28fcf735c303f1d43c1bd698.jpg";
              }}
            />

            <div
              style={{
                marginTop: "20px",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
              }}
            >
              {(currentUser?.isAdmin || currentUser?._id === id) && (
                <Button
                  type="primary"
                  onClick={() => navigate(`/user/${id}/edit`)}
                  style={{ width: "100%" }}
                >
                  Edit profile
                </Button>
              )}

              <Button
                onClick={() => navigate("/users")}
                style={{ width: "100%" }}
              >
                Back to users list
              </Button>
            </div>
          </Col>

          <Col span={16}>
            <Descriptions
              title={`${user.firstname} ${user.lastname}`}
              bordered
              column={1}
            >
              <Descriptions.Item label="Email">{user.email}</Descriptions.Item>
              <Descriptions.Item label="Gender">
                {user.gender}
              </Descriptions.Item>
              <Descriptions.Item label="Phone">{user.phone}</Descriptions.Item>
              <Descriptions.Item label="Birthdate">
                {formattedDate}
              </Descriptions.Item>
              <Descriptions.Item label="Address">
                {user.city}, {user.country}
              </Descriptions.Item>
              <Descriptions.Item label="Category">
                {user.category}
              </Descriptions.Item>
              <Descriptions.Item label="Role">
                {user.isAdmin ? "Administrateur" : "Utilisateur standard"}
              </Descriptions.Item>
            </Descriptions>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default UserView;
