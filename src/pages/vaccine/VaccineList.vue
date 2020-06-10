<template>
  <div>
    <q-card class="q-pa-lg min">
      <q-card-section>
        <q-card-section class="q-pt-none q-gutter-sm">
          <router-link class="text-primary" to="/site/vaccines" tag="a">
            Voltar
          </router-link>
        </q-card-section>
        <q-card-section>
          <q-form class="row q-gutter-sm">
            <div class="col col-9">
              <q-input
                type="search"
                label="Pesquisar vacina"
                stack-label
                outlined
                :dense="true"
                v-model="query"
                @keyup="findAllVaccines"
              />
            </div>
            <div class="col">
              <q-btn label="Cadastrar" color="primary" @click="create" />
            </div>
          </q-form>
        </q-card-section>
        <q-card-section>
          <q-table
            :data="vaccines"
            :columns="columns"
            row-key="id"
            hide-bottom
            flat
          >
            <template v-slot:header="props">
              <q-tr :props="props">
                <q-th v-for="col in props.cols" :key="col.name" :props="props">
                  <div>{{ col.label }}</div>
                </q-th>
              </q-tr>
            </template>
            <template v-slot:body="props">
              <q-tr v-if="hasVaccinesToShow" :props="props" @click="goToVaccine(props.row.id)">
                <q-td key="id" :props="props">
                  {{ props.row.serialNumber }}
                </q-td>
                <q-td key="label" :props="props">
                  {{ props.row.label }}
                </q-td>
                <q-td key="quantity" :props="props">
                  {{ props.row.defaultQuantity }}
                </q-td>
                <q-td key="active" :props="props">
                  <q-checkbox
                    v-model="props.row.active"
                    @click.native="update(props.row)"
                    color="accent"
                  />
                </q-td>
                <q-td key="edit" :props="props">
                  <q-btn flat round @click.stop="edit(props.row.id)">
                    <q-icon clickable name="edit" size="sm" />
                  </q-btn>
                </q-td>
              </q-tr>
            </template>
          </q-table>
          <div
            v-if="!hasVaccinesToShow"
            class="q-my-lg text-center svd-title"
          >
            Nenhum registro para exibir.
          </div>
        </q-card-section>
      </q-card-section>
    </q-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      vaccines: [],
      query: '',
    };
  },
  computed: {
    hasVaccinesToShow() {
      return this.vaccines && this.vaccines.length > 0;
    },
    columns() {
      return [
        {
          name: 'id',
          label: 'ID',
          align: 'left',
          field: (vaccine) => vaccine.serialNumber,
        },
        {
          name: 'label',
          label: 'NOME VACINA',
          align: 'left',
          field: (vaccine) => vaccine.label,
        },
        {
          name: 'quantity',
          label: 'QTD (ML)',
          align: 'left',
          field: (vaccine) => vaccine.defaultQuantity,
        },
        {
          name: 'active',
          label: 'ATIVO',
          field: (vaccine) => vaccine.active,
        },
        {
          name: 'edit',
          label: '',
        },
      ];
    },
  },
  methods: {
    findAllVaccines() {
      let url = '/api/vaccines';
      if (this.query) {
        url += `?query=${this.query}`;
      }

      this.$axios.get(url).then((response) => {
        this.vaccines = response.data;
      });
    },
    update(vaccine) {
      this.$axios.put(`/api/vaccines/${vaccine.id}`, vaccine);
    },
    goToVaccine(vaccineId) {
      this.$router.push(`/site/vaccines/${vaccineId}`);
    },
    edit(vaccineId) {
      this.$router.push(`/site/vaccines/${vaccineId}/edit`);
    },
    create() {
      this.$router.push('/site/vaccines/new');
    },
  },
  mounted() {
    this.findAllVaccines();
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
</style>
