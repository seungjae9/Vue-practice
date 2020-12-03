<template>
  <div>
    <ul>
      <li v-for="item in test" :key="item.id">
        {{item.con}}
        <input type="checkbox" v-bind:value="item.id" @click="con">
      </li>
    </ul>
       <input type="button" class="btn btn-primary" v-on:click="OnSubmit()" name="" value="submit" />

                        <span>

                            {{selectedval}}

                        </span>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      test: [
        {
          'id': '1',
          'con': '불라불라',
          'isValid': true
        },
        {
          'id': '2',
          'con': '불라불라2',
          'isValid': true
        },
        {
          'id': '3',
          'con': '불라불라3',
          'isValid': true
        }
      ],
      selected: []
    }
  },
  methods: {
    con () {
      console.log(this.selected)
    }
  }
}
</script>

<style scoped>

</style>
