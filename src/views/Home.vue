<template>
  <div>
    <v-form class="ma-10 mx-auto">
      <v-container>
        <v-row class="form">
          <v-col
            cols="5"
            md="4"
          >
            <v-select
              v-model="quizData.quizSubject"
              :items="getSubjectsMenu"
              label="科目を選択"
              required
            ></v-select>
          </v-col>

          <v-col
            cols="5"
            md="4"
          >
            <v-select
              v-model="quizData.quizCount"
              :items="getCountMenu"
              label="問題数を選択"
              required
            ></v-select>
          </v-col>

          <v-col
            cols="2"
            md="4"
          >
            <v-btn
              color="primary"
              @click="showRandomQuestion"
            >
              START
            </v-btn>
          </v-col>
        </v-row>

        <random-question
          v-if="getShowDialog"
          :dialog="getShowDialog"
          :quizData="quizData"
        />
      </v-container>
    </v-form>
  </div>
</template>

<script>
  import RandomQuestion from '../components/RandomQuestion.vue'


  export default {
    name: 'Home',

    components: {
      RandomQuestion,
    },

    data(){
      return{
        quizData:{
          quizSubject:'',
          quizCount:null,
        },
      }
    },

    computed:{
      // 復習問題を出題するモーダルの表示切替
      getShowDialog(){
        return this.$store.state.isShowDialog
      },

      getSubjectsMenu(){
        const lists =this.$store.state.subjects.map((subject)=> subject.name )
        return lists
      },

      getCountMenu(){
        let countMenu = []
        for(let i = 1; i<=10; i++) {
          countMenu.push(i)
        }
        return countMenu
      },
    },

    methods: {
      showRandomQuestion(){
        this.$store.state.isShowDialog = true
        this.shuffledQuestion();
      },

      shuffledQuestion(){
        // 選択された科目の問題の配列を作成
          let lists = this.$store.state.questions.filter((list)=> {
            return list.subject == this.quizData.quizSubject
        })

        // 配列をシャッフルする
        let shuffle = ([...array]) => {
          for (let i = array.length - 1; i >= 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
          }
          return array;
        }
        let shuffledLists = shuffle(lists)

        // 配列から問題数をランダムに取得し、新たな配列を作成
        let randomList = shuffledLists.splice(0,this.quizData.quizCount)
        this.$store.dispatch('getShuffledList',randomList)
        this.quizData.quizSubject = ""
        this.quizData.quizCount = null

      }
    }
  }
</script>

<style scoped>
  .form {
    text-align: center;
  }
</style>
