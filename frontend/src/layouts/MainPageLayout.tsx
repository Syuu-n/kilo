import * as React from 'react';
import { Route, RouteProps, Switch } from 'react-router-dom';
import {
  Sidebar,
  Header,
} from 'components';
import mainPageRoutes from 'routes/mainPageRoutes';
import mainPageLayoutStyle from 'assets/jss/kiloStyles/mainPageLayoutStyle';

const switchRoutes = (
  <Switch>
    {mainPageRoutes.map((props, key) =>{
      return <Route path={props.path} component={props.component} key={key} />
    })}
  </Switch>
);

const MainPageLayout: React.FC<RouteProps> = (props) => {
  const { ...rest } = props;
  const classes = mainPageLayoutStyle();

  function handleDrawerToggle() {
    console.log('handleDrawerToggle!');
  }

  return (
    <div className={classes.wrapper}>
      <Sidebar
        routes={mainPageRoutes}
        handleDrawerToggle={handleDrawerToggle}
        open={false}
        color='purple'
        {...rest}
      />
      <div className={classes.mainPanel}>
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