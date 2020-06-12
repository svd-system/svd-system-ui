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
                v-model="post.title"
                :error="isTitleInvalid"
              >
                <template v-slot:error>
                  <p v-if="!isOkTitleRequired">* Campo obrigatório.</p>
                </template>
              </q-input>
            </div>
            <div class="row wrap">
              <q-input
                class="col"
                outlined
                label="Descrição"
                type="textarea"
                stack-label
                :dense="true"
                v-model="post.description"
                :error="isDescriptionInvalid"
              >
                <template v-slot:error>
                  <p v-if="!isOkDescriptionRequired">* Campo obrigatório.</p>
                </template>
              </q-input>
            </div>
            <div class="row wrap">
              <q-input
                class="col"
                outlined
                label="Link"
                stack-label
                :dense="true"
                v-model="post.link"
                :error="isLinkInvalid"
              />
            </div>
            <div class="row wrap">
              <q-input
                class="col col-5"
                outlined
                label="Data de expiração"
                stack-label
                :dense="true"
                v-model="post.expiresAt"
                :error="isExpiresAtInvalid"
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
                        v-model="post.expiresAt"
                        :locale="dateUtils.LOCALE"
                        @input="() => $refs.qDateProxy.hide()"
                      />
                    </q-popup-proxy>
                  </q-icon>
                </template>

                <template v-slot:error>
                  <p v-if="!isOkExpiresAtMinValue">* Somente datas futuras.</p>
                </template>
              </q-input>
            </div>
            <div class="check-box">
              <q-checkbox
                label="Exibir ícone de notificação?"
                :dense="true"
                color="accent"
                v-model="post.showIcon"
                :error="isShowIconInvalid"
              />
            </div>
          </q-form>
        </q-card-section>
        <div class="q-my-lg row justify-center">
          <q-btn
            :disable="isPostInvalid"
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
            Infelizmente não foi possivel adicionar o post no mural!
          </p>
        </alert-error>
        <alert-success ref="alertSuccess" @onClickOK="backToNewsfeed">
          <p slot="title">Sucesso!</p>
          <p slot="message">
            O post foi adicionado com sucesso!
          </p>
        </alert-success>
      </q-card-section>
    </q-card>
  </div>
</template>
<script>
import { required } from 'vuelidate/lib/validators';
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
      post: {
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
      this.post = {
        title: this.post.title,
        description: this.post.description,
        link: this.post.link,
        expiresAt: dateUtils.toString(this.post.expiresAt),
        showIcon: this.post.showIcon,
      };

      this.$axios
        .post('/api/newsfeed', this.post)
        .then(() => {
          this.$refs.alertSuccess.open();
        })
        .catch(() => {
          this.$refs.alertError.open();
        });
    },
    backToNewsfeed() {
      this.$router.back();
    },
  },
  computed: {
    isPostInvalid() {
      return this.$v.post.$invalid;
    },
    isTitleInvalid() {
      return this.$v.post.title.$invalid;
    },
    isDescriptionInvalid() {
      return this.$v.post.description.$invalid;
    },
    isLinkInvalid() {
      return this.$v.post.link.$invalid;
    },
    isExpiresAtInvalid() {
      return this.$v.post.expiresAt.$invalid;
    },
    isShowIconInvalid() {
      return this.$v.post.showIcon.$invalid;
    },
    isOkTitleRequired() {
      return this.$v.post.title.required;
    },
    isOkDescriptionRequired() {
      return this.$v.post.description.required;
    },
    isOkExpiresAtMinValue() {
      return this.$v.post.showIcon.minValue;
    },
    isOkShowIconRequired() {
      return this.$v.post.showIcon.required;
    },
  },
  validations: {
    post: {
      title: {
        required,
      },
      description: {
        required,
      },
      link: {},
      expiresAt: {
        minValue(value) {
          if (value) {
            const fields = [...value.split('/')];
            const expiration = new Date();
            expiration.setDate(fields[0]);
            expiration.setMonth(fields[1] - 1);
            expiration.setYear(fields[2]);
            expiration.setHours(0);
            expiration.setMinutes(0);
            expiration.setSeconds(0);
            expiration.setMilliseconds(0);

            const today = new Date();
            today.setHours(0);
            today.setMinutes(0);
            today.setSeconds(0);
            today.setMilliseconds(0);
            return expiration > today;
          }

          return true;
        },
      },
      showIcon: {
        required,
      },
    },
  },
};
</script>
