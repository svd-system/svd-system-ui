<template>
  <div>
    <q-card-section v-if="this.user" class="q-pa-none q-gutter-sm">
      <router-link to="/register" tag="a">
        Voltar para o cadastro
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
            v-model="user.cpf"
          />
        </div>
        <div class="row">
          <q-input
            class="col col-6"
            outlined
            placeholder="Senha"
            :dense="true"
            v-model="password"
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
      <q-btn @click.prevent="create" color="primary" label="Confirmar" />
    </q-card-actions>
    <q-dialog v-model="alert">
      <q-card v-if="success">
        <q-card-section>
          <div class="text-h6">Seja bem vindo, {{ user.firstName }}!</div>
          <hr>
        </q-card-section>

        <q-card-section class="q-pt-none">
            <p>Seu cadastro foi concluído com sucesso e você já pode fazer o login.</p>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="OK" color="primary" to="/login" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>
<script>
import { mapGetters, mapMutations } from 'vuex';
import types from '../../../../store/types';

export default {
  data() {
    return {
      alert: false,
      password: '',
      success: false,
    };
  },
  computed: {
    ...mapGetters(types.namespaces.REGISTRATION, {
      user: types.getters.GET_USER,
    }),
  },
  methods: {
    ...mapMutations(types.namespaces.REGISTRATION, {
      setUser: types.mutations.SET_USER,
    }),
    create() {
      this.user.password = this.password;
      this.$axios.post('/api/users', this.user)
        .then(() => {
          this.setUser({});
          this.success = true;
          this.alert = true;
        }).catch(() => {
          this.alert = true;
        });
    },
  },
};
</script>
