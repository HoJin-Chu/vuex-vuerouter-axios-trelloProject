import axios from 'axios'
import router from '../router/index'

const DOMAIN = 'http://localhost:3000' // 도메인이라는 상수를 줘서 뒤에내용은 플러스 시킨다
const UNAUTHORIZED = 401
const onUnauthrorized = () => {
  router.push(`/login?rPath=${encodeURIComponent(location.pathname)}`)
}

const request = (method,url,data) => {
  return axios({
    method,
    url : DOMAIN + url,
    data
  })
    .then(result => result.data)
    .catch(result => {
      const {status} = result.response
      if(status === UNAUTHORIZED) onUnauthrorized()
    })
}

export const setAuthInHeader = token => {  // 토큰정보를 헤더에 담아 넘겨주기위해 선언
  axios.defaults.headers.common['Authorization'] = token ? `Bearer ${token}` : null;
}

export const board = {
  fetch(id){
    return id ? request('get',`/boards/${id}`) : request('get','/boards')
    // id가 있으면 SET_BOARD 없으면 SET_BOARDS 호출
  },
  create(title){
    return request('post','/boards',{title})
  },
  destroy(id){
    return request('delete',`/boards/${id}`)
  },
  update(id,payload){
    return request('put',`/boards/${id}`,payload)
  }
}

export const auth = {
  login(email,password){ // 넘어온 이메일과 패스워드를 받아서 뿌린다
    return request('post','/login',{email,password})
  }
}

export const card = {
  create(title,listId,pos){
    return request('post','/cards',{title,listId,pos})
  },
  fetch(id){
    return request('get',`/cards/${id}`)
  },
  update(id,payload){
    return request('put',`/cards/${id}`,payload)
  },
  destroy(id){
    return request('delete',`/cards/${id}`)
  }
}

export const list = {
  create(payload){
    return request('post','/lists',payload)
  },
  update(id,payload){
    return request('put',`/lists/${id}`,payload)
  },
  destroy(id){
    return request('delete',`/lists/${id}`)
  }
}

