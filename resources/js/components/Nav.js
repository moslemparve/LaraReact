import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import { useHistory } from "react-router";
import AsyncLocalStorage from '@createnextapp/async-local-storage'
const Nav = () => {
    let history = useHistory();
    const [authToken, setauthToken] = useState(null);
    useEffect(() => {
        AsyncLocalStorage.getItem('isLoggedIn').then((data1) => {
            setauthToken(data1);
        });
    }, []);
    const logout =  async (e)=>{
        e.preventDefault();
        await AsyncLocalStorage.removeItem('isLoggedIn');
        history.push("/login");
    }
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                <div className="container">
                    <Link className="navbar-brand" to="/">Navbar</Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarColor01">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item active">
                                <Link className="nav-link" to="/">Home
          <span className="sr-only">(current)</span>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/addContact">Add Contact</Link>
                            </li>
                            {!authToken ? <li className="nav-item">
                                <Link className="nav-link" to="/register">Register</Link>
                            </li> : null}
                            {!authToken ? <li className="nav-item">
                                <Link className="nav-link" to="/login">Login</Link>
                            </li> : null}
                        </ul>
                        {authToken ?
                                <a style={{ color: 'white',cursor:'pointer'  }} onClick={logout}>Logout</a>
                            : null}
                    </div>
                </div>
            </nav>
        </>
    );
}

export default Nav
