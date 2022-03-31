import { useAuth } from "context/auth-context";
import { FormEvent } from "react";
// const apiUrl = process.env.REACT_APP_API_URL;
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
  // const login = (param: { username: string; password: string }) => {
  //   fetch(`${apiUrl}/register`, {
  //     method: "POST",
  //     headers: {
  //       "Content-type": "application/json",
  //     },
  //     body: JSON.stringify(param),
  //   }).then(async (response) => {
  //     if (response.ok) {
  //     }
  //   });
  // };

  // HTMLFormElement extens Element
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const username = (event.currentTarget.elements[0] as HTMLInputElement)
      .value;
    const password = (event.currentTarget.elements[1] as HTMLInputElement)
      .value;
    login({ username, password });
  };
  return (
    <form onSubmit={handleSubmit}>
      登录成功， 用户名： {user?.name}
      <div>
        <label htmlFor="username">用户名</label>
        <input type="text" id={"username"} />
      </div>
      <div>
        <label htmlFor="password">密码</label>
        <input type="password" id="password" />
      </div>
      <button type="submit">注册</button>
    </form>
  );
};
