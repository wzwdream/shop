import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    searchText: "",
    searchData: []
  },
  mutations: {
    changeSearch(state, text) {
      state.searchText = text;
    }
  },
  modules: {}
});
