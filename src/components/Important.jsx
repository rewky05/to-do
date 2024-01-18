import React, { useState, useEffect } from "react";
import Todo from "./Todo";
import { db } from "../../src/firebase";
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

const Important = () => {
  const [todos, setTodos] = useState([]);

  // Read todo
  useEffect(() => {
    const q = query(collection(db, "importantTodos"));
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
    await updateDoc(doc(db, "importantTodos", todo.id), {
      completed: !todo.completed,
    });
  };

  // Edit todo
  const editTodo = async (todoId, newValue) => {
    await updateDoc(doc(db, "importantTodos", todoId), {
      text: newValue,
    });
  };

  // Delete todo
  const deleteTodo = async (id) => {
    const archiveTodo = await getDoc(doc(db, "importantTodos", id));
    const todoData = archiveTodo.data();
    await addDoc(collection(db, "archiveTodos"), {
      text: todoData.text,
    });
    await deleteDoc(doc(db, "importantTodos", id));
  };
  return (
    <div name="important-tab">
      <div className="h-screen bg-gradient-to-r from-[#EEF5DB] to-[#7E9E9F] p-8 md:ml-[300px]">
        <div className="md:max-w-[700px] max-w-[400px] h-full flex flex-col justify-center mx-auto px-6 md:mt-4 mt-8">
          <div className="bg-slate-100 rounded-md p-4 shadow-xl">
            <h3 className="text-3xl font-bold text-center text-[#7A9E9F] p-2 mb-4">
              Important Todo
            </h3>
            <ul className="overflow-y-scroll h-[250px] mt-2 forScroll">
              {todos.map((todo, index) => (
                <Todo
                  key={index}
                  todo={todo}
                  toggleComplete={toggleComplete}
                  deleteTodo={deleteTodo}
                  editTodo={editTodo}
                  showStarIcon={false}
                  showEditIcon={true}
                />
              ))}
            </ul>
            {todos.length < 1 ? <p className="text-center p-2 mt-2">Click the star icon in the tasks section to separate an important todo!</p> : (
              <p className="text-center p-2 mt-2">{`You currently have ${todos.length} `}<span className="font-bold">important</span> todos!</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Important;
