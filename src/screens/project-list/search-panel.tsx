// /** @jsxRuntime classic */
// /** @jsx jsx */
// 指定本文件的编辑器 这样就可以在style里直接使用 后代选择  伪类等
// import {jsx, css} from '@emotion/react';
import { Input, Select, Form } from "antd";
import { UserSelect } from "components/user-select";
import { Project } from "./list";
export interface User {
  id: number;
  name: string;
  email: string;
  title: string;
  organization: string;
  token: string;
}
interface SearchPanelProps {
  users: User[];
  // param: {
  //   name: string;
  //   personId: string;
  // };
  // 与Project中的一致
  param: Partial<Pick<Project, "name" | "personId">>;
  setParam: (param: SearchPanelProps["param"]) => void;
}
export const SearchPanel = ({ users, param, setParam }: SearchPanelProps) => {
  return (
    // form item 水平
    <Form style={{ marginBottom: "2rem" }} layout={"inline"}>
      <Form.Item>
        <Input
          type="text"
          placeholder={"项目名"}
          value={param.name}
          onChange={(evt) =>
            setParam({
              ...param,
              name: evt.target.value,
            })
          }
        />
      </Form.Item>
      <Form.Item>
        <UserSelect
          defaultOptionName={"负责人"}
          value={param.personId}
          onChange={(value) =>
            setParam({
              ...param,
              personId: value,
            })
          }
        ></UserSelect>
      </Form.Item>
    </Form>
  );
};
