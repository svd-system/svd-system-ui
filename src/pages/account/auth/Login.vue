<template>
  <div class="row">
    <q-card class="q-py-md q-px-xl col col-6">
      <q-card-section>
        <div class="text-h6 text-dark svd-title text-center">
          Bem vindo ao SVD System, seu cartão de vacinação digital.
        </div>
      </q-card-section>
      <q-card-section>
        <q-form class="row justify-center">
          <div class="col col-xs-12 col-md-10 col-lg-8 q-col-gutter-sm">
            <div class="row wrap q-gutter-sm">
              <q-input
                class="col"
                outlined
                label="CPF"
                stack-label
                :dense="true"
                v-model="credentials.cpf"
                :error="isCpfInvalid"
              >
                <template v-slot:error>
                  <p v-if="!isOkCpfRequired">* CPF é obrigatorio.</p>
                  <p v-else-if="!isOkCpfNumeric">
                    * Somente números.
                  </p>
                  <p v-else-if="!isOkCpfLength">
                    * CPF possui 11 dígitos.
                  </p>
                </template>
              </q-input>
            </div>
            <div class="row wrap q-gutter-sm">
              <q-input
                type="password"
                class="col"
                outlined
                label="Senha"
                stack-label
                :dense="true"
                v-model="credentials.password"
                :error="isPasswordInvalid"
              >
                <template v-slot:error>
                  <p v-if="!isOkPasswordRequired">* Senha é obrigatoria.</p>
                  <p v-else-if="!isOkPasswordMinLength">
                    * A senha deve possuir ao menos 8 dígitos.
                  </p>
                </template>
              </q-input>
            </div>
          </div>
        </q-form>
      </q-card-section>
      <q-card-actions>
        <div class="col q-gutter-lg">
          <div class="row justify-center">
            <q-btn
              :disable="isCredentialsInvalid"
              @click="login"
              color="primary"
              label="Entrar"
            />
          </div>
          <div class="row justify-center">
            <p class="text-center text-dark">
              Não possui conta?
              <router-link to="/account/register" tag="a" class="text-primary"
                >Cadastre-se</router-link
              >
            </p>
          </div>
        </div>
      </q-card-actions>
    </q-card>
    <div class="q-mx-xl q-mt-xl col">
      <q-img class="logo" src="../../../assets/svd-white-logo.svg" />
    </div>
    <alert-error ref="alertError">
      <p slot="title">Login falhou!</p>
      <div slot="message">
        <p>
          Não foi possível fazer o login no sistema.
          Motivo(s):
        </p>
        <ul v-if="errors">
          <li v-for="(error, index) in errors" :key="index">{{ error.message }}</li>
        </ul>
      </div>
    </alert-error>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import {
  required,
  numeric,
  minLength,
  helpers,
} from 'vuelidate/lib/validators';
import types from '../../../store/types';
import AlertError from '../../../components/shared/alert/Error';

export default {
  components: {
    AlertError,
  },
  data() {
    return {
      credentials: {
        cpf: '',
        password: '',
      },
      errors: [],
    };
  },
  methods: {
    ...mapActions(types.namespaces.AUTHORIZATION, {
      storeCredentials: types.actions.STORE_CREDENTIALS,
    }),
    login() {
      this.errors = [];
      return this.$axios
        .post('/api/login', this.credentials)
        .then((response) => {
          this.storeCredentials(response.data);
          this.$router.push('/site');
        })
        .catch((err) => {
          this.errors = err.response.data.errors;
          this.$refs.alertError.open();
        });
    },
    checkLength(value, length) {
      return helpers.len(value) === length;
    },
  },
  computed: {
    isCredentialsInvalid() {
      return this.$v.$invalid;
    },
    isCpfInvalid() {
      return this.$v.credentials.cpf.$invalid;
    },
    isPasswordInvalid() {
      return this.$v.credentials.password.$invalid;
    },
    isOkCpfRequired() {
      return this.$v.credentials.cpf.required;
    },
    isOkCpfNumeric() {
      return this.$v.credentials.cpf.numeric;
    },
    isOkCpfLength() {
      return this.$v.credentials.cpf.length;
    },
    isOkPasswordRequired() {
      return this.$v.credentials.password.required;
    },
    isOkPasswordMinLength() {
      return this.$v.credentials.password.minLength;
    },
  },
  validations: {
    credentials: {
      cpf: {
        required,
        numeric,
        length(value) {
          return this.checkLength(value, 11);
        },
      },
      password: {
        required,
        minLength: minLength(8),
      },
    },
  },
};
</script>

<style>
.logo {
  height: 350px;
  width: 350px;
}
</style>
