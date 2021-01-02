import * as React from 'react';
import {
  LibraryBooks,
  PlaylistAdd,
} from '@material-ui/icons';
import {
  RichTableCard,
  KSpinner,
} from 'components';
import { fetchApp, NetworkError } from 'request/fetcher';
import { LessonClass } from 'responses/responseStructs';
import usersViewStyle from 'assets/jss/kiloStyles/classesViewStyle';

const ClassesView: React.FC = () => {
  const [lessonClasses, setLessonClasses] = React.useState<LessonClass[]>();
  const styleClasses = usersViewStyle();

  const getLessonClasses = async (): Promise<LessonClass[] | null> => {
    const accessToken = localStorage.getItem('kiloToken');
    if (!accessToken) {
      return null;
    }

    const res = await fetchApp(
      '/v1/lesson_classes',
      'GET',
      accessToken,
    )

    if (res instanceof NetworkError) {
      console.log("ServerError");
      return null;
    }

    if (res.ok) {
      const json = await res.json();
      return json;
    } else {
      return null;
    }
  };

  const lessonClassesUpdateFunc = async () => {
    const lessonClasses = await getLessonClasses();
    if (lessonClasses) setLessonClasses(lessonClasses);
  };

  React.useEffect(() => {
    lessonClassesUpdateFunc();
  }, []);

  return(
    <div>
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
    </div>

  );
};

export default ClassesView;