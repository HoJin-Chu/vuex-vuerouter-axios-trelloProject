<template>
  <div class="login">
    <h2>LOGIN</h2>
    <form @submit.prevent="onSubmit">
      <div>
        <input class="form-control" type="text" name="email" v-model="email" placeholder="email" autofocus/>
      </div>
      <div>
        <input class="form-control" type="password" v-model="password" placeholder="password" />
      </div>
      <button  class="btn" :class="{'btn-success': invalidForm}"
      type="submit" :disabled="!invalidForm">Log In</button>
    </form>

    <p class="error" v-if="error"> {{error}} </p>

  </div>
</template>

<script>
import {auth,setAuthInHeader} from '../api'
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      email: '',
      password: '',
      error: false,
      rPath : '',
    }
  },
  computed: {
    invalidForm() { // 하나라도 입력안되있으면 로그인버튼을 disable 하겠다
      return this.email && this.password
    }
  },
  created(){
    this.rPath = this.$route.query.rPath || '/'  // 라우트 정보의 쿼리문자열에서의 rPath를 가져온다
  },
  methods: {
    ...mapActions([
      'LOGIN'
    ]),
    onSubmit() {
      this.LOGIN({email : this.email, password : this.password}) // store 에서 객체로 받기로 해서 객체로 전달
      .then(data => {
        this.$router.push(this.rPath)
      })
      .catch(err => {
        this.error = "틀렸다 병신아";
      })
    }
  }
}
</script>

<style>
.login {
  width: 400px;
  margin: 0 auto;
}
.error {
  color: #f00;
}

</style>
