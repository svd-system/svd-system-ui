<template>
  <div>
    <q-card-section class="q-pa-none q-gutter-sm">
      <router-link to="/register" tag="a">
        Voltar para o cadastro
      </router-link>
      <p class="text-h6 text-dark text-center svd-title">
        Informe uma senha de acesso.
      </p>
    </q-card-section>
    <q-card-section v-if="user" class="q-px-none">
      <q-form class="row justify-center">
        <div class="col col-6 q-col-gutter-sm">
          <div class="row wrap q-gutter-sm">
            <q-input
              class="col"
              outlined
              disabled
              label="CPF"
              stack-label
              :dense="true"
              v-model="user.cpf"
              :error="false"
            />
          </div>
          <div class="row wrap q-gutter-sm">
            <q-input
              type="password"
              class="col"
              outlined
              label="Senha"
              stack-label
              :dense="true"
              v-model="password"
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
          <div class="row wrap q-gutter-sm">
            <q-input
              type="password"
              class="col"
              outlined
              label="Confirmar senha"
              stack-label
              :dense="true"
              :disabled="isPasswordInvalid"
              v-model="confirmPassword"
              :error="isConfirmPasswordInvalid"
            >
              <template v-slot:error>
                <p v-if="!isOkConfirmPasswordRequired">* Confirmar a senha é obrigatorio.</p>
                <p v-else-if="!isOkConfirmPasswordSameAsPassword">
                  * As senhas informadas são diferentes.
                </p>
              </template>
            </q-input>
          </div>
        </div>
      </q-form>
    </q-card-section>
    <q-card-actions v-if="user" class="row justify-center">
      <q-btn :disable="isUserInvalid" @click.prevent="create" color="primary" label="Confirmar" />
    </q-card-actions>
    <q-dialog v-if="user" v-model="alert">
      <q-card>
        <q-card-section>
          <div class="text-h6">Seja bem vindo(a), {{ user.firstName }}!</div>
          <hr />
        </q-card-section>

        <q-card-section class="q-pt-none">
          <p>
            Seu cadastro foi concluído com sucesso e você já pode fazer o login.
          </p>
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
import { required, minLength, sameAs } from 'vuelidate/lib/validators';
import types from '../../../../store/types';

export default {
  data() {
    return {
      alert: false,
      password: '',
      confirmPassword: '',
    };
  },
  computed: {
    ...mapGetters(types.namespaces.REGISTRATION, {
      user: types.getters.GET_USER,
    }),
    isUserInvalid() {
      return this.$v.$invalid;
    },
    isPasswordInvalid() {
      return this.$v.password.$invalid;
    },
    isConfirmPasswordInvalid() {
      return this.$v.confirmPassword.$invalid;
    },
    isOkPasswordRequired() {
      return this.$v.password.required;
    },
    isOkPasswordMinLength() {
      return this.$v.password.minLength;
    },
    isOkConfirmPasswordRequired() {
      return this.$v.confirmPassword.required;
    },
    isOkConfirmPasswordSameAsPassword() {
      return this.$v.confirmPassword.sameAsEmail;
    },
  },
  methods: {
    ...mapMutations(types.namespaces.REGISTRATION, {
      setUser: types.mutations.SET_USER,
    }),
    openDialog() {
      this.alert = true;
    },
    create() {
      this.user.password = this.password;
      this.$axios
        .post('/api/users', this.user)
        .then(() => {
          this.setUser(null);
          this.openDialog();
        })
        .catch(() => {
          this.openDialog();
        });
    },
  },
  validations: {
    password: {
      required,
      minLength: minLength(8),
    },
    confirmPassword: {
      required,
      sameAsPassword: sameAs('password'),
    },
  },
};
</script>
