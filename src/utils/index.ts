import { useEffect, useRef, useState } from "react";

export const isFalsy = (value: unknown) => (value === 0 ? false : !value);
export const isVoid = (value: unknown) =>
  value === undefined || value === null || value === "";

// object类型  下面的写法都不会报错  object类型包含的范围较广， new RegExp(), function等也是
// 所以如果直接结构，当是函数时会返回一个空对象
// let a: object
// a={name: 'jack'}
// a=() => {}
export const cleanObject = (object: { [key: string]: unknown }) => {
  const result = { ...object };
  Object.keys(result).forEach((key) => {
    const value = result[key];
    if (isVoid(value)) {
      delete result[key];
    }
  });
  return result;
};

export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback();
    // TODO 依赖性加callback会造成无线循环 这个和useCallback以及useMemo有关系
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

// 这里是直接将输入的值改变， 输完以后再更新输入值  然后去发送请求
// delay?:number表示可以不传，要传就需要传入number类型的
export const useDebounce = <V>(value: V, delay?: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // 每次在value变化以后，设置一个定时器
    const timeout = setTimeout(() => setDebouncedValue(value), delay);
    // 每次在上一个useEffect处理完以后再运行
    // useEffect中的return是卸载函数
    return () => clearTimeout(timeout);
  }, [value, delay]);

  return debouncedValue;
};
// T[], 表示T类型的数组
export const useArray = <T>(initialArray: T[]) => {
  const [value, setValue] = useState(initialArray);

  return {
    value,
    setValue,
    add: (item: T) => setValue([...value, item]),
    clear: () => setValue([]),
    removeIndex: (index: number) => {
      const copy = [...value];
      copy.splice(index, 1);
      setValue(copy);
    },
  };
};

// useRef保存的值，在整个生命周期都不会变化
// 改变文档名字  也可使用插件 Helmet
export const useDocumentTitle = (
  title: string,
  keepOnUnmount: boolean = true
) => {
  const oldTitle = useRef(document.title).current;
  useEffect(() => {
    document.title = title;
  }, [title]);
  useEffect(() => {
    return () => {
      if (!keepOnUnmount) {
        // 如果不指定oldtitle依赖 卸载时读到的还是旧的title
        document.title = oldTitle;
      }
    };
  }, [oldTitle, keepOnUnmount]);
};

export const resetRoute = () => {
  return (window.location.href = window.location.origin);
};
/**
 * 传入一个对象，和键集合，返回对应的对象中的键值对
 * @param obj
 * @param keys
 */
export const subset = <
  O extends { [key in string]: unknown },
  K extends keyof O
>(
  obj: O,
  keys: K[]
) => {
  const filteredEntries = Object.entries(obj).filter(([key]) =>
    keys.includes(key as K)
  );
  return Object.fromEntries(filteredEntries) as Pick<O, K>;
};

/**
 * 返回组件的挂载状态，如果还没挂载或者已经卸载，返回false；反之，返回true
 */
export const useMountedRef = () => {
  const mountedRef = useRef(false);
  // 返回一个可变的 ref 对象，该对象只有个 current 属性，初始值为传入的参数( initialValue )。
  // 返回的 ref 对象在组件的整个生命周期内保持不变
  // 当更新 current 值时并不会 re-render ，这是与 useState 不同的地方
  // 更新 useRef 是 side effect (副作用)，所以一般写在 useEffect 或 event handler 里
  // useRef 类似于类组件的 this

  useEffect(() => {
    // 页面加载渲染后 变为true
    mountedRef.current = true;
    return () => {
      // 卸载的时候改变为false
      mountedRef.current = false;
    };
  });
  return mountedRef;
};
