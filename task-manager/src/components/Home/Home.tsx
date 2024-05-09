import { useTask } from "../../context/TasksContext";

import { memo, useCallback, useEffect, useState } from "react";

const Home = () => {
  const { getTasks, tasks, isLoading } = useTask();
  const [page, setPage] = useState(1);
  const limit = 20;

  useEffect(() => {
    getTasks(page, limit);
  }, [getTasks, page]);

  const handleScroll = useCallback(() => {
    // Check if user has scrolled near the bottom of the page
    const scrollPosition = window.innerHeight + window.scrollY;
    const scrollBottom = document.body.offsetHeight;

    if (scrollPosition >= scrollBottom - 100 && !isLoading) {
      setPage((prevPage) => prevPage + 1); // Increment the page to fetch more tasks
    }
  }, [isLoading]);

  // Add scroll event listener
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll); // Cleanup event listener
    };
  }, [handleScroll]);

  return (
    <div>
      <ul>
        {tasks.map((task) => (
          <li key={task._id}>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
          </li>
        ))}
      </ul>
      {isLoading && <p>Loading more tasks...</p>}
    </div>
  );
};

export default memo(Home);
