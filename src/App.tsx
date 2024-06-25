import React from "react";
import TaskInput from "./components/TaskInput";
import TaskList from "./components/TaskList";
import "./App.css";

const App: React.FC = () => {
  return (
    <div className="container">
      <div className="todo-container fade-in">
        <h1 className="todo-header">Todo List</h1>
        {/* Component for adding new tasks */}
        <TaskInput />
        {/* Component for displaying and managing tasks */}
        <TaskList />
      </div>
    </div>
  );
};

export default App;
