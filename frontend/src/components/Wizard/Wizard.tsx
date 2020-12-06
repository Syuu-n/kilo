import * as React from 'react';
import { WizardNavigation, Button } from 'components';
import { Card, CardHeader, CardContent, CardFooter, KSpinner } from 'components';
import wizardStyle from 'assets/jss/kiloStyles/wizardStyle';

interface Props {
  title: string;
  navs: string[];
  contents: React.ReactNode[];
  confirmRules: boolean[];
  submitFunc: Function;
}

const Wizard: React.FC<Props> = (props) => {
  const classes = wizardStyle();
  const { title, navs, contents, confirmRules, submitFunc } = props;
  const [page, setPage] = React.useState(1);
  const [isLoaded, setIsLoaded] = React.useState(true);

  const preventPage = () => {
    if (page == 1) return
    setPage(page - 1);
  };

  const nextPage = () => {
    if (page == contents.length) return
    setPage(page + 1);
  };

  const preventButtonDisplayNone = () => {
    if (page == 1) return true
    if (page == contents.length) return true
    if (isLoaded == false) return true
    return false
  };

  const nextButtonDisplayNone = () => {
    if (page == contents.length) return true
    if (isLoaded == false) return true
    return false
  };

  const handleSubmit = async () => {
    setIsLoaded(false);
    await submitFunc();
    setIsLoaded(true);
    nextPage();
  };

  return (
    <Card className={classes.card}>
      <CardHeader>
        <h4 className={classes.title}>{title}</h4>
      </CardHeader>
      <CardContent>
        <WizardNavigation
          navs={navs}
          selectedNav={page}
        />
        { isLoaded ? (
          contents[page - 1]
        ) : (
          <div className={classes.spinnerWrap}>
            <KSpinner/>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <div className={preventButtonDisplayNone() ? classes.buttonContainerEnd : classes.buttonContainer}>
          <Button
            onClick={() => preventPage()}
            customClass={preventButtonDisplayNone() ? classes.displayNone : undefined}
          >
            戻る
          </Button>
          <Button
            onClick={() => page == contents.length - 1 ? handleSubmit() : nextPage()}
            color="primary"
            disabled={!confirmRules[page]}
            customClass={nextButtonDisplayNone() ? classes.displayNone : undefined}
          >
            { page == contents.length - 1 ? ("確定") : ("次へ")}
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default Wizard;