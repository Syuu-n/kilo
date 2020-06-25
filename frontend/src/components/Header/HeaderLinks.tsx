import {
  ClickAwayListener,
  Grow,
  Hidden,
  IconButton,
  MenuItem,
  MenuList,
  Paper,
} from '@material-ui/core';
import { Person } from '@material-ui/icons';
import headerLinksStyle from 'assets/jss/material-dashboard-react/headerLinksStyle';
import * as cx from 'classnames';
import * as React from 'react';
import { Manager, Popper, Target } from 'react-popper';
import { AuthContext } from 'Auth';
import history from 'RouterHistory';

const HeaderLinks: React.FC = () => {
  const classes = headerLinksStyle();
  const [open, setOpen] = React.useState(false);
  const { currentUser } = React.useContext(AuthContext);

  function handleClick() {
    setOpen(!open);
  }

  function handleClose() {
    setOpen(false);
  }

  function logout() {
    localStorage.removeItem('kiloToken');
    history.push('/login');
  }

  return (
    <div>
      {/* NOTE: 通知表示 */}
      {/* <IconButton
        color="inherit"
        aria-label="Notifications"
        className={classes.buttonLink}
      >
        <Notifications className={classes.links} />
        <span className={classes.notifications}>5</span>
        <Hidden mdUp>
          <p onClick={handleClick} className={classes.linkText}>
            通知
          </p>
        </Hidden>
      </IconButton> */}
      <ClickAwayListener onClickAway={handleClose}>
        <Manager style={{ display: 'inline-block' }}>
          <Target>
            <div onClick={handleClick} className={classes.currentUserContainer}>
              <IconButton
                color="inherit"
                aria-label="Person"
                aria-owns={open ? 'menu-list' : undefined}
                aria-haspopup="true"
                className={classes.buttonLink}
              >
                <Person className={classes.links} />
                <Hidden mdUp>
                  { currentUser ? (
                    <p className={classes.linkText}>{currentUser.name} 様</p>
                  ) : (
                    <p className={classes.linkText}>ロード中...</p>
                  )
                  }
                </Hidden>
              </IconButton>
              <Hidden smDown>
                { currentUser ? (
                  <span>{currentUser.name} 様</span>
                ) : (
                  <span>ロード中...</span>
                )
                }
              </Hidden>
            </div>
          </Target>
          <Popper
            placement="bottom-start"
            eventsEnabled={open}
            className={cx(
              { [classes.popperClose]: !open },
              classes.popperResponsive,
            )}
          >
            <Grow in={open} style={{ transformOrigin: '0 0 0' }}>
              <Paper className={classes.dropdown}>
                <MenuList role="menu">
                  <MenuItem
                    onClick={logout}
                    className={classes.dropdownItem}
                  >
                    ログアウト
                  </MenuItem>
                </MenuList>
              </Paper>
            </Grow>
          </Popper>
        </Manager>
      </ClickAwayListener>
    </div>
  );
}

export default HeaderLinks;
