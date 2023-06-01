import { useState, useEffect } from "react";

export function Child() {
  const [age, setAge] = useState(0);
  const [name, setName] = useState("");

  // useEffect(() => console.log("**Render**"));

  // useEffect(() => console.log("**Hi**"), []);

  // useEffect(
  //   () => console.log(`My name is ${name} and I am ${age} years old`),
  //   [name, age]
  //);

  // useEffect(() => {
  //   document.title = name;
  // }, [name]);

  console.log("body");

  useEffect(() => {
    console.log("**Mount**");
    return () => console.log("**Unmount**");
  }, []);

  // useEffect(() => {
  //   console.log("running body");
  //   const timer = setTimeout(() => {
  //     console.log(`My name is ${name}`);
  //   }, 1000);
  //   return () => {
  //     console.log("running return");
  //     clearTimeout(timer);
  //   };
  // }, [name]);

  return (
    <div>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <br />
      <br />
      <button onClick={() => setAge((a) => a - 1)}>-</button>
      {age}
      <button onClick={() => setAge((a) => a + 1)}>+</button>
      <br />
      <br />
      My name is {name} and I am {age} years old.
    </div>
  );
}
