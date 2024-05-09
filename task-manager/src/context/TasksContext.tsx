import { createContext, useCallback, useContext, useState } from "react";
import { Task } from "../types/taskType";

const initialValue: {
  getTasks: (page: number, limit: number) => void;
  tasks: Task[];
  isLoading: boolean;
} = {
  getTasks: () => {},
  tasks: [],
  isLoading: false,
};

const TasksPageContext = createContext({ ...initialValue });

export const TasksPageContextProvider = (props: any) => {
  const host = "http://localhost:4000";
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const getTasks = useCallback(
    async (page: number, limit: number): Promise<Task[]> => {
      try {
        const url = `${host}/api/tasks/fetchalltasks?page=${page}&limit=${limit}`;
        setIsLoading(true);
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const json = await response.json();
        setTasks((prevTasks) => [...prevTasks, ...json]); // Append new tasks to existing tasks
        setIsLoading(false);
        return tasks;
      } catch (error) {
        console.error("Error fetching tasks:", error);
        throw error;
      }
    },
    [host]
  );

  return (
    <TasksPageContext.Provider value={{ getTasks, tasks, isLoading }}>
      {props.children}
    </TasksPageContext.Provider>
  );
};

export const useTask = () => useContext(TasksPageContext);
