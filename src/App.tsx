import React, { Suspense } from 'react';
import './App.css';

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { Home } from './components/home/home';
const EditProfile = React.lazy(() =>
  import('./components/user-profile/edit-profile')
);
const EditTransaction = React.lazy(() =>
  import('./components/transaction/transactionEdit')
);
const AddTransaction = React.lazy(() =>
  import('./components/transaction/transactionAdd')
);

export function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to='/'>Home</Link>
            </li>
            <li>
              <Link to='/transactions/add'>Add Transaction</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path='/' exact={true}>
            <Home />
          </Route>
          <Route path='/edit-profile'>
            <Suspense fallback={<div>Loading...</div>}>
              <EditProfile />
            </Suspense>
          </Route>
          <Route path='/transactions/add' exact={true}>
            <Suspense fallback={<div>Loading...</div>}>
              <AddTransaction />
            </Suspense>
          </Route>
          <Route path='/transactions/:id'>
            <Suspense fallback={<div>Loading...</div>}>
              <EditTransaction />
            </Suspense>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
