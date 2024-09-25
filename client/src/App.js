import "./App.css";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from "./pages/home";
import CreatePost from "./pages/createPost";
import Post from "./pages/post";
import Login from "./pages/login";
import Registration from "./pages/registration";

import { AuthContext } from "./helpers/authContext";
import { useState, useEffect } from "react";
import axios from "axios";
function App() {
  const [authState, setAuthState] = useState({
    userName: "",
    id: 0,
    status: false,
  });

  useEffect(() => {
    axios
      .get("http://localhost:3001/auth/auth", {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        if (response.data.error) {
          setAuthState({ ...authState, status: false });
        } else {
          setAuthState({
            userName: response.data.userName,
            id: response.data.id,
            status: true,
          });
        }
      });
  }, []);

  const logOut = () => {
    localStorage.removeItem("accessToken");
    setAuthState({ userName: "", id: 0, status: false });
  };

  return (
    <div className="App">
      <AuthContext.Provider value={{ authState, setAuthState }}>
        <Router>
          <div className="navbar">
            <div className="links">
              {!authState.status ? (
                <>
                  <Link to="/login"> Login</Link>
                  <Link to="/registration"> Registration</Link>
                </>
              ) : (
                <>
                  <Link to="/"> Home Page</Link>
                  <Link to="/createpost"> Create A Post</Link>
                </>
              )}
            </div>
            <div className="loggedInContainer">
              <h1>{authState.userName} </h1>
              {authState.status && <button onClick={logOut}> Logout</button>}
            </div>
          </div>

          <Routes>
            <Route path="/" exact Component={Home} />
            <Route path="/CreatePost" exact Component={CreatePost} />
            <Route path="/post/:id" exact Component={Post} />
            <Route path="/login" exact Component={Login} />
            <Route path="/registration" exact Component={Registration} />
          </Routes>
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
