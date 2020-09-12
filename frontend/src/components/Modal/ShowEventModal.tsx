import * as React from 'react';
import { Event } from 'react-big-calendar';
import * as moment from 'moment';
import {
  Modal,
  Table,
} from 'components';

interface Props {
  open: boolean;
  selectedEvent: Event|undefined;
  isAdmin: boolean;
  closeFunc: Function;
}

const ShowEventModal: React.FC<Props> = (props) => {
  const { open, selectedEvent, isAdmin, closeFunc } = props;

  return(
    <Modal
      open={open}
      headerTitle="レッスン詳細"
      content={
        <Table
          tableData={[
            ["クラス名", selectedEvent?.title],
            ["開始時間", moment(selectedEvent?.start).format("YYYY年 MM月 DD日 HH時 mm分")],
            ["終了時間", moment(selectedEvent?.end).format("YYYY年 MM月 DD日 HH時 mm分")],
          ]}
        />
      }
      submitText="参加"
      submitFunc={() => {console.log(isAdmin)}}
      closeFunc={() => {closeFunc()}}
    />
  );
};

export default ShowEventModal;