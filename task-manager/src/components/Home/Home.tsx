import { useTask } from "../../context/TasksContext";
import { memo, useCallback, useEffect, useState } from "react";
import TaskCard from "../TaskCard/TaskCard";
import "./style.scss";
import AddTask from "../AddTask/AddTask";
import Header from "../Header/Header";

const Home = () => {
  const { getTasks, tasks, isLoading } = useTask();
  const [page, setPage] = useState(1);
  const limit = 20;

  useEffect(() => {
    getTasks(page, limit);
  }, [getTasks, page]);

  const handleScroll = useCallback(() => {
    const scrollPosition = window.innerHeight + window.scrollY;
    const scrollBottom = document.body.offsetHeight;

    if (scrollPosition >= scrollBottom - 100 && !isLoading) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [isLoading]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  return (
    <>
      <Header />
      <AddTask />
      <div className="all-tasks-page">
        {tasks.map((task) => (
          <TaskCard key={task._id} task={task} />
        ))}
        {isLoading && <p>Loading more tasks...</p>}
      </div>
    </>
  );
};

export default memo(Home);
