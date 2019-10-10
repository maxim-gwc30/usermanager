import Vue from 'vue'
import Vuelidate from 'vuelidate'
import CripNotice from 'crip-vue-notice';
import Main from './components/Main'
import router from './router'
import Vuex from 'vuex'
import createPersist, { createStorage } from 'vuex-localstorage';
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import '@/styles/main.css'

// Use Vuex
Vue.use(Vuex)

// Use Vuetify
Vue.use(Vuetify)

// Use Vuelidate
Vue.use(Vuelidate)

// Use CripNotice
Vue.use(CripNotice)

Vue.config.productionTip = false

// Create Vuex store
const store = new Vuex.Store({
  plugins: [createPersist({
    namespace: 'doVUEX',
    initialState: {},
    expires: 1800000
  })],
  state: {
    userData: {
      _id: '',
      userName: '',
      firstName: ''
    }
  },
  mutations: {
    setUser (state, data) {
      state.userData._id = data._id
      state.userData.userName = data.userName
      state.userData.firstName = data.firstName
    },
    deleteUser (state) {
      state.userData._id = ''
      state.userData.userName = ''
      state.userData.firstName = ''
    }
  }
})

// Routes rules
router.beforeEach((to, from, next) => {
  if (store.state.userData.userName !== '' && to.path === '/auth') return next('/usermanager')
  if (store.state.userData.userName !== '' && to.path === '/') return next('/usermanager')
  if (to.path === '/' || to.path === '/auth') return next()
  if (store.state.userData.userName === '') return next('/auth')
  else return next()
})

Vue.mixin({
  methods: {
    notice: function(title, message, type) {
      this.$notice[type]({
          title: title,
          description: message
      })
  },
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { Main },
  vuetify: new Vuetify({}),
  render: h => h(Main)
})
