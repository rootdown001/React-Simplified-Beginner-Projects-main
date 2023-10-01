import { useContext, useRef } from "react";
import { TodoContext } from "./App";

export default function NewTodoForm() {
  const nameRef = useRef();
  const { addNewTodo } = useContext(TodoContext);
  console.log(
    "🚀 ~ file: NewTodoForm.jsx:7 ~ NewTodoForm ~ addNewTodo:",
    addNewTodo
  );

  function handleSubmit(e) {
    e.preventDefault();
    if (nameRef.current.value === "") return;

    addNewTodo(nameRef.current.value);

    nameRef.current.value = "";
  }

  return (
    <form id="new-todo-form" onSubmit={handleSubmit}>
      <label htmlFor="todo-input">New Todo</label>
      <input type="text" id="todo-input" ref={nameRef} />
      <button>Add Todo</button>
    </form>
  );
}
