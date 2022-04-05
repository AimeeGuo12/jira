import { User } from "screens/project-list/search-panel";
import { Table, TableProps } from "antd";
import dayjs from "dayjs";
// react-router 和 react-router-dom类似于react 和 react-dom/react-native/react-vr  react是核心库，主要是计算 diff等 将结果给react-dom
import { Link } from "react-router-dom";
import { Pin } from "components/pin";
import { useEditProject } from "utils/project";
export interface Project {
  id: number;
  name: string;
  personId: number;
  organization: string;
  pin: boolean;
  created: number;
}
interface ListProps extends TableProps<Project> {
  // list: Project[];
  users: User[];
  refresh?: () => void;
}

export const List = ({ users, ...props }: ListProps) => {
  const { mutate } = useEditProject();
  // 柯里化  因为id是先知道的，可以先处理id， pin是点击以后再得到的，后处理
  const PinProject = (id: number) => (pin: boolean) =>
    mutate({ id, pin }).then(props.refresh);
  return (
    <Table
      rowKey={"id"}
      pagination={false}
      columns={[
        {
          title: <Pin checked={true} disabled={true} />,
          render(value, project) {
            return (
              <Pin
                checked={project.pin}
                onCheckedChange={PinProject(project.id)}
              />
            );
          },
        },
        {
          title: "名称",
          // dataIndex: "name",
          sorter: (a, b) => a.name.localeCompare(b.name), // localeCompare可以处理中文字符
          render(value, project) {
            return <Link to={String(project.id)}>{project.name}</Link>;
          },
        },
        {
          title: "部门",
          dataIndex: "organization",
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
        {
          title: "创建时间",
          render(value, project) {
            return (
              <span>
                {project.created
                  ? dayjs(project.created).format("YYYY-MM-DD")
                  : "无"}
              </span>
            );
          },
        },
      ]}
      {...props}
    ></Table>
  );
};
