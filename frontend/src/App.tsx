import hist from 'RouterHistory';
import * as React from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import { AuthProvider } from 'Auth';
import MainPage from 'layouts/MainPageLayout';
import LoginView from 'views/Public/LoginView';
import TopView from 'views/Public/TopView';
import TrialRegisterView from 'views/Public/TrialRegisterView';
import CompleteRegisterView from 'views/Public/CompleteRegisterView';
import PasswordResetView from 'views/Public/PasswordResetView';
import SendPasswordResetView from 'views/Public/SendPasswordResetView';
// moment を日本語に設定
import 'moment/locale/ja';

// AuthProvider 配下は認証が必要
const App: React.FC = () => {
  return (
    <Router history={hist}>
      <Switch>
        <Route exact path='/' component={TopView} />
        <Route exact path='/trial_register' component={TrialRegisterView} />
        <Route exact path='/complete_register' component={CompleteRegisterView}/>
        <Route exact path='/send_password_reset' component={SendPasswordResetView} />
        <Route exact path='/password_reset' component={PasswordResetView} />
        <Route exact path='/login' component={LoginView} />
        <AuthProvider>
          <Route path='/' component={MainPage} />
        </AuthProvider>
      </Switch>
    </Router>
  );
}

export default App;