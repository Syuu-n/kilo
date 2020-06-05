import {
  ClickAwayListener,
  Grow,
  Hidden,
  IconButton,
  MenuItem,
  MenuList,
  Paper,
} from '@material-ui/core';
import { Dashboard, Notifications, Person, Search } from '@material-ui/icons';
import headerLinksStyle from 'assets/jss/material-dashboard-react/headerLinksStyle';
import * as cx from 'classnames';
import { CustomInput, IconButton as SearchButton } from 'components';
import * as React from 'react';
import { Manager, Popper, Target } from 'react-popper';

const HeaderLinks: React.FC = () => {
  const classes = headerLinksStyle();
  const [open, setOpen] = React.useState(false);

  function handleClick() {
    setOpen(!open);
  }

  function handleClose() {
    setOpen(false);
  }

  return (
    <div>
      <CustomInput
        formControlProps={{
          className: classes.margin + ' ' + classes.search,
        }}
        inputProps={{
          placeholder: 'Search',
          inputProps: {
            'aria-label': 'Search',
          },
        }}
      />
      <SearchButton
        color="white"
        aria-label="edit"
        customClass={classes.margin + ' ' + classes.searchButton}
      >
        <Search className={classes.searchIcon} />
      </SearchButton>
      <IconButton
        color="inherit"
        aria-label="Dashboard"
        className={classes.buttonLink}
      >
        <Dashboard className={classes.links} />
        <Hidden mdUp>
          <p className={classes.linkText}>Dashboard</p>
        </Hidden>
      </IconButton>
      <Manager style={{ display: 'inline-block' }}>
        <Target>
          <IconButton
            color="inherit"
            aria-label="Notifications"
            aria-owns={open ? 'menu-list' : undefined}
            aria-haspopup="true"
            onClick={handleClick}
            className={classes.buttonLink}
          >
            <Notifications className={classes.links} />
            <span className={classes.notifications}>5</span>
            <Hidden mdUp>
              <p onClick={handleClick} className={classes.linkText}>
                Notification
              </p>
            </Hidden>
          </IconButton>
        </Target>
        <Popper
          placement="bottom-start"
          eventsEnabled={open}
          className={cx(
            { [classes.popperClose]: !open },
            classes.popperResponsive,
          )}
        >
          <ClickAwayListener onClickAway={handleClose}>
            <Grow in={open} style={{ transformOrigin: '0 0 0' }}>
              <Paper className={classes.dropdown}>
                <MenuList role="menu">
                  <MenuItem
                    onClick={handleClose}
                    className={classes.dropdownItem}
                  >
                    Mike John responded to your email
                  </MenuItem>
                  <MenuItem
                    onClick={handleClose}
                    className={classes.dropdownItem}
                  >
                    You have 5 new tasks
                  </MenuItem>
                  <MenuItem
                    onClick={handleClose}
                    className={classes.dropdownItem}
                  >
                    You're now friend with Andrew
                  </MenuItem>
                  <MenuItem
                    onClick={handleClose}
                    className={classes.dropdownItem}
                  >
                    Another Notification
                  </MenuItem>
                  <MenuItem
                    onClick={handleClose}
                    className={classes.dropdownItem}
                  >
                    Another One
                  </MenuItem>
                </MenuList>
              </Paper>
            </Grow>
          </ClickAwayListener>
        </Popper>
      </Manager>
      <IconButton
        color="inherit"
        aria-label="Person"
        className={classes.buttonLink}
      >
        <Person className={classes.links} />
        <Hidden mdUp>
          <p className={classes.linkText}>Profile</p>
        </Hidden>
      </IconButton>
    </div>
  );
}

export default HeaderLinks;
