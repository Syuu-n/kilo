import { createBrowserHistory } from 'history';
import * as React from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import { AuthProvider } from 'Auth';
import Dashboard from 'layouts/Dashboard/Dashboard';
// import LoginView from 'views/LoginView';

const hist = createBrowserHistory();

const App: React.FC = () => {
  return (
    <Router history={hist}>
      <Switch>
        <AuthProvider>
          <Route path='/' component={Dashboard} />
        </AuthProvider>
      </Switch>
    </Router>
  );
}

export default App;