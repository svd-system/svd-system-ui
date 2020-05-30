<template>
  <div>
    <q-drawer v-if="user" show-if-above :width="250" elevated content-class="text-white">
      <div class="col">
        <div class="col q-ma-lg">
          <q-avatar
            size="150px"
            font-size="52px"
            color="teal"
            text-color="white"
            class="q-ma-lg"
            icon="face"
          >
          </q-avatar>
          <p class="text-dark text-center">
            {{ user.firstName }} {{ user.lastName }}
            <br />
            <span class="svd-title">{{ user.role }}</span>
          </p>
        </div>
      </div>
      <div class="col">
        <q-list
          class="text-primary"
          v-for="(link, index) in links"
          :key="index"
        >
          <q-item
            v-if="isEqualsUserRole(link.roles)"
            :clickable="!isActiveLink(link.href)"
            v-ripple
            :active="isActiveLink(link.href)"
            @click="goToPath(link.href)"
            active-class="my-menu-link"
          >
            <q-item-section>
              <div>
                {{ link.label }}
              </div>
            </q-item-section>
          </q-item>
        </q-list>
      </div>
    </q-drawer>
    <transition name="slide" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>
<script>
import { mapActions, mapMutations, mapGetters } from 'vuex';
import types from '../../store/types';

export default {
  data() {
    return {
      links: [
        {
          href: '/user/vaccines',
          label: 'CADASTRO DE VACINAS',
          roles: ['ADMINISTRADOR'],
        },
        {
          href: '/user/patients',
          label: 'PACIENTES',
          roles: ['ADMINISTRADOR', 'COLABORADOR'],
        },
      ],
    };
  },
  computed: {
    ...mapGetters(types.namespaces.AUTHORIZATION, {
      user: types.getters.GET_USER,
    }),
    activeLinkHref() {
      return this.$route.path;
    },
  },
  methods: {
    ...mapActions(types.namespaces.AUTHORIZATION, {
      clearCredentials: types.actions.CLEAR_CREDENTIALS,
    }),
    ...mapMutations(types.namespaces.AUTHORIZATION, {
      setAuthorizedUser: types.mutations.SET_USER,
    }),
    goToPath(link) {
      this.$router.push(link);
    },
    isActiveLink(href) {
      return this.activeLinkHref === href;
    },
    isEqualsUserRole(roles) {
      return roles.includes(this.user.role);
    },
  },
  mounted() {
    const link = this.links.find((el) => this.isEqualsUserRole(el.roles));
    if (link) {
      this.goToPath(link.href);
    }
  },
};
</script>
<style>
.my-menu-link {
  border-left: 4px solid #1aae9f;
}
</style>
