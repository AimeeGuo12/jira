import { useState } from "react";
import { SearchPanel } from "./search-panel";
import { List } from "./list";
import { useDebounce, useDocumentTitle } from "../../utils/index";
// import qs from "qs"; // qs的类型文件？ 我这里已经有ts的index.d.ts文件了。如果没有，需要安装@type/qs;
import styled from "@emotion/styled";
import { Typography } from "antd";
import { useProjects } from "utils/project";
import { useUsers } from "utils/user";
import { useUrlQueryParam } from "utils/url";
import { useProjectsSearchParams } from "./utils";

// 基本类型和组件状态可以放到依赖里，非组件状态的对象，绝不可以放到依赖里，会造成无线循环
// https://codesandbox.io/s/keen-wave-tlz9s?file=/src/App.js
export const ProjectListScreen = () => {
  useDocumentTitle("项目列表", false);
  // param 改为从url中获取
  const [param, setParam] = useProjectsSearchParams();
  // const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState<null | Error>(null);
  const {
    isLoading,
    error,
    data: list,
    retry,
  } = useProjects(useDebounce(param, 200));
  // 初始化users
  const { data: users } = useUsers();

  return (
    <Container>
      <h1>项目列表</h1>
      <SearchPanel
        users={users || []}
        param={param}
        setParam={setParam}
      ></SearchPanel>
      {error ? (
        <Typography.Text type={"danger"}>{error.message}</Typography.Text>
      ) : null}
      <List
        refresh={retry}
        dataSource={list || []}
        loading={isLoading}
        users={users || []}
      ></List>
    </Container>
  );
};

ProjectListScreen.whyDidYouRender = true; // 跟踪这个组件
const Container = styled.div`
  padding: 3.2rem;
`;
