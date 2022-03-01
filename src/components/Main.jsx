import React, { useEffect } from "react";
import GenerationTool from "./GenerationTool.jsx";
import Authentication from "./Authentication.jsx";
import ResponsesDisplay from "./ResponsesDisplay.jsx";
import { useSelector } from "react-redux";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import useLocalStorage from "../hooks/useLocalStorage.js";

import "../css/Main.css";

function Main() {
  const user = useSelector((state) => state.user);

  const [showTool, updateShowTool] = useLocalStorage("panel-display", false);

  useEffect(() => {
    if (user) {
      updateShowTool(false);
    }
    //eslint-disable-next-line
  }, [user]);

  return (
    <div className="main">
      {user && (
        <div className="sidebar" style={{ display: showTool ? "none" : null }}>
          <GenerationTool updateShowTool={updateShowTool} />
        </div>
      )}
      <div className="main-display">
        {user ? <ResponsesDisplay /> : <Authentication />}
      </div>
      {showTool && (
        <div
          className="gentool-panel-icon open"
          onClick={() => updateShowTool((prev) => !prev)}
          style={!user ? { display: "none" } : null}
        >
          <ChevronRightIcon />
        </div>
      )}
    </div>
  );
}

export default Main;
