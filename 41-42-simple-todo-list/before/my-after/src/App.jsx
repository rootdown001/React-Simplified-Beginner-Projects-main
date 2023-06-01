import { useState } from "react";
import Item from "./Item";
import "./styles.css";

function App() {
  const [items, setItems] = useState([
    { id: "1", entry: "Test1", completed: false },
    { id: "2", entry: "Test2", completed: false },
  ]);
  const [name, setName] = useState("");
  // console.log("🚀 ~ file: App.jsx:10 ~ App ~ name:", name);

  function addTodo() {
    if (name === "") return;
    setItems((currentItems) => {
      return [
        ...currentItems,
        { id: crypto.randomUUID(), entry: name, completed: false },
      ];
    });
    setName("");
  }
  // console.log("🚀 ~ file: App.jsx:14 ~ App ~ items:", items);

  function deleteItem(id) {
    console.log("id: ", id);
    return setItems(items.filter((item) => item.id !== id));
  }

  function toggleTodo(id, completed) {
    setItems((currentItems) => {
      return currentItems.map((item) => {
        if (item.id === id) {
          return { ...item, completed };
        } else {
          return item;
        }
      });
    });
  }

  return (
    <>
      <ul id="list">
        {items.map((item) => {
          return (
            <Item
              key={item.id}
              id={item.id}
              entry={item.entry}
              completed={item.completed}
              deleteItem={deleteItem}
              toggleTodo={toggleTodo}
            />
          );
        })}
      </ul>

      <div id="new-todo-form">
        <label htmlFor="todo-input">New Todo</label>
        <input
          type="text"
          id="todo-input"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button onClick={addTodo}>Add Todo</button>
      </div>
    </>
  );
}

export default App;
