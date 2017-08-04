import Vue from 'vue';
import Vuex from 'vuex';
import permission from './permission';
import role from './role';
import user from './user';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    permission,
    role,
    user,
  },
});
