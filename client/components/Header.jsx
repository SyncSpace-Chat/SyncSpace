import React, { useState, useEffect } from "react";

function Header() {
  //when users pressed log out button the cookie is cleared and window redirected to login
  function logOut() {
    Cookies.remove("user");
    Cookies.remove("ownedChannels");
    Cookies.remove("subscribedChannels");
    window.location.href = "/login";
  }

  //==========dark mode===========
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    if (theme === "light") {
      document.body.style.background = "#222222";
      setTheme("dark");
    } else {
      document.body.style.background = "#0093e9";
      setTheme("light");
    }
  };

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);
  //==========dark mode===========

  return (
    <>
      <nav class="navbar navbar-expand-lg navbar-light navbarClass">
        <p id="siteHandle"> SHARK CHAT </p>
        <div>
          <ul class="navbar-nav">
            <li class="nav-item active">
              <a class="nav-link" href="/login">
                Login<span class="sr-only">(current)</span>
              </a>
            </li>
            <li class="nav-item active">
              <a class="nav-link" href="/signup">
                Signup<span class="sr-only">(current)</span>
              </a>
            </li>
          </ul>
        </div>
        {/* logout and huh/darkmode button moved from Lbar to here */}
        <button className="btn btn-secondary logoutButton" type="button" onClick={logOut}>{" "}Logout{" "}</button>
        <button onClick={toggleTheme} className="darkmodeButton">Huh?</button>
      </nav>
    </>
  );
}

export default Header;
