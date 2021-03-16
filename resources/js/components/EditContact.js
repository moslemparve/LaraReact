import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useHistory } from "react-router";
const EditContact = (props) => {

    let history = useHistory();
    let [updateDetails, setUpdateDetails] = useState({
        fullname: '',
        email: '',
        phone: '',
    });
    let [details, setDetails] = useState({
        fullname: '',
        email: '',
        phone: '',
    });
    const handleInput = (e) => {
        // return console.log(e.target.name)
        const name = e.target.name;
        const value = e.target.value;
        details[name] = value;
        setUpdateDetails(details);
        console.log(updateDetails);
    }
    const UpdateContact = async (e) => {
        e.preventDefault();
        const id = props.match.params.id;
        if(updateDetails.fullname!='' || updateDetails.email!='' || updateDetails.phone!=''){
        // console.log(updateDetails);
        const res = await axios.post(`/update/contact/${id}`, updateDetails);
        // console.log(res.data.status);
        if (res.data.status == 200) {
            history.push("/")

            }
        } else {
            history.push("/")
        }
        // console.log(res);
    }

    const  componentDidMont = async ()=>{
        const id = props.match.params.id;
        // console.log(id);
        const res = await axios.get(`/get/contact/${id}`);
        setDetails({
            fullname: res.data.contact.fullname,
            email:res.data.contact.email,
            phone:res.data.contact.phone,
        });

    }
    useEffect(() => {
            componentDidMont();
      }, []);
    return (
        <>
            <div>
                <form onSubmit={UpdateContact}>
                    <div className="form-group">
                        <input type="text" name="fullname" className="form-control" onChange={handleInput} placeholder="Enter Full Name" defaultValue={details.fullname} />
                    </div>
                    <div className="form-group">
                        <input type="email" name="email" className="form-control" onChange={handleInput} placeholder="Enter Your Email" defaultValue={details.email} />
                    </div>
                    <div className="form-group">
                        <input type="text" name="phone" className="form-control" onChange={handleInput} placeholder="Enter Your Phone" defaultValue={details.phone} />
                    </div>
                    <div className="form-group">
                        <input type="submit" className="btn btn-primary" value="Update Contact" />
                    </div>
                </form>
            </div>
        </>
    );

}
export default EditContact
