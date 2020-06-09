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
                v-model="query"
                @keyup="findAllVaccinations"
              />
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

export default {
  data() {
    return {
      query: '',
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
      let url = `/api/users/${this.user.id}/vaccinations`;
      if (this.query) {
        url += `?q=${this.query}`;
      }

      this.$axios.get(url).then((response) => {
        this.vaccinations = response.data;
      });
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
