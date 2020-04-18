<template>
  <q-page class="row justify-center">
    <div class="q-my-lg col-xs-12 col-sm-10 col-md-8">
      <q-page-container class="container">
        <router-view></router-view>
      </q-page-container>
    </div>
  </q-page>
</template>

<script>
export default {};
</script>

<style>
  .container {
    min-width: 750px;
  }
</style>
