import { useAuth } from "context/auth-context";
import { Form, Button, Input } from "antd";
import { useAsync } from "utils/use-async";
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

export const RegisterScreen = ({
  onError,
}: {
  onError: (error: Error) => void;
}) => {
  const { user, register } = useAuth();
  const { run, isLoading } = useAsync(undefined, { throwOnError: true });

  // HTMLFormElement extens Element
  const handleSubmit = async ({
    cpassword,
    ...values
  }: {
    username: string;
    password: string;
    cpassword: string;
  }) => {
    // try{
    //     await register(values);
    // }catch(e) {
    //     onError(e)
    // }
    if (cpassword !== values.password) {
      onError(new Error("请确认两次输入的密码相同"));
      return;
    }
    run(register(values)).catch((e) => onError(e));
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
        <Input placeholder={"密码"} type="password" id={"password"} />
      </Form.Item>
      <Form.Item
        name={"cpassword"}
        rules={[{ required: true, message: "请确认密码" }]}
      >
        <Input placeholder={"请确认密码"} type="password" id={"cpassword"} />
      </Form.Item>
      <Button loading={isLoading} htmlType="submit" type="primary">
        注册
      </Button>
    </Form>
  );
};
