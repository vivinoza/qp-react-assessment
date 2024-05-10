import React, { useState } from "react";
import { useTask } from "../../context/TasksContext";
import "./style.scss";

interface AddTaskProps {
  openForm: () => void;
}

const AddTask: React.FC<AddTaskProps> = ({ openForm }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { addTask } = useTask();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    addTask(title, description);
    openForm();
    setTitle("");
    setDescription("");
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <div>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="description">Description:</label>
        <input
          type="text"
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <button type="submit">Add Task</button>
    </form>
  );
};

export default AddTask;
