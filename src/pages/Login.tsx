import { Button, Col, Form, Row } from "antd";
import CustomForm from "../components/form/CustomForm";
import CustomInput from "../components/form/CustomInput";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import { useLoginMutation, useRegisterUserMutation } from "../redux/features/auth/authApi";
import { useAppDispatch } from "../redux/hooks";
import { setUser } from "../redux/features/auth/authSlice";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
type TUserData = {
  email: string;
  password: string;
  name?: string;
};

const Login = () => {
  const [login] = useLoginMutation();
  const [registerUser] = useRegisterUserMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [register, setRegister] = useState(false);
  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("Loading...");
    try {
      const userData: TUserData = {
        email: data.email,
        password: data.password,
      };

      if (register) {
        userData.name = data.name;
      }

      register && (await registerUser(userData));

      const loggedUser = await login(userData).unwrap();

      const decodedUser = jwtDecode(loggedUser.data.token);

      dispatch(
        setUser({
          data: decodedUser,
          token: loggedUser.data.token,
        })
      );

      toast.success(`${register ? "Registered" : "Logged in"} successfully!`, {
        id: toastId,
        duration: 2000,
      });
      navigate("/");
    } catch (error: any) {
      toast.error(error?.data?.message || "Something went wrong");
    }
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-yellow-50 ">
        <div className="grid grid-cols-1 lg:grid-cols-2 justify-center items-center gap-6 lg:gap-20 h-full w-full lg:w-[calc(100vw-30vw)] lg:h-[calc(100vh-20vh)] bg-yellow-400 rounded-3xl p-6 relative">
          <div className="absolute h-full w-1/2 left-0 top-0 bg-white rounded-r-3xl hidden lg:flex"></div>
          <div className="space-y-2 text-center z-10">
            <h1 className=" text-4xl font-bold">Sportiz</h1>

            <p className="text-xl text-left">
              Taking the victory lap in sports item management – where every goal is neatly organized and every play is
              a well-managed display!
            </p>
            <div
              className="hidden lg:block cursor-pointer px-3 py-3 text-2xl bg-yellow-400 w-24 mx-auto rounded-md font-bold text-white"
              onClick={() => setRegister(!register)}
            >
              {!register ? "Register" : "Login"}
            </div>
          </div>
          <div className="space-y-3">
            <CustomForm onSubmit={onSubmit}>
              {register && (
                <Form.Item label="Name">
                  <CustomInput
                    type="text"
                    name="name"
                    required={true}
                  />
                </Form.Item>
              )}
              <Form.Item label="Email">
                <CustomInput
                  type="email"
                  name="email"
                  required={true}
                />
              </Form.Item>

              <Form.Item label="Password">
                <CustomInput
                  type="password"
                  name="password"
                  required={true}
                />
              </Form.Item>

              <Form.Item>
                <Row
                  justify="end"
                  gutter={[8, 8]}
                >
                  <Col span={24}>
                    <Button
                      htmlType="submit"
                      className="w-24 "
                    >
                      {!register ? "Login" : "Register"}
                    </Button>
                  </Col>
                  <Col
                    span={24}
                    className="lg:hidden"
                  >
                    <Button
                      type="link"
                      onClick={() => setRegister(!register)}
                    >
                      {!register ? "Don't have an account? Register here" : "Already have an account? Login here"}
                    </Button>
                  </Col>
                </Row>
              </Form.Item>
            </CustomForm>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
