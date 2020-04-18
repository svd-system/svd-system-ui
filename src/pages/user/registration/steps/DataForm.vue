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
          />
          <div class="col q-px-lg self-center text-negative">
            * Sobrenome é obrigatório
          </div>
        </div>
        <div class="row">
          <div class="row col-6">
            <q-input class="col-6" outlined placeholder="CPF" :dense="true" />
            <q-input
              class="col q-ml-sm"
              outlined
              placeholder="Data de nascimento"
              :dense="true"
              v-model="date"
              mask="date"
            >
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy
                    ref="qDateProxy"
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-date v-model="date" />
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
            :dense="true"
          />
          <div class="col q-px-lg self-center text-negative">
            * Emails informados não coincidem
          </div>
        </div>
        <div class="row">
          <q-input
            class="col col-6"
            type="textarea"
            rows="3"
            outlined
            placeholder="Endereço"
            :dense="true"
          />
          <div class="col q-px-lg self-center text-negative">
            * Endereço é obrigatório
          </div>
        </div>
        <div class="row">
          <q-input
            class="col col-6"
            outlined
            placeholder="Profissão"
            :dense="true"
          />
          <div class="col q-px-lg self-center text-negative">
            * Profissão é obrigatório
          </div>
        </div>
      </q-form>
    </q-card-section>
    <q-card-actions class="row justify-center">
      <q-btn to="/register/password" color="primary" label="Continuar" />
    </q-card-actions>
  </div>
</template>

<script>
export default {
  data() {
    return {
      options: ['Paciente', 'Colaborador'],
      selectedOption: 'Paciente',
      date: '',
    };
  },
};
</script>
