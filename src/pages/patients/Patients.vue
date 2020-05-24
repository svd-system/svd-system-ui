<template>
  <div>
    <q-card class="q-pa-xl container">
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
          row-key="cpf"
          hide-bottom
          flat
        >
          <template v-slot:header="props">
            <q-tr :props="props">
              <q-th v-for="col in props.cols" :key="col.name" :props="props">
                <div v-if="!col.hide">{{ col.label }}</div>
              </q-th>
            </q-tr>
          </template>
          <template v-slot:body="props">
            <q-tr :props="props">
              <q-td key="cpf" :props="props">
                {{ props.row.cpf }}
              </q-td>
              <q-td key="name" :props="props">
                {{ props.row.firstName }} {{ props.row.lastName }}
              </q-td>
              <q-td key="role" :props="props">
                {{ props.row.role }}
              </q-td>
              <q-td v-if="isUserAdministrator" key="active" :props="props">
                <q-checkbox v-model="props.row.active" color="accent" />
              </q-td>

              <q-td v-if="isUserAdministrator" key="edit" :props="props">
                <q-icon name="edit" size="sm" />
              </q-td>
            </q-tr>
          </template>
        </q-table>
        <div v-if="patients.length < 1" class="q-my-lg text-center svd-title">
          Nenhum paciente encontrado
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
export default {
  created() {
    this.activeOnly = !this.isUserAdministrator;
    this.$axios
      .get(`/api/users?excludeId=${this.user.id}&activeOnly=${this.activeOnly}`)
      .then((response) => {
        this.patients = response.data;
      });
  },
  data() {
    return {
      user: {
        id: 14,
        role: 'ADMINISTRADOR',
      },
      query: '',
      activeOnly: false,
      patients: [],
    };
  },
  computed: {
    columns() {
      const allColumns = [
        {
          name: 'cpf',
          label: 'CPF',
          align: 'left',
          field: (patient) => patient.cpf,
        },
        {
          name: 'name',
          label: 'NOME COMPLETO',
          align: 'left',
          field: (patient) => `${patient.firstName} ${patient.lastName}`,
        },
        {
          name: 'role',
          label: 'PERFIL',
          align: 'left',
          field: (patient) => patient.role,
        },
        {
          name: 'active',
          label: 'ATIVO',
          align: 'left',
          field: (patient) => patient.active,
        },
        {
          name: 'edit',
          label: '',
          align: 'center',
        },
      ];

      return this.isUserAdministrator ? allColumns : allColumns.slice(0, 3);
    },
    isUserAdministrator() {
      return this.user.role === 'ADMINISTRADOR';
    },
  },
  methods: {
    findAllPatients() {
      const token = this.$cookie.get('token');
      let url = `/api/users?excludeId=${this.user.id}&activeOnly=${this.activeOnly}`;
      if (this.query) {
        url += `&query=${this.query}`;
      }

      this.$axios
        .get(url, {
          headers: {
            Authorization: token,
          },
        })
        .then((response) => {
          this.patients = response.data;
        });
    },
  },
};
</script>
<style>
.container {
  min-width: 80%;
}
</style>
