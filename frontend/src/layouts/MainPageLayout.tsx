import * as React from 'react';
import { Route, RouteProps, Switch, Redirect } from 'react-router-dom';
import {
  Sidebar,
  Header,
} from 'components';
import mainPageRoutes from 'routes/mainPageRoutes';
import mainPageLayoutStyle from 'assets/jss/kiloStyles/mainPageLayoutStyle';
import PerfectScrollbar from 'perfect-scrollbar';
import 'perfect-scrollbar/css/perfect-scrollbar.css';
import { AuthContext } from 'Auth';

const MainPageLayout: React.FC<RouteProps> = (props) => {
  let mainPanel: HTMLDivElement | null = null;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const { ...rest } = props;
  const classes = mainPageLayoutStyle();
  const { currentUser } = React.useContext(AuthContext);

  const switchRoutes = (
    <Switch>
      {mainPageRoutes.map((props, key) =>{
        if (props.redirect) {
          return <Redirect from={props.path} to={props.to} key={key}/>;
        }
        if (props.nestedRoot) {
          return
        }
        if (props.childRoute) {
          if (currentUser?.role === 'admin') {
            return <Route path={props.path} component={props.component} key={key} />;
          } else {
            return
          }
        }
        return <Route path={props.path} component={props.component} key={key} />;
      })}
    </Switch>
  );

  function handleDrawerToggle() {
    setMobileOpen(!mobileOpen);
  }

  React.useEffect(() => {
    if (!mainPanel) {
      throw new Error('mainPanel ref missing');
    }

    if (navigator.platform.indexOf('Win') > -1) {
      // tslint:disable-next-line:no-unused-expression
      new PerfectScrollbar(mainPanel);
    }

    if (mainPanel) {
      mainPanel.scrollTop = 0;
    }
  });

  return (
    <div className={classes.wrapper}>
      <Sidebar
        routes={mainPageRoutes}
        handleDrawerToggle={handleDrawerToggle}
        open={mobileOpen}
        color='purple'
        isAdmin={currentUser?.role === 'admin'}
        {...rest}
      />
      <div className={classes.mainPanel} ref={ref => (mainPanel = ref)}>
        <Header
          routes={mainPageRoutes}
          handleDrawerToggle={handleDrawerToggle}
          {...rest}
        />
        <div className={classes.content}>
          <div className={classes.container}>{switchRoutes}</div>
        </div>
      </div>
    </div>
  );
}

export default MainPageLayout;