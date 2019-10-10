<template>
  <div class="login-form-container">
    <form>
        <v-text-field v-model="userData.lastName" :error-messages="lastNameErrors" label="Фамилия"
                      @input="$v.userData.lastName.$touch()" @blur="$v.userData.lastName.$touch()"></v-text-field>

        <v-text-field v-model="userData.firstName" :error-messages="firstNameErrors" label="Имя"
                      @input="$v.userData.firstName.$touch()" @blur="$v.userData.firstName.$touch()"></v-text-field>

        <v-text-field v-model="userData.middleName" :error-messages="middleNameErrors" label="Отчество"
                      @input="$v.userData.middleName.$touch()" @blur="$v.userData.middleName.$touch()"></v-text-field>

        <v-text-field v-model="userData.userName" :error-messages="userNameErrors" label="Имя пользователя"
                      @input="$v.userData.userName.$touch()" @blur="$v.userData.userName.$touch()"></v-text-field>

        <v-text-field v-model="userData.password" :error-messages="passwordErrors" label="Пароль" type="password"
                      @input="$v.userData.password.$touch()" @blur="$v.userData.password.$touch()"></v-text-field>
    </form>
		<div class="text-center">
			<v-btn @click="registration" :disabled="isRegisterDone">Зарегистрироваться</v-btn>
		</div>
  </div>
</template>
<script>
import { HTTP } from '@/services/app'
import { required, minLength, maxLength, helpers } from 'vuelidate/lib/validators'
const alpha = helpers.regex('alpha', /^[а-яА-Яa-zA-Z]*$/)

export default {
  name: 'RegistrationForm',
  data () {
    return {
      userData: {
        lastName: '',
        firstName: '',
        middleName: '',
        userName: '',
        password: ''
      },
      isRegisterDone: false
    }
  },
  methods: {
    async registration () {
      this.isRegisterDone = true
      this.$v.$touch()
      if(!this.$v.userData.$anyError) {
        try {
          const issetUser = await HTTP.get('user?filter=this.userName=="' + this.userData.userName + '"')
          console.log(issetUser.data.length)
          if(issetUser.data.length <= 0) {
            const response = await HTTP.post('user', this.userData)
            this.$store.commit('setUser', response.data)
            this.$router.push('/usermanager').catch(err => {})
          } else {
            this.notice("Ошибка", "Пользователь с таким логином уже существует", "warning")
          }
        } catch(error) {
          this.notice("Ошибка", "Регистрация пользователя не удалась", "error")
        }
      }

      this.isRegisterDone = false
    }
  },
  validations: {
    userData: {
      lastName: { required, alpha },
      firstName: { required, alpha },
      middleName: { required, alpha },
      userName: { required },
      password: { required, minLength: minLength(6), maxLength: maxLength(20) }
    },
  },
  computed: {
    lastNameErrors () {
      const errors = []
      if (!this.$v.userData.lastName.$dirty) return errors
      !this.$v.userData.lastName.required && errors.push('Это поле обязательно.')
      !this.$v.userData.lastName.alpha && errors.push('Поле может состоять только из букв.')
      return errors
    },
    firstNameErrors () {
      const errors = []
      if (!this.$v.userData.firstName.$dirty) return errors
      !this.$v.userData.firstName.required && errors.push('Это поле обязательно.')
      !this.$v.userData.firstName.alpha && errors.push('Поле может состоять только из букв.')
      return errors
    },
    middleNameErrors () {
      const errors = []
      if (!this.$v.userData.middleName.$dirty) return errors
      !this.$v.userData.middleName.required && errors.push('Это поле обязательно.')
      !this.$v.userData.middleName.alpha && errors.push('Поле может состоять только из букв.')
      return errors
    },
    userNameErrors () {
      const errors = []
      if (!this.$v.userData.userName.$dirty) return errors
      !this.$v.userData.userName.required && errors.push('Это поле обязательно.')
      return errors
    },
    passwordErrors () {
      const errors = []
      if (!this.$v.userData.password.$dirty) return errors
      !this.$v.userData.password.required && errors.push('Это поле обязательно.')
      !this.$v.userData.password.minLength && errors.push('Длинна пароля от 6 до 20 символов.')
      !this.$v.userData.password.maxLength && errors.push('Длинна пароля от 6 до 20 символов.')
      return errors
    }
  },
  mounted () {},
  created: function () {}
}
</script>