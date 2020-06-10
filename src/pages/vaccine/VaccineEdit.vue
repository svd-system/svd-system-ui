<template>
  <div>
    <q-card class="q-pa-xl min">
      <q-card-section>
    <q-card-section class="q-pt-none q-gutter-sm">
      <router-link class="text-primary" to="/user/vaccines/list" tag="a">
        voltar para lista
      </router-link>
      <p class="text-h6 text-dark text-center svd-title">
        Editar vacina
      </p>
    </q-card-section>
    <q-card-section>
      <q-form class="row justify-center">
        <div class="col col-10 q-col-gutter-sm">
          <div class="row wrap q-gutter-sm">
            <label class="col col-xs-12 col-md-2">ID
            <q-input
              placeholder="ex: 231"
              outlined
              disable
              :dense="true"
              v-model="vaccine.serialNumber"
            >
            </q-input>
            </label>
            <label class="col col-md-4">Qtd. padrão (ml)
            <q-input
              placeholder="ex: 80 ml"
              outlined
              :dense="true"
              v-model="vaccine.defaultQuantity"
            >
            </q-input>
            </label>
          </div>
        </div>
      </q-form>
      <q-form class="row justify-center" >
        <div class="col col-10 q-col-gutter-sm">
          <div class="corpo">
            <label class="col col-xs-12 col-md-10">Nome da vacina
            <q-input
              placeholder="ex: INFLUENZA"
              outlined
              :dense="true"
              v-model="vaccine.label"
            >
            <template v-slot:error>
                <p v-if="!isOkCpfRequired">* CPF é obrigatorio.</p>
            </template>
            </q-input>
            </label>
          </div>
        </div>
      </q-form>
    </q-card-section>
    <div class="btnCadastrar row justify-center">
    <q-btn
        label="Cadastrar"
        class="q-mt-md"
        color="teal"
        @click="this.update"
        >
        <template v-slot:loading>
          <q-spinner-facebook />
        </template>
      </q-btn>
    </div>
    </q-card-section>
    </q-card>
  </div>
</template>
<script>
export default {
  created() {
    this.$axios
      .get(`/api/vaccines/${this.$route.params.id}`)
      .then((response) => {
        this.vaccine = response.data;
      })
      .catch(() => {
        this.$router.back();
      });
  },
  data() {
    return {
      vaccine: null,
    };
  },
  methods: {
    update() {
      this.$axios
        .put(`/api/vaccines/${this.vaccine.id}`, this.vaccine)
        .then(() => {
          this.$router.back();
        });
    },
  },
};
</script>
<style>

.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to {
  transform: translateX(10px);
  opacity: 0;
}
.corpo{
  margin-top: 10px;
}
.btnCadastrar{
  margin-top: 40px;
}
</style>
