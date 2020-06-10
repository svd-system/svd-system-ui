<template>
  <div>
    <q-card class="q-pa-xl min">
      <q-card-section>
    <q-card-section class="q-pt-none q-gutter-sm">
      <router-link class="text-primary" to="vaccines/list" tag="a">
        lista de vacinas
      </router-link>
      <p class="text-h6 text-dark text-center svd-title">
        Cadastrar nova vacina
      </p>
    </q-card-section>
    <q-card-section>
      <q-form class="row justify-center">
        <div class="col col-10 q-col-gutter-sm">
          <div class="row wrap q-gutter-sm">
            <label class="col col-xs-12 col-md-2">ID
            <q-input
              placeholder="ex: 231"
              outlined
              :dense="true"
              v-model="vaccine.serialNumber"
            >
            </q-input>
            </label>
            <label class="col col-md-4">Qtd. padrão (ml)
            <q-input
              placeholder="ex: 80 ml"
              outlined
              :dense="true"
              v-model="vaccine.defaultQuantity"
            >
            </q-input>
            </label>
          </div>
        </div>
      </q-form>
      <q-form class="row justify-center" >
        <div class="col col-10 q-col-gutter-sm">
          <div class="corpo">
            <label class="col col-xs-12 col-md-10">Nome da vacina
            <q-input
              placeholder="ex: INFLUENZA"
              outlined
              :dense="true"
              v-model="vaccine.label"
            >
            <template v-slot:error>
                <p v-if="!isOkCpfRequired">* CPF é obrigatorio.</p>
            </template>
            </q-input>
            </label>
          </div>
        </div>
      </q-form>
    </q-card-section>
    <div class="btnCadastrar row justify-center">
    <q-btn
        label="Cadastrar"
        class="q-mt-md"
        color="teal"
        @click="create"
        >
        <template v-slot:loading>
          <q-spinner-facebook />
        </template>
      </q-btn>
    </div>
    <alert-error ref="alertError">
      <p slot="title">Algo deu errado!</p>
      <p slot="message">
        Infelizmente não foi possivel cadastrar a vacina!
      </p>
    </alert-error>
    <alert-success ref="alertSuccess" @onClickOK="goToLogin">
      <p slot="title">Sucesso!</p>
      <p slot="message">
        o cadastro da vacina foi realizado!
      </p>
    </alert-success>
    </q-card-section>
    </q-card>
  </div>
</template>
<script>
import { mapGetters, mapMutations } from 'vuex';
import types from '../../store/types';
import AlertError from '../../components/shared/alert/Error';
import AlertSuccess from '../../components/shared/alert/Success';

export default {
  components: {
    AlertError,
    AlertSuccess,
  },
  data() {
    return {
      vaccine: {
        serialNumber: '',
        defaultQuantity: '',
        label: '',
      },
    };
  },
  computed: {
    ...mapGetters(types.namespaces.REGISTRATION, {
      vaccine: types.getters.GET_VACCINE,
    }),
  },
  methods: {
    ...mapMutations(types.namespaces.REGISTRATION, {
      setVaccine: types.mutations.SET_VACCINE,
    }),
    create() {
      const vacinne = {
        serialNumber: this.vaccine.serialNumber,
        defaultQuantity: this.vaccine.defaultQuantity,
        label: this.vaccine.label,
      };

      this.$axios
        .post('/api/vaccines', vacinne)
        .then(() => {
          this.$refs.alertSuccess.open();
          this.vaccine = {
            serialNumber: '',
            defaultQuantity: '',
            label: '',
          };
        })
        .catch(() => {
          this.$refs.alertError.open();
        });
    },
  },
  validations: {
    vacinne: {
      nomeVaccine: {
      },
    },
  },
};

</script>
<style>

.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to {
  transform: translateX(10px);
  opacity: 0;
}
.corpo{
  margin-top: 10px;
}
.btnCadastrar{
  margin-top: 40px;
}
</style>
