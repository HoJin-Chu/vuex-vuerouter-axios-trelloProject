import Vue from 'vue'
import router from './router/index'
import App from './App'
import store from './store'

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App) // App 컴포넌트를 루트컴포넌트로 정하고 여기서 router-view 설정
})
