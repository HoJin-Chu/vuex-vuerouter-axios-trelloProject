import * as api from '../api'

const actions = {
  ADD_BOARD(_,{title}){
    return api.board.create(title) // 프로미스를 리턴한다
      .then(data => data.item)// 성공하면 data의 item객체를 넘긴다
  },
  FETCH_BOARDS({commit}){ // 내부적으로 boards 상태를 갱신
    return api.board.fetch().then(data => {
      commit('SET_BOARDS',data.list)
    })
  },
  LOGIN({commit},{email,password}){
    return api.auth.login(email,password)
    .then( ({accessToken}) => {
      commit('LOGIN',accessToken)
    })
  },
  FETCH_BOARD({commit},{id}){ // 보드 하나만 가져오는 함수
    return api.board.fetch(id).then(data => {
      commit('SET_BOARD',data.item)
    })
  },
  DELETE_BOARD(_,{id}){
    return api.board.destroy(id)
  },
  UPDATE_BOARD(context,{id,title,bgColor}){
    return api.board.update(id,{title,bgColor})
    .then(()=>context.dispatch('FETCH_BOARD',{id : context.state.board.id}))
  },

  ADD_CARD(context,{title,listId,pos}){
    return api.card.create(title,listId,pos)
    // 받아서 카드추가 완료했으면
    .then(()=>context.dispatch('FETCH_BOARD',{id : context.state.board.id}))
  },
  FETCH_CARD(context,{id}){
    return api.card.fetch(id)
    .then(data => {
      context.commit('SET_CARD',data.item)
    })
  },
  UPDATE_CARD(context,{id,title,description,pos,listId}){
    return api.card.update(id,{title,description,pos,listId})
    .then(() => context.dispatch('FETCH_BOARD',{id : context.state.board.id}))
  },
  DELETE_CARD(context,{id}){
    return api.card.destroy(id)
    .then(() => context.dispatch('FETCH_BOARD',{id : context.state.board.id}))
  },
  ADD_LIST(context,{title,boardId,pos}){
    return api.list.create({title,boardId,pos})
    .then(() => context.dispatch('FETCH_BOARD',{id : context.state.board.id}))
  },
  UPDATE_LIST(context,{id,pos,title}){
    return api.list.update(id,{pos,title})
    .then(() => context.dispatch('FETCH_BOARD',{id : context.state.board.id}))
  },
  DELETE_LIST(context,{id}){
    return api.list.destroy(id)
    .then(() => context.dispatch('FETCH_BOARD',{id : context.state.board.id}))
  }
}

export default actions
