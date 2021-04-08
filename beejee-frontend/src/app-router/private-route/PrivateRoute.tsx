import {Redirect, Route, RouteProps} from "react-router-dom";
import React from "react";
import {useSnapshot} from "valtio";
import store from "../../store";

type PrivateRouteProps = {canAccess: 'authorized' | 'unauthorized' | 'all', redirectTo?: string}

const PrivateRoute: React.FC<RouteProps & PrivateRouteProps> = ({canAccess, redirectTo, children, ...props}) => {
    const snap = useSnapshot(store);
    let redirect = false;
    if(canAccess === 'authorized' && !snap.user.isLoggedIn) {
        redirect = true;
    }
    if(canAccess === 'unauthorized' && snap.user.isLoggedIn) {
        redirect = true;
    }
    return <Route {...props}>
        <>
            {redirect ? <Redirect to={redirectTo || '/'} /> : null}
            {children}
        </>
    </Route>
}

export default PrivateRoute;