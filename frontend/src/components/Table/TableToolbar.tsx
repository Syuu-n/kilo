import * as React from 'react';
import { IconButton, Button } from 'components';
import { SvgIcon } from '@material-ui/core';
import { Search } from '@material-ui/icons';
import tableToolbarStyle from 'assets/jss/kiloStyles/tableToolbarStyle';
import { CustomInput } from 'components';

interface Props {
  buttonTitle?: string;
  buttonIcon?: typeof SvgIcon;
}

const TableToolbar: React.SFC<Props> = (props) => {
  const { buttonTitle } = props;
  const classes = tableToolbarStyle();

  return (
    <div className={classes.toolbarContainer}>
      <Button
        color="success"
        round
        customClass={classes.addButton}
      >
        { props.buttonIcon && (
          <props.buttonIcon className={classes.buttonIcon}/>
        )}
        {buttonTitle}
      </Button>
      <div className={classes.searchContainer}>
        <CustomInput
          labelText="検索"
          success
          noIcon
          formControlProps={{className: classes.inputForm}}
        />
        <IconButton
          color="success"
        >
          <Search className={classes.searchIcon}/>
        </IconButton>
      </div>
    </div>
  );
};

export default TableToolbar;