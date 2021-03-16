import React from 'react';
import { Link } from 'react-router-dom'

function My404Component() {
    return (
            <>
                 <Link className="nav-link" to="/">Home
          <span className="sr-only">(current)</span>
                                </Link>
                                <h1>404 Not Found</h1>
            </>
    );
}

export default My404Component;
