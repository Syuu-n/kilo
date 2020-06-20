import {
  Drawer,
  Hidden,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';
import sidebarStyle from 'assets/jss/material-dashboard-react/sidebarStyle';
import * as cx from 'classnames';
import { HeaderLinks } from 'components';
import * as React from 'react';
import { NavLink, RouteProps } from 'react-router-dom';
import { Route } from 'routes/mainPageRoutes';
import logoImg from 'assets/img/logo.png';

interface Props {
  handleDrawerToggle: () => void;
  open: boolean;
  color: string;
  routes: Route[];
}

const Sidebar: React.SFC<Props & RouteProps> = props => {
  const { color, routes } = props;
  const classes = sidebarStyle();

  var links = (
    <List className={classes.list}>
      {routes.map((prop, key) => {
        if (prop.redirect) {
          return null;
        }

        const listItemClasses = cx({
          [' ' + classes[color]]: activeRoute(prop.path),
        });

        const whiteFontClasses = cx({
          [' ' + classes.whiteFont]: activeRoute(prop.path),
        });

        return (
          <NavLink
            to={prop.path}
            className={classes.item}
            activeClassName="active"
            key={key}
          >
            <ListItem button className={classes.itemLink + listItemClasses}>
              {prop.icon && (
                <ListItemIcon className={classes.itemIcon + whiteFontClasses}>
                  <prop.icon />
                </ListItemIcon>
              )}
              <ListItemText
                primary={prop.sidebarName}
                className={classes.itemText + whiteFontClasses}
                disableTypography={true}
              />
            </ListItem>
          </NavLink>
        );
      })}
    </List>
  );

  var brand = (
    <div className={classes.logo}>
      <a href="#" className={classes.logoLink}>
        <img src={logoImg} alt="logo" className={classes.img} />
      </a>
    </div>
  );

  return (
    <div>
      <Hidden mdUp>
        <Drawer
          variant="temporary"
          anchor="right"
          open={props.open}
          classes={{
            paper: classes.drawerPaper,
          }}
          onClose={props.handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          {brand}
          <div className={classes.sidebarWrapper}>
            <HeaderLinks />
            {links}
          </div>
        </Drawer>
      </Hidden>
      <Hidden smDown>
        <Drawer
          anchor="left"
          variant="permanent"
          open
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          {brand}
          <div className={classes.sidebarWrapper}>{links}</div>
        </Drawer>
      </Hidden>
    </div>
  );

  // verifies if routeName is the one active (in browser input)
  function activeRoute(routeName: string) {
    const { location } = props;

    return location && location.pathname.indexOf(routeName) > -1;
  }
};

export default Sidebar;
