import {
  Drawer,
  Hidden,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
  Divider,
} from '@material-ui/core';
import {
  ExpandLess,
  ExpandMore,
} from '@material-ui/icons';
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
  isAdmin: boolean;
}

const Sidebar: React.FC<Props & RouteProps> = props => {
  const { color, routes, isAdmin } = props;
  const classes = sidebarStyle();
  const [open, setOpen] = React.useState(true);
  const nestedTopRoute = routes.filter((route) => route.nestedRoot)[0];
  const nestedRoutes = routes.filter((route) => route.childRoute);

  const handleClick = () => {
    setOpen(!open);
  };

  const links = (
    <List className={classes.list} disablePadding>
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
          !prop.nestedRoot && !prop.childRoute && (
            <ListItem button className={classes.itemLink + listItemClasses} key={key}>
              <NavLink
                to={prop.path}
                className={classes.item}
                activeClassName="active"
                key={key}
              >
                { prop.icon && (
                <ListItemIcon className={classes.itemIcon + whiteFontClasses}>
                  <prop.icon />
                </ListItemIcon>
                )}
                <ListItemText
                  primary={prop.sidebarName}
                  className={classes.itemText + whiteFontClasses}
                  disableTypography={true}
                />
              </NavLink>
            </ListItem>
          )
        );
      })}
      { isAdmin && (
        <div>
          <Divider className={classes.divider} />
          <ListItem button onClick={handleClick} className={classes.itemLink}>
            <div className={classes.item}>
            { nestedTopRoute.icon && (
              <ListItemIcon className={classes.itemIcon}>
                <nestedTopRoute.icon />
              </ListItemIcon>
            )}
              <ListItemText
                primary={nestedTopRoute.sidebarName}
                className={classes.itemText}
                disableTypography={true}
              />
              {open ? <ExpandLess className={classes.arrowIcon}/> : <ExpandMore className={classes.arrowIcon}/>}
            </div>
          </ListItem>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {nestedRoutes.map((p, k) => {
                const listItemClasses = cx({
                  [' ' + classes[color]]: activeRoute(p.path),
                });
        
                const whiteFontClasses = cx({
                  [' ' + classes.whiteFont]: activeRoute(p.path),
                });
                return (
                  <ListItem button className={classes.itemLink + listItemClasses}  key={k}>
                    <NavLink
                      to={p.path}
                      className={classes.item}
                      activeClassName="active"
                    >
                      { p.icon && (
                        <ListItemIcon className={classes.nestedItemIcon + whiteFontClasses}>
                          <p.icon />
                        </ListItemIcon>
                      )}
                      <ListItemText
                        primary={p.sidebarName}
                        className={classes.itemText + whiteFontClasses}
                        disableTypography={true}
                      />
                    </NavLink>
                  </ListItem>
                )
              })}
            </List>
          </Collapse>
        </div>
      )}
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
