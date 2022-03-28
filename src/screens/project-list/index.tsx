import { useState, useEffect } from "react";
import { SearchPanel } from "./search-panel";
import { List } from "./list";
import { cleanObject, useMount, useDebounce } from "../../utils/index";

import qs from "qs"; // qs的类型文件？ 我这里已经有ts的index.d.ts文件了。如果没有，需要安装@type/qs;

const apiUrl = process.env.REACT_APP_API_URL;

export const ProjectList = () => {
  const [param, setParam] = useState({
    name: "",
    personId: "",
  });
  const [users, setUsers] = useState([]);
  const [list, setList] = useState([]);
  const debouncedValue = useDebounce(param, 1000);
  useEffect(() => {
    fetch(
      `${apiUrl}/projects?${qs.stringify(cleanObject(debouncedValue))}`
    ).then(async (response) => {
      if (response.ok) {
        setList(await response.json());
      }
    });
  }, [debouncedValue]);
  // 初始化users
  useMount(() => {
    fetch(`${apiUrl}/users`).then(async (response) => {
      if (response.ok) {
        setUsers(await response.json());
      }
    });
  });
  return (
    <div>
      <SearchPanel
        users={users}
        param={param}
        setParam={setParam}
      ></SearchPanel>
      <List list={list} users={users}></List>
    </div>
  );
};
