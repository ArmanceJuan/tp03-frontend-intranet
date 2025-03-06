import { Result, Button } from "antd";
import React from "react";

const NotFound = () => {
  return (
    <div>
      <Result
        status="404"
        title="404"
        subTitle="Sorry, you are lost :("
        extra={<Button type="primary">Back Home</Button>}
      />
    </div>
  );
};

export default NotFound;
