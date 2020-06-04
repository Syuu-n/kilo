import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
} from '@material-ui/core';
import regularCardStyle from 'assets/jss/material-dashboard-react/regularCardStyle';
import * as cx from 'classnames';
import * as React from 'react';

interface Props {
  plainCard?: boolean;
  headerColor?: 'orange' | 'green' | 'red' | 'blue' | 'purple';
  cardTitle?: React.ReactNode;
  cardSubtitle?: React.ReactNode;
  content?: React.ReactNode;
  footer?: React.ReactNode;
}

const RegularCard: React.FC<Props> = ({ plainCard, headerColor='purple', cardTitle, cardSubtitle, content, footer }) => {
  const classes = regularCardStyle();

  const plainCardClasses = cx({
    [' ' + classes.cardPlain]: plainCard,
  });

  const cardPlainHeaderClasses = cx({
    [' ' + classes.cardPlainHeader]: plainCard,
  });

  return (
    <Card className={classes.card + plainCardClasses}>
      <CardHeader
        classes={{
          root:
            classes.cardHeader +
            ' ' +
            classes[headerColor + 'CardHeader'] +
            cardPlainHeaderClasses,
          title: classes.cardTitle,
          subheader: classes.cardSubtitle,
        }}
        title={cardTitle}
        subheader={cardSubtitle}
      />
      <CardContent>{content}</CardContent>
      {footer !== undefined ? (
        <CardActions className={classes.cardActions}>{footer}</CardActions>
      ) : null}
    </Card>
  );
}

export default RegularCard;
