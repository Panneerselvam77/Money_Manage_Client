import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home/Home.jsx";
import Test from "./Pages/Test.jsx";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
// import DefaultLayout from "./Components/DefaultLayout";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route
          exact
          path="/"
          element={
            <ProdectedRoute>
              <Home />
            </ProdectedRoute>
          }
        />
        <Route path="/test" element={<Test />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

function ProdectedRoute(props) {
  if (localStorage.getItem("Money-Manager_user")) {
    return props.children;
  } else {
    return <Navigate to="/login" />;
  }
}

export default App;
