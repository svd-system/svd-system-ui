<template>
  <div>
    <q-card class="q-pa-xl min">
      <q-card-section>
    <q-card-section class="q-pt-none q-gutter-sm">
      <router-link class="text-primary" to="/site/newsfeed" tag="a">
        Voltar
      </router-link>
      <p class="text-h6 text-dark text-center svd-title">
        Adicionar nova notícia no mural
      </p>
    </q-card-section>
      <q-form class="row justify-center" >
        <div class="col col-10 q-col-gutter-sm">
          <div class="corpo">
            <label class="col col-xs-12 col-md-10">Titulo
            <q-input
              outlined
              :dense="true"
              v-model="newsfeed.title"
            >
            </q-input>
            </label>
          </div>
        </div>
      </q-form>
      <q-form class="row justify-center" >
        <div class="col col-10 q-col-gutter-sm">
          <div class="corpo">
            <label class="col col-xs-12 col-md-10">Descrição
             <q-input
              outlined
              :dense="true"
              v-model="newsfeed.description"
            >
            </q-input>
            </label>
          </div>
        </div>
      </q-form>
      <q-form class="row justify-center" >
        <div class="col col-10 q-col-gutter-sm">
          <div class="corpo">
            <label class="col col-xs-12 col-md-10">Link
            <q-input
              outlined
              :dense="true"
              v-model="newsfeed.link"
            >
            </q-input>
            </label>
          </div>
        </div>
      </q-form>
      <q-form class="row justify-left" >
        <div class="col col-5 q-col-gutter-sm">
          <div class="data-experacao">
            <label class="col col-xs-2 col-md-10">Data de expiração
               <q-input
                outlined
              :dense="true"
                type="date"
                :locale="dateUtils.LOCALE"
                v-model="newsfeed.expiresAt"
                  />
            </label>
          </div>
        </div>
      </q-form>
      <q-form class="row justify-left" >
        <div class="col col-10 q-col-gutter-sm">
          <div class="check-box">
            <q-checkbox
            label="Exibir ícone de notificação?"
            :dense="true"
             color="accent"
             v-model="newsfeed.showIcon"
           />
          </div>
        </div>
      </q-form>
    <div class="btnCadastrar row justify-center">
    <q-btn
        label="Criar"
        class="q-mt-md"
        color="teal"
        @click="create"
        >
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

.btnCadastrar{
  margin-top: 40px;
}

.data-experacao{
  margin-top: 12px;
  margin-left: 55px;
}

.check-box{
  margin-top: 10px;
  margin-left: 55px;
}
</style>
