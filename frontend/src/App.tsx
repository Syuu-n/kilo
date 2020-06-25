import hist from 'RouterHistory';
import * as React from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import { AuthProvider } from 'Auth';
import MainPage from 'layouts/MainPageLayout';
import LoginView from 'views/LoginView';

// AuthProvider 配下は認証が必要
const App: React.FC = () => {
  return (
    <Router history={hist}>
      <Switch>
        <Route exact path='/login' component={LoginView} />
        <AuthProvider>
          <Route path='/' component={MainPage} />
        </AuthProvider>
      </Switch>
    </Router>
  );
}

export default App;