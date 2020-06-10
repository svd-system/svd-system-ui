<template>
  <div>
    <q-card class="q-pa-lg min">
      <q-card-section>
        <q-card-section class="q-pt-none q-gutter-sm">
          <router-link class="text-primary" to="/site/vaccines" tag="a">
            Voltar
          </router-link>
          <p class="text-h6 text-dark text-center svd-title">
            Cadastrar nova vacina
          </p>
        </q-card-section>
        <q-card-section>
          <q-form class="row justify-center">
            <div class="col col-10 q-col-gutter-sm">
              <div class="row wrap q-gutter-sm">
                <q-input
                  class="col col-6"
                  label="Número de série"
                  stack-label
                  outlined
                  :dense="true"
                  v-model="vaccine.serialNumber"
                  :error="isSerialNumerInvalid"
                >
                  <template v-slot:error>
                    <p v-if="!isOkSerialNumberRequired">
                      * Numero de série obrigatorio.
                    </p>
                  </template>
                </q-input>
                <q-input
                  class="col col-5"
                  label="Quantidade padrão"
                  stack-label
                  outlined
                  :dense="true"
                  v-model="vaccine.defaultQuantity"
                  :error="isDefaultQuantityInvalid"
                >
                  <template v-slot:error>
                    <p v-if="!isOkDefaultQuantityNumeric">* Campo numérico.</p>
                  </template>
                </q-input>
              </div>
            </div>
          </q-form>
          <q-form class="row justify-center">
            <div class="col col-10 q-col-gutter-sm">
              <div class="corpo">
                <q-input
                  label="Descrição"
                  stack-label
                  outlined
                  :dense="true"
                  v-model="vaccine.label"
                  :error="isLabelInvalid"
                >
                  <template v-slot:error>
                    <p v-if="!isOkLabelRequired">* Descrição é obrigatoria.</p>
                  </template>
                </q-input>
              </div>
            </div>
          </q-form>
        </q-card-section>
        <div class="btnCadastrar row justify-center">
          <q-btn
            :disable="isVaccineInvalid"
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
            O cadastro da vacina foi realizado!
          </p>
        </alert-success>
      </q-card-section>
    </q-card>
  </div>
</template>
<script>
import { required, numeric } from 'vuelidate/lib/validators';
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
    isVaccineInvalid() {
      return this.$v.vaccine.$invalid;
    },
    isSerialNumerInvalid() {
      return this.$v.vaccine.serialNumber.$invalid;
    },
    isDefaultQuantityInvalid() {
      return this.$v.vaccine.defaultQuantity.$invalid;
    },
    isLabelInvalid() {
      return this.$v.vaccine.label.$invalid;
    },
    isOkSerialNumberRequired() {
      return this.$v.vaccine.serialNumber.required;
    },
    isOkDefaultQuantityNumeric() {
      return this.$v.vaccine.defaultQuantity.numeric;
    },
    isOkLabelRequired() {
      return this.$v.vaccine.label.required;
    },
  },
  methods: {
    create() {
      this.vaccine.defaultQuantity = this.vaccine.defaultQuantity
        ? this.vaccine.defaultQuantity
        : null;
      this.$axios
        .post('/api/vaccines', {
          serialNumber: this.vaccine.serialNumber,
          label: this.vaccine.label,
          defaultQuantity: this.vaccine.defaultQuantity
            ? this.vaccine.defaultQuantity
            : null,
        })
        .then(() => {
          this.$refs.alertSuccess.open();
        })
        .catch(() => {
          this.$refs.alertError.open();
        });
    },
    goToLogin() {
      this.$router.push('/site/vaccines');
    },
  },
  validations: {
    vaccine: {
      serialNumber: {
        required,
      },
      label: {
        required,
      },
      defaultQuantity: {
        numeric,
      },
    },
  },
};
</script>
<style>
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateX(10px);
  opacity: 0;
}
.corpo {
  margin-top: 10px;
}
.btnCadastrar {
  margin-top: 40px;
}
</style>
