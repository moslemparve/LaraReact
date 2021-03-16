import React from 'react';
import ReactDOM from 'react-dom';

import Contacts from './Contacts'
import AddContact from './AddContact'
import EditContact from './EditContact';
import My404Component from './My404Component';
import './index.css'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Register from './Register';
import Login from './Login';

function Example() {
    return (
        <Router>
            <>

                <div className="container mt-5">
                    <div className="row">
                        <div className="col-md-8 offset-md-2">
                            <Switch>
                                <Route path="/register" exact component={Register}/>
                                <Route path="/login" zzexact component={Login}/>
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
