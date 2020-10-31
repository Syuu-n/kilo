import * as React from 'react';
import { Button, AdminAddUserModal, AdminAddLessonClassModal } from 'components';
import { SvgIcon } from '@material-ui/core';
// import { Search } from '@material-ui/icons';
import tableToolbarStyle from 'assets/jss/kiloStyles/tableToolbarStyle';
// import { CustomInput } from 'components';

interface Props {
  buttonTitle?: string;
  buttonIcon?: typeof SvgIcon;
  updateFunc?: Function;
  dataType: dataType;
}

type dataType = "users" | "lesson_classes" | "plans" | "lessons";

const TableToolbar: React.FC<Props> = (props) => {
  const { buttonTitle, updateFunc, dataType } = props;
  const classes = tableToolbarStyle();
  const [openAddModal, setOpenAddModal] = React.useState(false);

  return (
    <div>
      <div className={classes.toolbarContainer}>
        <Button
          color="success"
          round
          customClass={classes.addButton}
          onClick={() => setOpenAddModal(true)}
        >
          { props.buttonIcon && (
            <props.buttonIcon className={classes.buttonIcon}/>
          )}
          {buttonTitle}
        </Button>
        {/* TODO: 検索機能の実装 */}
        {/* <div className={classes.searchContainer}>
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
        </div> */}
      </div>
      { dataType == "users" && (
        <AdminAddUserModal
          open={openAddModal}
          closeFunc={() => setOpenAddModal(false)}
          openFunc={() => setOpenAddModal(true)}
          updateFunc={updateFunc}
        />
      )}
      { dataType == "lesson_classes" && (
        <AdminAddLessonClassModal
          open={openAddModal}
          closeFunc={() => setOpenAddModal(false)}
          openFunc={() => setOpenAddModal(true)}
          updateFunc={updateFunc}
        />
      )}
    </div>
  );
};

export default TableToolbar;