import React from "react";

function Header() {
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
