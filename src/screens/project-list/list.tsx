import { User } from "screens/project-list/search-panel";
import { Table } from "antd";
import { render } from "@testing-library/react";
interface Project {
  id: string;
  name: string;
  personId: string;
  organization: string;
  pin: boolean;
}
interface ListProps {
  list: Project[];
  users: User[];
}

export const List = ({ list, users }: ListProps) => {
  return (
    <Table
      pagination={false}
      columns={[
        {
          title: "名称",
          dataIndex: "name",
          sorter: (a, b) => a.name.localeCompare(b.name), // localeCompare可以处理中文字符
        },
        {
          title: "负责人",
          render(value, project) {
            return (
              <span>
                {users.find((user: User) => user.id === project.personId)
                  ?.name || "未知"}
              </span>
            );
          },
        },
      ]}
      dataSource={list}
    ></Table>
  );
};
