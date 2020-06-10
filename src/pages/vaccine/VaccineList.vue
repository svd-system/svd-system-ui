<template>
  <div>
    <q-card class="q-pa-xl min">
      <q-card-section>
    <q-card-section class="q-pt-none q-gutter-sm">
      <router-link class="text-primary" to="/user/vaccines" tag="a">
        voltar cadastro
      </router-link>
    </q-card-section>
    <q-card-section>
      <q-form class="row justify-left">
        <div class="col col-10 q-col-gutter-sm">
          <div class="row wrap q-gutter-sm">
            <label class="col col-xs-12 col-md-10">Pesquisar vacina
            <q-input
              type="search"
              placeholder="Filtre pelo nome"
              outlined
              :dense="true"
              v-model="query"
             @keyup="findAllVaccines"
            >
            </q-input>
            </label>
            <div class="row justify-end">
        <q-btn
        type="search"
        label="Buscar"
        class="q-mt-md"
        color="teal"
        :dense="true"
        >
        <template v-slot:loading>
          <q-spinner-facebook />
        </template>
      </q-btn>
    </div>
          </div>
        </div>
      </q-form>
    </q-card-section>
         <q-card-section>
        <q-table
          :data="vaccine"
          :columns="columns"
          :visible-columns="visibleColumns"
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
            <q-tr :props="props" @click="goToPatient(props.row.id)">
              <q-td key="id" :props="props">
                {{ props.row.serialNumber }}
              </q-td>
              <q-td key="name" :props="props">
                {{ props.row.label }}
              </q-td>
              <q-td key="qtdML" :props="props">
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
          v-if="vaccine && vaccine.length < 1"
          class="q-my-lg text-center svd-title"
        >
          pesquise a vacina pelo nome
        </div>
      </q-card-section>

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
      vaccine: [],
      query: '',
      activeOnly: true,
      roleOptions: ['PACIENTE', 'COLABORADOR', 'ADMINISTRADOR'],
    };
  },
  computed: {
    ...mapGetters(types.namespaces.AUTHORIZATION, {
      vaccine: types.getters.GET_VACCINE,
    }),
    columns() {
      return [
        {
          name: 'id',
          label: 'ID',
          align: 'left',
          field: (vaccine) => vaccine.serialNumber,
          roles: ['ADMINISTRADOR', 'COLABORADOR'],
        },
        {
          name: 'name',
          label: 'NOME VACINA',
          align: 'left',
          field: (vaccine) => vaccine.label,
          roles: ['ADMINISTRADOR', 'COLABORADOR'],
        },
        {
          name: 'qtdML',
          label: 'QTD (ML)',
          align: 'left',
          field: (vaccine) => vaccine.defaultQuantity,
          roles: ['ADMINISTRADOR'],
        },
        {
          name: 'active',
          label: 'ATIVO',
          field: (vaccine) => vaccine.active,
          roles: ['ADMINISTRADOR'],
        },
        {
          name: 'edit',
          label: '',
          roles: ['ADMINISTRADOR', 'COLABORADOR'],
        },
      ];
    },
    isUserAdministrator() {
      return this.user && this.user.role === 'ADMINISTRADOR';
    },
    visibleColumns() {
      const allColumns = [
        'id', 'name', 'edit', 'qtdML', 'active',
      ];
      return this.isUserAdministrator ? allColumns : allColumns.slice(0, 5);
    },
  },
  methods: {
    ...mapGetters(types.namespaces.AUTHORIZATION, {
      getAuthorizedUser: types.getters.GET_VACCINE,
    }),
    findAllVaccines() {
      let url = `/api/vaccines?active=${this.activeOnly}`;
      if (this.query) {
        url += `&query=${this.query}`;
      }

      this.$axios.get(url).then((response) => {
        this.vaccine = response.data;
      });
    },
    update(vaccine) {
      this.$axios.put(`/api/vaccines/${vaccine.id}`, vaccine);
    },
    goToPatient(vaccineId) {
      this.$router.push(`/user/vaccines/${vaccineId}`);
    },
    edit(vaccineId) {
      this.$router.push(`/user/vaccines/${vaccineId}/edit`);
    },
  },
  mounted() {
    this.activeOnly = !this.isUserAdministrator;
    this.$axios
      .get(`/api/users?excludeId=${this.user.id}&activeOnly=${this.activeOnly}`)
      .then((response) => {
        this.patients = response.data;
      });
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
</style>
