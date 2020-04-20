<template>
  <div>
    <q-card-section class="q-pa-none q-gutter-sm">
      <router-link to="/login" tag="a">
        Voltar para o login
      </router-link>
      <p class="text-h6 text-dark text-center svd-title">
        Preencha os dados para fazer o seu cadastro.
      </p>
    </q-card-section>
    <q-card-section class="q-px-none">
      <q-form class="q-gutter-sm">
        <div class="row">
          <q-input
            class="col col-6"
            outlined
            placeholder="Nome"
            :dense="true"
            v-model="user.firstName"
          />
          <div class="col q-px-lg self-center text-negative">
            * Nome é obrigatório
          </div>
        </div>
        <div class="row">
          <q-input
            class="col col-6"
            outlined
            placeholder="Sobrenome"
            :dense="true"
            v-model="user.lastName"
          />
          <div class="col q-px-lg self-center text-negative">
            * Sobrenome é obrigatório
          </div>
        </div>
        <div class="row">
          <div class="row col-6">
            <q-input
              class="col-6"
              outlined
              placeholder="CPF"
              :dense="true"
              v-model="user.cpf"
            />
            <q-input
              class="col q-ml-sm"
              outlined
              placeholder="Data de nascimento"
              :dense="true"
              v-model="user.birthDate"
              mask="date"
            >
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
          <div class="col q-px-lg self-center text-negative">
            * CPF e data de nascimento são obrigatórios
          </div>
        </div>
        <div class="row">
          <q-input
            class="col col-6"
            outlined
            placeholder="Email"
            :dense="true"
            v-model="user.email"
          />
          <div class="col q-px-lg self-center text-negative">
            * Email é obrigatório
          </div>
        </div>
        <div class="row">
          <q-input
            class="col col-6"
            outlined
            placeholder="Confirmar email"
            :disabled="true"
            :dense="true"
          />
          <div class="col q-px-lg self-center text-negative">
            * Emails informados não coincidem
          </div>
        </div>
        <div class="row">
          <div class="row col-6">
            <q-input
              class="col col-8"
              outlined
              placeholder="Endereço"
              :dense="true"
              v-model="user.address"
            />
            <q-input
              class="col q-ml-sm"
              rows="2"
              outlined
              placeholder="Número"
              :dense="true"
              v-model="user.addressNumber"
            />
          </div>
        </div>
        <div class="row">
          <div class="row col-6">
            <q-input
              class="col col-3"
              outlined
              placeholder="CEP"
              :dense="true"
              v-model="user.cep"
            />
            <q-input
              class="col q-ml-sm col-2"
              outlined
              placeholder="UF"
              :dense="true"
              v-model="user.state"
            />
            <q-input
              class="col q-ml-sm"
              outlined
              placeholder="Município"
              :dense="true"
              v-model="user.city"
            />
          </div>
        </div>
        <div class="row">
          <q-input
            class="col col-6"
            outlined
            placeholder="Profissão"
            :dense="true"
            v-model="user.professionalOccupation"
          />
        </div>
      </q-form>
    </q-card-section>
    <q-card-actions class="row justify-center">
      <q-btn to="/register/password" color="primary" label="Continuar" @click="this.continue" />
    </q-card-actions>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
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
        birthDate: new Date(),
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
};
</script>
