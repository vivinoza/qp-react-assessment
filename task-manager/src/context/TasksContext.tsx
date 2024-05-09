import { createContext, useCallback, useContext, useState } from "react";
import { Task } from "../types/taskType";

const initialValue: {
  getTasks: (page: number, limit: number) => void;
  tasks: Task[];
  isLoading: boolean;
  updateStatus: (completed: boolean, id: string) => void;
} = {
  getTasks: () => {},
  tasks: [],
  isLoading: false,
  updateStatus: () => {},
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

  const updateStatus = async (completed: boolean, id: string) => {
    const response = await fetch(`${host}/api/tasks/updatestatus/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ completed }),
    });

    return response.json();
  };

  return (
    <TasksPageContext.Provider
      value={{ getTasks, tasks, isLoading, updateStatus }}
    >
      {props.children}
    </TasksPageContext.Provider>
  );
};

export const useTask = () => useContext(TasksPageContext);
