import { Component, ReactNode } from "react";
// <P, S> P: props, S: state
// children
// fallbackRender
type FallbackRender = (props: { error: Error | null }) => React.ReactElement;

// https://github.com/bvanghn/react-error-boundary 专门处理错误边界的库
export class ErrorBoundary extends Component<
  React.PropsWithChildren<{ fallbackRender: FallbackRender }>,
  { error: Error | null }
> {
  state = { error: null };

  // 当子组件抛出异常 这里会接收到并调用
  static getDerivedStateFromError(error: Error) {
    return { error };
  }
  render() {
    const { error } = this.state;
    const { fallbackRender, children } = this.props;
    if (error) {
      return fallbackRender(error);
    }
    return children;
  }
}
