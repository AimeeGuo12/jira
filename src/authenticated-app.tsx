// 登录状态
import styled from "@emotion/styled";
import { Row } from "components/lib";
import { useAuth } from "context/auth-context";
import { ProjectListScreen } from "screens/project-list/index";
// 一种使用svg的方式
import { ReactComponent as SoftwareLogo } from "assets/software-logo.svg";
import { Dropdown, Menu } from "antd";
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
  const { logout, user } = useAuth();

  return (
    <Container>
      <Header between={true}>
        <HeaderLeft gap={true}>
          <SoftwareLogo width={"18rem"} color={"rgb(38, 132, 255)"} />
          <h2>项目</h2>
          <h2>用户</h2>
        </HeaderLeft>
        <HeaderRight>
          {/* overlay 鼠标悬浮时出现 */}
          <Dropdown
            overlay={
              <Menu>
                <Menu.Item key={"logout"}>
                  <a onClick={logout}>登出</a>
                </Menu.Item>
              </Menu>
            }
          >
            <a onClick={(e) => e.preventDefault()}>Hi, {user?.name}</a>
          </Dropdown>
        </HeaderRight>
      </Header>
      <Main>
        <ProjectListScreen></ProjectListScreen>
      </Main>
    </Container>
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
