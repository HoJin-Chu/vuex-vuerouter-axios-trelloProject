<template>
  <div class="board-menu">
    <div class="board-menu-header">
      <div class="header-title">Menu</div>
      <a class="header-close-btn" href="" @click.prevent="onClose" >&times;</a>
    </div>
    <ul class="menu-list">
      <li><a href="" @click.prevent="onDeleteBoard">트렐로 삭제</a></li>
      <li>Color</li>
      <div class="color-picker">
        <a href="" data-value="rgb(0,121,191)" @click.prevent="onChangeTheme"></a>
        <a href="" data-value="rgb(210,144,52)" @click.prevent="onChangeTheme"></a>
        <a href="" data-value="rgb(81,152,57)" @click.prevent="onChangeTheme"></a>
        <a href="" data-value="rgb(176,70,50)" @click.prevent="onChangeTheme"></a>
      </div>
    </ul>
  </div>
</template>

<script>
import {mapMutations, mapActions, mapState} from 'vuex'

export default {
  computed:{
    ...mapState({
      board : 'board'
    })
  },
  mounted(){ // 이 컴포넌트가 부모컴포넌트에 붙어 돔에 추가됬을 시점에 돔에 접근이 가능하므로 마운티드
    Array.from(this.$el.querySelectorAll('.color-picker a')).forEach(el => {
      el.style.backgroundColor = el.dataset.value
    })
  },
  methods: {
    ...mapMutations([
      'SET_IS_SHOW_BOARD_SETTINGS',
      'SET_THEME'
    ]),
    ...mapActions([
      'DELETE_BOARD',
      'UPDATE_BOARD'
    ]),
    onClose() {
      this.SET_IS_SHOW_BOARD_SETTINGS(false)
    },
    onDeleteBoard(){
      if(!confirm(`${this.board.title} 페이지를 정말 삭제하시겠어요 ?`)) return
      this.DELETE_BOARD({id:this.board.id})
      .then(()=>this.SET_IS_SHOW_BOARD_SETTINGS(false))
      .then(()=>this.$router.push('/'))
    },
    onChangeTheme(el){ // click 한 엘레멘트인 el이 들어온다
      const id = this.board.id
      const bgColor = el.target.dataset.value
      this.UPDATE_BOARD({id,bgColor})
      .then(() => {
        this.SET_THEME(bgColor)
      })
    }
  }
}
</script>

<style>
.board-menu {
  position: absolute;
  right: 0;
  top: 0;
  height: 100%;
  background-color: #edeff0;
  width: 300px;
  transition: all .3s;
}
.board-menu-header {
  height: 46px;
  padding: 0 6px 0 12px;
  border-bottom: #bbb solid 1px;
}
.header-title {
  font-size: 18px;
  text-align: center;
  line-height: 46px;
  font-weight:700;
}
.header-close-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  text-decoration: none;
  font-size: 24px;
  color: #999;
}
.menu-list {
  list-style: none;
  padding-left: 0px;
}
.menu-list li {
  height: 18px;
  line-height: 18px;
  padding: 10px;
  margin: 5px;
  border-radius: 3px;
  font-size: 18px;
  font-weight: 700;
  color: #111;
  margin-bottom: 5px;
  cursor: pointer;
}
.menu-list li:hover,
.menu-list li:focus {
  background-color: rgba(0,0,0, .1);
}
.menu-list li a {
  text-decoration: none;
  color: inherit;
}
.color-picker {
  margin: 0 15px;
}
.color-picker a {
  display: inline-block;
  width: 40%;
  height: 100px;
  border-radius: 8px;
}
</style>
