export type LessonColor = '' | 'orange' | 'green' | 'azure' | 'rose';

export const lessonColorArray: LessonColor[] = ['', 'orange', 'green', 'azure', 'rose'];

export const lessonColorSets = (
  lessonColorArray.map((color) => {
    return {
      display_name: colorCheck(color).colorName,
      name: color,
      code: colorCheck(color).colorCode,
    }
  })
);

export function colorCheck (color:LessonColor | undefined) {
  switch (color) {
    case 'orange':
      return { colorName: 'オレンジ', colorCode: '#ff9800' };
    case 'green':
      return { colorName: 'グリーン', colorCode: '#4caf50' };
    case 'azure':
      return { colorName: 'ブルー', colorCode: '#00bcd4' };
    case 'rose':
      return { colorName: 'ローズ', colorCode: '#e91e63' };
    case '':
      return { colorName: 'グレー', colorCode: '#999' };
    default:
      return { colorName: 'グレー', colorCode: '#999' };
  }
};