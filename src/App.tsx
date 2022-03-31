import React from "react";
import "./App.css";
import { AuthenticatedApp } from "authenticated-app";
import { UnauthenticatedApp } from "unauthenticated-app";
import { useAuth } from "context/auth-context";
// import { ProjectList } from "./screens/project-list/index";
// import { TsReactTest } from "try-use-array";
// import { LoginScreen } from "screens/login";
function App() {
  const { user } = useAuth();
  return (
    <div className="App">
      {/* <ProjectList></ProjectList> */}
      {/* <TsReactTest></TsReactTest> */}
      {/* <LoginScreen></LoginScreen> */}
      {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
    </div>
  );
}

export default App;
