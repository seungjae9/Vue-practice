<template>
  <div>
    <h1>{{ msg }}</h1>
    <h2>{{test}}</h2>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      test: {
        'A': 'asdf',
        'B': 'fdas'
      }
    }
  }
}
</script>

<style scoped>

</style>
