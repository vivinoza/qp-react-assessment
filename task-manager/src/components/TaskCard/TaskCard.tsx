import { useEffect, useState } from "react";
import { Task } from "../../types/taskType";
import "./style.scss";
import { useTask } from "../../context/TasksContext";

interface TaskCardProps {
  task: Task;
}

const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  const { updateStatus } = useTask();
  const [completedStatus, setCompletedStatus] = useState<boolean>(false);
  const [clicked, setClicked] = useState<boolean>(false);
  const [cardBackground, setCardBackground] =
    useState<string>("task-card-body");

  const handleClick = (completed: boolean, id: string) => {
    setCompletedStatus(!completedStatus);
    setClicked(!clicked);
    updateStatus(completed, task._id);
  };

  useEffect(() => {
    if (task.completed) {
      setCompletedStatus(!completedStatus);
      setCardBackground("completed task-card-body");
    } else setCardBackground("task-card-body");
  }, [task.completed]);

  return (
    <div
      className={task.completed ? "completed task-card-body" : cardBackground}
      onClick={() => handleClick(!completedStatus, task._id)}
    >
      <div className="task-card-title">{task.title}</div>
      <div className="task-card-description">{task.description}</div>
    </div>
  );
};

export default TaskCard;
