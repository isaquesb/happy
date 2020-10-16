import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Landing from './pages/Landing';
import OrphanagesMap from './pages/OrphanagesMap';
import OrphanageCreate from './pages/OrphanageCreate';
import OrphanageShow from './pages/Orphanage';

function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Landing} />
                <Route path="/map" component={OrphanagesMap} />
                <Route path="/orphanages/create" component={OrphanageCreate} />
                <Route path="/orphanages/:id" component={OrphanageShow} />
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;
