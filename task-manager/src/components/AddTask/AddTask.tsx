import { useTask } from "../../context/TasksContext";

const AddTask = () => {
  const { addTask } = useTask();

  const handleClick = () => {
    addTask("test5", "test5");
  };
  return <div onClick={handleClick}>click here to add</div>;
};

export default AddTask;
