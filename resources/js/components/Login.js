import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from "react-router";
import { Link } from 'react-router-dom'
import AsyncLocalStorage from '@createnextapp/async-local-storage'
const Login = () => {
    let history = useHistory();
    const [details,setDetails] = useState({
        email: "",
        password: "",
    });
    const handleInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        details[name] = value;
        setDetails(details);
    }
    const login  = async (e)=>{
        e.preventDefault();
        const res = await axios.post("/api/auth/login", details, {
            headers: {
                'Content-Type': 'application/json ',
                'Accept': 'application/json',
                'X-Requested-With': 'XMLHTTPRequest'
            }
        }).then(async (res)=>{
            await AsyncLocalStorage.setItem('isLoggedIn', res.data.access_token);
            history.push("/");
        }).catch((err)=>console.log(err));
    }
    return (
        <div className="card">
                <div className="card-body">
                not registered yet<Link to="/register">Register</Link> here.!!
                    <form onSubmit={login}>
                        <div className="form-group">
                            <label className="col-md-4 control-label">E-Mail Address</label>
                            <div className="col-md-6">
                                <input onChange={handleInput} type="email" className="form-control" name="email" required />
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-md-4 control-label">Password</label>
                            <div className="col-md-6">
                                <input onChange={handleInput} type="password" autoComplete="on" className="form-control" name="password" />
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="col-md-6 col-md-offset-4">
                                <button type="submit" className="btn btn-primary">
                                    Login
                                           </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

    )
}

export default Login
