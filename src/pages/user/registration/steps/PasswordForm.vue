<template>
  <div>
    <q-card-section class="q-pa-none q-gutter-sm">
      <router-link to="/register" tag="a">
        Voltar para a tela anterior
      </router-link>
      <p class="text-h6 text-dark text-center svd-title">
        Informe uma senha de acesso.
      </p>
    </q-card-section>
    <q-card-section class="q-px-none">
      <q-form class="q-gutter-sm">
        <div class="row">
          <q-input
            class="col col-6"
            outlined
            disabled
            placeholder="CPF"
            :dense="true"
          />
        </div>
        <div class="row">
          <q-input
            class="col col-6"
            outlined
            placeholder="Senha"
            :dense="true"
          />
          <div class="col q-px-lg self-center text-negative">
            * Senha é obrigatória
          </div>
        </div>
        <div class="row">
          <q-input
            class="col col-6"
            outlined
            placeholder="Confimar senha"
            :dense="true"
          />
          <div class="col q-px-lg self-center text-negative">
            * As senhas digitadas não conferem
          </div>
        </div>
      </q-form>
    </q-card-section>
    <q-card-actions class="row justify-center">
      <q-btn @click.prevent="confirm" color="primary" label="Confirmar" />
    </q-card-actions>
    <q-dialog v-model="alert">
      <q-card>
        <q-card-section>
          <div class="text-h6">Seja bem vindo, Usuário!</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
            Seu cadastro foi concluído com sucesso e você já pode fazer o login.
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="OK" color="primary" to="/login" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      alert: false,
    };
  },
  methods: {
    confirm() {
      this.alert = true;
    },
  },
};
</script>
