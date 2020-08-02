import {
  Grow,
  Hidden,
  IconButton,
  MenuItem,
  MenuList,
  Paper,
  ClickAwayListener,
} from '@material-ui/core';
import Popper from '@material-ui/core/Popper';
import { Person } from '@material-ui/icons';
import headerLinksStyle from 'assets/jss/material-dashboard-react/headerLinksStyle';
import * as cx from 'classnames';
import * as React from 'react';
import { AuthContext } from 'Auth';
import history from 'RouterHistory';

const HeaderLinks: React.FC = () => {
  const classes = headerLinksStyle();
  const [openProfile, setOpenProfile] = React.useState<null | HTMLElement>(null);
  const { currentUser } = React.useContext(AuthContext);
  const handleClickProfile = (event: React.MouseEvent<HTMLElement>) => {
    setOpenProfile(openProfile ? null : event.currentTarget);
  };
  const handleCloseProfile = () => {
    setOpenProfile(null);
  };
  const logout = () => {
    localStorage.removeItem('kiloToken');
    history.push('/login');
  };

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
      <div style={{ display: 'inline-block' }}>
        <div onClick={handleClickProfile} className={classes.currentUserContainer}>
          <IconButton
            color="inherit"
            aria-label="Person"
            aria-owns={openProfile ? 'menu-list' : undefined}
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
        <Popper
          open={Boolean(openProfile)}
          anchorEl={openProfile}
          placement="bottom-start"
          className={cx(
            { [classes.popperClose]: !open },
            classes.popperResponsive,
          )}
        >
          <Grow in={Boolean(openProfile)} style={{ transformOrigin: '0 0 0' }}>
            <Paper className={classes.dropdown}>
              <ClickAwayListener onClickAway={handleCloseProfile}>
                <MenuList role="menu">
                  <MenuItem
                    onClick={logout}
                    className={classes.dropdownItem}
                  >
                    ログアウト
                  </MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        </Popper>
      </div>
    </div>
  );
}

export default HeaderLinks;
