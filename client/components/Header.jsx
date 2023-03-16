import React, { useEffect } from "react";
import { darkModeStore, userCredentialsStore, isLoggedInStore } from "../store";
import { useNavigate } from "react-router-dom";

function Header() {
  //JUNAID
  //when logout is pressed, we will set password and username in state back to empty, we will also set isloggedin back to false, and then redirect the user back to the login screen
  const { setUsername, setPassword } = userCredentialsStore();
  const { setIsLoggedIn } = isLoggedInStore();

  const navigate = useNavigate();

  const logoutUser = () => {
    setUsername("");
    setPassword("");
    setIsLoggedIn();
    return navigate('/login');
  }

  //dark mode functionality is made, but styling isnt done so it doesnt work rn. 
  const { toggleHuH, HuH } = darkModeStore();
  useEffect(() => {
    if (HuH) {
      document.body.classList.add("HuH");
    } else {
      document.body.classList.remove("HuH");
    }
  }, [HuH]);

  return (
      <div className="chatPageHeader">
        <div id="chatPageHeaderTitle">
          STAB CHAT
        </div>
        <div id="chatPageHeaderButtons">
          <button type="button" onClick={logoutUser}>
            Logout
          </button>
          <button onClick={toggleHuH}>Change Theme</button>
        </div>
      </div>
  );
}

export default Header;
