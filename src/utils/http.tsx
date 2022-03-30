import { logout } from "auth-provider";
import { useAuth } from "context/auth-context";

import qs from "qs";
const apiUrl = process.env.REACT_APP_API_URL;
interface Config extends RequestInit {
  token?: string;
  data?: object;
}
export const http = async (
  endpoint: string,
  { data, token, headers, ...customConfig }: Config = {}
) => {
  const config = {
    method: "GET", // 外面的customConfig可以覆盖调用的方式
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
      "Content-type": data ? "application/json" : "",
    },
    ...customConfig,
  };
  if (config.method.toUpperCase() === "GET") {
    endpoint += `?${qs.stringify(data)}`;
  } else {
    config.body = JSON.stringify(data || {});
  }
  return window
    .fetch(`${apiUrl}/${endpoint}`, config)
    .then(async (response) => {
      if (response.status === 401) {
        await logout();
        window.location.reload();
        return Promise.reject({ message: "请重新登录" });
      }
      const data = await response.json();
      if (response.ok) {
        return data;
      } else {
        return Promise.reject(data);
      }
    });
};

// Js中的typeof 是在runtime时运行的
// return typeof 1 === 'number

// TS中的typeof，是在静态环境运行的， 因为是定义类型的，不会被编译到js中
// return (...[endpoint, config]: Parameters<typeof http>) =>
export const useHttp = () => {
  const { user } = useAuth();
  // TODO  Parameters  Utility Types的用法：用泛型给它传入一个其他类型，然后utility type对这个类型进行某种操作
  // typeof http 可以读取http参数的类型，Parameters把参数提取出来，以元组的方式
  return (...[endpoint, config]: Parameters<typeof http>) =>
    http(endpoint, { ...config, token: user ? user.token : "" });
};

// 联合类型
// let myFavoriteNumber: string | number
// myFavoriteNumber = 'seven'

// let jackFavoriteNumber: string | number
// // 如上，如果有多个变量使用的同样的类型，需要定义多次。
// // 一个解决方法是使用类型别名或者interface

// // 类型别名, 下面的这种interface不能代替实现
// type FavoriteNumber = string | number
// let roseFavoriteNumber: FavoriteNumber = '6'
// // interface也没法实现 Utility type: Partial, Parameters,Omit这三个是常用的

// type Person = {
//     name: string,
//     age: number
// }
// const xiaoMing: Partial<Person> = {name: 'xiaoMing'}  // Partial 表示可以传入也可以不传，也可以不传入全部属性
// const shenmiren: Omit<Person, 'name'> = {age: 8}  // 表示需要传入Person中除name以外的属性  不传多个属性时<Person, 'name' | 'age'>

// 实现Partial
// type Parital<T> = {
//     [P in keyof T]?: T[P]; // keyof 取出对象类型的键值，然后联合在一起 形成一个联合类型， in表遍历， T[P]表示值的类型
// }

// type PersonKeys = keyof Person; //取出Person类型中的键，name | age

// // Omit
// // K extends keyof T 表示K必须是T键值集合的子集
// type Pick<T, K extends keyof T> = {
//     [P in K]: T[P] // 遍历的是传入的第二个参数
// }
// type PersonOnlyName = Pick<PersonKeys, 'name'>

// // Omit操作键值对 Exclude操作联合类型
// type Exclude<T, U> = T extends U ？ never : T
// type Age = Exclude<PersonKeys, 'name'> // 过滤name返回剩下的

// type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>
