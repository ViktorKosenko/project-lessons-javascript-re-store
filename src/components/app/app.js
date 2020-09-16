import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import { HomePage, CartPage} from '../pages';
import ShopHeader from '../shop-header';

import './app.css';

const App = () => {;
    return (
        <main role="main" className="container">
            <ShopHeader numItems={5} total={210} />
            <Switch>
                <Route
                    path="/"
                    component={HomePage}
                    exact />
                <Route
                    path="/cart"
                    component={CartPage} />
                <Route exact>
                    <Redirect to="/" />
                </Route>
            </Switch>
        </main>
    );
};

export default App;