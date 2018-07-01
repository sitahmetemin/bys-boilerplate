import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from './App'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import Login from './pages/Login'

import Municipality from "./pages/municipality-management-system";

const routes = (
    <Route>
        <Route path="/" component={App}>
            <IndexRoute component={Home}/>
            <Route path="home" component={Home}/>
            <Route path="municipality-management-system">
                <IndexRoute component={Municipality} />
                <Route path=":basePath/:somePath" component={Municipality}/>
                <Route path=":basePath/:somePath/:subPath" component={Municipality}/>
            </Route>

        </Route>
        <Route path='login' exact component={Login} />
        {/*<Route path='digikent' component={NotFound} />*/}
        {/*<Route path='*' component={NotFound} />*/}
    </Route>

)

export default routes