import * as React from 'react';
import { User } from 'responses/responseStructs';

interface Props {
  user: User;
}

const LessonCounter: React.SFC<Props> = (props) => {
  const { user } = props;

  return (
    <div>
      <p>今月の参加状況： {user.current_monthly_count}/{user.plan.monthly_lesson_count}</p>
      { user.remaining_monthly_count == 0 ? (
        <p>今月は上限に達しているためこれ以上参加できません。<br></br>参加数を増やす場合は既に参加中のレッスンを取り消ししてください。</p>
      ) : (
        <p>残り {user.remaining_monthly_count} 回参加が可能です。</p>
      )}
    </div>
  )
};

export default LessonCounter;