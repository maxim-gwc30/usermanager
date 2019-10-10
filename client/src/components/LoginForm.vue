<template>
  <div class="login-form-container">
    <form>
        <v-text-field v-model="userData.userName" @keyup.enter="authorize" :error-messages="userNameErrors" label="Логин"></v-text-field>
        <v-text-field v-model="userData.password" @keyup.enter="authorize" :error-messages="passwordErrors" label="Пароль" type="password"></v-text-field>
    </form>
		<div class="text-center">
			<v-btn @click="authorize">Войти</v-btn>
		</div>
  </div>
</template>
<script>
import { HTTP } from '@/services/app'
import { required, minLength, between } from 'vuelidate/lib/validators'

export default {
  name: 'LoginForm',
  data () {
    return {
      userData: {
        userName: '',
        password: ''
      },
      isAuthDone: false
    }
  },
  methods: {
    async authorize () {
      this.isAuthDone = true
      this.$v.$touch()
      if(!this.$v.userData.$anyError) {
        try {
          const response = await HTTP.patch('login', this.userData)
          this.$store.commit('setUser', response.data);
          this.$router.push('/usermanager').catch(err => {})
          this.isAuthDone = false
        } catch(error) {
          this.notice("Ошибка", "Аутентификация пользователя не удалась", "error");
          this.isAuthDone = false
        }
      }

      this.isAuthDone = false
		}
  },
  validations: {
    userData: {
      userName: { required },
      password: { required }
    },
  },
  computed: {
    userNameErrors () {
      const errors = []
      if (!this.$v.userData.userName.$dirty) return errors
      !this.$v.userData.userName.required && errors.push('Введите имя пользователя.')
      return errors
    },
    passwordErrors () {
      const errors = []
      if (!this.$v.userData.password.$dirty) return errors
      !this.$v.userData.password.required && errors.push('Введите пароль.')
      return errors
    }
  },
  mounted () {},
  created: function () {}
}
</script>