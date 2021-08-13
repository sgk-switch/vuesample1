<template>
  <div class="overlay">
    <v-card class="modal_body">
      <div class="sec_question">
        <v-card-text
          class="modal">
          第{{this.nowQuestion +1 }}問
        </v-card-text>

        <v-card-title class="text-h6">
          {{ getShuffledQuestions[this.nowQuestion].question }}
        </v-card-title>
      </div>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          class="answer_btn"
          color="primary"
          @click="showAnswer"
        >
          {{ isShowAnswer ? '解答を非表示' : '解答を表示' }}
        </v-btn>
        <v-btn
          color="primary"
          text
          @click="closeDialog"
        >
          終了
        </v-btn>
      </v-card-actions>

      <v-expand-transition>
        <div
          v-show="isShowAnswer"
          class="sec_answer"
        >
          <v-divider></v-divider>

          <v-row>
            <v-col
              cols="8">
              <v-card-text>
                {{ getShuffledQuestions[this.nowQuestion].answer }}
              </v-card-text>
            </v-col>
            <v-col
              cols="4"
            >
              <v-btn
                color="primary"
                v-show="!isFinished"
                @click="goToNextQuestion"
                class="btn"
              >
              次の問題へ
              </v-btn>
            </v-col>
          </v-row>

          <v-row>
            <v-col
              cols="10"
            >
              <v-card-text
                v-show="isFinished">
                すべての問題を解答しました。お疲れさまでした。
              </v-card-text>
            </v-col>
            <v-col
              cols="2"
            >
              <v-btn
                color="primary"
                v-show="isFinished"
                @click="clearQuestions"
                class="btn"
              >
                戻る
              </v-btn>
            </v-col>
          </v-row>
        </div>
      </v-expand-transition>
    </v-card>
  </div>
</template>

<script>
  export default {
    props:{
      quizData:{
        type:Object
      },
      isShowDialog:{
        type:Boolean
      }
    },

    data () {
      return {
        getDialog:this.dialog,
        getQuizData:this.quizData,
        isShowAnswer:false,
        isFinished:false,
        nowQuestion:0,
      }
    },

    computed:{
      getShuffledQuestions(){
        return this.$store.state.shuffledList
      }
    },

    methods:{
      showAnswer(){
        if(this.getShuffledQuestions.length -1 === this.nowQuestion) {
          this.isFinished = true
          this.isShowAnswer = !this.isShowAnswer
        } else {
          this.isShowAnswer = !this.isShowAnswer
        }
      },

      goToNextQuestion(){
        if(this.getShuffledQuestions.length -1 === this.nowQuestion) {
          return;
        } else {
          this.nowQuestion++
          this.isShowAnswer = false
        }
      },

      clearQuestions(){
        this.closeDialog()
        this.getDialog = ""
        this.getQuizData = ""
        this.$router.go({path:'/', force: true})
        this.nowQuestion = 0
      },

      closeDialog(){
        this.$store.dispatch('closeDialog')
      }
    }
  }
</script>

<style scoped>
  .overlay {
    /* 要素を重ねた時の順番 */
    z-index:1;
    /* 画面全体を覆う設定 */
    position:fixed;
    top:0;
    left:0;
    width:100%;
    height:100%;
    background-color:rgba(0,0,0,0.5);
    /* 画面の中央に要素を表示させる設定 */
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .modal_body{
    width: 720px;
    height: auto;
    z-index:2;
    padding: 1em;
    background:#fff;
  }
  .sec_question,
  .sec_answer {
    padding:20px;
  }

  .btn {
    margin:15px;
  }
</style>