import * as React from 'react';
import {
  LibraryBooks,
  PlaylistAdd,
} from '@material-ui/icons';
import {
  RichTableCard,
  KSpinner,
  ItemGrid,
} from 'components';
import { Grid,} from '@material-ui/core';
import { LessonClass } from 'responses/responseStructs';
import { getLessonClasses } from 'request/methods/lessonClasses';
import usersViewStyle from 'assets/jss/kiloStyles/classesViewStyle';

const ClassesView: React.FC = () => {
  const [lessonClasses, setLessonClasses] = React.useState<LessonClass[]>();
  const styleClasses = usersViewStyle();

  const lessonClassesUpdateFunc = async () => {
    const lessonClasses = await getLessonClasses();
    if (lessonClasses) setLessonClasses(lessonClasses);
  };

  React.useEffect(() => {
    lessonClassesUpdateFunc();
  }, []);

  return(
    <Grid container>
      <ItemGrid xs={12}>
        { lessonClasses ? (
          <RichTableCard
            icon={LibraryBooks}
            addIcon={PlaylistAdd}
            headerColor="green"
            tableHeaderColor="success"
            cardTitle="クラス"
            tableHead={["ID", "名前", "説明", "種類", "カラー"]}
            tableSources={lessonClasses}
            updateFunc={lessonClassesUpdateFunc}
            dataType="lesson_classes"
          >
          </RichTableCard>
        ) : (
          <div className={styleClasses.spinnerWrap}>
            <KSpinner color="success"/>
          </div>
        )}
      </ItemGrid>
    </Grid>
  );
};

export default ClassesView;