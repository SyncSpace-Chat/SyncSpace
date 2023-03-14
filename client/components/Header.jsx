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
      </nav>
    </>
  );
}

export default Header;
