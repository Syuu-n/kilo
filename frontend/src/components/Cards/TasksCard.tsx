import {
  Card,
  CardContent,
  CardHeader,
  Tab,
  Tabs,
  Typography
} from '@material-ui/core';
import { BugReport, Cloud, Code } from '@material-ui/icons';
import tasksCardStyle from 'assets/jss/material-dashboard-react/tasksCardStyle';
import { Tasks } from 'components';
import * as React from 'react';
import { bugs, server, website } from 'variables/general';

const TasksCard: React.FC = () => {
  const [value, setValue] = React.useState(0);
  const classes = tasksCardStyle();

  return (
    <Card className={classes.card}>
      <CardHeader
        classes={{
          root: classes.cardHeader,
          title: classes.cardTitle,
          content: classes.cardHeaderContent,
        }}
        title="Tasks:"
        action={
          <Tabs
            classes={{
              flexContainer: classes.tabsContainer,
              indicator: classes.displayNone,
            }}
            value={value}
            onChange={handleChange}
            textColor="inherit"
          >
            <Tab
              classes={{
                wrapper: classes.tabWrapper,
                labelIcon: classes.labelIcon,
                root: classes.label,
              }}
              icon={<BugReport className={classes.tabIcon} />}
              label="Bugs"
            />
            <Tab
              classes={{
                wrapper: classes.tabWrapper,
                labelIcon: classes.labelIcon,
                root: classes.label,
              }}
              icon={<Code className={classes.tabIcon} />}
              label="Website"
            />
            <Tab
              classes={{
                wrapper: classes.tabWrapper,
                labelIcon: classes.labelIcon,
                root: classes.label,
              }}
              icon={<Cloud className={classes.tabIcon} />}
              label="Server"
            />
          </Tabs>
        }
      />
      <CardContent>
        {value === 0 && (
          <Typography component="div">
            <Tasks
              checkedIndexes={[0, 3]}
              tasksIndexes={[0, 1, 2, 3]}
              tasks={bugs}
            />
          </Typography>
        )}
        {value === 1 && (
          <Typography component="div">
            <Tasks
              checkedIndexes={[0]}
              tasksIndexes={[0, 1]}
              tasks={website}
            />
          </Typography>
        )}
        {value === 2 && (
          <Typography component="div">
            <Tasks
              checkedIndexes={[1]}
              tasksIndexes={[0, 1, 2]}
              tasks={server}
            />
          </Typography>
        )}
      </CardContent>
    </Card>
  );

  function handleChange(event: React.ChangeEvent<{}>, value: any) {
    if (typeof value === 'number') {
      setValue(value);
    }
  }
}

export default TasksCard;
