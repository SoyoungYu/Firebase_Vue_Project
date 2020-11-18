import Vue from 'vue'
import App from './App.vue'
import router from './router/index.js'
import vuetify from './plugins/vuetify';

import firebase from 'firebase/app'

import 'firebase/auth'
import 'firebase/firebase-database'

Vue.config.productionTip = false

var firebaseConfig = {
  apiKey: "AIzaSyBc282XXCAJ1uxvZTf92ZvubsEJrAYkLmg",
  authDomain: "newvue-dfe1b.firebaseapp.com",
  databaseURL: "https://newvue-dfe1b.firebaseio.com",
  projectId: "newvue-dfe1b",
  storageBucket: "newvue-dfe1b.appspot.com",
  messagingSenderId: "289764980527",
  appId: "1:289764980527:web:e0f3746b6a119b7d2c53da",
  measurementId: "G-FW074YLY72"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  if (requiresAuth && !await firebase.auth().currentUser) {
    alert('로그인이 필요한 서비스입니다.');
    next('/login');
  } else {
    next();
  }
})

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
