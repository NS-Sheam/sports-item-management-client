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
import { FaGoogle } from "react-icons/fa";

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
  const [error, setError] = useState<string | null>(null);

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

      if (register) {
        await registerUser(userData);
      }

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
      setError(error?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="inner-container py-4 flex justify-center items-center min-h-screen relative bg-yellow-50">
      <div
        className={`rounded-3xl shadow-2xl border-white bg-slate-200 border-2 auth-container ${
          register ? "sign-up" : "login"
        }`}
      >
        <div className="background-panel z-10 shadow-md space-y-3">
          <h3 className="text-black text-2xl font-bold text-center">
            {!register ? "Don't have an account?" : "Login to existing account"}
          </h3>
          <div className="flex flex-col gap-4 items-center justify-center">
            <button
              onClick={() => setRegister(!register)}
              className="w-48 bg-white text-black rounded-md shadow-md p-2 font-bold"
            >
              {register ? "Login" : "Sign Up"}
            </button>
            <button className="w-48 bg-white text-black rounded-md shadow-md p-2 font-bold flex items-center justify-center gap-2">
              <FaGoogle /> Login With Google
            </button>
          </div>
        </div>
        <div
          className={` absolute form-panel w-1/2 h-full ${
            register ? "top-0 left-0" : "top-0 right-0"
          } flex flex-col items-center justify-center gap-3`}
        >
          <CustomForm
            className="w-full flex  flex-col gap-4 items-center justify-center "
            onSubmit={onSubmit}
          >
            <div className="text-4xl font-extrabold text-center text-black">
              Sporti<span className="text-yellow-400">Z</span>
            </div>
            {register && (
              <Form.Item
                label="Name"
                className="w-full px-6"
              >
                <CustomInput
                  type="text"
                  name="name"
                  className="p-2"
                  required={true}
                />
              </Form.Item>
            )}
            <Form.Item
              label="Email"
              className="w-full px-6"
            >
              <CustomInput
                type="email"
                name="email"
                className="p-2"
                required={true}
              />
            </Form.Item>
            <Form.Item
              label="Password"
              className="w-full px-6"
            >
              <CustomInput
                type="password"
                name="password"
                className="p-2"
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
                    size="large"
                    className="w-32 bg-yellow-400 rounded-md shadow-md font-bold"
                  >
                    {!register ? "Login" : "Register"}
                  </Button>
                </Col>
                {error && (
                  <Col span={24}>
                    <p className="text-red-500">{error}</p>
                  </Col>
                )}
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
  );
};

export default Login;
