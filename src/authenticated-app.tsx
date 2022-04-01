// 登录状态
import styled from "@emotion/styled";
import { Row } from "components/lib";
import { useAuth } from "context/auth-context";
import { ProjectListScreen } from "screens/project-list/index";
// 一种使用svg的方式
import { ReactComponent as SoftwareLogo } from "assets/software-logo.svg";
import { Button, Dropdown, Menu } from "antd";

import { Navigate, Route, Routes } from "react-router";
import { BrowserRouter as Router } from "react-router-dom";
import { ProjectScreen } from "screens/project";
import { resetRoute } from "utils";
/**
 * grid 和 flex 各自的应用场景
 * 1. 要考虑 是一维布局还是二维布局
 * 一般来说，一维布局用flex， 二维布局用grid
 * 2. 是从内容出发还是布局出发？
 * 从内容出发： 你先有一组内容（数量一般不固定）， 然后希望他们均匀的分布在容器中，由内容自己的大小决定占据的空间
 * 从布局出发: 先规划网格（数量一般固定），然后再把元素往里填充
 * 从内容出发： 用flex
 * 从布局出发： 用grid
 *
 */

export const AuthenticatedApp = () => {
  return (
    <Container>
      <PageHeader />
      <Main>
        {/* 最外层的Router使包裹的组件都可以共享路由信息 */}
        <Router>
          <Routes>
            <Route path={"/projects"} element={<ProjectListScreen />} />
            {/* 冒号表示变量 */}
            <Route
              path={"/projects/:projectId/*"}
              element={<ProjectScreen />}
            />
            {/* <Navigate to={'/projects'}/> */}
            <Route
              path="*"
              element={<Navigate to={"/projects"} replace={true} />}
            />
          </Routes>
        </Router>
      </Main>
    </Container>
  );
};
const PageHeader = () => {
  const { logout, user } = useAuth();
  return (
    <Header between={true}>
      <HeaderLeft gap={true}>
        <Button type="link" onClick={resetRoute}>
          <SoftwareLogo width={"18rem"} color={"rgb(38, 132, 255)"} />
        </Button>

        <h2>项目</h2>
        <h2>用户</h2>
      </HeaderLeft>
      <HeaderRight>
        {/* overlay 鼠标悬浮时出现 */}
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item key={"logout"}>
                <Button type="link" onClick={logout}>
                  登出
                </Button>
              </Menu.Item>
            </Menu>
          }
        >
          <Button type="link" onClick={(e) => e.preventDefault()}>
            Hi, {user?.name}
          </Button>
        </Dropdown>
      </HeaderRight>
    </Header>
  );
};
const Container = styled.div`
  display: grid;
  grid-template-rows: 6rem 1fr 6rem;
  height: 100vh;
`;
const Header = styled(Row)`
  padding: 3.2rem;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  z-index: 1;
  /* display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between; */
`;
const HeaderLeft = styled(Row)``;
const HeaderRight = styled.div``;
const Main = styled.main``;
