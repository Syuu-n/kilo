import { Grid } from '@material-ui/core';
import loginViewStyle from 'assets/jss/kiloStyles/loginViewStyle';
import {
  ItemGrid,
  LoginCard
 } from 'components';
import * as React from 'react';

const LoginView: React.FC = () => {
  const classes = loginViewStyle();

  return (
    <div className={classes.wrapper}>
      <Grid container className={classes.loginView}>
        <ItemGrid xs={12} sm={6} lg={4}>
          <LoginCard
            headerColor="orange"
            cardTitle="K Dance Classic Studio"
          />
        </ItemGrid>
      </Grid>
    </div>
  );
}

export default LoginView;