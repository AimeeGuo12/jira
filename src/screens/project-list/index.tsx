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

export const ProjectListScreen = () => {
  // const [, setParam] = useState({
  //   name: "",
  //   personId: "",
  // });
  // 基本类型和组件状态可以放到依赖里，非组件状态的对象，绝不可以放到依赖里，会造成无线循环
  // https://codesandbox.io/s/keen-wave-tlz9s?file=/src/App.js
  // param 改为从url中获取
  const [param, setParam] = useUrlQueryParam(["name", "personId"]);
  // const [list, setList] = useState([]);

  const debouncedValue = useDebounce(param, 500);

  // const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState<null | Error>(null);
  const { isLoading, error, data: list } = useProjects(debouncedValue);

  // 初始化users
  const { data: users } = useUsers();

  useDocumentTitle("项目列表", false);
  console.log(useUrlQueryParam(["name"]));
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
