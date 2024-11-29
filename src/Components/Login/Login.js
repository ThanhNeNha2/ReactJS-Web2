import React, { useState } from "react";
import "./Login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
const Login = () => {
  const [valueLogin, setValueLogin] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    setValueLogin((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:8080/api/login",
        valueLogin
      );
      console.log(res.data.users[0]);

      if (res && res.data && res.data.users) {
        const value = res.data.users[0];
        localStorage.setItem("CurrentUser", JSON.stringify(value));
      }
      navigate("/");
      toast.success("Đăng nhập thành công!");
    } catch (error) {
      console.log(error);
      toast.error("Đăng nhập thất bại !");
    }
  };

  return (
    <section>
      <div className="form-box">
        <div className="form-value">
          <form action="">
            <h2>Login</h2>
            <div className="inputbox">
              <ion-icon name="mail-outline"></ion-icon>
              <input
                type="text"
                required
                name="username"
                onChange={handleChange}
              />
              <label htmlFor="">Email</label>
            </div>
            <div className="inputbox">
              <ion-icon name="lock-closed-outline"></ion-icon>
              <input
                type="password"
                required
                name="password"
                onChange={handleChange}
              />
              <label htmlFor="">Password</label>
            </div>
            <div className="forget">
              <label htmlFor="">
                <input type="checkbox" />
                Remember Me{" "}
                <a href="https://www.facebook.com/">Forget Password</a>
              </label>
            </div>
            <button onClick={handleLogin}>Log in</button>
            <div className="register">
              <p>
                Don't have a account{" "}
                <a href="https://www.facebook.com/">Register</a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;
