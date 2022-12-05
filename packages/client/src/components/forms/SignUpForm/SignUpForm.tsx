import React from "react";
import { Button, Form, Image, Input } from "antd";
import { useNavigate } from "react-router-dom";
import { COLORED_LOGO } from "../../../constants/imagesPaths";
import Title from "antd/es/typography/Title";
import { validator, matchPasswords, EMAIL_MESSAGE_ERROR } from "./validation";
import { signup } from "../../../services/authorization";
import "./SignUpForm.scss";

export type SignUpFormValues = {
  email: string;
  first_name: string;
  second_name: string;
  login: string;
  password: string;
  confirm?: string;
  phone: string;
};

const SignUpForm: React.FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = (values: SignUpFormValues) => {
    delete values.confirm;
    signup(values, navigate)
  };

  return (
    <div className="form-container">
      <div className="logo">
        <Image width={200} src={COLORED_LOGO} />
        <Title level={4}>Pachka-i-tocka edition</Title>
      </div>
      <Form
        labelCol={{ flex: "86px" }}
        form={form}
        name="register"
        onFinish={onFinish}
        scrollToFirstError
        className="form"
      >
        <Form.Item name="email" label="E-mail" rules={[{ type: "email", message: EMAIL_MESSAGE_ERROR }, { validator }]}
                   hasFeedback
        >
          <Input />
        </Form.Item>

        <Form.Item name="first_name" label="Name" rules={[{ validator }]} hasFeedback>
          <Input />
        </Form.Item>

        <Form.Item name="second_name" label="Surname" rules={[{ validator }]} hasFeedback>
          <Input />
        </Form.Item>

        <Form.Item name="login" label="Login" rules={[{ validator }]} hasFeedback>
          <Input />
        </Form.Item>

        <Form.Item name="password" label="Password" rules={[{ validator }]} hasFeedback>
          <Input.Password />
        </Form.Item>

        <Form.Item name="confirm" label="Password" dependencies={["password"]} rules={[matchPasswords]} hasFeedback>
          <Input.Password />
        </Form.Item>

        <Form.Item name="phone" label="Phone" rules={[{ validator }]} hasFeedback>
          <Input />
        </Form.Item>

        <div className="button-container">
          <Button type="primary" htmlType="submit">Create account</Button>
        </div>
      </Form>
    </div>
  );
};

export default SignUpForm;