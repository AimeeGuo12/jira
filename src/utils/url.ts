import { useMemo } from "react";
import { useSearchParams, URLSearchParamsInit } from "react-router-dom";
import { cleanObject } from "utils";
/**
 * 返回页面url，指定键的参数值
 * keys: ['name', 'id']
 */
// 使用泛型  实现 传入什么键值就返回什么
// obj是对象的时候，会造成无限循环，但是当对象是state时，不会循环
// 所以下面的useMemo中serachParams这个对象可以作为useMemo的参数
export const useUrlQueryParam = <K extends string>(keys: K[]) => {
  const [searchParams, setSearchParam] = useSearchParams();
  return [
    useMemo(
      () =>
        keys.reduce((prev, key) => {
          return { ...prev, [key]: searchParams.get(key) || "" };
        }, {} as { [key in K]: string }),
      //eslint-disable-next-line react-hooks/exhaustive-deps
      [searchParams]
    ), // 只有在searchParams改变的时候才去运算useMemo中的函数
    // setSearchParam
    (params: Partial<{ [key in K]: unknown }>) => {
      // iterator遍历器  {}, []可以用for... of遍历 for(var i of a)   a[Symbol.iterator]
      // iterator: https://codesandbox.io/s/upbeat-wood-bum3j?file=/src/index.js

      // Object.fromEntries  把键值对列表转化为一个对象 参数为iterable
      const o = cleanObject({
        ...Object.fromEntries(searchParams),
        ...params,
      }) as URLSearchParamsInit;
      return setSearchParam(o);
    },
  ] as const;
};

// const a = ['jack', 12, {gender: 'male'}] as const
// 是一个元组
// ts把它当成了数组，只取元组中所以类型的集合。
// 如果想要是返回原始的类型，需要加上一个 as const
