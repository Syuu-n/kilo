import {
  Event,
  AccountCircle,
} from '@material-ui/icons';
import ScheduleView from 'views/ScheduleView';
import ProfileView from 'views/ProfileView';

export type Route = typeof mainPageRoutes[0];
const mainPageRoutes = [
  {
    path: '/schedule',
    sidebarName: 'スケジュール',
    navbarName: 'スケジュール',
    icon: Event,
    component: ScheduleView,
  },
  {
    path: '/profile',
    sidebarName: 'プロフィール',
    navbarName: 'プロフィール',
    icon: AccountCircle,
    component: ProfileView,
  },
];

export default mainPageRoutes;