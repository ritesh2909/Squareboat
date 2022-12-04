import "./register.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { useRef } from 'react'


export default function Register() {

  const username = useRef();
  const email = useRef();
  const password = useRef();
  const confirmPassword = useRef();
  

  const handleClick = async (e) => {
    e.preventDefault();
    if (confirmPassword.current.value !== password.current.value) {
      confirmPassword.current.setCustomValidity("Passwords don't match");
    }
    else {
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value
      }

      try {
        await axios.post("http://localhost:8000/api/auth/register", user);
        window.location.replace("/login");
      } catch (error) {
        console.log(error);
      }


    }
  }



  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Go Social</h3>
          <span className="loginDesc">
            Connect with friends and the world around you on Go Social.
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleClick}>
            <input placeholder="Username" className="loginInput" ref={username} required />
            <input placeholder="Email" className="loginInput" ref={email} required />
            <input placeholder="Password" type="password" className="loginInput" ref={password} required />
            <input placeholder="Confirm Password" type="password" className="loginInput" ref={confirmPassword} required />
            <button className="loginButton">Sign Up</button>
            <Link to="/login" style={{ "textAlign": "center" }}>
              <button className="loginRegisterButton">
                Log into Account
              </button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
