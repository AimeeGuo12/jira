import { stat } from "fs";
import { useState } from "react";

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

  // run 用来触发异步请求
  const run = (promise: Promise<D>) => {
    if (!promise || !promise.then) {
      throw new Error("请传入 Promise 类型数据");
    }
    setState({ ...state, stat: "loading" });
    return promise
      .then((data) => {
        setData(data);
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
    setData,
    setError,
    ...state,
  };
};
