import MainLayout from '../layouts/MainLayout';
import Index from '../pages/Index';
import Login from '../pages/user/Login';

const routes = [
  {
    path: '/login',
    component: MainLayout,
    children: [
      {
        path: '',
        component: Index,
        children: [
          {
            path: '',
            component: Login,
          },
        ],
      },
    ],
  },
];

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    redirect: '/login',
  });
}

export default routes;
