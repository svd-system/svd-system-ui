<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="bg-secondary">
      <q-toolbar>
        <q-avatar>
          <img src="~/assets/svd-black-logo.svg" />
        </q-avatar>
        <q-toolbar-title class="text-dark svd-title">
          {{ appTitle }}
        </q-toolbar-title>
      </q-toolbar>
    </q-header>
    <q-page-container class="bg-primary">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  data() {
    return {
      appTitle: 'SVD System',
    };
  },
};
</script>
