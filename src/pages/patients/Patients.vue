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
              />
              <q-checkbox
                v-if="true"
                v-model="activeOnly"
                color="accent"
                label="ATIVO"
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
              <q-td v-if="user.role === 'ADMINISTRADOR'" key="active" :props="props">
                <q-checkbox
                  v-if="true"
                  v-model="props.row.active"
                  color="accent"
                />
              </q-td>
            </q-tr>
          </template>
        </q-table>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        role: 'PACIENTE',
      },
      query: '',
      activeOnly: false,
      columns: [
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
      ],
      patients: [
        {
          cpf: '123.321.456-65',
          firstName: 'Ricardo',
          lastName: 'Rocha',
          role: 'PACIENTE',
          active: true,
        },
        {
          cpf: '321.123.231-70',
          firstName: 'Lionel',
          lastName: 'Messi',
          role: 'PACIENTE',
          active: false,
        },
      ],
    };
  },
};
</script>
<style>
.container {
  min-width: 80%;
}
</style>
