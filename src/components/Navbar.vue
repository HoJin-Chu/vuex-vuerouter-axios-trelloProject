<template>
  <nav class="header">
    <div class="header-logo">
      <router-link to="/">Trello</router-link>
    </div>
    <div class="header-auth">
      <a href="" v-if="isAuth" @click.prevent="logout">Logout</a>
      <router-link to="/login" v-else>Login</router-link>
      <!-- <a>Logout</a> -->
    </div>
  </nav>
</template>

<script>
import { mapMutations, mapGetters, mapState } from 'vuex'

export default {
  computed:{
    ...mapState({
      bodyColor : 'bodyColor',
      navbarColor : 'navbarColor'
    }),
    ...mapGetters([
      'isAuth'
    ]),
  },
  watch:{
    'bodyColor' : 'updateTheme'
  },
  mounted(){
    this.updateTheme()
  },
  methods:{
    ...mapMutations([
      'LOGOUT'
    ]),
    logout(){
      this.LOGOUT()
      this.$router.push('/login')
    },
    updateTheme(){ //el로 navbar 컴포넌트를 가져옴
      this.$el.style.backgroundColor = this.navbarColor

      const body = document.querySelector('body')
      const container = document.querySelector('.container')
      if(body) body.style.backgroundColor = this.bodyColor
      if(container) container.style.backgroundColor = this.bodyColor
    }
  }
}
</script>

<style>
.header {
  flex: none;
  background-color: rgba(0,0,0,.15);
  height: 32px;
  padding: 4px;
}
.header a {
  display: block;
  height: 30px;
  line-height: 30px;
  text-decoration: none;
  color: rgba(255,255,255,.5);
}
.header-logo {
  position: absolute;
  left: 50%;
  top: 7px;
  margin-left: -30px;
  text-align: center;
  font-weight: bolder;
  font-size: 24px;
}
.header-logo a:hover,
.header-logo a:focus {
  color: rgba(255,255,255,.9);
}
.header-auth {
  position: absolute;
  right: 15px;
  top: 5px;
}
.header-auth a {
  border-radius: 2px;
  padding: 0 10px;
  background-color: rgba(255,255,255, .5);
  color: white;
  transition: all .3s;
}
.header-auth a:hover,
.header-auth a:focus {
  background-color: rgba(255,255,255, .3);
}
</style>
