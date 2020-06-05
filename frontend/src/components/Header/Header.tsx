import {
  AppBar,
  Button,
  Hidden,
  IconButton,
  Toolbar,
} from '@material-ui/core';
import { Menu } from '@material-ui/icons';
import headerStyle from 'assets/jss/material-dashboard-react/headerStyle';
import * as cx from 'classnames';
import * as React from 'react';
import { Route } from 'routes/dashboard';
import HeaderLinks from './HeaderLinks';
import { RouteProps } from 'react-router';

type ColorType = 'primary' | 'info' | 'success' | 'warning' | 'danger';

interface Props {
  color?: ColorType;

  handleDrawerToggle?: () => void;
  routes: Route[];
}

const Header: React.SFC<Props & RouteProps> = (props) => {
  const { color, handleDrawerToggle } = props;
  const classes = headerStyle();
  const appBarClasses = cx(classes.appBar, color && classes[color]);

  function makeBrand() {
    const { routes, location } = props;

    var name;

    routes.map((prop, key) => {
      if (location && prop.path === location.pathname) {
        name = prop.navbarName;
      }

      return null;
    });

    return name;
  }

  return (
    <AppBar className={appBarClasses}>
      <Toolbar className={classes.container}>
        <div className={classes.flex}>
          {/* Here we create navbar brand, based on route name */}
          <Button href="#" className={classes.title}>
            {makeBrand()}
          </Button>
        </div>
        <Hidden smDown implementation="css">
          <HeaderLinks />
        </Hidden>
        <Hidden mdUp>
          <IconButton
            className={classes.appResponsive}
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerToggle}
          >
            <Menu />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
