import Vue from 'vue';
import MainLayout from '../layouts/MainLayout';
import Index from '../pages/Index';
import Login from '../pages/account/auth/Login';
import Registration from '../pages/account/registration/Registration';
import UserDataRegistrationForm from '../pages/account/registration/forms/UserData';
import PasswordRegistrationForm from '../pages/account/registration/forms/Password';
import Homepage from '../pages/home/Homepage';
import Vaccines from '../pages/vaccine/Vaccines';
import Welcome from '../pages/home/Welcome';
import Patients from '../pages/patients/Patients';
import AccountIndex from '../pages/account/Index';

const routes = [
  {
    path: '',
    component: MainLayout,
    children: [
      {
        path: 'user',
        component: Index,
        children: [
          {
            path: '',
            component: Homepage,
            beforeEnter(to, from, next) {
              const auth = Vue.cookie.get('auth');
              if (!auth) {
                next('/account/login');
                return;
              }

              next();
            },
            children: [
              {
                path: '',
                component: Welcome,
              },
              {
                path: 'vaccines',
                component: Vaccines,
              },
              {
                path: 'patients',
                component: Patients,
              },
            ],
          },
        ],
      },
      {
        path: 'account',
        component: AccountIndex,
        redirect: 'user',
        children: [
          {
            path: 'login',
            component: Login,
          },
          {
            path: 'register',
            component: Registration,
            children: [
              {
                path: '',
                component: UserDataRegistrationForm,
              },
              {
                path: 'password',
                component: PasswordRegistrationForm,
              },
            ],
          },
        ],
      },
      {
        path: '*',
        redirect: 'account/login',
      },
    ],
  },
];

export default routes;
