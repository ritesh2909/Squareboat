import "./login.css";
import { Link } from "react-router-dom";
import { useRef, useContext } from "react";
import { loginCall } from "../../apiCalls";
import { AuthContext } from "../../context/AuthContext";
import { CircularProgress } from "@material-ui/core";

export default function Login() {

  const email = useRef();
  const password = useRef();
  const { user, isFetching, error, dispatch } = useContext(AuthContext);


  const handleClick = (e) => {

    e.preventDefault();
    loginCall({ email: email.current.value, password: password.current.value }, dispatch);

  }
  console.log(user);
  // console.log(user);

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

            <input
              placeholder="Email"
              // type="email"
              className="loginInput"
              required
              ref={email}
            />


            <input
              placeholder="Password"
              type="password"
              className="loginInput"
              required
              // minLength={6}
              ref={password}
            />


            <button className="loginButton" disabled={isFetching}>
                {isFetching ? <CircularProgress style={{ "color": "white" }} size="24px" /> : "Log In"}
            </button>
            <span className="loginForgot">Forgot Password?</span>
            <Link to="/register" style={{ "textAlign": "center" }}>
              <button className="loginRegisterButton" disabled={isFetching}>
                  {isFetching ? <CircularProgress style={{ "color": "white" }} size="24px" /> : "Create an Account"}
              </button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
