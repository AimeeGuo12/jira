import { useState, useEffect } from "react";
import { SearchPanel } from "./search-panel";
import { List } from "./list";
import { cleanObject, useMount, useDebounce } from "../../utils/index";
import { useHttp } from "utils/http";
import qs from "qs"; // qs的类型文件？ 我这里已经有ts的index.d.ts文件了。如果没有，需要安装@type/qs;
import styled from "@emotion/styled";

const apiUrl = process.env.REACT_APP_API_URL;

export const ProjectListScreen = () => {
  const [param, setParam] = useState({
    name: "",
    personId: "",
  });
  const [users, setUsers] = useState([]);
  const [list, setList] = useState([]);
  const debouncedValue = useDebounce(param, 500);
  const client = useHttp();

  useEffect(() => {
    client("projects", { data: cleanObject(debouncedValue) }).then(setList);
  }, [debouncedValue]);
  // 初始化users
  useMount(() => {
    client("users").then(setUsers);
  });
  return (
    <Container>
      <h1>项目列表</h1>
      <SearchPanel
        users={users}
        param={param}
        setParam={setParam}
      ></SearchPanel>
      <List list={list} users={users}></List>
    </Container>
  );
};

const Container = styled.div`
  padding: 3.2rem;
`;
