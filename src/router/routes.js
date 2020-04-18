import MainLayout from '../layouts/MainLayout';
import Index from '../pages/Index';
import Login from '../pages/user/Login';
import Registration from '../pages/user/registration/Registration';
import RegistrationDataForm from '../pages/user/registration/steps/DataForm';
import RegistrationPasswordForm from '../pages/user/registration/steps/PasswordForm';

const routes = [
  {
    path: '',
    component: MainLayout,
    children: [
      {
        path: '',
        component: Index,
        children: [
          {
            path: '/login',
            component: Login,
          },
          {
            path: '/register',
            component: Registration,
            children: [
              {
                path: '',
                component: RegistrationDataForm,
              },
              {
                path: 'password',
                component: RegistrationPasswordForm,
              },
            ],
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
