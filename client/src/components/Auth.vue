<template>
  <div>
    <v-app>
      <v-container fluid>
        <v-row>
          <v-col sm="12" md="6" lg="4" offset-md="3" offset-lg="4">
            <v-card max-width="468" class="mx-auto">
              <v-card-text>
                <v-tabs light icons-and-text grow>
                  <v-tabs-slider></v-tabs-slider>
                    <v-tab href="#login">
                      Вход
                      <v-icon>mdi-login-variant</v-icon>
                    </v-tab>
                    <v-tab href="#register">
                      Регистрация
                      <v-icon>mdi-account-plus</v-icon>
                    </v-tab>

                    <v-tab-item id="login">
                      <login-form></login-form>
                    </v-tab-item>
                    <v-tab-item id="register">
                      <registration-form></registration-form>
                    </v-tab-item>
                  </v-tabs>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-app>
  </div>
</template>
<script>
import LoginForm from '@/components/LoginForm'
import RegistrationForm from '@/components/RegistrationForm'

export default {
  name: 'AccessDeniedPage',
  components: {
    LoginForm,
    RegistrationForm
  },
  data () {
    return {}
  },
  methods: {},
  mounted () {},
  created: function () {}
}
</script>