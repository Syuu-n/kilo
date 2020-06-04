import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  SvgIcon,
  Typography,
} from '@material-ui/core';
import chartCardStyle from 'assets/jss/material-dashboard-react/chartCardStyle';
import * as React from 'react';

interface Props {
  chart: React.ReactNode;
  title?: React.ReactNode;
  text?: React.ReactNode;
  statIcon: typeof SvgIcon;
  statIconColor?:
    | 'warning'
    | 'primary'
    | 'danger'
    | 'success'
    | 'info'
    | 'rose'
    | 'gray';

  chartColor?: 'orange' | 'green' | 'red' | 'blue' | 'purple';
  statLink?: {
    href: string;
    text: string;
  };
  statText?: React.ReactNode;
}

const ChartCard: React.FC<Props> = ({ chart, title, text, statIcon, statIconColor='gray', chartColor='purple', statLink, statText }) => {
  const classes = chartCardStyle();
  const StatIcon = statIcon;

  return (
    <Card className={classes.card}>
      <CardHeader
        className={
          classes.cardHeader + ' ' + classes[chartColor + 'CardHeader']
        }
        subheader={chart}
      />
      <CardContent className={classes.cardContent}>
        <Typography
          variant="h4"
          component="h4"
          className={classes.cardTitle}
        >
          {title}
        </Typography>
        <Typography component="p" className={classes.cardCategory}>
          {text}
        </Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <div className={classes.cardStats}>
          <StatIcon
            className={
              classes.cardStatsIcon +
              ' ' +
              classes[statIconColor + 'CardStatsIcon']
            }
          />
          {statLink !== undefined ? (
            <a href={statLink.href} className={classes.cardStatsLink}>
              {statLink.text}
            </a>
          ) : statText !== undefined ? (
            statText
          ) : null}
        </div>
      </CardActions>
    </Card>
  );
}

export default ChartCard;
