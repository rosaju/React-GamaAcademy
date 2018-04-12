import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import Home from './pages/Home';
import LoginPage from './pages/LoginPage'

function estaAutenticado() {
    if(localStorage.getItem('TOKEN')) {
        return true
    }
    return false
}

class PrivateRoute extends Component {
    render() {
        
        if(estaAutenticado()) {
        return (
            <Route { ...this.props }/>
        )
        } else {
            return(
                <Redirect to="/login" />
            )
        }
    }
}

const Routes = () => {
    return (
        <Switch>
            <PrivateRoute path="/" exact component={Home} />
            <Route path="/login" component={LoginPage} />
            <Route path="*" component={ () => (<div>Página 404</div>) } />
        </Switch>
    )
}

export default Routes;

// export default class Routes extends Component {
//     render() {
//         return (
//             <Switch>
//                 <PrivateRoute path="/" exact component={Home} />
//                 <Route path="/login" component={LoginPage} />
//                 <Route path="*" component={ () => (<div>Página 404</div>) } />
//             </Switch>
//         )
//     }
// }

