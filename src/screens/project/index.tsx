import { Link } from "react-router-dom";
import { Route, Routes, Navigate } from "react-router";
import { KanbanScreen } from "screens/Kanban";
import { EpicScreen } from "screens/Epic";
export const ProjectScreen = () => {
  return (
    <div>
      <h1>ProjectScreen</h1>
      {/* 如果加/就会被认为是根路由 */}
      <Link to={"kanban"}>看板</Link>
      <Link to={"epic"}>任务组</Link>
      <Routes>
        <Route path={"kanban"} element={<KanbanScreen />}></Route>
        <Route path={"epic"} element={<EpicScreen />}></Route>
        {/* <Navigate to={window.location.pathname+'/kanban'}></Navigate> */}
        <Route
          path="*"
          element={
            <Navigate
              to={window.location.pathname + "/kanban"}
              replace={true}
            />
          }
        ></Route>
      </Routes>
    </div>
  );
};
