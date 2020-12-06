import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  // 데이터 역할
  state: {
    allUsers:[
      {userId: 'hoza123', password: '123', name: 'Hoza', address: 'Seoul', src:'https://goo.gl/oqLfJR'},
      {userId: 'max123', password: '456', name: 'Max', address: 'Berlin', src:'https://goo.gl/Ksk9B9'},
      {userId: 'lego123', password: '789', name: 'Lego', address: 'Busan', src:'https://goo.gl/x7SpCD'}
    ]
  },

  // computed와 비슷한역할
  getters: {
    allUsersCount: function(state) {
      return state.allUsers.length
    },
    countOfSeoul: state => {
      let count = 0
      state.allUsers.forEach(user => {
        if(user.address === 'Seoul') count++
      })
      return count
    },
    // 에로우 펑션 쓸때 두개이상 인자 받으려면 꼭  괄호 치기
    percentOfSeoul: (state, getters) => {
      return Math.round(getters.countOfSeoul / getters.allUsersCount * 100)  
    }
  },
  // getters: {
  //   allUsersCount: state => {
  //     return state.allUsers.length
  //   }
  // },

  // state를 변화시키는것
  mutations: {
    addUsers: (state, payload) => {
      state.allUsers.push(payload)
    }
  },
  // stat를 변화시키기 위한 비지니스 로직
  actions: {
    addUsers: ({commit}, payload) => {
      commit('addUsers', payload)
    }
  }
})
