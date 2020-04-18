<template>
  <div class="row">
    <q-card class="q-py-md q-px-xl col col-6">
      <q-card-section>
        <div class="text-h6 text-dark svd-title text-center">
          Bem vindo ao SVD System, seu cartão de vacinação digital.
        </div>
      </q-card-section>
      <q-card-section>
        <q-form class="q-gutter-sm">
          <q-input outlined placeholder="CPF" :dense="true" />
          <q-input outlined type="password" placeholder="Senha" :dense="true" />
          <q-select
            outlined
            v-model="selectedOption"
            :options="options"
            :dense="true"
          />
          <div class="row q-py-sm justify-center">
            <q-btn class="flex" color="primary" label="Entrar" />
          </div>
        </q-form>
      </q-card-section>
      <q-card-actions>
        <div class="col">
          <p class="text-center text-dark">
            Não possui conta?
            <router-link to="/register" tag="a" class="text-primary"
              >Cadastre-se</router-link
            >
          </p>
        </div>
      </q-card-actions>
    </q-card>
    <div class="q-mx-xl q-mt-xl col">
      <q-img class="logo" src="../../assets/svd-white-logo.svg" />
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      options: ['Paciente', 'Colaborador'],
      selectedOption: 'Paciente',
    };
  },
};
</script>

<style>
  .logo {
    height: 350px;
    width: 350px;
  }
</style>
