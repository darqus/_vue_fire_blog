import '@/assets/scss/index.scss'

import Vue from 'vue'
import App from '@/App.vue'
import router from '@/router'
import firebase from 'firebase/app'
import 'firebase/auth'
import store from '@/store'

Vue.config.productionTip = false

let app
firebase
  .auth()
  .onAuthStateChanged(() => {
    if (!app) {
      new Vue({
        router,
        store,
        render: (h) => h(App),
      }).$mount('#app')
    }
  })
