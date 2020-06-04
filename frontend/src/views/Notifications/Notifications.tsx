import { Grid } from '@material-ui/core';
import { AddAlert } from '@material-ui/icons';
import {
  A,
  Button,
  ItemGrid,
  P,
  RegularCard,
  Small,
  Snackbar,
  SnackbarContent,
} from 'components';
import * as React from 'react';

const Notifications: React.FC = () => {
  const [tl, setTl] = React.useState<boolean>(false);
  const [tc, setTc] = React.useState<boolean>(false);
  const [tr, setTr] = React.useState<boolean>(false);
  const [bl, setBl] = React.useState<boolean>(false);
  const [bc, setBc] = React.useState<boolean>(false);
  const [br, setBr] = React.useState<boolean>(false);

  return (
    <RegularCard
      cardTitle="Notifications"
      cardSubtitle={
        <P>
          Handcrafted by our friends from{' '}
          <A target="_blank" href="https://material-ui-next.com/">
            Material UI
          </A>{' '}
          and styled by{' '}
          <A target="_blank" href="https://www.creative-tim.com/">
            Creative Tim
          </A>. Please checkout the{' '}
          <A href="#pablo" target="_blank">
            full documentation
          </A>.
        </P>
      }
      content={
        <div>
          <Grid container>
            <ItemGrid xs={12} sm={12} md={6}>
              <h5>Notifications Style</h5>
              <br />
              <SnackbarContent message="This is a plain notification" />
              <SnackbarContent
                message="This is a notification with close button."
                close
              />
              <SnackbarContent
                message="This is a notification with close button and icon."
                close
                icon={AddAlert}
              />
              <SnackbarContent
                // tslint:disable-next-line:max-line-length
                message="This is a notification with close button and icon and have many lines. You can see that the icon and the close button are always vertically aligned. This is a beautiful notification. So you don't have to worry about the style."
                close
                icon={AddAlert}
              />
            </ItemGrid>
            <ItemGrid xs={12} sm={12} md={6}>
              <h5>Notifications States</h5>
              <br />
              <SnackbarContent
                message={
                  'INFO - This is a regular notification made with color="info"'
                }
                close
                color="info"
              />
              <SnackbarContent
                message={
                  'SUCCESS - This is a regular notification made with color="success"'
                }
                close
                color="success"
              />
              <SnackbarContent
                message={
                  'WARNING - This is a regular notification made with color="warning"'
                }
                close
                color="warning"
              />
              <SnackbarContent
                message={
                  'DANGER - This is a regular notification made with color="danger"'
                }
                close
                color="danger"
              />
              <SnackbarContent
                message={
                  'PRIMARY - This is a regular notification made with color="primary"'
                }
                close
                color="primary"
              />
            </ItemGrid>
          </Grid>
          <br />
          <br />
          <Grid container justify="center">
            <ItemGrid xs={12} sm={12} md={6} style={{ textAlign: 'center' }}>
              <h5>
                Notifications Places
                <Small>Click to view notifications</Small>
              </h5>
            </ItemGrid>
          </Grid>
          <Grid container justify="center">
            <ItemGrid xs={12} sm={12} md={10} lg={8}>
              <Grid container>
                <ItemGrid xs={12} sm={12} md={4}>
                  <Button
                    fullWidth
                    color="primary"
                    onClick={() => showNotification('tl')}
                  >
                    Top Left
                  </Button>
                  <Snackbar
                    place="tl"
                    color="info"
                    icon={AddAlert}
                    message="Welcome to MATERIAL DASHBOARD React - a beautiful freebie for every web developer."
                    open={tl}
                    closeNotification={() => setTl(false)}
                    close
                  />
                </ItemGrid>
                <ItemGrid xs={12} sm={12} md={4}>
                  <Button
                    fullWidth
                    color="primary"
                    onClick={() => showNotification('tc')}
                  >
                    Top Center
                  </Button>
                  <Snackbar
                    place="tc"
                    color="info"
                    icon={AddAlert}
                    message="Welcome to MATERIAL DASHBOARD React - a beautiful freebie for every web developer."
                    open={tc}
                    closeNotification={() => setTc(false)}
                    close
                  />
                </ItemGrid>
                <ItemGrid xs={12} sm={12} md={4}>
                  <Button
                    fullWidth
                    color="primary"
                    onClick={() => showNotification('tr')}
                  >
                    Top Right
                  </Button>
                  <Snackbar
                    place="tr"
                    color="info"
                    icon={AddAlert}
                    message="Welcome to MATERIAL DASHBOARD React - a beautiful freebie for every web developer."
                    open={tr}
                    closeNotification={() => setTr(false)}
                    close
                  />
                </ItemGrid>
              </Grid>
            </ItemGrid>
          </Grid>
          <Grid container justify={'center'}>
            <ItemGrid xs={12} sm={12} md={10} lg={8}>
              <Grid container>
                <ItemGrid xs={12} sm={12} md={4}>
                  <Button
                    fullWidth
                    color="primary"
                    onClick={() => showNotification('bl')}
                  >
                    Bottom Left
                  </Button>
                  <Snackbar
                    place="bl"
                    color="info"
                    icon={AddAlert}
                    message="Welcome to MATERIAL DASHBOARD React - a beautiful freebie for every web developer."
                    open={bl}
                    closeNotification={() => setBl(false)}
                    close
                  />
                </ItemGrid>
                <ItemGrid xs={12} sm={12} md={4}>
                  <Button
                    fullWidth
                    color="primary"
                    onClick={() => showNotification('bc')}
                  >
                    Bottom Center
                  </Button>
                  <Snackbar
                    place="bc"
                    color="info"
                    icon={AddAlert}
                    message="Welcome to MATERIAL DASHBOARD React - a beautiful freebie for every web developer."
                    open={bc}
                    closeNotification={() => setBc(false)}
                    close
                  />
                </ItemGrid>
                <ItemGrid xs={12} sm={12} md={4}>
                  <Button
                    fullWidth
                    color="primary"
                    onClick={() => showNotification('br')}
                  >
                    Bottom Right
                  </Button>
                  <Snackbar
                    place="br"
                    color="info"
                    icon={AddAlert}
                    message="Welcome to MATERIAL DASHBOARD React - a beautiful freebie for every web developer."
                    open={br}
                    closeNotification={() => setBr(false)}
                    close
                  />
                </ItemGrid>
              </Grid>
            </ItemGrid>
          </Grid>
        </div>
      }
    />
  );

  function showNotification(place: string) {
    /*
    * https://github.com/Microsoft/TypeScript/issues/13948#issuecomment-394527009
    *
    * Seems to be some issue here when using [dynamic] properties in setState
    * Issue is milestone'd for TS 3.0 release
    */

    function statementSet(statement: boolean) {
      switch (place) {
        case 'tl':
          setTl(statement);
          break;
        case 'tc':
          setTc(statement);
          break;
        case 'tr':
          setTr(statement);
          break;
        case 'bl':
          setBl(statement);
          break;
        case 'bc':
          setBc(statement);
          break;
        case 'br':
          setBr(statement);
          break;
      }
    }

    // @ts-ignore
    statementSet(true);

    // @ts-ignore
    setTimeout(() => statementSet(false), 6000);
  }
}

export default Notifications;
