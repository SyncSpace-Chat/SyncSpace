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
      <div className="chatPageHeader">
        <div id="chatPageHeaderTitle">
          STABI CHAT
        </div>
        <div id="chatPageHeaderButtons">
          <button type="button" onClick={logOut}>Logout</button>
          <button onClick={toggleTheme}>Change Theme</button>
        </div>
      </div>
    </>
  );
}

export default Header;
