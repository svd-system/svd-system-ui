<template>
  <div>
    <q-drawer show-if-above :width="250" elevated content-class="text-white">
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
            v-if="isEqualsUserRole(link.role)"
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
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  data() {
    return {
      user: {
        id: 14,
        firstName: 'RICARDO',
        lastName: 'ROCHA',
        role: 'ADMINISTRADOR',
      },
      links: [
        {
          href: '/user/vaccines',
          label: 'CADASTRO DE VACINAS',
          role: 'ADMINISTRADOR',
        },
      ],
    };
  },
  computed: {
    activeLinkHref() {
      return this.$route.path;
    },
  },
  methods: {
    goToPath(link) {
      this.$router.push(link);
    },
    isActiveLink(href) {
      return this.activeLinkHref === href;
    },
    isEqualsUserRole(role) {
      return this.user.role === role;
    },
  },
};
</script>
<style>
.my-menu-link {
  border-left: 4px solid #1aae9f;
}
</style>
