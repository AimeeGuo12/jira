import React from "react";
import "./App.css";
import { AuthenticatedApp } from "authenticated-app";
import { UnauthenticatedApp } from "unauthenticated-app";
import { useAuth } from "context/auth-context";
import { ErrorBoundary } from "components/error-boundary";
import { FullPageErrorFallback } from "components/lib";
// import { ProjectList } from "./screens/project-list/index";
// import { TsReactTest } from "try-use-array";
// import { LoginScreen } from "screens/login";
function App() {
  const { user } = useAuth();
  return (
    <div className="App">
      <ErrorBoundary fallbackRender={FullPageErrorFallback}>
        {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
      </ErrorBoundary>
      {/* <ProjectList></ProjectList> */}
      {/* <TsReactTest></TsReactTest> */}
      {/* <LoginScreen></LoginScreen> */}
    </div>
  );
}

export default App;
