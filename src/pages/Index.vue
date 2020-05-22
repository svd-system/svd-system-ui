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

<style>
.container {
  min-width: 750px;
}
.slide-enter-active {
  animation: slide-in .3s ease-out forwards;
}
.slide-leave-active {
  animation: slide-out .3s ease-out forwards;
}
@keyframes slide-in {
  from {
    transform: translateY(-30px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
@keyframes slide-out {
  from {
    transform: translateY(0);
    opacity: 1;
  }
  to {
    transform: translateY(-30px);
    opacity: 0;
  }
}
</style>
