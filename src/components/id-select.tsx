import { Select } from "antd";
import { Raw } from "types";
// react自带的从组件身上获取到参数类型
type SelectProps = React.ComponentProps<typeof Select>;

interface IdSelectProps
  extends Omit<SelectProps, "value" | "onchange" | "options"> {
  value: Raw | null | undefined;
  onchange: (value?: number) => void;
  defaultOptionName?: string;
  options?: { name: string; id: number }[];
}
/**
 * value 可以传入多种类型的值
 * onchange只会回调number| undefined类型
 * 当 isNaN(Number(value))为true的时候，代表选择默认类型
 * 当选择默认类型的时候，onchange会回调undefined
 * @param props
 */
export const IdSelect = (props: IdSelectProps) => {
  const { value, onchange, defaultOptionName, options, ...restProps } = props;
  return (
    <Select
      value={toNumber(value)}
      onChange={(value) => onchange(toNumber(value) || undefined)}
      {...restProps}
    >
      {defaultOptionName ? (
        <Select.Option value={0}>{defaultOptionName}</Select.Option>
      ) : null}
      {options?.map((option) => (
        <Select.Option value={option.id} key={option.id}>
          {option.name}
        </Select.Option>
      ))}
    </Select>
  );
};

const toNumber = (value: unknown) => (isNaN(Number(value)) ? 0 : Number(value));
