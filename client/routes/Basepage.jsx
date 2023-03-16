import React from "react";
import Cookies from "js-cookie";

//JUNAID
//this component is kind of useless right now since we arent using cookies, will have to refactor is we use express sessions
function Basepage() {
  // Giles Steiner
  //
  //if the user is already logged in redirect them to window else take them to login
  if (Cookies.get("user")) window.location.href = "/window";
  else window.location.href = "/login";

  return <></>;
}

export default Basepage;
