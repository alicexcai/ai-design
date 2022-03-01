import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Directory from "./pages/Directory";
import Header from "./components/Header";
import Documentation from "./pages/Documentation";
import { Auth, Hub } from "aws-amplify";
import { useDispatch } from "react-redux";
import { loggedIn, loggedOut, confirmAdmin, logoutAdmin } from "./actions";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    checkUser();
    setAuthListener();
    //eslint-disable-next-line
  }, []);

  async function setAuthListener() {
    Hub.listen("auth", (data) => {
      switch (data.payload.event) {
        case "signOut":
          localStorage.setItem("responses", JSON.stringify([]));
          dispatch(loggedOut());
          dispatch(logoutAdmin());
          console.log("signOut");
          window.location.href = "/";
          break;
        case "signIn":
          console.log("signIn");
          const usr = data.payload.data;
          const groups =
            usr.signInUserSession.accessToken.payload["cognito:groups"];
          if (groups !== undefined) {
            if (groups.includes("admins")) {
              dispatch(confirmAdmin());
            }
          }
          dispatch(loggedIn(data.payload.data.username));
          break;
        default:
          break;
      }
    });
  }

  async function checkUser() {
    try {
      const usr = await Auth.currentAuthenticatedUser();
      // Auth.currentSession()
      //   .then((data) => console.log(data))
      //   .catch((error) => console.log(error));
      const groups =
        usr.signInUserSession.accessToken.payload["cognito:groups"];
      if (groups !== undefined) {
        if (groups.includes("admins")) {
          dispatch(confirmAdmin());
        }
      }
      dispatch(loggedIn(usr.username));
    } catch (e) {
      dispatch(loggedOut());
      dispatch(logoutAdmin());
    }
  }

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/directory" element={<Directory />} />
        <Route path="/documentation" element={<Documentation />} />
      </Routes>
    </Router>
  );
}

export default App;
