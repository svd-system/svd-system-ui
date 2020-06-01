<template>
  <div v-if="patient">
    <q-card class="q-pa-lg min">
      <q-card-section class="q-gutter-sm">
        <router-link class="text-primary" to="/user/patients" tag="a">
          Voltar
        </router-link>
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
                v-model="patient.firstName"
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
                v-model="patient.lastName"
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
                disable
                readonly
                label="CPF"
                stack-label
                :dense="true"
                v-model="patient.cpf"
                :error="isCpfInvalid"
              >
                <template v-slot:error> </template>
              </q-input>
              <q-input
                class="col col-xs-5 col-lg-4"
                outlined
                disable
                readonly
                label="Data de nascimento"
                stack-label
                :dense="true"
                v-model="formattedBirthDate"
                :error="isBirthDateInvalid"
              >
                <template v-slot:error>
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
                        v-model="patient.birthDate"
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
                v-model="patient.genre"
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
                v-model="patient.email"
                :error="wasEmailChanged && isEmailInvalid"
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
                v-model="patient.phoneNumber"
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
                v-model="patient.professionalOccupation"
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
                v-model="patient.address"
                :error="isAddressInvalid"
              />
              <q-input
                class="col q-ml-sm"
                outlined
                label="Número"
                stack-label
                :dense="true"
                v-model="patient.houseNumber"
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
                v-model="patient.cep"
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
                v-model="patient.state"
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
                v-model="patient.city"
                :error="isCityInvalid"
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
          label="Salvar alterações"
          :disable="isUserInvalid"
          @click="this.update"
        />
      </q-card-actions>
    </q-card>
  </div>
</template>

<script>
import {
  required,
  email,
  numeric,
  alpha,
  helpers,
} from 'vuelidate/lib/validators';
import dateUtils from '../../shared/utils/date';
import Genre from '../../shared/enums/genre';

export default {
  created() {
    this.$axios
      .get(`/api/users/${this.$route.params.id}`)
      .then((response) => {
        this.patient = response.data;
        this.currentEmail = this.patient.email;
      })
      .catch(() => {
        this.$router.back();
      });
  },
  data() {
    return {
      options: [Genre.FEMININO, Genre.MASCULINO],
      dateUtils,
      currentEmail: '',
      patient: null,
    };
  },
  methods: {
    checkUnique(query) {
      return this.$axios
        .get('/api/users/count', { params: query })
        .then((response) => response.data.count <= 0)
        .catch(() => false);
    },
    checkLength(value, length) {
      return helpers.len(value) === length;
    },
    update() {
      this.$axios
        .put(`/api/users/${this.patient.id}`, this.patient)
        .then(() => {
          this.$router.back();
        });
    },
  },
  computed: {
    // Checagem se atributos são válidos.
    isUserInvalid() {
      return this.$v.$invalid;
    },
    isFirstNameInvalid() {
      return this.$v.patient.firstName.$invalid;
    },
    isLastNameInvalid() {
      return this.$v.patient.lastName.$invalid;
    },
    isCpfInvalid() {
      return this.$v.patient.cpf.$invalid;
    },
    isBirthDateInvalid() {
      return this.$v.patient.birthDate.$invalid;
    },
    isGenreInvalid() {
      return this.$v.patient.genre.$invalid;
    },
    isEmailInvalid() {
      return this.$v.patient.email.$invalid;
    },
    isPhoneNumberInvalid() {
      return this.$v.patient.phoneNumber.$invalid;
    },
    isProfessionalOccupationInvalid() {
      return this.$v.patient.professionalOccupation.$invalid;
    },
    isAddressInvalid() {
      return this.$v.patient.address.$invalid;
    },
    isHouseNumberInvalid() {
      return this.$v.patient.houseNumber.$invalid;
    },
    isCepInvalid() {
      return this.$v.patient.cep.$invalid;
    },
    isStateInvalid() {
      return this.$v.patient.state.$invalid;
    },
    isCityInvalid() {
      return this.$v.patient.city.$invalid;
    },

    // Para atributos com mais de uma validação, checa cada uma delas.
    isOkCpfRequired() {
      return this.$v.patient.cpf.required;
    },
    isOkGenreRequired() {
      return this.$v.patient.genre.required;
    },
    isOkEmailRequired() {
      return this.$v.patient.email.required;
    },
    isOkEmailEmail() {
      return this.$v.patient.email.email;
    },
    isOkEmailUnique() {
      return this.$v.patient.email.unique;
    },
    isOkPhoneNumberRequired() {
      return this.$v.patient.phoneNumber.required;
    },
    isOkPhoneNumberNumeric() {
      return this.$v.patient.phoneNumber.numeric;
    },
    isOkCepNumeric() {
      return this.$v.patient.cep.numeric;
    },
    isOkCepLength() {
      return this.$v.patient.cep.length;
    },
    isOkStateRequired() {
      return this.$v.patient.state.required;
    },
    isOkStateAlpha() {
      return this.$v.patient.state.alpha;
    },
    isOkStateLength() {
      return this.$v.patient.state.length;
    },
    wasEmailChanged() {
      return (
        this.currentEmail
        && this.patient
        && this.currentEmail !== this.patient.email
      );
    },
    formattedBirthDate() {
      if (this.patient && this.patient.birthDate) {
        const birthDate = new Date(this.patient.birthDate);
        return `${birthDate.getDate()}/${birthDate.getMonth()
          + 1}/${birthDate.getFullYear()}`;
      }
      return '';
    },
  },
  validations: {
    patient: {
      firstName: {
        required,
      },
      lastName: {
        required,
      },
      cpf: {},
      birthDate: {},
      genre: {
        required,
      },
      email: {
        required,
        email,
        unique(value) {
          return this.wasEmailChanged
            ? this.checkUnique({ email: value.toLowerCase() })
            : true;
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
<style>
.min {
  min-width: 750px;
}
</style>
