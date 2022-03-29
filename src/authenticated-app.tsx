// 登录状态
import { useAuth } from "context/auth-context";
import { ProjectListScreen } from "screens/project-list/index";
export const AuthenticatedApp = () => {
  const { logout } = useAuth();

  return (
    <div>
      <button onClick={logout}>登出</button>
      <ProjectListScreen></ProjectListScreen>
    </div>
  );
};
