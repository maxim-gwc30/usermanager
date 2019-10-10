<template>
  <div>
    <v-row>
      <v-col sm="12" md="10" lg="10" offset-md="1" offset-lg="1">
        <v-card>
          <v-card-title>
            <div class="flex-grow-1"></div>
            <v-text-field v-model="search" label="Поиск" single-line hide-details></v-text-field>
          </v-card-title>

          <v-data-table :headers="tableHeaders" :items="employees" :items-per-page="5" class="elevation-1" :search="search">
            <template v-slot:top>
              <v-toolbar flat color="white">
                <div class="flex-grow-1"></div>
                <v-dialog v-model="editDialog" max-width="500px">
                  <v-card>
                    <v-card-title>
                      <span class="headline">Редактирование работника</span>
                    </v-card-title>

                    <v-card-text>
                      <v-container>
                        <v-row>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field v-model="editedEmployee.lastName" :error-messages="lastNameErrorsE" label="Фамилия"
                                          @input="$v.editedEmployee.lastName.$touch()" @blur="$v.editedEmployee.lastName.$touch()"></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field v-model="editedEmployee.firstName" :error-messages="firstNameErrorsE" label="Имя"
                                          @input="$v.editedEmployee.firstName.$touch()" @blur="$v.editedEmployee.firstName.$touch()"></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field v-model="editedEmployee.middleName" :error-messages="middleNameErrorsE" label="Отчество"
                                          @input="$v.editedEmployee.middleName.$touch()" @blur="$v.editedEmployee.middleName.$touch()"></v-text-field>
                          </v-col>
                          <v-col cols="12">
                            <v-menu ref="editMenu" v-model="editMenu" :close-on-content-click="false" transition="scale-transition" offset-y min-width="290px">
                              <template v-slot:activator="{ on }">
                                <v-text-field v-model="editedEmployee.dateOfBirth" label="Дата рождения" readonly v-on="on"
                                               :error-messages="dateOfBirthErrorsE"></v-text-field>
                              </template>
                              <v-date-picker v-model="editedEmployee.dateOfBirth" @input="editMenu = false" no-title scrollable></v-date-picker>
                            </v-menu>
                          </v-col>
                          <v-col cols="12" sm="6" md="6">
                            <v-text-field v-model="editedEmployee.position" :error-messages="positionErrorsE" label="Должность"
                                          @input="$v.editedEmployee.position.$touch()" @blur="$v.editedEmployee.position.$touch()"></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="6">
                            <v-text-field v-model="editedEmployee.salary" :error-messages="salaryErrorsE" label="Оклад"
                                          @input="$v.editedEmployee.salary.$touch()" @blur="$v.editedEmployee.salary.$touch()"></v-text-field>
                          </v-col>
                        </v-row>
                      </v-container>
                    </v-card-text>

                    <v-card-actions>
                      <div class="flex-grow-1"></div>
                      <v-btn color="blue darken-1" text @click="editDialog = false">Отмена</v-btn>
                      <v-btn color="blue darken-1" text @click="updateEmployee" :disabled="isUpdateDone">Сохранить</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-toolbar>
            </template>
            <template v-slot:item.action="{ item }">
              <v-icon small class="mr-2" @click="editItem(item)">
                mdi-pencil
              </v-icon>
              <v-icon small @click="deleteItem(item)">
                mdi-delete
              </v-icon>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="text-right" sm="12" md="10" lg="10" offset-md="1" offset-lg="1">
        <v-btn color="primary" @click="dialog = true">
          <v-icon left dark>mdi-plus</v-icon>
          Добавить
        </v-btn>
      </v-col>
    </v-row>

    <!-- Add employee dialog -->
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Добавление работника</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="4">
                <v-text-field v-model="newEmployee.lastName" :error-messages="lastNameErrors" label="Фамилия"
                              @input="$v.newEmployee.lastName.$touch()" @blur="$v.newEmployee.lastName.$touch()"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field v-model="newEmployee.firstName" :error-messages="firstNameErrors" label="Имя"
                              @input="$v.newEmployee.firstName.$touch()" @blur="$v.newEmployee.firstName.$touch()"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field v-model="newEmployee.middleName" :error-messages="middleNameErrors" label="Отчество"
                              @input="$v.newEmployee.middleName.$touch()" @blur="$v.newEmployee.middleName.$touch()"></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-menu ref="menu" v-model="menu" :close-on-content-click="false" transition="scale-transition" offset-y min-width="290px">
                  <template v-slot:activator="{ on }">
                    <v-text-field v-model="newEmployee.dateOfBirth" label="Дата рождения" readonly v-on="on"
                                  :error-messages="dateOfBirthErrors"></v-text-field>
                  </template>
                  <v-date-picker v-model="newEmployee.dateOfBirth" @input="menu = false" no-title scrollable></v-date-picker>
                </v-menu>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field v-model="newEmployee.position" :error-messages="positionErrors" label="Должность"
                              @input="$v.newEmployee.position.$touch()" @blur="$v.newEmployee.position.$touch()"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field v-model="newEmployee.salary" :error-messages="salaryErrors" label="Оклад"
                              @input="$v.newEmployee.salary.$touch()" @blur="$v.newEmployee.salary.$touch()"></v-text-field>
              </v-col>
            </v-row>
          </v-container>
          <small>Все поля обязательны для заполнения</small>
        </v-card-text>
        <v-card-actions>
          <div class="flex-grow-1"></div>
          <v-btn color="blue darken-1" text @click="dialog = false">Отмена</v-btn>
          <v-btn color="blue darken-1" text @click="addEmployee" :disabled="isAddDone">Сохранить</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { HTTP } from '@/services/app'
import { required, minLength, maxLength, numeric, helpers } from 'vuelidate/lib/validators'
const alpha = helpers.regex('alpha', /^[а-яА-Яa-zA-Z]*$/)

export default {
  name: 'UserManager',
  data () {
    return {
      dialog: false,
      editDialog: false,
      editedIndex: -1,
      menu: false,
      editMenu: false,
      isAddDone: false,
      isUpdateDone: false,
      search: '',
      tableHeaders: [
        { text: 'Фамилия', value: 'lastName' },
        { text: 'Имя', value: 'firstName' },
        { text: 'Отчество', value: 'middleName' },
        { text: 'Дата рождения', value: 'dateOfBirth' },
        { text: 'Должность', value: 'position' },
        { text: 'Оклад', value: 'salary' },
        { text: '', value: 'action', width: '10%' },
      ],
      employees: [],
      newEmployee: {
        lastName: '',
        firstName: '',
        middleName: '',
        dateOfBirth: '',
        position: '',
        salary: 0
      },
      editedEmployee: {
        lastName: '',
        firstName: '',
        middleName: '',
        dateOfBirth: '',
        position: '',
        salary: 0
      }
    }
  },
  methods: {
    async getEmployees () {
      this.isAddDone = true

      try {
        const response = await HTTP.get('employee')
        this.employees = response.data
      } catch(error) {
        this.notice("Ошибка", "Не удалось получить список работников", "error")
      }

      this.isAddDone = false
    },
    async addEmployee () {
      this.isAddDone = true
      this.$v.$touch()

      if(!this.$v.newEmployee.$anyError) {
        try {
          await HTTP.post('employee', this.newEmployee)
          this.getEmployees()
          this.dialog = false

          this.newEmployee = {
            lastName: '',
            firstName: '',
            middleName: '',
            dateOfBirth: '',
            position: '',
            salary: 0
          }
        } catch(error) {
          this.notice("Ошибка", "Не удалось добавить нового работника", "error")
        }
      }

      this.$v.$reset()
      this.isAddDone = false
    },
    async updateEmployee () {
      this.isAddDone = true
      this.$v.$touch()

      if(!this.$v.editedEmployee.$anyError) {
        this.editDialog = false
        
        try {
          await HTTP.patch('employee', this.editedEmployee)
          this.getEmployees()
        } catch(error) {
          console.log(error)
          this.notice("Ошибка", "Не удалось отредактировать работника", "error")
        }
      }

      this.isAddDone = false
    },
    async deleteEmployee (item) {
      const index = this.employees.indexOf(item)
      try {
        await HTTP.delete('employee/' + item._id)
        this.employees.splice(index, 1)
      } catch(error) {
        console.log(error)
        this.notice("Ошибка", "Не удалось удалить работника", "error")
      }
    },
    editItem (item) {
      this.editedIndex = this.employees.indexOf(item)
      this.editedEmployee = Object.assign({}, item)
      this.editDialog = true
    },
    deleteItem (item) {
      confirm('Вы действительно хотите удалить данную запись?') && this.deleteEmployee(item)
    },
  },
  validations: {
    newEmployee: {
      lastName: { required, alpha },
      firstName: { required, alpha },
      middleName: { required, alpha },
      dateOfBirth: { required },
      position: { required, alpha },
      salary: { required, numeric }
    },
    editedEmployee: {
      lastName: { required, alpha },
      firstName: { required, alpha },
      middleName: { required, alpha },
      dateOfBirth: { required },
      position: { required, alpha },
      salary: { required, numeric }
    }
  },
  computed: {
    lastNameErrors () {
      const errors = []
      if (!this.$v.newEmployee.lastName.$dirty) return errors
      !this.$v.newEmployee.lastName.required && errors.push('Это поле обязательно.')
      !this.$v.newEmployee.lastName.alpha && errors.push('Поле может состоять только из букв.')
      return errors
    },
    firstNameErrors () {
      const errors = []
      if (!this.$v.newEmployee.firstName.$dirty) return errors
      !this.$v.newEmployee.firstName.required && errors.push('Это поле обязательно.')
      !this.$v.newEmployee.firstName.alpha && errors.push('Поле может состоять только из букв.')
      return errors
    },
    middleNameErrors () {
      const errors = []
      if (!this.$v.newEmployee.middleName.$dirty) return errors
      !this.$v.newEmployee.middleName.required && errors.push('Это поле обязательно.')
      !this.$v.newEmployee.middleName.alpha && errors.push('Поле может состоять только из букв.')
      return errors
    },
    dateOfBirthErrors () {
      const errors = []
      if (!this.$v.newEmployee.dateOfBirth.$dirty) return errors
      !this.$v.newEmployee.dateOfBirth.required && errors.push('Это поле обязательно.')
      return errors
    },
    positionErrors () {
      const errors = []
      if (!this.$v.newEmployee.position.$dirty) return errors
      !this.$v.newEmployee.position.required && errors.push('Это поле обязательно.')
      !this.$v.newEmployee.position.alpha && errors.push('Поле может состоять только из букв.')
      return errors
    },
    salaryErrors () {
      const errors = []
      if (!this.$v.newEmployee.salary.$dirty) return errors
      !this.$v.newEmployee.salary.required && errors.push('Это поле обязательно.')
      !this.$v.newEmployee.salary.numeric && errors.push('Поле может состоять только из цифр.')
      return errors
    },

    lastNameErrorsE () {
      const errors = []
      if (!this.$v.editedEmployee.lastName.$dirty) return errors
      !this.$v.editedEmployee.lastName.required && errors.push('Это поле обязательно.')
      !this.$v.editedEmployee.lastName.alpha && errors.push('Поле может состоять только из букв.')
      return errors
    },
    firstNameErrorsE () {
      const errors = []
      if (!this.$v.editedEmployee.firstName.$dirty) return errors
      !this.$v.editedEmployee.firstName.required && errors.push('Это поле обязательно.')
      !this.$v.editedEmployee.firstName.alpha && errors.push('Поле может состоять только из букв.')
      return errors
    },
    middleNameErrorsE () {
      const errors = []
      if (!this.$v.editedEmployee.middleName.$dirty) return errors
      !this.$v.editedEmployee.middleName.required && errors.push('Это поле обязательно.')
      !this.$v.editedEmployee.middleName.alpha && errors.push('Поле может состоять только из букв.')
      return errors
    },
    dateOfBirthErrorsE () {
      const errors = []
      if (!this.$v.editedEmployee.dateOfBirth.$dirty) return errors
      !this.$v.editedEmployee.dateOfBirth.required && errors.push('Это поле обязательно.')
      return errors
    },
    positionErrorsE () {
      const errors = []
      if (!this.$v.editedEmployee.position.$dirty) return errors
      !this.$v.editedEmployee.position.required && errors.push('Это поле обязательно.')
      !this.$v.editedEmployee.position.alpha && errors.push('Поле может состоять только из букв.')
      return errors
    },
    salaryErrorsE () {
      const errors = []
      if (!this.$v.editedEmployee.salary.$dirty) return errors
      !this.$v.editedEmployee.salary.required && errors.push('Это поле обязательно.')
      !this.$v.editedEmployee.salary.numeric && errors.push('Поле может состоять только из цифр.')
      return errors
    }
  },
  created: function () {
    this.getEmployees()
  }
}
</script>
