import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import QuestionList from '../views/QuestionList.vue'
import SubjectList from '../views/SubjectList.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },

  {
    path: '/questionlist',
    name: 'QuestionList',
    component: QuestionList
  },

  {
    path: '/subjectlist',
    name: 'SubjectList',
    component: SubjectList
  },

]

const router = new VueRouter({
  mode: 'history',
  // base: process.env.BASE_URL,
  base: process.env.NODE_ENV === 'production' ? 'vueSample1/' : '',
  routes
})

export default router
