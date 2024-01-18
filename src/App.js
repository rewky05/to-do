import React, { useState, useEffect } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import Todo from "./components/Todo";
import Header from "./components/Navbar";
import { db } from "./firebase";

import {
  query,
  collection,
  onSnapshot,
  doc,
  updateDoc,
  addDoc,
  deleteDoc,
  getDoc,
} from "firebase/firestore";
import Important from "./components/Important";
import Archive from "./components/Archive";

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

  // Create todo
  const createTodo = async (e) => {
    e.preventDefault();
    if (input === "") {
      alert("Please enter a todo");
      return;
    }
    await addDoc(collection(db, "todos"), {
      text: input,
      completed: false,
    });
    setInput("");
  };

  // Read todo
  useEffect(() => {
    const q = query(collection(db, "todos"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let todosArray = [];
      querySnapshot.forEach((doc) => {
        todosArray.push({ ...doc.data(), id: doc.id });
      });
      setTodos(todosArray);
    });
    return () => unsubscribe();
  }, []);

  // Done todo
  const toggleComplete = async (todo) => {
    await updateDoc(doc(db, "todos", todo.id), {
      completed: !todo.completed,
    });
  };

  // Edit todo
  const editTodo = async (todoId, newValue) => {
    await updateDoc(doc(db, "todos", todoId), {
      text: newValue,
    });
  };

  // Important todo
  const importantTodo = async (id) => {
    const todoDoc = await getDoc(doc(db, "todos", id));
    const todoData = todoDoc.data();
    await addDoc(collection(db, "importantTodos"), {
      text: todoData.text,
      completed: false,
    });
    await deleteDoc(doc(db, "todos", id));
  };

  // Delete todo
  const deleteTodo = async (id) => {
    const archiveTodo = await getDoc(doc(db, "todos", id));
    const todoData = archiveTodo.data();
    await addDoc(collection(db, "archiveTodos"), {
      text: todoData.text,
    });
    await deleteDoc(doc(db, "todos", id));
  };

  return (
    <div>
      <Header />
      <div name="add-tab" className="h-screen bg-gradient-to-r from-[#EEF5DB] to-[#7E9E9F] p-8 md:ml-[300px]">
        <div className="md:max-w-[700px] max-w-[400px] h-full flex flex-col justify-center mx-auto px-6 md:mt-4 mt-8">
          <div className="bg-slate-100 rounded-md p-4 shadow-xl">
            <h3 className="text-3xl font-bold text-center text-[#7A9E9F] p-2 mb-4">
              Tasks
            </h3>
            <form onSubmit={createTodo} className="flex justify-between">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="border p-2 w-full text-xl outline-none"
                type="text"
                placeholder="Add Todo"
              />
              <button className="border p-4 ml-2 bg-[#7E9E9F] text-slate-100">
                <AiOutlinePlus size={30} />
              </button>
            </form>
            <ul className="overflow-y-scroll h-[250px] mt-2 forScroll">
              {todos.map((todo, index) => (
                <Todo
                  key={index}
                  todo={todo}
                  toggleComplete={toggleComplete}
                  deleteTodo={deleteTodo}
                  editTodo={editTodo}
                  importantTodo={importantTodo}
                  showEditIcon={true}
                  showStarIcon={true}
                />
              ))}
            </ul>
            {todos.length < 1 ? <p className="text-center p-2 mt-2">Click the add button to start organizing your todos!</p> : (
              <p className="text-center p-2 mt-2">{`You have a total of ${todos.length} todos!`}</p>
            )}
          </div>
        </div>
      </div>
      <Important />
      <Archive />
    </div>
  );
}

export default App;
