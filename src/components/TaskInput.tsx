import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../features/todoSlice";
import { AppDispatch } from "../store";

const TaskInput: React.FC = () => {
  const [task, setTask] = useState("");
  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Only add the task if it's not empty
    if (task.trim()) {
      dispatch(addTodo(task));
      setTask(""); // Clear the input after adding
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="input-group">
        <input
          type="text"
          className="form-control todo-input"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="What needs to be done?"
        />
        <div className="addTask_btn_class">
          <button type="submit" className="addTask_btn">
            Add Task
          </button>
        </div>
      </div>
    </form>
  );
};

export default TaskInput;
