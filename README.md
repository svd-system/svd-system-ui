# SVD System UI v1.0.0

Interface do usuário do SVD System

#### Ferramentas

- [yarn](https://yarnpkg.com/)
- [Vue](https://vuejs.org/)
- [Quasar Framework](https://quasar.dev/)
- [axios](https://github.com/axios/axios)
- [vuex](https://vuex.vuejs.org/)
- [vue-cookie](https://www.npmjs.com/package/vue-cookie)
- [vuelidate](https://vuelidate.js.org/)
- [ESLint](https://eslint.org/)
- [Prettier](https://prettier.io/)
- [Visual Studio Code](https://code.visualstudio.com/)
- [Git](https://git-scm.com/)

### Configuração do ambiente de desenvolvimento

Para configurar o ambiente de desenvolvimento de forma apropriada, siga as instruções abaixo:

#### Clonando o projeto com o Git

Para clonar o projeto via linha de comando, abra o terminal no seu computador e execute os comandos:

```shell
git clone git@github.com:svd-system/svd-system-ui.git
cd svd-system-ui
```

Antes de fazer qualquer alteração no código, é obrigatório dar inicio ao workflow do Git. Digite `git flow init` e aperte `Enter` algumas vezes até chegar no resultado abaixo:

```shell
git flow init

No branches exist yet. Base branches must be created now.
Branch name for production releases: [master]
Branch name for "next release" development: [develop]

How to name your supporting branch prefixes?
Feature branches? [feature/]
Bugfix branches? [bugfix/]
Release branches? [release/]
Hotfix branches? [hotfix/]
Support branches? [support/]
Version tag prefix? []
Hooks and filters directory? [~/svd-system-api/.git/hooks]
```

Para mais informações a respeito do Git flow, clique [aqui](https://danielkummer.github.io/git-flow-cheatsheet/index.pt_BR.html).

## Instalar dependências

```bash
yarn
```

#### Conectar em uma API

Para conectar ao [SVD System API](https://github.com/svd-system/svd-system-api), crie um arquivo `.env` na raiz do projeto e informado o seguinte parâmetro. Outra alternativa é informar o parâmetro nas variáveis de ambiente:

```shell
API_BASE_PATH_URL=http://localhost:8080
```

### Executar em desenvolvimento

```bash
quasar dev
```

### Executar lint nos arquivos

```bash
yarn run lint
```

### Fazer o build para produção

```bash
quasar build
```

### Contribuição

Alexsandro Castro de Oliveira

Daniel Messias da Silva Filho

Israel Jeronimo da Silva

John Wanderson Viana da Luz

Ricardo de Lima Rocha

- [Linkedin](https://www.linkedin.com/in/ricardo-de-lima-rocha/)
- [GitHub](https://github.com/lericardolima)
