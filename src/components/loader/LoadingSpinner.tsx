import { Flex, Spin } from "antd";

const LoadingSpinner = () => {
  return (
    <Flex
      justify="center"
      align="center"
      style={{
        minHeight: "100vh",
      }}
    >
      <Spin
        tip="Loading"
        size="large"
      >
        <div className="content" />
      </Spin>
    </Flex>
  );
};

export default LoadingSpinner;
