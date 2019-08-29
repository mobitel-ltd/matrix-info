import Home from 'pages/home';
import Actions from 'components/Actions';
import Statistics from 'components/Statistics';

const menuRoutes = [
  {
    key: 'actions',
    component: Actions,
    path: '/actions',
    title: 'Управление аккаунтом MATRIX',
    subTitle: 'Действия',
    icon: 'ordered-list',
  },
  {
    key: 'statistics',
    component: Statistics,
    path: '/statistics',
    title: 'Управление аккаунтом MATRIX',
    subTitle: 'Статистика',
    icon: 'idcard',
  },
];

const siteRoutes = [
  {
    key: 'home',
    component: Home,
    exact: true,
    path: '/',
    title: 'Управление аккаунтом MATRIX',
    subTitle: 'Dashboard',
  },
];

const isNeededRoute = (route, pathname) => route.path === pathname || `${route.path}/` === pathname;

const findRoute = (routesArr, pathname) =>
  routesArr.find(route => {
    return (
      (route.nested && route.routes.find(nestedRoute => isNeededRoute(nestedRoute, pathname))) ||
      isNeededRoute(route, pathname)
    );
  });

const getMenuRoute = pathname => findRoute(menuRoutes, pathname);

const getRoute = pathname => findRoute([...siteRoutes, ...menuRoutes], pathname);

export { menuRoutes, siteRoutes, getRoute, getMenuRoute };
