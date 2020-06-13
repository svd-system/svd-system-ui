<template>
    <div>
      <q-header slot="header" elevated class="bg-secondary">
        <q-toolbar>
          <q-avatar>
            <img src="~/assets/svd-black-logo.svg" />
          </q-avatar>
          <q-toolbar-title class="text-dark svd-title">{{
            appTitle
          }}</q-toolbar-title>
          <slot name="button"></slot>
        </q-toolbar>
      </q-header>
    </div>
</template>
<script>
export default {
  props: {
    appTitle: {
      type: String,
      required: true,
    },
  },
};
</script>
