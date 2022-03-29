import { useState } from "react";
import { LoginScreen } from "./login";
import { RegisterScreen } from "./register";

export const UnauthenticatedApp = () => {
  const [isRegister, setIsregister] = useState(false);

  return (
    <div>
      {isRegister ? <RegisterScreen /> : <LoginScreen />}
      <button onClick={() => setIsregister(!isRegister)}>
        切换到{isRegister ? "登录" : "注册"}
      </button>
    </div>
  );
};