import { stat } from "fs";
import { useState } from "react";
import { useMountedRef } from "utils";

interface State<D> {
  error: Error | null;
  data: D | null;
  stat: "idle" | "loading" | "error" | "success";
}
const defaultInitalState: State<null> = {
  stat: "idle",
  error: null,
  data: null,
};

const defaultConfig = {
  throwOnError: false,
};
export const useAsync = <D>(
  initalState?: State<D>,
  initialConfig?: typeof defaultConfig
) => {
  const config = { ...defaultConfig, initalState };
  const [state, setState] = useState<State<D>>({
    ...defaultInitalState,
    ...initalState,
  });
  // useState直接传入函数的含义是： 惰性初始化，会直接运行函数，setRetry的时候传入函数，也是会直接运行？ 所以，要用useState
  // 保存函数，不能直接传入函数，可以在函数外面再加一层函数
  // https://codesandbox.io/blissful-water-23@u4?file=/src/App.js
  const [retry, setRetry] = useState(() => () => {});
  const mountedRef = useMountedRef();

  const setData = (data: D) =>
    setState({
      data,
      stat: "success",
      error: null,
    });

  const setError = (error: Error) =>
    setState({
      data: null,
      error,
      stat: "error",
    });

  // run 用来触发异步请求    这里的retry是将返回promise这个请求再执行一遍
  const run = (
    promise: Promise<D>,
    runConfig?: { retry: () => Promise<D> }
  ) => {
    if (!promise || !promise.then) {
      throw new Error("请传入 Promise 类型数据");
    }
    setRetry(() => () => {
      // 将函数保存到retry
      if (runConfig?.retry) {
        run(runConfig?.retry(), runConfig);
      }
    });
    setState({ ...state, stat: "loading" });
    return promise
      .then((data) => {
        // 不加限制时，当请求被打断刷新页面了 这个操作会报错setData
        if (mountedRef.current) setData(data);
        return data;
      })
      .catch((error) => {
        // catch 会消化异常，如果不主动抛出，外面是接收不到异常的  需要return Promise.reject(error)
        setError(error);
        if (config.throwOnError) return Promise.reject(error);
        return error; // 这个不会把error抛出去
      });
  };
  return {
    isIdel: state.stat === "idle",
    isLoading: state.stat === "loading",
    isError: state.stat === "error",
    isSuccess: state.stat === "success",
    run,
    // retry被调用时，重新跑一遍run
    retry,
    setData,
    setError,
    ...state,
  };
};
