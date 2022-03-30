import { useAuth } from "context/auth-context";
import { FormEvent } from "react";
import { Form, Input, Button } from "antd";
const apiUrl = process.env.REACT_APP_API_URL;
// ts是鸭子类型（duck typing）： 面向接口编程， 不是面向对象编程
// 如：
// interface Base{
//     id: number
// }
// interface Advance extends Base{
//     name: string
// }
// const test = (p: Base) => {

// }
// // 即使a不是按照test参数定义的类型定义的，但是a中的接口数据格式对test来说是正确的。则a就可以作为
// // test的参数传入
// // const a: Advance={ id: 1, name: 'jack'}
// const a = {id: 1, name: 'jack'}
// test(a)

export const LoginScreen = () => {
  const { login, user } = useAuth();

  // HTMLFormElement extens Element
  const handleSubmit = (values: { username: string; password: string }) => {
    login(values);
  };
  return (
    <Form onFinish={handleSubmit}>
      <Form.Item
        name={"username"}
        rules={[{ required: true, message: "请输入用户名" }]}
      >
        <Input placeholder={"用户名"} type="text" id={"username"} />
      </Form.Item>
      <Form.Item
        name={"password"}
        rules={[{ required: true, message: "请输入密码" }]}
      >
        <Input placeholder={"密码"} type="text" id={"password"} />
      </Form.Item>
      <Button htmlType="submit" type="primary">
        登录
      </Button>
    </Form>
  );
};
