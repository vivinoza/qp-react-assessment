import { useEffect, useState } from "react";
import { Task } from "../../types/taskType";
import "./style.scss";
import { useTask } from "../../context/TasksContext";

interface TaskCardProps {
  task: Task;
}

const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  const { updateStatus, deleteTask } = useTask();
  const [isCompleted, setIsCompleted] = useState(task.completed || false);

  const handleCheckboxChange = () => {
    setIsCompleted(!isCompleted);
    updateStatus(!isCompleted, task._id);
  };

  const handleDelete = () => {
    const confirm = window.confirm(
      "Are you sure you want to delete this task?"
    );
    if (confirm) {
      deleteTask(task._id);
    }
  };

  return (
    <div
      className={isCompleted ? "completed task-card-body" : "task-card-body"}
    >
      <div className="task-card-header">
        <input
          type="checkbox"
          checked={isCompleted}
          onChange={handleCheckboxChange}
        />
        <div className="task-card-title">{task.title}</div>
      </div>
      <div className="task-card-description">{task.description}</div>
      <i className="fa-solid fa-trash" onClick={handleDelete}></i>
    </div>
  );
};

export default TaskCard;
