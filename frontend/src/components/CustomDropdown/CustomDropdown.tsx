import * as React from "react";
// nodejs library that concatenates classes
import * as cx from 'classnames';

// @material-ui/core components
import { MenuItem, MenuList, ClickAwayListener, Paper, Grow, Icon, Popper } from '@material-ui/core';

// core components
import { Button }  from "components";
import customDropdownStyle from "assets/jss/material-dashboard-react/customDropdownStyle";

type ColorType =
  | "black"
  | "primary"
  | "info"
  | "success"
  | "warning"
  | "danger"
  | "rose";

interface Props {
  hoverColor?: ColorType;
  buttonText?: string;
  buttonIcon?: Object | string;
  dropdownList: Array<any>;
  buttonProps?: Object;
  // dropup?: boolean;
  dropdownHeader?: string;
  caret?: boolean;
  left?: boolean;
  noLiPadding?: boolean;
  onClick?: Function;
}

// CustomDropdown.defaultProps = {
//   caret: true,
//   hoverColor: "primary"
// };

// CustomDropdown.propTypes = {
//   hoverColor: PropTypes.oneOf([
//     "black",
//     "primary",
//     "info",
//     "success",
//     "warning",
//     "danger",
//     "rose"
//   ]),
//   buttonText: PropTypes.node,
//   buttonIcon: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
//   dropdownList: PropTypes.array,
//   buttonProps: PropTypes.object,
//   dropup: PropTypes.bool,
//   dropdownHeader: PropTypes.node,
//   rtlActive: PropTypes.bool,
//   caret: PropTypes.bool,
//   left: PropTypes.bool,
//   noLiPadding: PropTypes.bool,
//   // function that retuns the selected item
//   onClick: PropTypes.func
// };

const CustomDropdown: React.FC<Props> = (props) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const { hoverColor, buttonText, buttonIcon, dropdownList, buttonProps, caret, noLiPadding, onClick } = props;
  const classes = customDropdownStyle();

  const handleClick = (event:any) => {
    // if (anchorEl !== null) {
    //   if (anchorEl && anchorEl.contains(event.target)) {
    //     setAnchorEl(null);
    //   } else {
    //     setAnchorEl(event.currentTarget);
    //   }
    // }
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };
  const handleClose = (param:any) => {
    setAnchorEl(null);
    if (onClick) {
      onClick(param);
    }
  };
  // const handleCloseAway = (event:any) => {
  //   if (anchorEl !== null) {
  //     if (anchorEl.contains(event.target)) {
  //       return;
  //     }
  //   }
  //   setAnchorEl(null);
  // };
  const caretClasses = cx({
    [classes.caret]: true,
    [classes.caretActive]: Boolean(anchorEl),
  });
  const dropdownItem = cx({
    [classes.dropdownItem]: true,
    [classes[hoverColor + "Hover"]]: true,
    [classes.noLiPadding]: noLiPadding,
  });
  let icon = null;
  switch (typeof buttonIcon) {
    // case "object":
    //   icon = <buttonIcon className={classes.buttonIcon} />;
    //   break;
    case "string":
      icon = <Icon className={classes.buttonIcon}>{buttonIcon}</Icon>;
      break;
    default:
      icon = null;
      break;
  };
  
  return (
    <div>
      <Button
        aria-label="DropDown"
        aria-owns={anchorEl ? "menu-list" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
        {...buttonProps}
      >
        {icon}
        {buttonText !== undefined ? buttonText : null}
        {caret ? <b className={caretClasses} /> : null}
      </Button>
      <Popper
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        placement="bottom-start"
        className={cx(
          { [classes.popperClose]: !open },
          classes.popperResponsive,
        )}
      >
        <Grow in={Boolean(anchorEl)} style={{ transformOrigin: '0 0 0' }}>
          <Paper className={classes.dropdown}>
            <ClickAwayListener onClickAway={handleClose}>
              <MenuList role="menu">
                {dropdownList.map((prop, key) => (
                  <MenuItem
                    key={key}
                    onClick={() => handleClose(prop)}
                    className={dropdownItem}
                  >
                    ログアウト
                  </MenuItem>
                ))}
              </MenuList>
            </ClickAwayListener>
          </Paper>
        </Grow>
      </Popper>
    </div>
  );
};

CustomDropdown.defaultProps = {
  caret: true,
  hoverColor: "primary"
};

export default CustomDropdown;