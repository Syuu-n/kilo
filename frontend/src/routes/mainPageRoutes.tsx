import {
  Event,
  AccountCircle,
  People,
  VerifiedUser,
  LibraryBooks,
  LocalAtm,
  EventNote,
} from '@material-ui/icons';
import ScheduleView from 'views/ScheduleView';
import ProfileView from 'views/ProfileView';
import UsersView from 'views/AdminConsoleViews/UsersView';
import ClassesView from 'views/AdminConsoleViews/ClassesView';

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
  {
    path: '/admin_console',
    sidebarName: 'マネージメント',
    navbarName: 'マネージメント',
    icon: VerifiedUser,
    nestedRoot: true,
  },
  {
    path: '/users',
    sidebarName: 'ユーザー',
    navbarName: 'ユーザー',
    icon: People,
    component: UsersView,
    childRoute: true,
  },
  {
    path: '/classes',
    sidebarName: 'クラス',
    navbarName: 'クラス',
    icon: LibraryBooks,
    component: ClassesView,
    childRoute: true,
  },
  {
    path: '/courses',
    sidebarName: 'コース',
    navbarName: 'コース',
    icon: LocalAtm,
    component: UsersView,
    childRoute: true,
  },
  {
    path: '/lessons',
    sidebarName: 'レッスン',
    navbarName: 'レッスン',
    icon: EventNote,
    component: UsersView,
    childRoute: true,
  },
  {
    path: '/',
    navbarName: 'Redirect',
    redirect: true,
    to: '/schedule',
  },
];

export default mainPageRoutes;