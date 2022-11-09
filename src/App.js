import { RouterProvider } from "react-router-dom";
import "./App.css";
import Routes from "./Route/Route";
// import { FaBeer } from 'react-icons/fa'; FaBars CgClose

function App() {
  return (
    <div className="App">
      <RouterProvider router={Routes}></RouterProvider>
    </div>
  );
}

export default App;
