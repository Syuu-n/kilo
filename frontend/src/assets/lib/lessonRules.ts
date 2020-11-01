export const lessonRuleWeekArray = [0, 1, 2, 3, 4];

export const lessonRuleWeekSets = (
  lessonRuleWeekArray.map((week) => {
    return {
      display_name: weekCheck(week),
      name: week,
    }
  })
);

export function weekCheck (week:number | undefined) {
  switch (week) {
    case 0:
      return '毎週';
    case 1:
      return '第1週目';
    case 2:
      return '第2週目';
    case 3:
      return '第3週目';
    case 4:
      return '第4週目';
    default:
      return '';
  }
};

export const lessonRuleDotwArray = [0, 1, 2, 3, 4, 5, 6];

export const lessonRuleDotwSets = (
  lessonRuleDotwArray.map((dotw) => {
    return {
      display_name: dotwCheck(dotw),
      name: dotw,
    }
  })
);

export function dotwCheck (dotw:number | undefined) {
  switch (dotw) {
    case 0:
      return '日曜日';
    case 1:
      return '月曜日';
    case 2:
      return '火曜日';
    case 3:
      return '水曜日';
    case 4:
      return '木曜日';
    case 5:
      return '金曜日';
    case 6:
      return '土曜日';
    default:
      return '';
  }
};