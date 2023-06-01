import { useState, useEffect } from "react";

export function useArray(arr) {
  const [array, setArray] = useState(arr);

  function push(num) {
    setArray((currentArray) => {
      return [num, ...currentArray];
    });
  }

  function replace(index, num) {
    setArray((currentArray) => {
      return [currentArray.slice(0, index), num, currentArray.slice(index + 1)];
    });
  }

  function filter()

  return { array, set: setArray, push, replace, filter };
  //   remove, clear, reset };
}
