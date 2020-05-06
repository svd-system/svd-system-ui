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
            JIMI HENDRIX
            <span class="svd-title">ADMINISTRADOR</span>
          </p>
        </div>
      </div>
      <div class="col">
        <q-list class="text-primary">

          <q-item
            v-for="(link, index) in links" :key="index"
            clickable
            v-ripple
            :active="activeLink === link.id"
            @click="activeLink = link.id"
            active-class="my-menu-link"
          >
            <q-item-section>{{ link.label }}</q-item-section>
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
      activeLink: 'vacina',
      links: [
        {
          id: 'vacina',
          label: 'CADASTRO DE VACINAS',
        },
        {
          id: 'usuario',
          label: 'CADASTRO DE USUÁRIO',
        },
      ],
    };
  },
};
</script>
<style>
.my-menu-link {
  border-left: 4px solid #1AAE9F;
}
</style>
