<template>
  <div>
    <h1>All Users{{count}}</h1>
    <h3>서울 사용자:{{seouls}}({{percent}}%)</h3>
    <v-list two-line>
      <v-list-tile v-for="(user, index) in allUsers" :key="index" avatar>
        <v-list-tile-avatar color="grey lighten-3">
          <img :src="user.src">
        </v-list-tile-avatar>
        <v-list-tile-content>
          <v-list-tile-title v-html="user.name"></v-list-tile-title>
          <v-list-tile-sub-title>id:#{{index}} / {{user.address}} 거주</v-list-tile-sub-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>

  </div>
</template>

<script>
import { EventBus } from '@/main.js'
import { mapGetters, mapState } from 'vuex'


  export default {
    data() {
      return {
        // vuex에서 데이터 받아야 한다.
      }
    },
    computed: {
      ...mapGetters({
        count: 'allUsersCount',
        seouls: 'countOfSeoul',
        percent: 'percentOfSeoul'
      }),
      // ...mapGetters(['allUsersCount', 'countOfSeoul', 'percentOfSeoul'])
      ...mapState(['allUsers'])
    },
    mounted() {
      EventBus.$on('signUp', users => {
        this.$store.state.allUsers.push(users)
      })
    }
  }
</script>
