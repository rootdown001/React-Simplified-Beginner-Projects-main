import { useState, useEffect, useCallback } from "react";

export function useArray(arr) {
  const [array, setArray] = useState(arr);

  // wrapped in useCallback so can pass functions without them being recreated each time
  const push = useCallback((num) => {
    setArray((currentArray) => {
      return [...currentArray, num];
    });
  }, []); // no dependencies in array b/c we never want function to be recreated

  const replace = useCallback((index, num) => {
    setArray((currentArray) => {
      return [
        ...currentArray.slice(0, index),
        num,
        ...currentArray.slice(index + 1),
      ];
    });
  }, []);

  const filter = useCallback((func) => {
    setArray((currentArray) => {
      return currentArray.filter(func);
    });
  }, []);

  const remove = useCallback((index) => {
    setArray((currentArray) => {
      return [
        ...currentArray.slice(0, index),
        ...currentArray.slice(index + 1),
      ];
    });
  }, []);

  const clear = useCallback(() => {
    return setArray([]);
  }, []);

  const reset = useCallback(() => {
    return setArray(arr);
  }, [arr]); // here we put a dependency of arr bc we are passing it and need to rerun if new value

  const addNumAtIndex = useCallback((num, index) => {
    setArray((currentArray) => {
      return [
        ...currentArray.slice(0, index),
        num,
        ...currentArray.slice(index),
      ];
    });
  }, []);

  return {
    array,
    set: setArray,
    push,
    replace,
    filter,
    remove,
    clear,
    reset,
    addNumAtIndex,
  };
}
