<template>
  <div>
    <q-card class="q-px-xl q-py-lg content">
      <q-card-section class="q-py-xs">
        <div class="row">
          <router-link class="col text-primary" to="/site/patients" tag="a">
            Voltar
          </router-link>
          <p class="col self-end text-right">
            <span class="svd-title"
              >{{ patient.firstName }} {{ patient.lastName }}</span
            >
            <br />
            <span>{{ patient.cpf | cpf }}</span>
          </p>
        </div>
        <hr />
      </q-card-section>
      <q-card-section>
        <q-form class="row justify-center">
          <div class="col col-12 q-col-gutter-sm">
            <div class="row q-gutter-md">
              <q-select
                class="col"
                outlined
                stack-label
                use-input
                clearable
                label="Vacina"
                :dense="true"
                v-model="vaccination.vaccine"
                :options="vaccineOptions"
                :error="isVaccineInvalid"
                @filter="listVaccines"
                style="max-width: 350px"
              >
                <template v-slot:error>
                  <p v-if="!isOkVaccineRequired">* Vacina é obrigatoria.</p>
                </template>
              </q-select>
              <q-input
                class="col col-4"
                outlined
                stack-label
                label="Quantidade (ml)"
                :dense="true"
                v-model="vaccination.quantity"
                :error="isQuantityInvalid"
              >
                <template v-slot:error>
                  <p v-if="!isOkQuantityRequired">
                    * Quantidade é obrigatoria.
                  </p>
                  <p v-if="!isOkNumericRequired">
                    * Apenas numérico.
                  </p>
                </template>
              </q-input>
            </div>
            <div class="row wrap q-gutter-sm">
              <q-input
                class="col col-xs-4 col-lg-3"
                outlined
                disabled
                stack-label
                label="Data do registro"
                :dense="true"
                :value="formattedCreatedAt"
                :error="isCreatedAtInvalid"
              >
                <template v-slot:append>
                  <q-icon name="event" />
                </template>
              </q-input>
              <q-input
                class="col"
                outlined
                disabled
                stack-label
                label="Nome do colaborador"
                :dense="true"
                v-model="providerFullName"
                :error="isProviderInvalid"
              />
            </div>
            <div>
              <q-input
                outlined
                stack-label
                label="Observação"
                type="textarea"
                rows="2"
                v-model="vaccination.comments"
              />
            </div>
          </div>
        </q-form>
      </q-card-section>
      <q-card-actions class="row justify-center">
        <q-btn
          color="accent"
          label="Confirmar"
          :disable="isVaccinationInvalid"
          @click="openConfirmDialog"
        />
      </q-card-actions>
    </q-card>
    <!-- CONFIRMAR CADASTRO -->
    <q-dialog v-model="showDialog">
      <q-card class="card-container">
        <q-card-section>
          <div class="text-h6 text-dark">
            Confirmar vacinação
          </div>
          <hr />
        </q-card-section>
        <q-card-section v-if="!isVaccinationInvalid" class="q-pt-none">
          <div class="row q-ma-5">
            <p class="text-dark">
              Confirma os dados informados abaixo?
              <br />
              <span class="svd-title"
                >Vacina: {{ vaccination.vaccine.label }}
                {{ vaccination.quantity }}ml</span
              >
            </p>
            <p>
              Uma vez confirmado o registro não pode ser excluído ou editado.
            </p>
          </div>
        </q-card-section>
        <q-card-actions class="q-pa-md" align="right">
          <q-btn label="Voltar" color="negative" @click="closeConfirmDialog" />
          <q-btn label="Confirmar vacinação" color="positive" @click="confirm" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { required, numeric } from 'vuelidate/lib/validators';
import types from '../../store/types';
import dateUtils from '../../shared/utils/date';

export default {
  data() {
    return {
      vaccination: {
        vaccine: null,
        quantity: '',
        comments: '',
        createdAt: new Date(),
      },
      dateUtils,
      patient: null,
      vaccineOptions: [],
      showDialog: false,
      password: '',
    };
  },
  computed: {
    ...mapGetters(types.namespaces.AUTHORIZATION, {
      user: types.getters.GET_USER,
    }),
    formattedCreatedAt() {
      return this.vaccination.createdAt.toLocaleString([], {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
      });
    },
    providerFullName() {
      return this.user ? `${this.user.firstName} ${this.user.lastName}` : '';
    },
    isVaccinationInvalid() {
      return this.$v.vaccination.$invalid;
    },
    isVaccineInvalid() {
      return this.$v.vaccination.vaccine.$invalid;
    },
    isQuantityInvalid() {
      return this.$v.vaccination.quantity.$invalid;
    },
    isCreatedAtInvalid() {
      return this.$v.vaccination.createdAt.$invalid;
    },
    isProviderInvalid() {
      return this.$v.vaccination.provider.$invalid;
    },
    isPasswordInvalid() {
      return this.$v.password.$invalid;
    },
    isOkVaccineRequired() {
      return this.$v.vaccination.vaccine.required;
    },
    isOkQuantityRequired() {
      return this.$v.vaccination.quantity.required;
    },
    isOkNumericRequired() {
      return this.$v.vaccination.quantity.numeric;
    },
    isOkPasswordRequired() {
      return this.$v.password.required;
    },
  },
  methods: {
    findAllVaccinations() {
      let url = `/api/users/${this.patient.id}/vaccinations?`;
      if (this.search.query) {
        url += `q=${this.search.query}&`;
      }

      if (this.search.from) {
        url += `from=${dateUtils.toString(this.search.from)}&`;
      }

      if (this.search.to) {
        url += `to=${dateUtils.toString(this.search.to)}&`;
      }

      this.$axios.get(url).then((response) => {
        this.vaccinations = response.data;
      });
    },
    loadVaccinations() {
      this.$axios
        .get(`/api/users/${this.patient.id}/vaccinations`)
        .then((response) => {
          this.vaccineOptions = response.data;
        });
    },
    listVaccines(value, update) {
      let url = '/api/vaccines?active=true';
      if (value) {
        url += `&query=${value}`;
      }

      update(() => {
        this.$axios.get(url).then((response) => {
          this.vaccineOptions = [...response.data];
        });
      });
    },
    openConfirmDialog() {
      this.showDialog = true;
    },
    closeConfirmDialog() {
      this.showDialog = false;
    },
    confirm() {
      this.$axios
        .post('/api/vaccinations', {
          vaccineId: this.vaccination.vaccine.id,
          patientId: this.patient.id,
          providerId: this.user.id,
          quantity: this.vaccination.quantity,
          createdAt: this.vaccination.createdAt,
          comments: this.vaccination.comments,
        })
        .then(() => {
          this.$router.push(`/site/patients/${this.patient.id}`);
        });
    },
  },
  mounted() {
    this.$axios.get(`/api/users/${this.$route.params.id}`).then((response) => {
      this.patient = response.data;
    });
  },
  validations: {
    vaccination: {
      vaccine: {
        required,
      },
      quantity: {
        required,
        numeric,
      },
      createdAt: {},
      provider: {},
    },
    password: {
      required,
    },
  },
};
</script>
<style>
.content {
  width: 650px;
}
.select {
  width: 150px;
}
.expanded-area {
  background-color: #ededed;
}
</style>
