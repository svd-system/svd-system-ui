<template>
  <q-layout view="hHh Lpr lFf">
    <slot name="header"></slot>
    <q-page-container class="bg-primary">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {};
</script>
