<template>
  <div>
    <q-card class="q-pa-xl min">
    <q-card-section class="q-pt-none q-gutter-sm">
       <div class="btnCadastrar-mural row justify-center">
    <q-btn
        label="CRIAR POSTAGEM"
        class="q-mt-md"
        color="teal"
        @click="this.criarPostagem"
        >
      </q-btn>
    </div>
      <p class="text-h6 text-dark text-center svd-title">
        Mural de notícias
      </p>
       <q-form class="row justify-center" >
         <div class="col col-10 q-col-gutter-sm">
      <ul class="lista-noticia">
        <li v-for="news of newsfeed" :key="news">
          <div class="painel">
            <div class="painel-margem">
              <div class="titulo-icon">
                <h5 class="painel-conteudo-if" v-if="news.showIcon">
            <img class="imagem" src="https://img.icons8.com/fluent/48/000000/bell.png"/>{{ news.title}}
            </h5>
            <h5 class="painel-conteudo-noticia" v-else-if="!news.showIcon">
           {{ news.title}}
            </h5>
              </div>
              <div class="painel-conteudo">
                <h6 class="painel-conteudo-descricao">{{ news.description}}</h6>
              </div>
              <div>
                <h8 class="painel-conteudo-link" v-if="!news.showIcon">ir para página
                </h8>
              </div>
            </div>
          </div>
        </li>
      </ul>
      </div>
      </q-form>
    </q-card-section>
    </q-card>
  </div>
</template>
<script>

export default {
  data() {
    return {
      newsfeed: [],
    };
  },
  created() {
    this.$axios
      .get('/api/newsfeed/')
      .then((response) => {
        this.newsfeed = response.data;
        // eslint-disable-next-line no-console
        console.log(response);
        // eslint-disable-next-line no-console
        console.log(this.newsfeed);
      })
      .catch(() => {
        // eslint-disable-next-line no-console
        console.log(this.newsfeed);
      });
  },
  methods: {
    criarPostagem() {
      this.$router.push('/site/newsfeed/new');
    },
    edit(newsfeedid) {
      this.$router.push(`${newsfeedid}`);
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

.lista-noticia-item{
  list-style: none;
}

.painel-conteudo-if{
  color: blueviolet;
  font-size: 25px;
  font-weight: bold;
}
.imagem{
  list-style: none;
}

.painel{
  border: solid 2px grey;
  border-radius: 10px;
  margin-bottom: 50px;
}

.painel .painel-margem{
    margin: 8px;
    margin-bottom: 8px;
}

.painel-conteudo-noticia{
  list-style: none;
  font-size: 25px;
  font-weight: bold;
  margin-bottom: 8px;
}


.titulo-icon{
  list-style: none;
}

.btnCadastrar-mural{
  margin-inline-start: 500px;
}

.painel-conteudo-link{
  color: blueviolet;
}
</style>
