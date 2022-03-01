import React, { useState } from "react";
import { useMediaQuery } from "react-responsive";
import { Auth } from "aws-amplify";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";

import "../css/Header.css";

function Header() {
  const user = useSelector((state) => state.user);

  const isTablet = useMediaQuery({
    query: "(max-width: 834px)",
  });

  const [showHeaderMenu, updateShowHeaderMenu] = useState(false);

  // React.useEffect(() => {
  //   console.log(user);
  // }, [user]);

  React.useEffect(() => {
    if (isTablet) {
      updateShowHeaderMenu(false);
    } else {
      updateShowHeaderMenu(true);
    }
  }, [isTablet]);

  const handleHeaderMenuToggle = () => {
    if (isTablet) {
      updateShowHeaderMenu((prev) => !prev);
    }
  };

  return (
    <div className="header">
      <Link to="/">
        <h1 className="header-title">AI Design</h1>
      </Link>
      {showHeaderMenu && (
        <div className="header-section">
          <ul>
            <Link to="/" onClick={handleHeaderMenuToggle}>
              <li className="header-link hover-underline-animation">Ideate</li>
            </Link>
            <Link to="/" onClick={handleHeaderMenuToggle}>
              <li className="header-link hover-underline-animation">Generate</li>
            </Link>
            {/* <li className="header-link hover-underline-animation">About</li> */}
            <Link to="/documentation" onClick={handleHeaderMenuToggle}>
              <li className="header-link hover-underline-animation">
                Documentation
              </li>
            </Link>
            {/* <li className="header-link hover-underline-animation">Contact</li> */}
          </ul>
          {user && (
            <ul>
              <Link to="/directory" onClick={handleHeaderMenuToggle}>
                <li className="header-link hover-underline-animation">
                  Directory
                </li>
              </Link>
              <li
                className="header-link hover-underline-animation last-item"
                onClick={() => {
                  Auth.signOut();
                  handleHeaderMenuToggle();
                }}
              >
                Logout
              </li>
            </ul>
          )}
        </div>
      )}
      <div
        className="header-icon"
        onClick={() => updateShowHeaderMenu((prev) => !prev)}
      >
        <MenuIcon />
      </div>
    </div>
  );
}

export default Header;
