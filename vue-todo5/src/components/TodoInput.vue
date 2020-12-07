<template>
  <div>
    <div>
      <input type="text" v-model="userTodo" ref="inputFocus">
      <input type="text" v-model="newTodo">
      <button @click="addTodo">메모작성</button>
    </div>
    <div>
      {{ toDos }}
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newTodo: '',
      userTodo: '',
      toDos: []
    }
  },
  methods: {
    addTodo() {
      if (this.newTodo !== '' || this.userTodo !== '') {
        this.toDos.push({
            'id': {
              userTodo:
                {
                  'createdTime': Date.now(),
                  'content': this.newTodo
                }
            }
          }
        )
      } else {
        alert('내용을 입력하세요')
      }
    }
  },
  mounted() {
    this.$refs.inputFocus.focus()
  }
}
</script>

<style scoped>

</style>
