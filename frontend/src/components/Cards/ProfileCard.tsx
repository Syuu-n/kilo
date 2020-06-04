import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Typography,
} from '@material-ui/core';
import profileCardStyle from 'assets/jss/material-dashboard-react/profileCardStyle';
import * as React from 'react';

interface Props {
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  description?: React.ReactNode;
  footer?: React.ReactNode;
  avatar?: string;
}

const ProfileCard: React.FC<Props> = ({ title, subtitle, description, footer, avatar }) => {
  const classes = profileCardStyle();

  return (
    <Card className={classes.card}>
      <CardHeader
        classes={{
          root: classes.cardHeader,
          avatar: classes.cardAvatar,
        }}
        avatar={<img src={avatar} alt="..." className={classes.img} />}
      />
      <CardContent className={classes.textAlign}>
        {subtitle !== undefined ? (
          <Typography component="h6" className={classes.cardSubtitle}>
            {subtitle}
          </Typography>
        ) : null}
        {title !== undefined ? (
          <Typography component="h4" className={classes.cardTitle}>
            {title}
          </Typography>
        ) : null}
        {description !== undefined ? (
          <Typography component="p" className={classes.cardDescription}>
            {description}
          </Typography>
        ) : null}
      </CardContent>
      <CardActions className={classes.textAlign + ' ' + classes.cardActions}>
        {footer}
      </CardActions>
    </Card>
  );
}

export default ProfileCard;
