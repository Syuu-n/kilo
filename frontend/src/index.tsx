import 'assets/css/material-dashboard-react.css?v=1.2.0';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from 'App';
import { SnackbarProvider } from 'notistack';

ReactDOM.render(
  <SnackbarProvider
    maxSnack={1}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    // Snackbar を自動的に閉じるまでの時間
    autoHideDuration={6000}
  >
    <App/>
  </SnackbarProvider>,
  document.getElementById('root'),
);
