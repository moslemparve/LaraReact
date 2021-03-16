import React, { useState ,useEffect} from 'react';
import axios from 'axios';
import Nav from './Nav'
import { useHistory } from "react-router";
import AsyncLocalStorage from '@createnextapp/async-local-storage'
const AddContact =  () => {
    let history = useHistory()
    const [authToken,setauthToken] = useState(null);
    useEffect(() => {
        AsyncLocalStorage.getItem('isLoggedIn').then((data1)=>{
            setauthToken(data1);
            
        });
    }, []);
    //    console.log('Auth '+authToken)
    const [error_fullaname, seterror_fullname] = useState();
    const [error_email, seterror_email] = useState();
    const [error_phone, seterror_phone] = useState();
    const [details, setDetails] = useState({
        fullname: '',
        email: '',
        phone: '',
    });
    const handleInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        details[name] = value;
        setDetails(details);
    }


    const saveContact = async (e) => {
        e.preventDefault();

        const res = await axios.post("/add/contact", details);
        //  console.log(res.data.errors);
        if(res.data.errors){
            seterror_fullname(res.data.errors.fullname)
            seterror_email(res.data.errors.email)
            seterror_phone(res.data.errors.phone)
        }

        // console.log(res.data.status);
        if (res.data.status == 200) {
            setDetails({
                fullname: '',
                email: '',
                phone: '',
            });
            history.push("/")

        }
        // console.log(res);
    }

    const Fullname = () => {
        return (
            <small className="text-danger">{error_fullaname}</small>
        );
    }
    const Email = () => {
        return (
            <small className="text-danger">{error_email}</small>
        );
    }

    const Phone = () => {
        return (
            <small className="text-danger">{error_phone}</small>
        );
    }
    return (
        <>
<Nav />
            <div>
                <form onSubmit={saveContact}>
                    <div className="form-group">
                        <input type="text" name="fullname" className={`form-control${ error_fullaname ? ' is-invalid' :  '' }`} onChange={handleInput} placeholder="Enter Full Name" />
                        { error_fullaname ? <Fullname className="form-control" /> : null }
                    </div>
                    <div className="form-group" >
                        <input type="email" name="email" className={`form-control${ error_email ? ' is-invalid' : '' }`} onChange={handleInput} placeholder="Enter Your Email" />
                        { error_email ? <Email className="form-control" /> : null }
                    </div>
                    <div className="form-group" >
                        <input type="text" name="phone" className={`form-control${ error_phone ? ' is-invalid' : '' }`} onChange={handleInput} placeholder="Enter Your Phone" />
                        { error_phone ? <Phone className="form-control" /> : null }
                    </div>
                    {/* <div className="alert alert-danger">{error}</div> */}
                    <div className="form-group">
                        <input type="submit" className="btn btn-primary" value="Add Contact" />
                    </div>
                </form>
            </div>
        </>
    );

}
export default AddContact
