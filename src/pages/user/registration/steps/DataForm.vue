<template>
  <div>
    <q-card-section class="q-pt-none q-gutter-sm">
      <router-link to="/login" tag="a">
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
              :error="$v.user.firstName.$invalid"
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
              :error="$v.user.lastName.$invalid"
            >
              <template v-slot:error>
                * Sobrenome é obrigatório.
              </template>
            </q-input>
          </div>
          <div class="row wrap q-gutter-sm">
            <q-input
              class="col col-xs-4 col-md-3 col-lg-2"
              outlined
              label="CPF"
              stack-label
              :dense="true"
              v-model="user.cpf"
              :error="$v.user.cpf.$invalid"
            >
              <template v-slot:error>
                * CPF é obrigatório.
              </template>
            </q-input>
            <q-input
              class="col col-xs-5 col-lg-3"
              outlined
              label="Data de nascimento"
              stack-label
              :dense="true"
              v-model="user.birthDate"
              mask="date"
              :error="$v.user.birthDate.$invalid"
            >
              <template v-slot:error>
                * Data de nascimento é obrigatória.
              </template>
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy
                    ref="qDateProxy"
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-date v-model="user.birthDate" />
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          </div>
          <div class="row">
            <q-input
              class="col"
              outlined
              label="Email"
              stack-label
              :dense="true"
              v-model="user.email"
              :error="$v.user.email.$invalid"
            >
              <template v-slot:error>
                * Email é obrigatório.
              </template>
            </q-input>
          </div>
          <div class="row">
            <q-input
              class="col"
              outlined
              label="Confirmar email"
              stack-label
              :disabled="true"
              :dense="true"
              :error="$v.user.cpf.$invalid"
            >
              <template v-slot:error>
                * Emails não conferem.
              </template>
            </q-input>
          </div>
          <div class="row">
            <q-input
              class="col-8"
              outlined
              label="Endereço"
              stack-label
              :dense="true"
              v-model="user.address"
              :error="$v.user.address.$invalid"
            />
            <q-input
              class="col q-ml-sm"
              outlined
              label="Número"
              stack-label
              :dense="true"
              v-model="user.addressNumber"
              :error="$v.user.addressNumber.$invalid"
            />
          </div>
          <div class="row col-6">
            <q-input
              class="col col-3"
              outlined
              label="CEP"
              stack-label
              :dense="true"
              v-model="user.cep"
              :error="$v.user.cep.$invalid"
            />
            <q-input
              class="col q-ml-sm col-3"
              outlined
              label="UF"
              stack-label
              :dense="true"
              v-model="user.state"
              :error="$v.user.state.$invalid"
            >
              <template v-slot:error>
                * UF é obrigatório.
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
          <div class="row">
            <q-input
              class="col"
              outlined
              label="Profissão"
              stack-label
              :dense="true"
              v-model="user.professionalOccupation"
              :error="$v.user.professionalOccupation.$invalid"
            />
          </div>
        </div>
      </q-form>
    </q-card-section>
    <q-card-actions class="row justify-center">
      <q-btn
        to="/register/password"
        color="primary"
        label="Continuar"
        @click="this.continue"
      />
    </q-card-actions>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
import { required, email } from 'vuelidate/lib/validators';
import types from '../../../../store/types';

export default {
  methods: {
    ...mapMutations(types.namespaces.REGISTRATION, {
      setUser: types.mutations.SET_USER,
    }),
    continue() {
      this.setUser(this.user);
    },
  },
  data() {
    return {
      user: {
        firstName: '',
        lastName: '',
        cpf: '',
        birthDate: '',
        email: '',
        address: '',
        addressNumber: '',
        cep: '',
        city: '',
        state: '',
        professionalOccupation: '',
      },
    };
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
      },
      birthDate: {
        required,
      },
      email: {
        required,
        email,
      },
      address: {},
      addressNumber: {},
      cep: {},
      city: {
        required,
      },
      state: {
        required,
      },
      professionalOccupation: {},
    },
  },
};
</script>
