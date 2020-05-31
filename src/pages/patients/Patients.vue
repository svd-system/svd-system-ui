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
                label="Pesquisar paciente"
                stack-label
                :dense="true"
                v-model="query"
                @keyup="findAllPatients"
              />
              <q-checkbox
                v-if="isUserAdministrator"
                v-model="activeOnly"
                color="accent"
                label="ATIVO"
                @click.native="findAllPatients"
              />
            </div>
          </div>
        </q-form>
      </q-card-section>
      <q-card-section>
        <q-table
          :data="patients"
          :columns="columns"
          :visible-columns="visibleColumns"
          row-key="cpf"
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
              <q-td key="cpf" :props="props">
                {{ props.row.cpf }}
              </q-td>
              <q-td key="name" :props="props">
                {{ props.row.firstName }} {{ props.row.lastName }}
              </q-td>
              <q-td key="role" :props="props" class="select">
                <q-select
                  borderless
                  v-model="props.row.role"
                  :options="roleOptions"
                  :dense="true"
                  @input="update(props.row)"
                  @click.native="$event.stopPropagation()"
                />
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
          v-if="patients && patients.length < 1"
          class="q-my-lg text-center svd-title"
        >
          Nenhum paciente encontrado
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
      patients: [],
      query: '',
      activeOnly: false,
      roleOptions: ['PACIENTE', 'COLABORADOR', 'ADMINISTRADOR'],
    };
  },
  computed: {
    ...mapGetters(types.namespaces.AUTHORIZATION, {
      user: types.getters.GET_USER,
    }),
    columns() {
      return [
        {
          name: 'cpf',
          label: 'CPF',
          align: 'left',
          field: (patient) => patient.cpf,
          roles: ['ADMINISTRADOR', 'COLABORADOR'],
        },
        {
          name: 'name',
          label: 'NOME COMPLETO',
          align: 'left',
          field: (patient) => `${patient.firstName} ${patient.lastName}`,
          roles: ['ADMINISTRADOR', 'COLABORADOR'],
        },
        {
          name: 'role',
          label: 'PERFIL',
          align: 'left',
          field: (patient) => patient.role,
          roles: ['ADMINISTRADOR'],
        },
        {
          name: 'active',
          label: 'ATIVO',
          field: (patient) => patient.active,
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
        'cpf', 'name', 'edit', 'role', 'active',
      ];
      return this.isUserAdministrator ? allColumns : allColumns.slice(0, 3);
    },
  },
  methods: {
    ...mapGetters(types.namespaces.AUTHORIZATION, {
      getAuthorizedUser: types.getters.GET_USER,
    }),
    findAllPatients() {
      let url = `/api/users?excludeId=${this.user.id}&activeOnly=${this.activeOnly}`;
      if (this.query) {
        url += `&query=${this.query}`;
      }

      this.$axios.get(url).then((response) => {
        this.patients = response.data;
      });
    },
    update(user) {
      this.$axios.put(`/api/users/${user.id}`, user);
    },
    isEqualsUserRole(roles) {
      return this.user && roles.includes(this.user.role);
    },
    goToPatient(patientId) {
      this.$router.push(`/user/patients/${patientId}`);
    },
    edit(patientId) {
      this.$router.push(`/user/patients/${patientId}/edit`);
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
.min {
  min-width: 650px;
}
.select {
  width: 150px;
}
</style>
