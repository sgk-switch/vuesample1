<template>
  <div class="ma-4 mx-auto table">
    <v-data-table
      :headers="headers"
      :items="getSubjects"
      sort-by="id"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar
          flat
        >
          <v-toolbar-title>科目一覧</v-toolbar-title>
          <v-divider
            class="mx-4"
            inset
            vertical
          ></v-divider>
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
                  <v-text-field
                    v-model="editedItem.name"
                    label="科目名"
                    autocomplete="off"
                  ></v-text-field>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="primary"
                  @click="saveSubject"
                >
                  保存
                </v-btn>
                <v-btn
                  color="primary"
                  text
                  @click="closeSubjectModal"
                >
                  キャンセル
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="text-h6"> {{editedItem.name}} を削除してもいいですか？</v-card-title>
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
            value: 'name',
          },
          { text: '編集・削除', value: 'actions', sortable: false, },
        ],
        // subjects: [],
        subjectId:'',
        editedIndex: -1,
        editedItem: {
          id: 0,
          name: '',
        },
        defaultItem: {
          id: 0,
          name: '',
        },
      }
    },
    computed: {
      formTitle () {
        return this.editedIndex === -1 ? '科目を追加する' : '科目名を編集する'
      },
      getSubjects(){
        return this.$store.state.subjects
      }
    },

    watch: {
      dialog (val) {
        val || this.closeSubjectModal()
      },
      dialogDelete (val) {
        val || this.closeDeleteModal()
      },
    },


    methods: {
      getSubjectId(){
        const date = new Date()
        const subjectId = date.getTime()
        this.subjectId = subjectId
      },

      editItem (item) {
        this.editedIndex = this.getSubjects.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        this.editedIndex = this.getSubjects.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      },

      deleteItemConfirm () {
        this.$store.dispatch('deleteSubject',this.editedIndex)
        this.closeDeleteModal()
      },

      closeSubjectModal () {
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

      saveSubject(){
        const item = {
          editedIndex:this.editedIndex,
          id:this.editedItem.id,
          name:this.editedItem.name,
        }

        if(this.editedIndex > -1) {
          this.$store.dispatch('updateSubject',item)
        } else {
          this.getSubjectId()
          item.id = this.subjectId
          this.$store.dispatch('addSubject',item)
        }
        this.closeSubjectModal()
      }
    },
  }
</script>
<style scoped>
  .table {
    width:600px;
  }
</style>
