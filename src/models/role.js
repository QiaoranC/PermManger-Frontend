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
      meta: [],
      data: [],
    },
    filterInfo: {
      filter: '',
      filterType: 'name',
      perPage: '10',
      page: 1,
    },
    currentItem: {
    },
    mode: 'view',
    Allperm: null,
  },
  getters: {
    roleList({ pagination }) {
      const roleList = pagination.data;
      return roleList;
    },
    rolePagn({ pagination }) {
      const rolePagn = pagination.meta.pagination;
      return rolePagn;
    },
  },
  mutations: {
    querySuccessAllperm(state, payload) {
      state.Allperm = payload.permissions;
    },
    updateFilterInfoRole(state, payload = {}) {
      state.filterInfo = {
        ...state.filterInfo,
        ...payload,
      };
    },
    changeCurrentItemRole(state, payload = { role: {} }) {
      state.currentItem = payload.role;
    },
    toggleDialogVisibleRole(state) {
      state.dialogVisible = !state.dialogVisible;
    },
    updatePaginationRole(state, payload = {}) {
      state.pagination = payload.pagination || state.pagination;
    },
    fetchStartRole(state, payload = { text: '' }) {
      state.loading.loading = true;
      state.loading.text = payload.text;
    },
    fetchSuccessRole(state, payload = { text: '' }) {
      state.loading = {
        loading: false,
        status: 1,
        text: payload.text,
      };
    },
    fetchFailureRole(state, payload = { text: '' }) {
      state.loading = {
        loading: false,
        status: 0,
        text: payload.text,
      };
    },
    switchModeRole(state, payload = {}) {
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
    updatePaginationRole({ state, commit }) {
      const filterInfo = state.filterInfo;
      commit('fetchStartRole', {
        text: '加载中',
      });
      Vue.http.get(`roles?&filter_type=${filterInfo.filterType}&filter=${filterInfo.filter}&page=${filterInfo.page}&per_page=${filterInfo.perPage}`).then(
        (response) => {
          commit('updatePaginationRole', {
            pagination: response.body,
          });
          commit('fetchSuccessRole', {
            text: '加载成功',
          });
        },
        () => {
          commit('updatePaginationRole', {
            pagination: {
              total: 0,
              data: [],
            },
          });
          commit('fetchFailureRole', {
            text: '加载失败',
          });
        });
    },
    getPermlist({ commit }) {
      commit('fetchStartRole', {
        text: '加载中',
      });
      Vue.http.get('showAllperm').then(
        (response) => {
          commit('querySuccessAllperm', {
            permissions: response.data,
          });
          commit('fetchStartRole', {
            text: '获取数据成功',
          });
        },
        () => {
          commit('fetchFailureRole', {
            text: '获取数据失败',
          });
        }
      );
    },
    updateRole({ commit, dispatch, state }, payload = {}) {
      const { role, successCb, failureCb } = payload;
      const id = state.currentItem.Role_id;
      commit('fetchStartRole', {
        text: '正在保存',
      });
      Vue.http.put(`roles/${id}`, role).then(
        () => {
          commit('fetchSuccessRole', {
            text: '保存成功',
          });
          if (typeof successCb === 'function') {
            successCb();
          }
          commit('switchModeRole', {
            mode: 'view',
          });
          dispatch('updatePaginationRole');
        },
        () => {
          commit('fetchFailureRole', {
            text: '保存失败',
          });
          if (typeof failureCb === 'function') {
            failureCb();
          }
        }
      );
    },
    deleteRole({ commit, state, dispatch }, payload = {}) {
      commit('fetchStartRole', {
        text: '正在删除',
      });
      const id = state.currentItem.Role_id;
      const { successCb, failureCb } = payload;
      if (!id) {
        commit('fetchFailureRole', {
          text: '删除项不存在',
        });
        return;
      }
      Vue.http.delete(`roles/${id}`).then(
        () => {
          commit('fetchSuccessRole', {
            text: '删除成功',
          });
          if (typeof successCb === 'function') {
            successCb();
          }
          dispatch('updatePaginationRole');
        },
        () => {
          commit('fetchFailureRole', {
            text: '删除失败',
          });
          if (typeof failureCb === 'function') {
            failureCb();
          }
        }
      );
    },
    createRole({ commit, dispatch }, payload = {}) {
      const { role, successCb, failureCb } = payload;
      commit('fetchStartRole', {
        text: '正在添加',
      });
      Vue.http.post('roles', role).then(
        () => {
          commit('fetchSuccessRole', {
            text: '添加成功',
          });
          if (typeof successCb === 'function') {
            successCb();
          }
          commit('switchModeRole', {
            mode: 'view',
          });
          dispatch('updatePaginationRole');
        },
        () => {
          commit('fetchFailureRole', {
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
