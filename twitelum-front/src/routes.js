import React, { Component } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Home from './pages/Home';
import LoginPage from './pages/LoginPage'


export default class Routes extends Component {
    render() {
        return (
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/login" component={LoginPage} />
                <Route path="*" component={ () => (<div>Página 404</div>) } />
            </Switch>
        )
    }
}

