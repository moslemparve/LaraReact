import React ,{useState,useEffect} from 'react';
import ReactDOM from 'react-dom';

import Contacts from './Contacts'
import AddContact from './AddContact'
import EditContact from './EditContact';
import My404Component from './My404Component';
import './index.css'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Register from './Register';
import Login from './Login';
import AsyncLocalStorage from '@createnextapp/async-local-storage'
function Example() {
    const [authToken, setauthToken] = useState(null);
    useEffect(() => {
        // console.log('mounted');
        AsyncLocalStorage.getItem('isLoggedIn').then((data1) => {
            setauthToken(data1);
        });
    }, []);

    // console.log(authToken);
    return (
        <Router>
            <>

                <div className="container mt-5">
                    <div className="row">
                        <div className="col-md-8 offset-md-2">
                            <Switch>
                                <Route path="/register" exact component={Register}/>
                                <Route path="/login" exact  render={()=>(
                                    authToken ? (<Redirect to="/"/>):(<Login/>)
                                )}/>
                                <Route path="/" exact component={Contacts} />
                                <Route path="/addContact" exact component={AddContact} />
                                <Route path="/edit/:id" exact component={EditContact}/>
                                <Route path='*' exact component={My404Component} />
                            </Switch>
                        </div>
                    </div>
                </div>
            </>
        </Router>
    );
}

export default Example;

if (document.getElementById('root')) {
    ReactDOM.render(<Example />, document.getElementById('root'));
}
