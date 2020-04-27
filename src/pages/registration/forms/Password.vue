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
                <p v-if="!isOkConfirmPasswordRequired">
                  * Confirmar a senha é obrigatorio.
                </p>
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
      <q-btn
        :disable="isUserInvalid"
        @click="create"
        color="primary"
        label="Confirmar"
      />
    </q-card-actions>
    <alert-error ref="alertError">
      <p slot="title">Algo deu errado!</p>
      <p slot="message">
        Infelizmente um erro ocorreu ao tentar finalizar seu cadastro. Tente
        novamente em breve ou contate o suporte.
      </p>
    </alert-error>
    <alert-success ref="alertSuccess" @onClickOK="goToLogin">
      <p slot="title">Seja bem vindo, {{ user.firstName }}!</p>
      <p slot="message">
        Seu cadastro no SVD System foi concluído com sucesso. Faça o login e
        comece a cuidar da sua saúde agora mesmo.
      </p>
    </alert-success>
  </div>
</template>
<script>
import { mapGetters, mapMutations } from 'vuex';
import { required, minLength, sameAs } from 'vuelidate/lib/validators';
import types from '../../../store/types';
import AlertError from '../../../components/shared/alert/Error';
import AlertSuccess from '../../../components/shared/alert/Success';
import dateUtils from '../../../utils/date';
import Role from '../../../shared/enums/role';

export default {
  components: {
    AlertError,
    AlertSuccess,
  },
  data() {
    return {
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
  created() {
    if (!this.user) {
      this.$router.push('/login');
    }
  },
  methods: {
    ...mapMutations(types.namespaces.REGISTRATION, {
      setUser: types.mutations.SET_USER,
    }),
    create() {
      const user = {
        firstName: this.user.firstName,
        lastName: this.user.lastName,
        cpf: this.user.cpf,
        birthDate: dateUtils.toString(this.user.birthDate),
        genre: this.user.genre,
        phoneNumber: this.user.phoneNumber,
        email: this.user.email,
        address: this.user.address,
        houseNumber: this.user.houseNumber,
        cep: this.user.cep,
        city: this.user.city,
        state: this.user.state,
        professionalOccupation: this.user.professionalOccupation,
        password: this.password,
        role: Role.PACIENTE,
      };

      this.$axios
        .post('/api/users', user)
        .then(() => {
          this.$refs.alertSuccess.open();
        })
        .catch(() => {
          this.$refs.alertError.open();
        });
    },
    goToLogin() {
      this.setUser(null);
      this.$router.push('/login');
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
