<template>
  <q-page class="row justify-center">
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

<style>
.container {
  min-width: 900px;
}
</style>
