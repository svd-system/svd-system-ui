<template>
  <div>
    <q-card-section class="q-pt-none q-gutter-sm">
      <router-link class="text-primary" to="/login" tag="a">
        Voltar para o login
      </router-link>
      <p class="text-h6 text-dark text-center svd-title">
        Preencha os dados para fazer o seu cadastro.
      </p>
    </q-card-section>
    <q-card-section>
      <q-form class="row justify-center">
        <div class="col col-10 q-col-gutter-sm">
          <div class="row wrap q-gutter-sm">
            <q-input
              class="col col-xs-12 col-md-5"
              outlined
              label="Nome"
              stack-label
              :dense="true"
              v-model="user.firstName"
              :error="isFirstNameInvalid"
            >
              <template v-slot:error>
                * Nome é obrigatório.
              </template>
            </q-input>
            <q-input
              class="col"
              outlined
              label="Sobrenome"
              stack-label
              :dense="true"
              v-model="user.lastName"
              :error="isLastNameInvalid"
            >
              <template v-slot:error>
                * Sobrenome é obrigatório.
              </template>
            </q-input>
          </div>
          <div class="row wrap q-gutter-sm">
            <q-input
              class="col col-xs-4 col-md-3 col-lg-3"
              outlined
              label="CPF"
              stack-label
              :dense="true"
              v-model="user.cpf"
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
                <p v-else-if="!isOkCpfUnique">
                  * CPF já cadastrado.
                </p>
              </template>
            </q-input>
            <q-input
              class="col col-xs-5 col-lg-4"
              outlined
              label="Data de nascimento"
              stack-label
              :dense="true"
              v-model="user.birthDate"
              :error="isBirthDateInvalid"
            >
              <template v-slot:error>
                <p v-if="!isOkBirthDateRequired">
                  * Data de nascimento é obrigatorio.
                </p>
                <p v-else-if="!isOkBirthDateMaxValue">
                  * Datas futuras não são permitidas.
                </p>
              </template>
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy
                    ref="qDateProxy"
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-date
                      :mask="dateUtils.MASK"
                      v-model="user.birthDate"
                      :locale="dateUtils.LOCALE"
                      @input="() => $refs.qDateProxy.hide()"
                    />
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
            <q-select
              class="col"
              label="Sexo"
              stack-label
              outlined
              v-model="user.genre"
              :options="options"
              :dense="true"
              :error="isGenreInvalid"
            >
              <template v-slot:error>
                <p v-if="!isOkGenreRequired">
                  * Sexo é obrigatório.
                </p>
              </template>
            </q-select>
          </div>
          <div class="row">
            <q-input
              class="col"
              outlined
              label="Email"
              stack-label
              :dense="true"
              v-model="user.email"
              :error="isEmailInvalid"
            >
              <template v-slot:error>
                <p v-if="!isOkEmailRequired">* Email é obrigatorio.</p>
                <p v-else-if="!isOkEmailEmail">
                  * Email inválido.
                </p>
                <p v-else-if="!isOkEmailUnique">
                  * Email já cadastrado.
                </p>
              </template>
            </q-input>
          </div>
          <div class="row wrap q-gutter-sm">
            <q-input
              class="col col-4"
              outlined
              label="Telefone"
              stack-label
              :dense="true"
              v-model="user.phoneNumber"
              :error="isPhoneNumberInvalid"
            >
              <template v-slot:error>
                <p v-if="!isOkPhoneNumberRequired">
                  * Telefone é obrigatorio.
                </p>
                <p v-else-if="!isOkPhoneNumberNumeric">
                  * Somente números.
                </p>
              </template>
            </q-input>
            <q-input
              class="col"
              outlined
              label="Profissão"
              stack-label
              :dense="true"
              v-model="user.professionalOccupation"
              :error="isProfessionalOccupationInvalid"
            />
          </div>
          <div class="row">
            <q-input
              class="col-8"
              outlined
              label="Logradouro"
              stack-label
              :dense="true"
              v-model="user.address"
              :error="isAddressInvalid"
            />
            <q-input
              class="col q-ml-sm"
              outlined
              label="Número"
              stack-label
              :dense="true"
              v-model="user.houseNumber"
              :error="isHouseNumberInvalid"
            />
          </div>
          <div class="row col-6">
            <q-input
              class="col col-3"
              outlined
              label="CEP (sem hífen)"
              stack-label
              :dense="true"
              v-model="user.cep"
              :error="isCepInvalid"
            >
              <template v-slot:error>
                <p v-if="!isOkCepNumeric">
                  * CEP inválido.
                </p>
                <p v-else-if="!isOkCepLength">
                  * CEP contém 8 dígitos.
                </p>
              </template>
            </q-input>
            <q-input
              class="col q-ml-sm col-3"
              outlined
              label="UF"
              stack-label
              :dense="true"
              v-model="user.state"
              :error="isStateInvalid"
            >
              <template v-slot:error>
                <p v-if="!isOkStateRequired">
                  * UF é obrigatório.
                </p>
                <p v-else-if="!isOkStateAlpha">
                  * Somente letras.
                </p>
                <p v-else-if="!isOkStateLength">
                  * UF contém 2 dígitos.
                </p>
              </template>
            </q-input>
            <q-input
              class="col q-ml-sm"
              outlined
              label="Município"
              stack-label
              :dense="true"
              v-model="user.city"
              :error="$v.user.city.$invalid"
            >
              <template v-slot:error>
                * Município é obrigatório.
              </template>
            </q-input>
          </div>
        </div>
      </q-form>
    </q-card-section>
    <q-card-actions class="row justify-center">
      <q-btn
        color="primary"
        label="Continuar"
        :disable="isUserInvalid"
        @click="this.continue"
      />
    </q-card-actions>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
import {
  required,
  email,
  numeric,
  alpha,
  helpers,
} from 'vuelidate/lib/validators';
import types from '../../../../store/types';
import dateUtils from '../../../../shared/utils/date';
import Genre from '../../../../shared/enums/genre';

export default {
  data() {
    return {
      options: [
        Genre.FEMININO,
        Genre.MASCULINO,
      ],
      dateUtils,
      user: {
        firstName: '',
        lastName: '',
        cpf: '',
        birthDate: '',
        genre: '',
        email: '',
        phoneNumber: '',
        professionalOccupation: '',
        address: '',
        houseNumber: '',
        cep: '',
        city: '',
        state: '',
      },
    };
  },
  methods: {
    ...mapMutations(types.namespaces.REGISTRATION, {
      setUser: types.mutations.SET_USER,
    }),
    loadUser() {
      const user = this.getUser();
      if (user) {
        this.user = { ...user };
      }
    },
    checkUnique(query) {
      return this.$axios
        .get('/api/users/count', { params: query })
        .then((response) => response.data.count <= 0)
        .catch(() => false);
    },
    checkLength(value, length) {
      return helpers.len(value) === length;
    },
    continue() {
      this.setUser(this.user);
      this.$router.push('/account/register/password');
    },
  },
  computed: {
    // Checagem se atributos são válidos.
    isUserInvalid() {
      return this.$v.$invalid;
    },
    isFirstNameInvalid() {
      return this.$v.user.firstName.$invalid;
    },
    isLastNameInvalid() {
      return this.$v.user.lastName.$invalid;
    },
    isCpfInvalid() {
      return this.$v.user.cpf.$invalid;
    },
    isBirthDateInvalid() {
      return this.$v.user.birthDate.$invalid;
    },
    isGenreInvalid() {
      return this.$v.user.genre.$invalid;
    },
    isEmailInvalid() {
      return this.$v.user.email.$invalid;
    },
    isConfirmEmailInvalid() {
      return this.$v.confirmEmail.$invalid;
    },
    isPhoneNumberInvalid() {
      return this.$v.user.phoneNumber.$invalid;
    },
    isProfessionalOccupationInvalid() {
      return this.$v.user.professionalOccupation.$invalid;
    },
    isAddressInvalid() {
      return this.$v.user.address.$invalid;
    },
    isHouseNumberInvalid() {
      return this.$v.user.houseNumber.$invalid;
    },
    isCepInvalid() {
      return this.$v.user.cep.$invalid;
    },
    isStateInvalid() {
      return this.$v.user.state.$invalid;
    },
    isCityInvalid() {
      return this.$v.user.city.$invalid;
    },

    // Para atributos com mais de uma validação, checa cada uma delas.
    isOkCpfRequired() {
      return this.$v.user.cpf.required;
    },
    isOkCpfNumeric() {
      return this.$v.user.cpf.numeric;
    },
    isOkCpfLength() {
      return this.$v.user.cpf.length;
    },
    isOkCpfUnique() {
      return this.$v.user.cpf.unique;
    },
    isOkBirthDateRequired() {
      return this.$v.user.birthDate.required;
    },
    isOkBirthDateMaxValue() {
      return this.$v.user.birthDate.maxValue;
    },
    isOkGenreRequired() {
      return this.$v.user.genre.required;
    },
    isOkEmailRequired() {
      return this.$v.user.email.required;
    },
    isOkEmailEmail() {
      return this.$v.user.email.email;
    },
    isOkEmailUnique() {
      return this.$v.user.email.unique;
    },
    isOkPhoneNumberRequired() {
      return this.$v.user.phoneNumber.required;
    },
    isOkPhoneNumberNumeric() {
      return this.$v.user.phoneNumber.numeric;
    },
    isOkCepNumeric() {
      return this.$v.user.cep.numeric;
    },
    isOkCepLength() {
      return this.$v.user.cep.length;
    },
    isOkStateRequired() {
      return this.$v.user.state.required;
    },
    isOkStateAlpha() {
      return this.$v.user.state.alpha;
    },
    isOkStateLength() {
      return this.$v.user.state.length;
    },
  },
  validations: {
    user: {
      firstName: {
        required,
      },
      lastName: {
        required,
      },
      cpf: {
        required,
        numeric,
        length(value) {
          return this.checkLength(value, 11);
        },
        unique(value) {
          return this.checkUnique({ cpf: value });
        },
      },
      birthDate: {
        required,
        maxValue(value) {
          if (value) {
            const fields = [...value.split('/')];
            const birthDate = new Date();
            birthDate.setDate(fields[0]);
            birthDate.setMonth(fields[1] - 1);
            birthDate.setYear(fields[2]);
            birthDate.setHours(0);
            birthDate.setMinutes(0);
            birthDate.setSeconds(0);
            birthDate.setMilliseconds(0);

            const today = new Date();
            today.setHours(0);
            today.setMinutes(0);
            today.setSeconds(0);
            today.setMilliseconds(0);
            return birthDate <= today;
          }

          return false;
        },
      },
      genre: {
        required,
      },
      email: {
        required,
        email,
        unique(value) {
          return this.checkUnique({ email: value.toLowerCase() });
        },
      },
      phoneNumber: {
        required,
        numeric,
      },
      professionalOccupation: {},
      address: {},
      houseNumber: {},
      cep: {
        numeric,
        length(value) {
          return !value || this.checkLength(value, 8);
        },
      },
      city: {
        required,
      },
      state: {
        required,
        alpha,
        length(value) {
          return !value || this.checkLength(value, 2);
        },
      },
    },
  },
};
</script>
