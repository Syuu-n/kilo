import {
  AppBar,
  Hidden,
  IconButton,
  Toolbar,
} from '@material-ui/core';
import { Menu } from '@material-ui/icons';
import headerStyle from 'assets/jss/material-dashboard-react/headerStyle';
import * as cx from 'classnames';
import * as React from 'react';
import { Route } from 'routes/mainPageRoutes';
import HeaderLinks from './HeaderLinks';
import { RouteProps } from 'react-router';
import {
  primaryColor,
  successColor,
} from 'assets/jss/material-dashboard-react';

type ColorType = 'primary' | 'info' | 'success' | 'warning' | 'danger';

interface Props {
  color?: ColorType;
  handleDrawerToggle?: () => void;
  routes: Route[];
}

const Header: React.FC<Props & RouteProps> = (props) => {
  const [hrWidth, setHrWidth] = React.useState(0);
  const { color, handleDrawerToggle } = props;
  const classes = headerStyle();
  const appBarClasses = cx(classes.appBar, color && classes[color]);
  let hrColor = primaryColor;

  function makeBrand() {
    const { routes, location } = props;

    var name;

    routes.map((prop, key) => {
      if (location && prop.path === location.pathname) {
        name = prop.navbarName;
        // 現在の route が管理者コンソールだった場合にヘッダーの色を変更する
        if (prop.childRoute) {
          hrColor = successColor;
          name = routes.find((route) => route.nestedRoot)?.navbarName;
        }
      }

      return null;
    });

    return name;
  }

  const el = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    if (el && el.current) {
      setHrWidth(el.current.clientWidth);
    }
  }, [makeBrand]);

  return (
    <AppBar className={appBarClasses}>
      <Toolbar className={classes.container}>
        <div className={classes.flex}>
          <h3 className={classes.title} ref={el}>
            {makeBrand()}
          </h3>
          <hr className={classes.highlighter} style={{width: hrWidth, color: hrColor}}/>
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
