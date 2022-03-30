import { useState } from "react";
import { LoginScreen } from "./login";
import { RegisterScreen } from "./register";
import { Card, Button } from "antd";
export const UnauthenticatedApp = () => {
  const [isRegister, setIsregister] = useState(false);

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Card>
        {isRegister ? <RegisterScreen /> : <LoginScreen />}
        <Button onClick={() => setIsregister(!isRegister)}>
          切换到{isRegister ? "登录" : "注册"}
        </Button>
      </Card>
    </div>
  );
};
