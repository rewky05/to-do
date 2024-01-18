import React, { useState, useEffect } from "react";
import Todo from "./Todo";
import { db } from "../../src/firebase";
import {
  query,
  collection,
  onSnapshot,
  doc,
  deleteDoc,
} from "firebase/firestore";

const Archive = () => {
  const [todos, setTodos] = useState([]);

  // Read todo
  useEffect(() => {
    const q = query(collection(db, "archiveTodos"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let todosArray = [];
      querySnapshot.forEach((doc) => {
        todosArray.push({ ...doc.data(), id: doc.id });
      });
      setTodos(todosArray);
    });
    return () => unsubscribe();
  }, []);

  // Delete todo
  const deleteTodo = async (id) => {
    await deleteDoc(doc(db, "archiveTodos", id));
  };

  return (
    <div name="archive-tab">
      <div className="h-screen bg-gradient-to-r from-[#EEF5DB] to-[#7E9E9F] p-8 md:ml-[300px]">
        <div className="md:max-w-[700px] max-w-[400px] h-full flex flex-col justify-center mx-auto px-6 md:mt-4 mt-8">
          <div className="bg-slate-100 rounded-md p-4 shadow-xl">
            <h3 className="text-3xl font-bold text-center text-[#7A9E9F] p-2 mb-4">
              Archives
            </h3>
            <ul className="overflow-y-scroll h-[250px] mt-2 forScroll">
              {todos.map((todo, index) => (
                <Todo
                  key={index}
                  todo={todo}
                  deleteTodo={deleteTodo}
                  showStarIcon={false}
                  showEditIcon={false}
                />
              ))}
            </ul>
            {todos.length > 1 ? <p className="text-center p-2 mt-2">Your deleted todos are stored here.</p> : (
              <p className="text-center p-2">Your deleted todos are stored here.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Archive;
