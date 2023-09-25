import { useEffect, useReducer, useState } from "react";

const ACTIONS = {
  FETCH_START: "FETCH_START",
  FETCH_SUCCESS: "FETCH_SUCCESS",
  FETCH_ERROR: "FETCH_ERROR",
};

function reducer(state, { type, payload }) {
  switch (type) {
    case ACTIONS.FETCH_START:
      return {
        isError: false,
        isLoading: true,
      };
    case ACTIONS.FETCH_SUCCESS:
      return {
        data: payload.data,
        isLoading: false,
        isError: false,
      };
    case ACTIONS.FETCH_ERROR:
      return {
        isError: true,
        isLoading: false,
      };
    default:
      return state;
  }
}

export function useFetch(myUrl, options = {}) {
  const [state, dispatch] = useReducer(reducer, {
    isError: false,
    isLoading: true,
  });
  //  const [data, setData] = useState();
  //  const [isError, setIsError] = useState(undefined);
  //  const [isLoading, setIsLoading] = useState(undefined);

  useEffect(() => {
    dispatch({ type: ACTIONS.FETCH_START });
    //    setData(undefined);
    //    setIsError(undefined);
    //    setIsLoading(true);

    const controller = new AbortController();

    fetch(myUrl, options, { signal: controller.signal })
      .then((res) => {
        if (res.status === 200 || res.status === 201) {
          return res.json();
        } else {
          console.log("res: ", res);
          return Promise.reject(res);
        }
      })
      .then((data) => {
        dispatch({ type: ACTIONS.FETCH_SUCCESS, payload: { data } });
        // setData(data);
      })
      .catch((e) => {
        if (e?.name === "AbortError") return;
        dispatch({ type: ACTIONS.FETCH_ERROR });
        // setIsError(e);
      });
    //  .finally(() => {
    //  if (controller.signal.aborted) return;
    //  setIsLoading(false);
    //  });

    return () => {
      controller.abort();
    };
  }, [myUrl]);

  return state;
}
