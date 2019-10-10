<template>
  <div>
    <v-app>
      <v-container fluid px-0 py-0>
        <v-row no-gutters v-if="userName !== ''">
          <v-col col="12">
            <v-app-bar>
              <v-toolbar-title>Контроль работников</v-toolbar-title>
              <div class="flex-grow-1"></div>
              <p class="mb-0 mr-3">Добро пожаловать, {{ firstName }}</p>
              <v-btn @click="logout">Выйти</v-btn>
            </v-app-bar>
          </v-col>
        </v-row>
        <v-row>
          <v-col col="12">
            <router-view></router-view>
          </v-col>
        </v-row>
      </v-container>
    </v-app>
  </div>
</template>
<script>
// import { HTTP } from '@/services/app'
export default {
  name: 'MainPage',
  data () {
    return {}
  },
  methods: {
    logout: function() {
      this.$store.commit('deleteUser')
      this.$router.push('/auth').catch(err => {})
    }
  },
  mounted () {},
  created: function () {
    if (this.$store.state.userData.userName === '') {
      this.$router.push({ name: 'Auth' }, () => {})
    }
  },
  computed: {
    userName() {
        if (this.$store.state.userData.userName !== '')
            return this.$store.state.userData.userName;
        else
            return '';
    },
    firstName() {
        if (this.$store.state.userData.firstName !== '')
            return this.$store.state.userData.firstName;
        else
            return '';
    }
  }
}
</script>