import { useState, useEffect } from "react";

export default function Counter() {
  const [name, setName] = useState("Lance");
  const [age, setAge] = useState(54);

  function ageDown() {
    setAge((currentAge) => {
      return currentAge - 1;
    });
  }

  function ageUp() {
    setAge((currentAge) => {
      return currentAge + 1;
    });
  }

  useEffect(() => console.log("Age has changed: ", age), [age]);

  return (
    <>
      <h2>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        ></input>
      </h2>
      <br></br>
      <button onClick={() => ageDown()}>-</button> {age}{" "}
      <button onClick={() => ageUp()}>+</button>
      <h2>
        My name is {name} and I am {age} years old.
      </h2>
    </>
  );
}
