import React, {useEffect,useState} from 'react'
import { Link, link } from 'react-router-dom'
const Contact = (props) => {
    if (props.details.length == 0) {
        return (
            <>
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th scope="col">Image</th>
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Phone</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>


                                <tr  className="dataNotFound" >

                                <td colSpan="5">No Data To Show In Table</td>

                                </tr>


                    </tbody>
                </table>
            </>
        );
}
    // console.log('size of contacts = ' + props.details.length);
    return (
        <>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th scope="col">Image</th>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Phone</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        props.details.map((contact) => (
                            <tr key={contact.id} >
                                <th className="circle">{contact.fullname[0]}</th>
                                <th scope="col">{contact.fullname}</th>
                                <th scope="col">{contact.email}</th>
                                <th scope="col">{contact.phone}</th>
                                <th>
                                    <div className="btn-group" role="group" >
                                        <Link to={`/edit/${contact.id}`} type="button" className="btn btn-primary btn-sm">Edit</Link>
                                        <button type="button" onClick={() => props.delcont(contact.id)} className="btn btn-danger btn-sm">Delete</button>
                                    </div>
                                </th>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </>
    );

}
export default Contact
