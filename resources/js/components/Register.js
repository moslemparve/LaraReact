import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'
const Register = () => {
    const [details, setDetails] = useState({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    })
    const [form_errors, setErrors] = useState({});
    const [email_exist, setEmailExist] = useState();
    const [email_not_exist, setEmailNotExist] = useState();
    const handleInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setEmailNotExist();
        if (name == 'email' && value!='') {
            const checkEmail = async () => {
                const res = await axios.post("/check/email/"+value+"");
                if (res.data.email=='exist') {
                    setEmailNotExist();
                    setEmailExist('Email already taken try another one.!');
                } else {
                    setEmailExist();
                    setErrors({
                        e_email: '',
                    })
                    setEmailNotExist('very nice good to go');
                }
            }
            checkEmail();
        }
        details[name] = value;
        setDetails(details);
    }

    const register = async (e) => {
        e.preventDefault();
        setEmailExist();
        setEmailNotExist
        const res = await axios.post("/api/auth/signup", details, {
            headers: {
                'Content-Type': 'application/json ',
                'Accept': 'application/json',
                'X-Requested-With': 'XMLHTTPRequest'
            }
        });
        console.log(res.data.errors);
        if (res.data.errors) {
            setErrors({
                e_name: res.data.errors.name,
                e_email: res.data.errors.email,
                e_password: res.data.errors.password,
            })
        } else {
            setErrors({});
        }
        console.log(form_errors);

    }
    return (
        <div className="card">
                <div className="card-body">
                Already registered <Link to="/login">Login</Link> here.!!
                    <form onSubmit={register}>
                        <div className="form-group">
                            <label className="col-md-4 control-label">Name</label>
                            <div className="col-md-6">
                                <input id="name" type="text" className={`form-control${ form_errors.e_name ? ' is-invalid' :  '' }`} name="name" onChange={handleInput} />
                                {form_errors.e_name ? <small className="alert text-danger">{form_errors.e_name}</small> : ''}
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="col-md-4 control-label">E-Mail Address</label>
                            <div className="col-md-6">
                                <input onChange={handleInput} type="email" className={`form-control${ form_errors.e_email ? ' is-invalid' :  '' }`} name="email" required />
                            </div>

                            {email_not_exist ? <small className="alert text-success">{email_not_exist}</small> : ''}
                            {email_exist ? <small className="alert text-danger">{email_exist}</small> : ''}
                            {form_errors.e_email ? <small className="alert text-danger">{form_errors.e_email}</small> : ''}
                        </div>

                        <div className="form-group">
                            <label className="col-md-4 control-label">Password</label>

                            <div className="col-md-6">
                                <input onChange={handleInput} type="password"  className={`form-control${ form_errors.e_password ? ' is-invalid' :  '' }`} name="password" />
                            </div>
                            {form_errors.e_password ? <small className="alert text-danger">{form_errors.e_password}</small> : ''}
                        </div>

                        <div className="form-group">
                            <label className="col-md-4 control-label">Confirm Password</label>
                            <div className="col-md-6">
                                <input onChange={handleInput} type="password" className="form-control" name="password_confirmation" />
                            </div>
                        </div>

                        <div className="form-group">
                            <div className="col-md-6 col-md-offset-4">
                                <button type="submit" className="btn btn-primary">
                                    Register
                                           </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

    )
}

export default Register
