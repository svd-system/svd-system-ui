<template>
  <div>
    <q-dialog v-model="show">
      <q-card class="card-container">
        <q-card-section>
          <div class="text-h6 text-dark">
            <slot name="title"></slot>
          </div>
          <hr />
        </q-card-section>

        <q-card-section class="q-pt-none">
          <div class="row q-ma-5">
            <div class="col col-4">
              <div class="row justify-center">
                <q-icon
                  name="error"
                  class="text-negative"
                  style="font-size: 4rem;"
                />
              </div>
            </div>
            <div class="col text-dark">
              <slot name="message"></slot>
            </div>
          </div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="OK" color="accent" @click="close" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      show: false,
    };
  },
  methods: {
    open() {
      this.show = true;
    },
    close() {
      this.show = false;
    },
  },
};
</script>
<style>
.card-container {
  min-width: 500px;
}
</style>
