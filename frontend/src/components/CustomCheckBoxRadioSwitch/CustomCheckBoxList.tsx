import * as React from 'react';
import { List, ListItem, ListItemText } from '@material-ui/core';
import { CustomCheckbox } from 'components';
import customCheckBoxListStyle from 'assets/jss/material-dashboard-react/customCheckBoxListStyle';

type ColorType =
  | 'primary'
  | 'info'
  | 'success'
  | 'warning'
  | 'danger'
  | 'rose'

interface Props {
  listItems: any[];
  color?: ColorType;
}

const CustomCheckBoxList: React.FC<Props> = (props) => {
  const { listItems, color } = props;
  const classes = customCheckBoxListStyle();
  const [checked, setChecked] = React.useState([0]);

  const handleToggle = (id: number) => {
    const currentIndex = checked.indexOf(id);
    const newChecked = [...checked];
    if (currentIndex === -1) {
      newChecked.push(id);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
  };

  return (
    <List className={classes.list}>
      { listItems.map((item) =>
        <ListItem
          className={classes.listItem}
          key={item.id}
          button
          dense
          onClick={() => handleToggle(item.id)}
        >
          <CustomCheckbox
            checked={checked.indexOf(item.id) !== -1}
            color={color}
          />
          <ListItemText
            primary={item.name ? item.name : item.display_name}
            className={classes.listText}
          />
        </ListItem>
      )}
    </List>
  );
};

export default CustomCheckBoxList;