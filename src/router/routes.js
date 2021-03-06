import Vue from 'vue';
import MainLayout from '../layouts/MainLayout';
import Index from '../pages/Index';
import Login from '../pages/account/auth/Login';
import Registration from '../pages/account/registration/Registration';
import UserDataRegistrationForm from '../pages/account/registration/forms/UserData';
import PasswordRegistrationForm from '../pages/account/registration/forms/Password';
import Homepage from '../pages/home/Homepage';
import VaccineList from '../pages/vaccine/VaccineList';
import VaccineData from '../pages/vaccine/VaccineData';
import NewsfeedList from '../pages/newsfeed/NewsfeedList';
import NewsfeedData from '../pages/newsfeed/NewsfeedData';
import VaccineEdit from '../pages/vaccine/VaccineEdit';
import Patients from '../pages/patients/Patients';
import EditPatient from '../pages/patients/EditPatient';
import PatientRecord from '../pages/patients/PatientRecord';
import AccountIndex from '../pages/account/Index';
import UserVaccinations from '../pages/vaccinations/UserVaccinations';
import CreateVaccination from '../pages/vaccinations/CreateVaccination';

import store from '../store';
import types from '../store/types';

const routes = [
  {
    path: '',
    component: MainLayout,
    children: [
      {
        path: 'site',
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

              store.dispatch(`auth/${types.actions.LOAD_AUTHORIZED_USER}`)
                .then(() => {
                  next();
                });
            },
            children: [
              {
                path: 'vaccinations',
                component: UserVaccinations,
              },
              {
                path: 'vaccines',
                component: VaccineList,
              },
              {
                path: 'vaccines/new',
                component: VaccineData,
              },
              {
                path: 'newsfeed',
                component: NewsfeedList,
              },
              {
                path: 'newsfeed/new',
                component: NewsfeedData,
              },
              {
                path: 'vaccines/:id/edit',
                component: VaccineEdit,
              },
              {
                path: 'patients',
                component: Patients,
              },
              {
                path: 'patients/:id',
                component: PatientRecord,
              },
              {
                path: 'patients/:id/edit',
                component: EditPatient,
              },
              {
                path: 'patients/:id/new',
                component: CreateVaccination,
              },
            ],
          },
        ],
      },
      {
        path: 'account',
        component: AccountIndex,
        redirect: 'site',
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
