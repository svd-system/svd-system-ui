<template>
  <div>
    <q-card class="q-pa-sm min">
      <q-card-section class="q-pt-lg q-gutter-sm">
        <div v-if="isUserAdministrator" class="row justify-end">
          <q-btn
            label="CRIAR POSTAGEM"
            class="q-mt-md"
            color="teal"
            @click="this.create"
          >
          </q-btn>
        </div>
        <p class="text-h6 text-dark text-center svd-title">
          Mural de notícias
        </p>
      </q-card-section>
      <q-card-section class="q-px-xl">
        <q-list class="q-gutter-lg">
          <q-card v-for="post of newsfeed" :key="post" square class="my-card">
            <q-card-section v-if="post.showIcon" class="row q-gutter-sm">
              <q-icon name="notifications" size="md" color="accent" />
              <div class="text-h6 text-accent">{{ post.title }}</div>
            </q-card-section>
            <q-card-section v-else>
              <div class="text-h6">{{ post.title }}</div>
            </q-card-section>
            <q-separator inset />
            <q-card-section class="q-px-lg">
              {{ post.description }}
            </q-card-section>
            <q-card-section>
              <q-btn
                v-if="post.link"
                flat
                color="accent"
                label="IR PARA A PÁGINA"
                @click="goToLink(post.link)"
              />
            </q-card-section>
          </q-card>
        </q-list>
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
      newsfeed: [],
    };
  },
  created() {
    this.$axios.get('/api/newsfeed').then((response) => {
      this.newsfeed = response.data;
    });
  },
  methods: {
    create() {
      this.$router.push('/site/newsfeed/new');
    },
    goToLink(link) {
      window.open(link, '_target');
    },
  },
  computed: {
    ...mapGetters(types.namespaces.AUTHORIZATION, {
      user: types.getters.GET_USER,
    }),
    isUserAdministrator() {
      return this.user && this.user.role === 'ADMINISTRADOR';
    },
  },
};
</script>
<style>
.my-card {
  width: 550px;
}
</style>
