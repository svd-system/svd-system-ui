<template>
  <div>
    <q-card class="q-py-lg min">
      <q-card-section>
        <q-card-section class="q-pt-none q-gutter-sm">
          <router-link class="text-primary" to="/site/newsfeed" tag="a">
            Voltar
          </router-link>
          <p class="text-h6 text-dark text-center svd-title">
            Criar post
          </p>
        </q-card-section>
        <q-card-section class="row justify-center">
          <q-form class="col col-10 q-col-gutter-sm">
            <div class="row wrap">
              <q-input
                class="col"
                outlined
                label="Titulo"
                stack-label
                :dense="true"
                v-model="newsfeed.title"
              />
            </div>
            <div class="row wrap">
              <q-input
                class="col"
                outlined
                label="Descrição"
                type="textarea"
                stack-label
                :dense="true"
                v-model="newsfeed.description"
              />
            </div>
            <div class="row wrap">
              <q-input
                class="col"
                outlined
                label="Link"
                stack-label
                :dense="true"
                v-model="newsfeed.link"
              />
            </div>
            <div class="row wrap">
              <q-input
                class="col col-5"
                outlined
                label="Data de expiração"
                stack-label
                :dense="true"
              >
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy
                      ref="qDateProxy"
                      transition-show="scale"
                      transition-hide="scale"
                    >
                      <q-date
                        :mask="dateUtils.MASK"
                        v-model="newsfeed.expiresAt"
                        :locale="dateUtils.LOCALE"
                        @input="() => $refs.qDateProxy.hide()"
                      />
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
            </div>
            <div class="check-box">
              <q-checkbox
                label="Exibir ícone de notificação?"
                :dense="true"
                color="accent"
                v-model="newsfeed.showIcon"
              />
            </div>
          </q-form>
        </q-card-section>
        <div class="q-my-lg row justify-center">
          <q-btn label="Criar" class="q-mt-md" color="teal" @click="create">
            <template v-slot:loading>
              <q-spinner-facebook />
            </template>
          </q-btn>
        </div>
        <alert-error ref="alertError">
          <p slot="title">Algo deu errado!</p>
          <p slot="message">
            Infelizmente não foi possivel adicionar a noticia no mural!
          </p>
        </alert-error>
        <alert-success ref="alertSuccess">
          <p slot="title">Sucesso!</p>
          <p slot="message">
            A notícia foi adicionada com sucesso!
          </p>
        </alert-success>
      </q-card-section>
    </q-card>
  </div>
</template>
<script>
import dateUtils from '../../shared/utils/date';
import AlertError from '../../components/shared/alert/Error';
import AlertSuccess from '../../components/shared/alert/Success';

export default {
  components: {
    AlertError,
    AlertSuccess,
  },
  data() {
    return {
      dateUtils,
      newsfeed: {
        title: '',
        description: '',
        link: '',
        expiresAt: '',
        showIcon: false,
      },
    };
  },
  methods: {
    create() {
      this.newsfeed = {
        title: this.newsfeed.title,
        description: this.newsfeed.description,
        link: this.newsfeed.link,
        expiresAt: dateUtils.toString(this.newsfeed.expiresAt),
        showIcon: this.newsfeed.showIcon,
      };

      this.$axios
        .post('/api/newsfeed', this.newsfeed)
        .then(() => {
          this.$refs.alertSuccess.open();
          // eslint-disable-next-line no-console
          console.log(this.newsfeed);
          this.newsfeed = {
            title: '',
            description: '',
            link: '',
            expiresAt: '',
          };
        })
        .catch(() => {
          // eslint-disable-next-line no-console
          console.log(this.newsfeed);
          this.$refs.alertError.open();
        });
    },
  },
};
</script>
