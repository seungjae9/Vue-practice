<template>
  <div class="container">
    <div class="header">
      <input type="text" placeholder="내용을 입력해주세요." ref="inputFocus" v-model="newTodo">
      <button @click="addTodo">메모하기</button>
    </div>
    <div class="content">
      <ul>
        <li v-for="item in toDos" :key="item.id">
          {{ item.content }}
          <button @click="removeTodo(item.id)">삭제하기</button>
          <button @click="tempUpdateTodo(item.id)">수정하기</button>
        </li>
      </ul>
      <span>
          <input type="text" ref="modiFocus" v-model="modiTodo">
        <!-- <button @click="updateTodo" >확인</button> -->
      </span>
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>
      <h1>Ajax 통신</h1>
      <button id="ajaxBtn" @click="ajaxBtn">Ajax 통신 위치</button>
      <div ref="catImage"></div>
    </div>
  </div>

</template>

<script>
// const x = $refs
// import $ from 'jquery'
export default {
  data() {
    return {
      newTodo: '',
      toDos: [],
      modiTodo: '',
      tempId: ''
    }
  },
  methods: {
    addTodo() {
      if (this.newTodo !== '') {
        let oldData = JSON.parse(localStorage['todo'])
        const data = {'id': Date.now(), 'content': this.newTodo}
        oldData.push(data)
        this.toDos.push(data)
        localStorage.setItem('todo', JSON.stringify(oldData))
        this.newTodo = ''
      } else {
        alert('내용을 입력하세요')
      }
    },
    removeTodo(id) {
      let oldData = JSON.parse(localStorage['todo'])
      let step = 0
      for (step = 0; oldData.length > step; step++) {
        if (oldData[step]['id'] === id) {
          this.toDos.splice(step, 1)
          oldData = this.toDos
          localStorage.setItem('todo', JSON.stringify(oldData))
        }
      }
    },
    tempUpdateTodo(id) {
      this.$refs.modiFocus.focus()
    },
    ajaxBtn() {

      // console.log(Ref)
      $.ajax({
        url: 'https://api.thecatapi.com/v1/images/search',
        methods: 'GET',
        data: {},
        success: function (res) {
          alert(res[0]['url'])
          // console.log(this.$refs)
          //     this.$$refs.catImage.innerText = res[0]['url']
        }
      })
    }
    // updateTodo (id) {
    //     console.log(id)
    // }
  },
  mounted() {
    this.$refs.inputFocus.focus()
  },
  created() {
    if (localStorage.getItem('todo') === null) {
      localStorage['todo'] = JSON.stringify([{'id': Date.now(), 'content': '메모를 시작하세요'}])
    }
    for (let todo of JSON.parse(localStorage['todo'])) {
      this.toDos.push(todo)
    }
  }
}
</script>

<style>
.header {
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
  height: 100px;
  /* 어떤 높이든 가운데 정렬해준다*/
  align-items: center;
}

.content {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
