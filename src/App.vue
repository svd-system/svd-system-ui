<template>
  <div id="q-app">
    <router-view>
      <app-header slot="header" elevated :appTitle="appTitle">
        <q-btn
          slot="button"
          flat
          color="primary"
          label="Logout"
          @click="logout"
        />
      </app-header>
    </router-view>
  </div>
</template>

<script>
import { mapActions, mapMutations } from 'vuex';
import types from './store/types';
import AppHeader from './components/shared/header/Header';

export default {
  components: {
    AppHeader,
  },
  data() {
    return {
      appTitle: 'SVD System',
    };
  },
  methods: {
    ...mapActions(types.namespaces.AUTHORIZATION, {
      clearCredentials: types.actions.CLEAR_CREDENTIALS,
    }),
    ...mapMutations(types.namespaces.AUTHORIZATION, {
      setUser: types.mutations.SET_USER,
    }),
    logout() {
      this.clearCredentials();
      this.setUser(null);
      this.$router.push('/account/login');
    },
  },
};
</script>
