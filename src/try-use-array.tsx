import { useArray, useMount } from "utils";
export const TsReactTest = () => {
  const persons: { name: string; age: number }[] = [
    { name: "jack", age: 25 },
    { name: "ma", age: 22 },
  ];
  const { value, clear, removeIndex, add } = useArray(persons);

  useMount(() => {});
  return (
    <div>
      <button onClick={() => add({ name: "john", age: 22 })}>add john</button>
      <button onClick={() => removeIndex(0)}>remove 0</button>
      <button onClick={() => clear()}>clear</button>
      {value.map((person, index) => {
        return (
          <div key={`${person.name}_${Math.random()}`}>
            <span style={{ color: "red" }}>{index}</span>
            <span>{person.name}</span>
            <span>{person.age}</span>
          </div>
        );
      })}
    </div>
  );
};
