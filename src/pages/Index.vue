<template>
  <q-page class="row">
      <q-page-container class="container">
        <transition name="slide" mode="out-in">
          <router-view></router-view>
        </transition>
      </q-page-container>
  </q-page>
</template>

<script>
export default {};
</script>

<style scoped>
.container {
  min-width: 750px;
}
</style>
