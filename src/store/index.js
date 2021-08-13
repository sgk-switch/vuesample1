import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const savedQuestions = localStorage.getItem('questions')
const savedSubjects = localStorage.getItem('subjects')

const store = new Vuex.Store({
  state: {
    questions:savedQuestions ? JSON.parse(savedQuestions):[
    ],

    subjects:savedSubjects ? JSON.parse(savedSubjects):[
    ],


    // 復習問題用リスト（科目や問題数をユーザーが設定）
    shuffledList:[],

    // 復習問題を表示するダイアログ
    isShowDialog:false,



  },

  mutations: {
    getShuffledList(state,payload){
      state.shuffledList = payload
      console.log(state.shuffledList)
    },

    closeDialog(state){
      state.isShowDialog = false
    },

    addQuestion(state,payload){
      state.questions.push(payload)
    },

    updateQuestion(state,payload){
      Object.assign(state.questions[payload.editedIndex], payload)
    },

    deleteQuestion(state,payload){
      state.questions.splice(payload, 1)
    },

    addSubject(state,payload){
      state.subjects.push(payload)
    },

    updateSubject(state,payload){
      Object.assign(state.subjects[payload.editedIndex], payload)
    },

    deleteSubject(state,payload){
      state.subjects.splice(payload,1)
    }

  },

  actions: {
    // 復習問題リストを作成
    getShuffledList(context,payload){
      context.commit('getShuffledList',payload)
    },

    // 復習問題を表示するダイアログを閉じる
    closeDialog(context){
      context.commit('closeDialog')
    },

    addQuestion(context,payload){
      context.commit('addQuestion',payload)
    },

    updateQuestion(context,payload){
      context.commit('updateQuestion',payload)
    },

    deleteQuestion(context,payload){
      context.commit('deleteQuestion',payload)
    },

    addSubject(context,payload){
      context.commit('addSubject',payload)
    },

    updateSubject(context,payload){
      context.commit('updateSubject',payload)
    },

    deleteSubject(context,payload){
      context.commit('deleteSubject',payload)
    }
  },

})

  store.subscribe((mutation,state) => {
    localStorage.setItem('questions',JSON.stringify(state.questions))
    localStorage.setItem('subjects',JSON.stringify(state.subjects))
  })

export default store;
