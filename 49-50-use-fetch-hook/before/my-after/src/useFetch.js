import { useEffect, useState } from "react";

export function useFetch(myUrl, options = {}) {
  const [data, setData] = useState();
  const [isError, setIsError] = useState(undefined);
  const [isLoading, setIsLoading] = useState(undefined);

  useEffect(() => {
    setData(undefined);
    setIsError(undefined);
    setIsLoading(true);

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
      .then((d) => {
        console.log("d: ", d);
        setData(d);
      })
      .catch((e) => {
        if (e?.name === "AbortError") return;
        setIsError(e);
      })
      .finally(() => {
        if (controller.signal.aborted) return;
        setIsLoading(false);
      });

    return () => {
      controller.abort();
    };
  }, [myUrl]);

  return { data, isError, isLoading };
}
