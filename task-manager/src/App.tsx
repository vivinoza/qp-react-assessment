import "./App.css";
import Home from "./components/Home/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { TasksPageContextProvider } from "./context/TasksContext";

function App() {
  return (
    <TasksPageContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </TasksPageContextProvider>
  );
}

export default App;
