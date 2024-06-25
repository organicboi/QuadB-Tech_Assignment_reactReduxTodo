import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteTodo, editTodo, toggleTodo } from "../features/todoSlice";
import { RootState, AppDispatch } from "../store";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

const TaskList: React.FC = () => {
  const todos = useSelector((state: RootState) => state.todos);
  const dispatch = useDispatch<AppDispatch>();
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editText, setEditText] = useState("");

  const handleDelete = (id: number) => {
    dispatch(deleteTodo(id));
  };

  const handleEdit = (id: number, text: string) => {
    setEditingId(id);
    setEditText(text);
  };

  const handleSaveEdit = (id: number) => {
    // Only save if the edited text is not empty
    if (editText.trim()) {
      dispatch(editTodo({ id, newText: editText }));
    }
    setEditingId(null);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditText("");
  };

  const handleToggle = (id: number) => {
    dispatch(toggleTodo(id));
  };

  return (
    <ul className="list-group">
      {todos.map((todo: Todo) => (
        <li
          key={todo.id}
          className="list-group-item todo-item d-flex justify-content-between align-items-center fade-in"
        >
          <div className="d-flex align-items-center flex-grow-1">
            {/* Checkbox for toggling todo completion status */}
            <input
              type="checkbox"
              className="form-check-input me-2"
              checked={todo.completed}
              onChange={() => handleToggle(todo.id)}
            />
            {editingId === todo.id ? (
              // Input field for editing todo text
              <input
                type="text"
                className="form-control edit-input"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                autoFocus
              />
            ) : (
              // Display todo text with strikethrough if completed
              <span
                className={`todo-text ${todo.completed ? "completed" : ""}`}
              >
                {todo.text}
              </span>
            )}
          </div>
          <div className="todo-actions">
            {editingId === todo.id ? (
              // Show Save and Cancel buttons when editing
              <>
                <button
                  className="btn btn-success btn-todo"
                  onClick={() => handleSaveEdit(todo.id)}
                >
                  Save
                </button>
                <button
                  className="btn btn-secondary btn-todo"
                  onClick={handleCancelEdit}
                >
                  Cancel
                </button>
              </>
            ) : (
              // Show Edit and Delete buttons when not editing
              <>
                <button
                  className="btn btn-outline-secondary btn-todo"
                  onClick={() => handleEdit(todo.id, todo.text)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-outline-danger btn-todo"
                  onClick={() => handleDelete(todo.id)}
                >
                  Delete
                </button>
              </>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
