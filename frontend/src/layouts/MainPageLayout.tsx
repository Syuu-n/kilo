import * as React from 'react';
import { Route, RouteProps, Switch } from 'react-router-dom';
import {
  Sidebar,
  Header,
} from 'components';
import mainPageRoutes from 'routes/mainPageRoutes';
import logo from 'assets/img/reactlogo.png';
// import { primaryColor } from 'assets/jss/material-dashboard-react';

const switchRoutes = (
  <Switch>
    {mainPageRoutes.map((props, key) =>{
      return <Route path={props.path} component={props.component} key={key} />
    })}
  </Switch>
);

const MainPageLayout: React.FC<RouteProps> = (props) => {
  const { ...rest } = props;

  function handleDrawerToggle() {
    console.log('handleDrawerToggle!');
  }

  return (
    <div>
      <Sidebar
        routes={mainPageRoutes}
        logoText={'K Dance Classic Studio'}
        logo={logo}
        handleDrawerToggle={handleDrawerToggle}
        open={false}
        color='purple'
        {...rest}
      />
      <div>
        <Header
          routes={mainPageRoutes}
          handleDrawerToggle={handleDrawerToggle}
          {...rest}
        />
        <div>
          <div>{switchRoutes}</div>
        </div>
      </div>
    </div>
  );
}

export default MainPageLayout;