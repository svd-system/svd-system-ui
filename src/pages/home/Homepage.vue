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
            v-if="user.role === link.role"
            clickable
            v-ripple
            :active="activeLink === link.id"
            @click="activeLink = link.id"
            active-class="my-menu-link"
          >
            <q-item-section>
              <router-link tag="div" to="home">
                {{ link.label }}
              </router-link>
            </q-item-section>
          </q-item>
        </q-list>
      </div>
    </q-drawer>
    <h1>Home Page</h1>
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
      activeLink: 'vacina',
      links: [
        {
          id: 'vacina',
          label: 'CADASTRO DE VACINAS',
          role: 'ADMINISTRADOR',
        },
      ],
    };
  },
};
</script>
<style>
.my-menu-link {
  border-left: 4px solid #1aae9f;
}
</style>
