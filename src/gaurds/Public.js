import React from 'react'
import {Route, Redirect} from 'react-router-dom';
import LocalStorageService from './../services/LocalStorageService';

const Public = ({ component: Component, ...rest }) => {
    return (
        <React.Fragment>
             <Route {...rest} render={props => {
            if (!LocalStorageService.getAccessToken()) {
                // not logged in so redirect to login page with the return url
                return <Component {...props} />
            }

            // Redirect to admin route
            return <Redirect to="/" />
        }} />
        </React.Fragment>
    )
}

export default Public