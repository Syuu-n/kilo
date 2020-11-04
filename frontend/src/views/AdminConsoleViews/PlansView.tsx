import * as React from 'react';
import {
  LocalAtm,
  PlaylistAdd,
} from '@material-ui/icons';
import {
  RichTableCard,
  KSpinner,
} from 'components';
import { fetchApp, NetworkError } from 'request/fetcher';
import { Plan } from 'responses/responseStructs';
import viewStyle from 'assets/jss/kiloStyles/classesViewStyle';

const PlansView: React.FC = () => {
  const [plans, setPlans] = React.useState<Plan[]>();
  const styleClasses = viewStyle();

  const getPlans = async (): Promise<Plan[] | null> => {
    const accessToken = localStorage.getItem('kiloToken');
    if (!accessToken) {
      return null;
    }

    const res = await fetchApp(
      '/v1/plans',
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

  const plansUpdateFunc = async () => {
    const p = await getPlans();
    if (p) setPlans(p);
  };

  React.useEffect(() => {
    plansUpdateFunc();
  }, []);

  return(
    <div>
      { plans ? (
        <RichTableCard
          icon={LocalAtm}
          addIcon={PlaylistAdd}
          headerColor="green"
          tableHeaderColor="success"
          cardTitle="コース"
          tableHead={["ID", "名前", "料金", "参加回数", "種類"]}
          tableSources={plans}
          updateFunc={plansUpdateFunc}
          dataType="plans"
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

export default PlansView;