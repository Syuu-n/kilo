import { Grid, withStyles } from '@material-ui/core';
import loginViewStyle from 'assets/jss/kiloStyles/loginViewStyle';
import {
  ItemGrid,
  LoginCard
 } from 'components';
import * as React from 'react';

interface Props {
  classes: {
    wrapper: string;
    loginView: string;
    cardTitle: string;
  };
}

class LoginView extends React.Component<Props> {
  render() {
    const { classes } = this.props;

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
}

export default withStyles(loginViewStyle)(LoginView);