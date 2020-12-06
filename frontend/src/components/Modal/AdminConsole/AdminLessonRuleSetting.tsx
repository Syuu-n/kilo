import * as React from 'react';
import { adminModalStyle, pickerTheme } from 'assets/jss/kiloStyles/adminModalStyle';
import { lessonRuleWeekSets, lessonRuleDotwSets, weekCheck, dotwCheck, MomentLessonRule } from 'assets/lib/lessonRules';
import MomentUtils from '@date-io/moment';
import * as moment from 'moment';
import { ThemeProvider } from '@material-ui/core';
import { TimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { Card, CardContent, IconButton, CustomDropDown, AdminFormInput } from 'components';
import { AddCircle, RemoveCircle } from '@material-ui/icons';
import cx from 'classnames';

interface Props {
  lessonRules: MomentLessonRule[];
  setLessonRuleFunc?: Function;
  confirm?: boolean;
};

const AdminLessonRuleSetting: React.FC<Props> = (props) => {
  const { lessonRules, setLessonRuleFunc, confirm } = props;
  const classes = adminModalStyle();
  const newLessonRule = {week: -1, dotw: -1, start_at: moment(), end_at: moment().add(1, 'hour')} as MomentLessonRule;

  const handleLessonRuleChange = (count:number, week?:number, dotw?:number, startAt?:moment.Moment|null, endAt?:moment.Moment|null) => {
    // lessonRules のディープコピー
    let lrs = lessonRules.filter((lr) => true);
    const lr = {
      week: week != undefined ? week : lrs[count].week,
      dotw: dotw != undefined ? dotw : lrs[count].dotw,
      start_at: startAt ? startAt : lrs[count].start_at,
      end_at: endAt ? endAt : lrs[count].end_at,
    };
    lrs[count] = lr;
    if (setLessonRuleFunc) {
      setLessonRuleFunc(lrs);
    };
  };

  const handleAddLessonRule = () => {
    const lrs = lessonRules.filter(() => true);
    lrs.push(newLessonRule);
    if (setLessonRuleFunc) {
      setLessonRuleFunc(lrs);
    };
  };

  const handleRemoveLessonRule = (index:number) => {
    const lrs = lessonRules.filter(() => true);
    // 削除ボタンが押された要素を削除する
    if (lrs[index]) {
      lrs.splice(index, 1);
    }
    if (setLessonRuleFunc) {
      setLessonRuleFunc(lrs);
    };
  };

  return (
    <div>
      { lessonRules.map((lr, i) => (
        <Card key={i}>
          <CardContent>
            <div className={classes.ruleSettingTitleContainer}>
              <p className={cx(
                  {[classes.disableTextColor]: confirm},
                  classes.ruleSettingTitle
                )}
              >
                スケジュール設定
              </p>
              {/* 最初のスケジュール設定には削除ボタンを追加しない */}
              { i != 0 && !confirm && (
                <IconButton
                  color="white"
                  customClass={classes.ruleSettingCloseButton}
                  key="Close"
                  onClick={() => handleRemoveLessonRule(i)}
                >
                  <RemoveCircle/>
                </IconButton>
              )}
            </div>
            { confirm ? (
              <div className={classes.flexMarginBottomContainer}>
                <AdminFormInput
                  labelText="週"
                  inputType="text"
                  value={weekCheck(lr.week)}
                  confirm
                />
                <AdminFormInput
                  labelText="曜日"
                  inputType="text"
                  value={dotwCheck(lr.dotw)}
                  confirm
                />
              </div>
            ) : (
              <div className={classes.flexMarginBottomContainer}>
                <CustomDropDown
                  dropdownList={lessonRuleWeekSets}
                  hoverColor="success"
                  buttonText={lr.week == -1 ? '週を選択' : weekCheck(lr.week)}
                  onClick={(value:any) => handleLessonRuleChange(i, value.name)}
                  buttonProps={{color: "success", fullWidth: true}}
                  fullWidth
                  customClass={classes.flexContainerFirst}
                  miniButton
                />
                <CustomDropDown
                  dropdownList={lessonRuleDotwSets}
                  hoverColor="success"
                  buttonText={lr.dotw == -1 ? '曜日を選択' : dotwCheck(lr.dotw)}
                  onClick={(value:any) => handleLessonRuleChange(i, undefined, value.name)}
                  buttonProps={{color: "success", fullWidth: true}}
                  fullWidth
                  miniButton
                />
              </div>
            )}
            { confirm ? (
              <div className={classes.flexContainer}>
                <AdminFormInput
                  labelText="開始時間"
                  inputType="text"
                  value={lr.start_at.format("H時 m分")}
                  confirm
                />
                <AdminFormInput
                  labelText="終了時間"
                  inputType="text"
                  value={lr.end_at.format("H時 m分")}
                  confirm
                />
              </div>
            ) : (
              <div className={classes.flexContainer}>
                <ThemeProvider theme={pickerTheme}>
                  <MuiPickersUtilsProvider utils={MomentUtils}>
                    <TimePicker
                      showTodayButton
                      todayLabel="現在時刻"
                      okLabel="決定"
                      cancelLabel="キャンセル"
                      label="開始時間"
                      value={lr.start_at}
                      onChange={(date:moment.Moment|null) => handleLessonRuleChange(i, undefined, undefined, date)}
                      format="H時 m分"
                      ampm={false}
                      className={classes.flexContainerFirst}
                    />
                    <TimePicker
                      showTodayButton
                      todayLabel="現在時刻"
                      okLabel="決定"
                      cancelLabel="キャンセル"
                      label="終了時間"
                      value={lr.end_at}
                      onChange={(date:moment.Moment|null) => handleLessonRuleChange(i, undefined, undefined, undefined ,date)}
                      format="H時 m分"
                      ampm={false}
                    />
                  </MuiPickersUtilsProvider>
                </ThemeProvider>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
      { !confirm && (
        <div className={classes.flexContainer}>
          <IconButton
          color="white"
          key="Close"
          onClick={() => handleAddLessonRule()}
          >
            <AddCircle />
          </IconButton>
        </div>
      )}
    </div>
  );
};

export default AdminLessonRuleSetting;