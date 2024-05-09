import "./App.css";
import Home from "./components/Home/Home";
import { TasksPageContextProvider } from "./context/TasksContext";

function App() {
  return (
    <TasksPageContextProvider>
      <Home />
    </TasksPageContextProvider>
  );
}

export default App;
