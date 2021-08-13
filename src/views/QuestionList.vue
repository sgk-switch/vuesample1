<template>
  <div class="ma-4">
    <v-data-table
      :headers="headers"
      :items="searchQuestion"
      sort-by="id"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar
          flat
        >
          <v-toolbar-title>問題一覧</v-toolbar-title>
          <v-divider
            class="mx-4"
            inset
            vertical
          ></v-divider>
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            label="問題または解答を検索"
          >
          </v-text-field>
          <v-spacer></v-spacer>
          <v-dialog
            v-model="dialog"
            max-width="720px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                class="mx-2"
                fab
                dark
                color="primary"
                v-bind="attrs"
                v-on="on"
              >
                <v-icon dark>
                  mdi-plus
                </v-icon>
              </v-btn>
            </template>

            <v-card>
              <v-card-title>
                <span class="text-h5">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <v-select
                        v-model="editedItem.subject"
                        :items="getSubjectsMenu"
                        label="科目を選択"
                      ></v-select>
                    </v-col>
                    </v-row>
                    <v-textarea
                      v-model="editedItem.question"
                      label="問題"
                    ></v-textarea>
                    <v-textarea
                      v-model="editedItem.answer"
                      label="解答"
                    ></v-textarea>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="primary"
                  @click="saveQuestion"
                >
                  保存
                </v-btn>
                <v-btn
                  color="primary"
                  text
                  @click="closeQuestionModal"
                >
                  キャンセル
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="text-h6">{{editedItem.subject}}-{{editedItem.question}}の問題を削除してもいいですか？</v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="deleteItemConfirm">削除する</v-btn>
                <v-btn color="primary" text @click="closeDeleteModal">キャンセル</v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon
          small
          class="mr-2"
          @click="editItem(item)"
        >
          mdi-pencil
        </v-icon>
        <v-icon
          small
          @click="deleteItem(item)"
        >
          mdi-delete
        </v-icon>
      </template>
      <template v-slot:no-data>
        <p>該当するデータがありません</p>
      </template>
    </v-data-table>
  </div>
</template>

<script>
  export default {
    data(){
      return{
        dialog: false,
        dialogDelete: false,
        headers: [
          {
            text: '科目',
            align: 'start',
            sortable: true,
            value: 'subject',
            width: '15%',
          },
          { text: '問題', value: 'question',sortable: false,width: '35%', },
          { text: '解答', value: 'answer',sortable: false ,width: '35%',},
          { text: '編集・削除', value: 'actions', sortable: false ,width: '15%',},
        ],
        questionId:'',
        editedIndex: -1,
        editedItem: {
          id: 0,
          subject: '',
          question: '',
          answer: '',
        },
        defaultItem: {
          id: 0,
          subject: '',
          question: '',
          answer: '',
        },
        search:'',
      }
    },


    computed: {
      formTitle () {
        return this.editedIndex === -1 ? '問題を追加する' : '問題を編集する'
      },
      getQuestions(){
        return this.$store.state.questions
      },
      getSubjectsMenu(){
        const subjects = this.$store.state.subjects
        const subjectMenu = subjects.map((subject) => subject.name)
        return subjectMenu
      },
      searchQuestion(){
        let searchWord = this.search.trim()
        if (searchWord === '') return this.getQuestions

        return this.questions.filter(question => {
            return question.question.includes(this.search) ||
            question.answer.includes(this.search)
        })
      },
    },

    watch: {
      dialog (val) {
        val || this.closeQuestionModal()
      },
      dialogDelete (val) {
        val || this.closeDeleteModal()
      },
    },

   methods: {
     getQuestionId(){
        const date = new Date()
        const questionId = date.getTime()
        this.questionId = questionId
      },

     editItem(item) {
       this.editedIndex = this.getQuestions.indexOf(item)
       this.editedItem = Object.assign({},item)
       this.dialog = true
     },

     deleteItem(item) {
       this.editedIndex = this.getQuestions.indexOf(item)
       this.editedItem = Object.assign({},item)
       this.dialogDelete = true
     },

      deleteItemConfirm(){
        this.$store.dispatch('deleteQuestion',this.editedIndex)
        this.closeDeleteModal()
      },

      closeQuestionModal () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      closeDeleteModal () {
        this.dialogDelete = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      saveQuestion(){
        const item = {
          editedIndex:this.editedIndex,
          id: this.editedItem.id,
          subject: this.editedItem.subject,
          question: this.editedItem.question,
          answer: this.editedItem.answer,
        }

        if(this.editedIndex > -1) {
          this.$store.dispatch('updateQuestion',item)
        } else {
          this.getQuestionId()
          item.id = this.questionId
          this.$store.dispatch('addQuestion', item)
        }
        this.closeQuestionModal()
      },
    },
  }
</script>

<style scoped>

</style>
