import React from "react";
import { Result, Button } from "antd";
import { useNavigate } from "react-router-dom";
// OK

const NotFound = () => {
  const navigate = useNavigate();
  const handleBackHome = () => {
    navigate("/");
  };
  return (
    <div>
      <Result
        status="404"
        title="404"
        subTitle="Sorry, you are lost :("
        extra={
          <Button type="primary" onClick={handleBackHome}>
            Back Home
          </Button>
        }
      />
    </div>
  );
};

export default NotFound;
