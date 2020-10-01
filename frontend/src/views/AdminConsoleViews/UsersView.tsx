import * as React from 'react';
import {
  People,
} from '@material-ui/icons';
import {
  RichTableCard,
} from 'components';

const UsersView: React.SFC = () => {
  return(
    <RichTableCard
      icon={People}
      headerColor="green"
      cardTitle="ユーザー"
      tableHead={["aa", "bb"]}
      tableData={[["cc", "dd"], ["ee", "ff"]]}
    >
    </RichTableCard>
  );
};

export default UsersView;