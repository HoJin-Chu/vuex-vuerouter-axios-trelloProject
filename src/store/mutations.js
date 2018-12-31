import {setAuthInHeader} from '../api'

const mutations = {
  SET_IS_ADD_BOARD(state,toggle){
    state.isAddBoard = toggle
  },
  SET_BOARDS(state,boards){ // 상태값을 변경할 변이
    state.boards = boards
  },
  LOGIN(state,token){
    if(!token)return
    state.token = token
    localStorage.setItem('token',token)// 성공하면 로컬스토리지에 토큰이라는 키값으로 토큰 저장
    setAuthInHeader(token)// 토큰정보를 전달
  },
  LOGOUT(state){
    state.token = null
    delete localStorage.token
    setAuthInHeader(null)
  },
  SET_BOARD(state,board){
    state.board = board
  },
  SET_CARD(state,card){
    state.card = card
  },
  SET_THEME(state,color){
    state.bodyColor = color || '#ffffff'
    state.navbarColor = color ? 'rgba(0,0,0,.15)' : '#026aa7'
  },
  SET_IS_SHOW_BOARD_SETTINGS(state,toggle){
    state.isShowBoardSettings = toggle
  }
}

export default mutations

