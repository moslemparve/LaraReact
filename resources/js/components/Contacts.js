import React, { useState,useEffect } from 'react'
import axios from 'axios'
import Contact from './Contact'
import Nav from './Nav'
import Pagination from './Pagination';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
const Contacts = () => {
    const [contacts, Setcontacts] = useState({
        contact: '',
        loading: true,
    });
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerpage, setpostPerpage] = useState(3);

    const fetchContacts = async () => {
        const res = await axios.get('/get/contacts');
        // console.log(res.data.contacts);
        if (res.data.status == 200) {
            Setcontacts({
                contact: res.data.contacts,
                loading: false
            });
        }
    }
    const DeleteContact = async (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then( async (result) => {
              if (result.isConfirmed) {
                const res = await axios.get(`/delete/${id}`);
        // return console.log(res.data);
        if (res.data.status == 200) {
            fetchContacts();
        }
              Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
              )
            }
          })

    }

    //get current post
    const posts = contacts.contact;
    const indexOfLastPost = currentPage * postsPerpage;
    const indexOfFirstPost = indexOfLastPost - postsPerpage;
    const currentPosts = posts.slice(indexOfFirstPost,indexOfLastPost);
    //  console.log(currentPosts);
    //change page
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber)
    };
    // console.log(contacts.contact.length);
    if (contacts.loading) {

        fetchContacts();
        return (
            <h1>Loading....</h1>
        );
    }
    // console.log();
    return (
        <>
        <Nav />
            <Contact details={currentPosts} delcont={DeleteContact} />
            <Pagination  postPerpage={postsPerpage} totalPost={posts.length}  currentPage={currentPage} paginate={paginate}/>
        </>
    );
}
export default Contacts
