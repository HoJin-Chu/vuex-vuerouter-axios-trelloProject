<template>

  <div>
    <div class="board-wrapper">
      <div class="board">
        <div class="board-header">
          <input class="form-control" type="text" v-if="isEditTitle" v-model="inputTitle"
          @blur="onSubmitTitle" @keyup.enter="onSubmitTitle" ref="inputTitle">
          <span class="board-title" v-else @click="onClickTitle">{{board.title}}</span>
          <a href="" class="board-header-btn show-menu" @click.prevent="onShowSettings">
            ...Show menu
          </a>
        </div>
        <div class="list-section-wrapper">
          <div class="list-section">
            <!-- 식별자로 포지션위치정보. 유일한정보이기에 등록 -->
            <div class="list-wrapper"  v-for="list in board.lists" :key="list.pos">
              <List :data="list"></List>
            </div>
            <div class="list-wrapper">
              <AddList></AddList>
            </div>
          </div>
        </div>
      </div>
    </div>
    <BoardSettings v-if="isShowBoardSettings"></BoardSettings>
    <router-view></router-view>

  </div>
</template>

<script>
import { mapActions,mapState, mapMutations } from 'vuex';
import List from './List'
import AddList from './AddList'
import dragula from 'dragula'
import 'dragula/dist/dragula.css'
import BoardSettings from './BoardSettings'

export default {
  components : {
    List,
    AddList,
    BoardSettings
  },
  data(){
    return{
      bid : 0,
      loading : false,
      dragulaCards : null,
      isEditTitle : false,
      inputTitle : ''
    }
  },
  computed:{
    ...mapState([
      'board',
      'isShowBoardSettings'
    ])
  },
  created(){
    this.fetchData().then(()=>{
      this.inputTitle = this.board.title // 가져온타이틀로 지정
      this.SET_THEME(this.board.bgColor)
    })
    this.SET_IS_SHOW_BOARD_SETTINGS(false) // home 갔다오면 열려있는 문제 해결
  },
  updated(){
    if(this.dragulaCards) this.dragulaCards.destroy()
    this.dragulaCards = dragula([
      ...Array.from(this.$el.querySelectorAll('.card-list'))
    ]).on('drop',(el,wrapper,target,siblings) => {
      console.log('Drop');
    })
  },
  methods : {
    ...mapMutations([
      'SET_THEME',
      'SET_IS_SHOW_BOARD_SETTINGS'
    ]),
    ...mapActions([ // 가져온다
      'FETCH_BOARD',
      'UPDATE_BOARD'
    ]),
    fetchData(){
      this.loading = true
      return this.FETCH_BOARD({id:this.$route.params.bid})
        .then(() => this.loading = false)
    },
    onShowSettings(){
      this.SET_IS_SHOW_BOARD_SETTINGS(true)
    },
    onClickTitle(){
      this.isEditTitle = true
      this.$nextTick(()=>this.$refs.inputTitle.focus()) // 진행을 지연시켜준다
    },
    onSubmitTitle(){
      this.isEditTitle = false
      this.inputTitle = this.inputTitle.trim()
      if( !this.inputTitle ) return // 값이없으면 리턴
      const id = this.board.id
      const title = this.inputTitle
      if(title === this.board.title) return // 원래값이랑 같아도 리턴

      this.UPDATE_BOARD({id,title})
    },
  }
}
</script>

<style>

.board-wrapper {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
}
.board {
  display: flex;
  flex-direction: column;
  height: 100%;
}
.board-header {
  flex: none;
  padding: 8px 4px 8px 8px;
  line-height: 50px;
}
.board-header input[type=text] {
  width: 200px;
}
.board-header-btn {
  border-radius: 4px;
  padding: 2px 10px;
  margin-bottom: 15px;
  color: #fff;
}
.board-header-btn:hover,
.board-header-btn:focus {
  background-color: rgba(0,0,0,.15);
  cursor: pointer;
}
.board-title {
  font-weight: 700;
  font-size: 18px;
}
.show-menu {
  font-size: 14px;
  position: absolute;
  right: 15px;
}
.list-section-wrapper {
  flex-grow: 1;
  position: relative;
}
.list-section {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow-x: auto;
  overflow-y: hidden;
  white-space: nowrap;
  padding: 0 10px;
}
.list-wrapper {
  display: inline-block;
  height: 100%;
  width: 272px;
  vertical-align: top;
  margin-right: 5px;
}
.card-item.gu-transit {
  background-color: #555 !important;
}
.card-item.gu-mirror {
  opacity: 1 !important;
  background-color: #fff !important;
  transform: rotate(3deg) !important;
}
</style>
