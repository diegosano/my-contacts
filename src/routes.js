import { Route, Switch } from 'react-router-dom';

import { EditContact } from './pages/EditContact';
import { Home } from './pages/Home';
import { NewContact } from './pages/NewContact';

export function Routes() {
  return (
    <Switch>
      <Route path="/" component={Home} exact />
      <Route path="/new" component={NewContact} exact />
      <Route path="/edit/:id" component={EditContact} exact />
    </Switch>
  );
}
