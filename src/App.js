import "./App.css";

import TableUser from "./Components/Page/TableUser";

import { Routes, Route, Link, Navigate } from "react-router-dom";
import Login from "./Components/Login/Login";
import { Toaster } from "react-hot-toast";
import Register from "./Components/Register/Register";

// Component kiểm tra đăng nhập
function ProtectedRoute({ element }) {
  const isLoggedIn = localStorage.getItem("CurrentUser"); // Kiểm tra localStorage
  return isLoggedIn ? element : <Navigate to="/login" replace />;
}

function App() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <div>
              <h1>Hello World</h1>
              <Link to="/userdetail">TableUser</Link>
            </div>
          }
        />
        <Route
          path="/userdetail"
          element={<ProtectedRoute element={<TableUser />} />}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
