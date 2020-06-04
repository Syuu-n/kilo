import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  SvgIcon,
  Typography,
} from '@material-ui/core';
import statsCardStyle from 'assets/jss/material-dashboard-react/statsCardStyle';
import * as React from 'react';

interface Props {
  icon: typeof SvgIcon;
  statIcon: typeof SvgIcon;

  iconColor?: 'orange' | 'green' | 'red' | 'blue' | 'purple';
  title?: React.ReactNode;
  description?: React.ReactNode;
  small?: React.ReactNode;
  statIconColor?:
    | 'warning'
    | 'primary'
    | 'danger'
    | 'success'
    | 'info'
    | 'rose'
    | 'gray';

  statLink?: {
    href: string;
    text: string;
  };
  statText?: React.ReactNode;
}

const StatsCard: React.FC<Props> = ({ icon, statIcon, iconColor='purple', title, description, small, statIconColor='gray', statLink, statText }) => {
  const classes = statsCardStyle();
  const Icon = icon;
  const StatIcon = statIcon;

  return (
    <Card className={classes.card}>
      <CardHeader
        classes={{
          root: classes.cardHeader + ' ' + classes[iconColor + 'CardHeader'],
          avatar: classes.cardAvatar,
        }}
        avatar={<Icon className={classes.cardIcon} />}
      />
      <CardContent className={classes.cardContent}>
        <Typography component="p" className={classes.cardCategory}>
          {title}
        </Typography>
        <Typography
          variant="h2"
          component="h2"
          className={classes.cardTitle}
        >
          {description}
          {small !== undefined ? (
            <small className={classes.cardTitleSmall}>{small}</small>
          ) : null}
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

export default StatsCard;
