import "./App.css";
import Home from "./components/Home/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { TasksPageContextProvider } from "./context/TasksContext";
import Header from "./components/Header/Header";

function App() {
  return (
    <TasksPageContextProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </TasksPageContextProvider>
  );
}

export default App;
