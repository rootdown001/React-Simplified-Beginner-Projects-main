import { useState, useEffect } from "react";
import List from "./List";

function App() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(undefined);
  const [loading, setLoading] = useState(undefined);

  useEffect(() => {
    //Set loading to true each time api called
    setLoading(true);
    // set error to undefined each time api called
    setError(undefined);
    // set data to undefined each time api called
    setData(undefined);

    // create new AbortController object, used to cancel fetch.
    // used for cleanup. it is saying that anytime fetch is called,
    // it cancels previous fetch from before re-mounting and starts new fetch
    const controller = new AbortController();

    // fetch the api url
    // signal links controller to our fetch request
    fetch("https://jsonplaceholder.typicode.com/users", {
      signal: controller.signal,
    })
      .then((res) => {
        // returnparsed json if 200
        // elsereturn promise.reject
        if (res.status === 200) {
          return res.json();
        } else {
          return Promise.reject(res);
        }
      })
      // setData to return
      .then((d) => {
        setData(d);
      })
      .catch((e) => {
        // if name of error is AbortReturn, do nothing bc we already took care of, manually aborted
        if (e?.name === "AbortError") return;
        setError(e);
      })
      // indicated we are done loading (so loading jsx can change)
      .finally(() => {
        setLoading(false);
      });

    // cleanup. Abort previous fetch
    return () => {
      controller.abort();
    };
  }, []);

  // let jsx; // define variable

  // // show “Loading…” on screen
  // if (loading) {
  //   jsx = <h2>Loading…</h2>;
  // }
  // // show error if error
  // else if (error != null) {
  //   jsx = <h2>Error</h2>;
  // }
  // // if done loading, set variable to stringified JSON
  // else {
  //   jsx = <h3>{JSON.stringify(data)}</h3>;
  // }

  return (
    <>
      <h1>User List: </h1>
      {loading ? (
        <h2>Loading...</h2>
      ) : (
        <ul>
          {data.map((d) => {
            return <List key={d.id} name={d.name} />;
          })}
        </ul>
      )}
    </>
  );
}

export default App;
