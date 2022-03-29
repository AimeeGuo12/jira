import { ReactNode } from "react";
import { AuthProvider } from "./auth-context";

// 用来包裹入口文件，根节点
// 相当于把根节点传入  然后用AuthProvider包裹起来
export const AppProvider = ({ children }: { children: ReactNode }) => {
  return <AuthProvider>{children}</AuthProvider>;
};
