import Vuex from "vuex"

import Vue from "vue"

Vue.use(Vuex)


// Create a new store instance.
const store = new Vuex.Store({
  state() {
    return {
      input: {
        name: '',
        age: '',
        birthdate: '',
        email: '',
        id: '',
        password: ''
      }

    }
  },
  mutations: {
    setEmail: (state, email) => {
      state.input.email = email
    },
    setName: (state, name) => {
      state.input.name = name;
    },
    setAge: (state, age) => {
      state.input.age = age;
    },
    setPassword: (state, password) => {
      state.input.password = password;
    },
    setId: (state, id) => {
      state.input.id = id;
    },
    setBirthdate: (state, birthdate) => {
      state.input.birthdate = birthdate;
    },
  },
  getters: {
    getEmail: (state) =>
      state.input.email,
    getName: (state) =>
      state.input.name,
    getAge: (state) =>
      state.input.age,
    getPassword: (state) =>
      state.input.password,
    getId: (state) =>
      state.input.id,
    getBirthdate: (state) =>
      state.input.birthdate
  }
})

export default store