<template>
  <div class="add-card">
    <form @submit.prevent="onSubmit">
      <input class="form-control" type="text" v-model="inputTitle" ref="inputText">
      <button class="btn" type="submit" :disabled="invalidInput"
      :class="{'success': !invalidInput}">Add Card</button>
      <a class="cancel-add-btn" href="" @click.prevent="$emit('close')">&times;</a>
    </form>
  </div>
</template>

<script>
import {mapActions} from 'vuex'

export default {
  // 부모한테서 받아온다
  props:['listId'],
  data() {
    return {
      inputTitle: ''
    }
  },
  computed:{
    // input을 체크해서 값이 없으면 disable
    invalidInput(){
      return !this.inputTitle.trim()
    }
  },
  mounted(){
    // 이컴포넌트를 눌렸을때 focus를 하기위함
    // 돔에 접근하기위해 input에다가 레퍼런스로 inputText를 입력
    // 레퍼런스함수로 돔함수를 제어 ( focus함수를 사용 )
    this.$refs.inputText.focus()

    // AddCard컴포넌트의 엘리멘트가 넘어간다
    this.setupClickOutside(this.$el)
  },
  methods:{
    ...mapActions([
      'ADD_CARD'
    ]),
    onSubmit(){
      if(this.invalidInput) return // 값이없으면 그대로 리턴
      const {inputTitle,listId} = this // 액션에 전달하기위한 인자들을 가져온다 (pos정보는 옵션으로 안들고와도됨)
      this.ADD_CARD({
        title:inputTitle,
        listId:listId
      }).finally(()=>this.inputTitle='')
    },
    setupClickOutside(el){
      document.querySelector('body').addEventListener('click' , e => {
        // 이게 클릭한 엘리멘트를 포함하고있는지 있으면 현재컴포넌트를 클릭한거이기에 아무동작 x
        if(el.contains(e.target)) return
        this.$emit('close')
      })
    }
  }
}
</script>

<style>
.add-card {
  padding: 10px;
  display: block;
  position: relative;
}
.add-card .cancel-add-btn {
  display: inline-block;
  margin-left: 10px;
  vertical-align: middle;
  text-decoration: none;
  color: #888;
  font-size: 24px;
}
.add-card .cancel-add-btn:hover,
.add-card .cancel-add-btn:focus {
  color: #666;
}
.success{
  background-color: #3498db;
}
</style>
