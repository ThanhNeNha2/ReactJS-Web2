import React, { useState } from "react";
import "./Register.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Register = () => {
  const [valueLogin, setValueLogin] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    setValueLogin((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      if (valueLogin.password === valueLogin.confirmPassword) {
        const res = await axios.post("http://localhost:8080/api/register", {
          username: valueLogin.username,
          password: valueLogin.password,
          role: "USER",
        });
        console.log(res);
        toast.success("Đăng ký thành công!");
        navigate("/login");
      } else {
        toast.error("Mật khẩu xác nhận không chính xác!");
      }

      console.log(valueLogin);
    } catch (error) {
      console.log(error);
      toast.error("Đăng ký thất bại !");
    }
  };

  return (
    <div>
      <section>
        <div className="form-box">
          <div className="form-value">
            <form action="">
              <h2 className="the">Register</h2>
              <div className="inputbox">
                <ion-icon name="mail-outline"></ion-icon>
                <input
                  type="text"
                  required
                  name="username"
                  onChange={handleChange}
                />
                <label htmlFor="">UserName</label>
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
              <div className="inputbox">
                <ion-icon name="lock-closed-outline"></ion-icon>
                <input
                  type="password"
                  required
                  name="confirmPassword"
                  onChange={handleChange}
                />
                <label htmlFor="">Password Confirm</label>
              </div>

              <div className="forget">
                <label htmlFor="">
                  <input type="checkbox" />
                  Remember Me{" "}
                  <a href="https://www.facebook.com/">Forget Password</a>
                </label>
              </div>
              <button onClick={handleRegister}>Sign in </button>
              <div className="register">
                <p>
                  Don't have a account{" "}
                  <a href="https://www.facebook.com/">Login</a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Register;
