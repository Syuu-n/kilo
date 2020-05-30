import {
  Card,
  CardContent,
  CardHeader,
  withStyles,
  InputAdornment,
} from '@material-ui/core';
import {
  Email,
  Lock,
} from '@material-ui/icons';
import * as React from 'react';
import loginCardStyle from 'assets/jss/kiloStyles/loginCardStyle';
import CustomCheckbox from 'components/CustomCheckBoxRadioSwitch/CustomCheckbox';
import CustomInput from 'components/CustomInput/CustomInput';

interface Props {
  classes: {
    card: string;
    cardHeader: string;
    cardSubtitle: string;
    cardTitle: string;
    cardContent: string;
    inputIcon: string;
    rememberMeWrap: string;
  };

  headerColor?: 'orange' | 'green' | 'red' | 'blue' | 'purple';
  cardTitle?: React.ReactNode;
  cardSubtitle?: React.ReactNode;
}

class LoginCard extends React.Component<Props> {
  public static defaultProps: Partial<Props> = {
    headerColor: 'orange',
  };

  public render() {
    const {
      classes,
      headerColor,
      cardTitle,
      cardSubtitle
    } = this.props;

    return (
      <Card className={classes.card}>
        <CardHeader
          classes={{
            root:
              classes.cardHeader +
              ' ' +
              classes[headerColor + 'CardHeader'],
            title: classes.cardTitle,
            subheader: classes.cardSubtitle,
          }}
          title={cardTitle}
          subheader={cardSubtitle}
        />
        <CardContent className={classes.cardContent}>
          <CustomInput
            labelText="メールアドレス"
            formControlProps={{
                fullWidth: true,
                className: 'email-input'
            }}
            inputProps={{
              type: 'email',
              endAdornment: (<InputAdornment className={classes.inputIcon} position="start"><Email/></InputAdornment>)
            }}
          />
          <CustomInput
            labelText="パスワード"
            formControlProps={{
                fullWidth: true,
                className: 'password-input'
            }}
            inputProps={{
              type: 'password',
              endAdornment: (<InputAdornment className={classes.inputIcon} position="start"><Lock/></InputAdornment>)
            }}
          />
          <div className={classes.rememberMeWrap}>
            <CustomCheckbox
              checked={false}
            />
          </div>
        </CardContent>
      </Card>
    );
  }
}

export default withStyles(loginCardStyle)(LoginCard);