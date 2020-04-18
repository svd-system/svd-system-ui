<template>
  <div>
    <q-card class="q-pa-xl col col-6">
      <transition name="slide-fade" mode="out-in">
        <router-view></router-view>
      </transition>
    </q-card>
  </div>
</template>

<script>
export default {};
</script>

<style>
.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .10s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to {
  transform: translateX(10px);
  opacity: 0;
}
</style>
