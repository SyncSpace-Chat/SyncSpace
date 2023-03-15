import React, { useState, useEffect } from "react";
import { darkModeStore } from "../store";

function Header() {
  //when users pressed log out button the cookie is cleared and window redirected to login
  function logOut() {
    Cookies.remove("user");
    Cookies.remove("ownedChannels");
    Cookies.remove("subscribedChannels");
    window.location.href = "/login";
  }

  //==========dark mode===========
  const { toggleHuH, HuH } = darkModeStore();
  useEffect(() => {
    if (HuH) {
      document.body.classList.add("HuH");
    } else {
      document.body.classList.remove("HuH");
    }
  }, [HuH]);

  // useEffect(() => {
  //   document.body.className = theme;
  // }, [theme]);
  //==========dark mode===========

  return (
    <>
      {/* <nav className="navbar navbar-expand-lg navbar-light navbarClass">
        <p id="siteHandle"> SHARK CHAT </p>
        <div>
          <ul className="navbar-nav">
            <li className="nav-item active">
              <a className="nav-link" href="/login">
                Login<span className="sr-only">(current)</span>
              </a>
            </li>
            <li className="nav-item active">
              <a className="nav-link" href="/signup">
                Signup<span className="sr-only">(current)</span>
              </a>
            </li>
          </ul>
        </div> */}
      {/* logout and huh/darkmode button moved from Lbar to here */}
      <button className="btn btn-secondary logoutButton" type="button" onClick={logOut}>{" "}Logout{" "}</button>
      <button onClick={toggleHuH} className="darkmodeButton">Huh?</button>
      {/* </nav> */}
    </>
  );
}

export default Header;
