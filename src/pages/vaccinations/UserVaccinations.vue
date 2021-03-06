<template>
  <div>
    <q-card class="q-pa-xl min">
      <q-card-section>
        <q-form class="row justify-center">
          <div class="col col-12 q-col-gutter-sm">
            <div class="row wrap q-gutter-lg">
              <q-input
                class="col"
                outlined
                label="Pesquisar"
                stack-label
                :dense="true"
                v-model="search.query"
                @keyup="findAllVaccinations"
              />
            </div>
            <div class="row wrap q-gutter-sm">
              <q-input
                class="col col-xs-5 col-lg-4"
                outlined
                label="De"
                stack-label
                :dense="true"
                v-model="search.from"
              >
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy
                      ref="qDateFromProxy"
                      transition-show="scale"
                      transition-hide="scale"
                    >
                      <q-date
                        :mask="dateUtils.MASK"
                        v-model="search.from"
                        :locale="dateUtils.LOCALE"
                        @input="dateChanged($refs.qDateFromProxy)"
                      />
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
              <q-input
                class="col col-xs-5 col-lg-4"
                outlined
                label="Até"
                stack-label
                :dense="true"
                v-model="search.to"
              >
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy
                      ref="qDateToProxy"
                      transition-show="scale"
                      transition-hide="scale"
                    >
                      <q-date
                        :mask="dateUtils.MASK"
                        v-model="search.to"
                        :locale="dateUtils.LOCALE"
                        @input="dateChanged($refs.qDateToProxy)"
                      />
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
            </div>
          </div>
        </q-form>
      </q-card-section>
      <q-card-section>
        <hr />
        <q-list v-if="vaccinations && vaccinations.length > 0" flat>
          <q-expansion-item
            v-for="(vaccination, index) in vaccinations"
            :key="index"
            :label="vaccination.vaccine.label"
          >
            <q-card>
              <q-card-section class="expanded-area">
                <div>
                  Data de aplicação: {{ vaccination.createdAt | ddmmyyyy }}
                </div>
                <div>Quantidade: {{ vaccination.quantity }}ml</div>
                <div>
                  Nome do(a) responsável: {{ vaccination.provider.firstName }}
                  {{ vaccination.provider.lastName }}
                </div>
                <div>Observação: {{ vaccination.comments }}</div>
              </q-card-section>
            </q-card>
          </q-expansion-item>
        </q-list>
        <div
          v-if="!vaccinations || vaccinations.length == 0"
          class="q-my-lg text-center svd-title"
        >
          Nenhum registro encontrado
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import types from '../../store/types';
import dateUtils from '../../shared/utils/date';

export default {
  data() {
    return {
      dateUtils,
      search: {
        query: '',
        from: '',
        to: '',
      },
      vaccinations: [],
    };
  },
  computed: {
    ...mapGetters(types.namespaces.AUTHORIZATION, {
      user: types.getters.GET_USER,
    }),
  },
  methods: {
    findAllVaccinations() {
      let url = `/api/users/${this.user.id}/vaccinations?`;
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
    dateChanged(qDateProxy) {
      this.findAllVaccinations();
      qDateProxy.hide();
    },
  },
  mounted() {
    this.$axios
      .get(`/api/users/${this.user.id}/vaccinations`)
      .then((response) => {
        this.vaccinations = response.data;
      });
  },
};
</script>
<style>
.min {
  min-width: 650px;
}
.select {
  width: 150px;
}
.expanded-area {
  background-color: #ededed;
}
</style>
