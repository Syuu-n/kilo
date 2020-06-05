import logo from 'assets/img/reactlogo.png';
import image from 'assets/img/sidebar-2.jpg';
import appStyle from 'assets/jss/material-dashboard-react/appStyle';
import { Footer, Header, Sidebar } from 'components';
// creates a beautiful scrollbar
import PerfectScrollbar from 'perfect-scrollbar';
import 'perfect-scrollbar/css/perfect-scrollbar.css';
import * as React from 'react';
import { Redirect, Route, RouteProps, Switch } from 'react-router-dom';
import dashboardRoutes from 'routes/dashboard';

const switchRoutes = (
  <Switch>
    {dashboardRoutes.map((prop, key) => {
      if (prop.redirect) {
        return <Redirect from={prop.path} to={prop.to} key={key} />;
      }

      return <Route path={prop.path} component={prop.component} key={key} />;
    })}
  </Switch>
);

const App: React.FC<RouteProps> = (props) => {
  let mainPanel: HTMLDivElement | null = null;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const { ...rest } = props;
  const classes = appStyle();

  function handleDrawerToggle() {
    setMobileOpen(!mobileOpen);
  }

  function getRoute() {
    const { location } = props;

    return location && location.pathname !== '/maps';
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
        routes={dashboardRoutes}
        logoText={'Creative Tim'}
        logo={logo}
        image={image}
        handleDrawerToggle={handleDrawerToggle}
        open={mobileOpen}
        color="blue"
        {...rest}
      />
      <div className={classes.mainPanel} ref={ref => (mainPanel = ref)}>
        <Header
          routes={dashboardRoutes}
          handleDrawerToggle={handleDrawerToggle}
          {...rest}
        />
        {/*
            On the /maps route we want the map to be on full screen
            this is not possible if the content and conatiner classes are present
            because they have some paddings which would make the map smaller
          */}
        {getRoute() ? (
          <div className={classes.content}>
            <div className={classes.container}>{switchRoutes}</div>
          </div>
        ) : (
          <div className={classes.map}>{switchRoutes}</div>
        )}
        {getRoute() && <Footer />}
      </div>
    </div>
  );
}

export default App;
