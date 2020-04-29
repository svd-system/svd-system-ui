import Vue from 'vue';
import MainLayout from '../layouts/MainLayout';
import Index from '../pages/Index';
import Login from '../pages/auth/Login';
import Registration from '../pages/registration/Registration';
import UserDataRegistrationForm from '../pages/registration/forms/UserData';
import PasswordRegistrationForm from '../pages/registration/forms/Password';
import Homepage from '../pages/home/Homepage';

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
          {
            path: 'home',
            component: Homepage,
            beforeEnter(to, from, next) {
              const auth = Vue.cookie.get('auth');
              if (!auth) {
                next('login');
                return;
              }

              next();
            },
          },
          {
            path: '*',
            redirect: 'home',
          },
        ],
      },
    ],
  },
];

export default routes;
