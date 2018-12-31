const getters = { // 로그인여부확인
  isAuth(state){
    return !!state.token
  }
}

export default getters
