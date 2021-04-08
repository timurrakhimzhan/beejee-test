import TasksPage from "../pages/tasks-page";
import LoginPage from "../pages/login-page";
import {BrowserRouter, Switch} from 'react-router-dom';
import Layout from "../shared/layout";
import PrivateRoute from "./private-route";

const routes: Array<CustomRoute> = [
    { name: 'TasksPage', path: '/', Component: TasksPage, canAccess: 'all'},
    { name: 'LoginPage', path: '/login', Component: LoginPage, canAccess: 'unauthorized'}
];

const AppRouter = () => {
    return <BrowserRouter>
        <Switch>
            {routes.map(({name, path, Component, canAccess}) => (
                <PrivateRoute exact key={name} path={path} canAccess={canAccess}>
                    <Layout>
                        <Component />
                    </Layout>
                </PrivateRoute>
            ))}
        </Switch>
    </BrowserRouter>
}

export default AppRouter;