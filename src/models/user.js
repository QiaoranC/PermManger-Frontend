import Vue from 'vue';
import 'lodash';

export default {
  state: {
    loading: {
      loading: false,
      status: 1,
      text: '',
    },
    pagination: {
      total: 0,
      data: [],
    },
    filterInfo: {
      filter: '',
      filterType: 'id',
      perPage: '10',
      page: 1,
    },
    currentItem: {
    },
    mode: 'view',
    Allrole: null,

  },
  getters: {
    userRoleList({ pagination }) {
      const userRoleList = pagination.data;
      return userRoleList;
    },
    userRolepagn({ pagination }) {
      const userRolepagn = pagination.meta;
      return userRolepagn;
    },
  },
  mutations: {
    querySuccessAllrole(state, payload) {
      state.Allrole = payload.roles;
    },
    updateFilterInfoUserRole(state, payload = {}) {
      state.filterInfo = {
        ...state.filterInfo,
        ...payload,
      };
    },
    changeCurrentItemUserRole(state, payload = { role: {} }) {
      state.currentItem = payload.role;
    },
    toggleDialogVisibleUserRole(state) {
      state.dialogVisible = !state.dialogVisible;
    },
    updatePaginationUserRole(state, payload = {}) {
      state.pagination = payload.pagination || state.pagination;
    },
    fetchStartUserRole(state, payload = { text: '' }) {
      state.loading.loading = true;
      state.loading.text = payload.text;
    },
    fetchSuccessUserRole(state, payload = { text: '' }) {
      state.loading = {
        loading: false,
        status: 1,
        text: payload.text,
      };
    },
    fetchFailureUserRole(state, payload = { text: '' }) {
      state.loading = {
        loading: false,
        status: 0,
        text: payload.text,
      };
    },
    switchModeUserRole(state, payload = {}) {
      switch (payload.mode) {
        case 'view':
        case 'edit':
        case 'create':
          state.mode = payload.mode;
          break;
        default:
          break;
      }
    },
  },
  actions: {
    updatePaginationUserRole({ state, commit }) {
      const filterInfo = state.filterInfo;
      commit('fetchStartUserRole', {
        text: '加载中',
      });
      Vue.http.get(`users?&filter_type=${filterInfo.filterType}&filter=${filterInfo.filter}&page=${filterInfo.page}&per_page=${filterInfo.perPage}`).then(
        (response) => {
          commit('updatePaginationUserRole', {
            pagination: response.body,
          });
          commit('fetchSuccessUserRole', {
            text: '加载成功',
          });
        },
        () => {
          commit('updatePaginationUserRole', {
            pagination: {
              total: 0,
              data: [],
            },
          });
          commit('fetchFailureUserRole', {
            text: '加载失败',
          });
        });
    },
    getRolelist({ commit }) {
      commit('fetchStartUserRole', {
        text: '加载中',
      });
      Vue.http.get('showAllrole').then(
        (response) => {
          commit('querySuccessAllrole', {
            roles: response.data,
          });
          commit('fetchStartUserRole', {
            text: '获取数据成功',
          });
        },
        () => {
          commit('fetchFailureUserRole', {
            text: '获取数据失败',
          });
        }
      );
    },
    deleteUserRole({ commit, state, dispatch }, payload = {}) {
      commit('fetchStartUserRole', {
        text: '正在删除',
      });
      const id = state.currentItem.User_id;
      const { successCb, failureCb } = payload;
      if (!id) {
        commit('fetchFailureUserRole', {
          text: '删除项不存在',
        });
        return;
      }
      Vue.http.delete(`users/${id}`).then(
        () => {
          commit('fetchSuccessUserRole', {
            text: '删除成功',
          });
          if (typeof successCb === 'function') {
            successCb();
          }
          dispatch('updatePaginationUserRole');
        },
        () => {
          commit('fetchFailureUserRole', {
            text: '删除失败',
          });
          if (typeof failureCb === 'function') {
            failureCb();
          }
        }
      );
    },
    updateUser({ commit, dispatch, state }, payload = {}) {
      const { user, successCb, failureCb } = payload;
      const Userid = state.currentItem.User_id;

      commit('fetchStartUserRole', {
        text: '正在保存',
      });
      Vue.http.put(`users/${Userid}`, user).then(
        () => {
          commit('fetchSuccessUserRole', {
            text: '保存成功',
          });
          if (typeof successCb === 'function') {
            successCb();
          }
          commit('switchModeUserRole', {
            mode: 'view',
          });
          dispatch('updatePaginationUserRole');
        },
        () => {
          commit('fetchFailureUserRole', {
            text: '保存失败',
          });
          if (typeof failureCb === 'function') {
            failureCb();
          }
        }
      );
    },
    createUser({ commit, dispatch }, payload = {}) {
      const { user, successCb, failureCb } = payload;
      commit('fetchStartUserRole', {
        text: '正在添加',
      });
      Vue.http.post('users', user).then(
        () => {
          commit('fetchSuccessUserRole', {
            text: '添加成功',
          });
          if (typeof successCb === 'function') {
            successCb();
          }
          commit('switchModeUserRole', {
            mode: 'view',
          });
          dispatch('updatePaginationUserRole');
        },
        () => {
          commit('fetchFailureUserRole', {
            text: '添加失败',
          });
          if (typeof failureCb === 'function') {
            failureCb();
          }
        }
      );
    },
  },
};
