import Vue from 'vue'
import VueRouter from 'vue-router' // npm으로설정한 라우터를 들고온다
import Home from '../components/Home'
import Login from '../components/Login'
import NotFound from '../components/NotFound'
import Board from '../components/Board'
import Card from '../components/Card'
import store from '../store'

Vue.use(VueRouter) // 라우터설정 - 미들웨어

const requireAuth = (to,from,next) => {
  const loginPath = `/login?rPath=${encodeURIComponent(to.path)}` // 쿼리문자열이기때문에 인코딩해줘야한다
  store.getters.isAuth ? next() : next(loginPath) // 있으면 계속 이어서 수행 그렇지않을경우 로그인패스로 리다이렉트
}

const router = new VueRouter({
  mode : 'history',
  routes : [
    {
      path:'/',
      component : Home,
      beforeEnter: requireAuth
    },
    {
      path:'/login',
      component : Login
    },
    {
      path:'/b/:bid',
      component : Board,
      beforeEnter: requireAuth,
      children : [
        {
          path:'c/:cid',   // bid라는 변수로 받는다
          component: Card,
          beforeEnter: requireAuth
        }
      ],
    },
    {
      path:'*',  // 아무것도 아닌 상황에 출력
      component : NotFound
    }
  ]
})

export default router // 사용할수있도록 내보낸다. 내보냈으니 받을수있다
