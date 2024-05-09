import { createContext, useCallback, useContext, useState } from "react";
import { Task } from "../types/taskType";

const initialValue: {
  getTasks: (page: number, limit: number) => void;
  tasks: Task[];
  isLoading: boolean;
  updateStatus: (completed: boolean, id: string) => void;
  addTask: (title: string, description: string) => void;
  deleteTask: (id: string) => void;
} = {
  getTasks: () => {},
  tasks: [],
  isLoading: false,
  updateStatus: () => {},
  addTask: () => {},
  deleteTask: () => {},
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

  const addTask = async (title: string, description: string) => {
    const response = await fetch(`${host}/api/tasks/addtask`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, description }),
    });
    const task = await response.json();
    setTasks(tasks.concat(task));
  };

  const deleteTask = async (id: string) => {
    const response = await fetch(`${host}/api/tasks/deletetask/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjEzMWRjNWUzZTQwMzdjZDQ3MzRhMDY2In0sImlhdCI6MTYzMDY2OTU5Nn0.hJS0hx6I7ROugkqjL2CjrJuefA3pJi-IU5yGUbRHI4Q",
      },
    });
    const json = response.json();
    const newTasks = tasks.filter((task) => {
      return task._id !== id;
    });
    setTasks(newTasks);
  };

  return (
    <TasksPageContext.Provider
      value={{ getTasks, tasks, isLoading, updateStatus, addTask, deleteTask }}
    >
      {props.children}
    </TasksPageContext.Provider>
  );
};

export const useTask = () => useContext(TasksPageContext);
