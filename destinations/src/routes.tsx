import { Switch, Route } from 'react-router-dom';

import { Login } from './pages/Login';
import { Destinations } from './pages/Destinations';
import { Availability } from './pages/Availability';

export function Routes() {
    return(
        <Switch>
            <Route path='/' exact component={Login} />
            <Route path='/destinations' component={Destinations} />
            <Route path='/availability' component={Availability} />
        </Switch>
    )
}