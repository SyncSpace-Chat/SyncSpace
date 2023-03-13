import React from 'react'
import Cookies from 'js-cookie';

function Basepage() {

    // Giles Steiner
    //
    //if the user is already logged in redirect them to window else take them to login
    if (Cookies.get('user')) window.location.href = '/window';
    else window.location.href = '/login';

    return (
        <></>
    )
}

export default Basepage;