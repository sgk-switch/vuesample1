<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
    <v-toolbar-title>
      <router-link to="/" class="toolbar-title">
      Learning App
      </router-link>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <div class="btns">
      <v-btn
        class="ma-2"
        outlined
        color="white"
        @click="goToQuestionList"
      >
        問題一覧
      </v-btn>
      <v-btn
        class="ma-2"
        outlined
        color="white"
        @click="goToSubjectList"
      >
        科目一覧
      </v-btn>
    </div>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data(){
    return {

    }
  },

  methods:{
    goToQuestionList(){
      this.$router.push('/questionlist')
    },
    goToSubjectList(){
      this.$router.push('/Subjectlist')
    },
  }


};
</script>

<style scoped>
  .toolbar-title {
    color: #fff;
    text-decoration: none;
  }
</style>
