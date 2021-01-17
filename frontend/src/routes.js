import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Home from './pages/Home';
import Login from './pages/Login';
import NewPokemon from './pages/NewPokemon';
import Register from './pages/Register';

const Routes = () => {
    return ( 
        <BrowserRouter>
            <Switch>
                <Route path='/' exact component={Home} />
                <Route path='/login' exact component={Login} />
                <Route path='/registro' exact component={Register} />

                <Route path='/novoPokemon' exact component={NewPokemon} />
            </Switch>
        </BrowserRouter>
    );
}
export default Routes;