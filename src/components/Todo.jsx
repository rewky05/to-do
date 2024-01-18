import React, { useState } from "react";
import { FaRegTrashAlt, FaRegStar } from "react-icons/fa";
import { MdOutlineEdit } from "react-icons/md";

const Todo = ({ todo, toggleComplete, deleteTodo, editTodo, importantTodo, showStarIcon, showEditIcon }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState("");

  const handleEditChange = (e) => {
    setEditValue(e.target.value);
  };

  const handleEditKeyDown = (e) => {
    if (e.key === "Enter") {
      editTodo(todo.id, editValue);
      setIsEditing(false);
    }
  };

  return (
    <div
      className={
        todo.completed
          ? `flex justify-between bg-slate-400 p-4 my-2`
          : `flex justify-between bg-slate-200 p-4 my-2`
      }
    >
      <li>
        <div className="flex">
          {showEditIcon && (
          <input
            onChange={() => toggleComplete(todo)}
            type="checkbox"
            checked={todo.completed ? "checked" : ""}
          />
          )}
          {isEditing ? (
            <input
              className="ml-2 w-full outline-none"
              id="edit"
              type="text"
              value={editValue}
              onChange={handleEditChange}
              onKeyDown={handleEditKeyDown}
              autoFocus
            />
          ) : (
            <p
              onClick={() => toggleComplete(todo)}
              className={
                todo.completed
                  ? `ml-2 cursor-pointer line-through`
                  : `ml-2 cursor-pointer`
              }
            >
              {todo.text}
            </p>
          )}
        </div>
      </li>
      <div className="flex items-center">
        {isEditing ? null : (
          showEditIcon && (
          <button
            onClick={() => setIsEditing(true)}
            className="cursor-pointer ml-2"
          >
            <MdOutlineEdit size={18}/>
          </button>
          )
        )}
        {showStarIcon && (
        <button
          onClick={() => importantTodo(todo.id)}
          className="cursor-pointer ml-2"
        >
          {<FaRegStar size={18} />}
        </button>
        )}
        <button
          onClick={() => deleteTodo(todo.id)}
          className="cursor-pointer ml-2"
        >
          {<FaRegTrashAlt />}
        </button>
      </div>
    </div>
  );
};

export default Todo;
