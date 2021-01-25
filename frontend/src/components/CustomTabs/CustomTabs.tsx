import * as React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";

// material-ui components
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
// core components
import { Card, CardContent, CardHeader } from 'components';

import customTabStyles from "assets/jss/material-dashboard-react/customTabsStyle";

interface tabContent {
  tabName: string;
  tabShortName?: string;
  tabIcon?: any;
  tabContent: React.ReactNode;
}

interface Props {
  headerColor?:
    "orange"|
    "green"|
    "red"|
    "blue"|
    "purple"|
    "rose",
  title?: string;
  tabs: tabContent[];
  rtlActive?: boolean;
  noPadding?: boolean;
}

const CustomTabs: React.FC<Props> = (props) => {
  const [value, setValue] = React.useState(0);
  const handleChange = (event:any, value:any) => {
    setValue(value);
  };
  const classes = customTabStyles();
  const { headerColor, tabs, title, rtlActive, noPadding } = props;
  const cardTitle = classNames({
    [classes.cardTitle]: true,
    [classes.cardTitleRTL]: rtlActive
  });
  return (
    <Card>
      <CardHeader color={headerColor} className={classes.cardHeader}>
        {title !== undefined ? <div className={cardTitle}>{title}</div> : null}
        <Tabs
          value={value}
          onChange={handleChange}
          classes={{
            root: classes.tabsRoot,
            indicator: classes.displayNone,
            scrollButtons: classes.displayNone
          }}
          variant="scrollable"
          scrollButtons="auto"
        >
          {tabs.map((prop, key) => {
            return (
              <Tab
                classes={{
                  root: classes.tabRootButton,
                  selected: classes.tabSelected,
                  wrapper: classes.tabWrapper
                }}
                key={key}
                label={
                  <React.Fragment>
                    <span className={classes.tabName}>{prop.tabName}</span>
                    <span className={classes.tabShortName}>{prop.tabShortName}</span>
                  </React.Fragment>
                }
                icon={prop.tabIcon ? <prop.tabIcon /> : undefined}
              />
            );
          })}
        </Tabs>
      </CardHeader>
      <CardContent className={noPadding ? classes.noPadding : undefined}>
        {tabs.map((prop, key) => {
          if (key === value) {
            return <div key={key}>{prop.tabContent}</div>;
          }
          return null;
        })}
      </CardContent>
    </Card>
  );
}

export default CustomTabs;