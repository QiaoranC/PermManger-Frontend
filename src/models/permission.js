import Vue from 'vue';

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
  },
  getters: {
    PermissionList({ pagination }) {
      const PermissionList = pagination.data;
      return PermissionList;
    },
    PermPagn({ pagination }) {
      const PermPagn = pagination.meta.pagination;
      return PermPagn;
    },
  },
  mutations: {
    updateFilterInfoPerm(state, payload = {}) {
      state.filterInfo = {
        ...state.filterInfo,
        ...payload,
      };
    },
    changeCurrentItemPerm(state, payload = { permission: {} }) {
      state.currentItem = payload.permission;
    },
    toggleDialogVisiblePerm(state) {
      state.dialogVisible = !state.dialogVisible;
    },
    updatePaginationPerm(state, payload = {}) {
      state.pagination = payload.pagination || state.pagination;
    },
    fetchStartPerm(state, payload = { text: '' }) {
      state.loading.loading = true;
      state.loading.text = payload.text;
    },
    fetchSuccessPerm(state, payload = { text: '' }) {
      state.loading = {
        loading: false,
        status: 1,
        text: payload.text,
      };
    },
    fetchFailurePerm(state, payload = { text: '' }) {
      state.loading = {
        loading: false,
        status: 0,
        text: payload.text,
      };
    },
    switchModePerm(state, payload = {}) {
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
    updatePaginationPerm({ state, commit }) {
      const filterInfo = state.filterInfo;
      commit('fetchStartPerm', {
        text: '加载中',
      });
      Vue.http.get(`permissions?&filter_type=${filterInfo.filterType}&filter=${filterInfo.filter}&page=${filterInfo.page}&per_page=${filterInfo.perPage}`).then(
        (response) => {
          commit('updatePaginationPerm', {
            pagination: response.body,
          });
          commit('fetchSuccessPerm', {
            text: '加载成功',
          });
        },
        () => {
          commit('updatePaginationPerm', {
            pagination: {
              total: 0,
              data: [],
            },
          });
          commit('fetchFailurePerm', {
            text: '加载失败',
          });
        });
    },
    deletePerm({ commit, state, dispatch }, payload = {}) {
      commit('fetchStartPerm', {
        text: '正在删除',
      });
      const id = state.currentItem.id;
      const { successCb, failureCb } = payload;
      if (!id) {
        commit('fetchFailurePerm', {
          text: '删除项不存在',
        });
        return;
      }
      Vue.http.delete(`permissions/${id}`).then(
        () => {
          commit('fetchSuccessPerm', {
            text: '删除成功',
          });
          if (typeof successCb === 'function') {
            successCb();
          }
          dispatch('updatePaginationPerm');
        },
        () => {
          commit('fetchFailurePerm', {
            text: '删除失败',
          });
          if (typeof failureCb === 'function') {
            failureCb();
          }
        }
      );
    },
    updatePerm({ commit, dispatch }, payload = {}) {
      const { permission, successCb, failureCb } = payload;
      if (!permission || !permission.id) {
        return;
      }
      commit('fetchStartPerm', {
        text: '正在保存',
      });
      Vue.http.put(`permissions/${permission.id}`, permission).then(
        () => {
          commit('fetchSuccessPerm', {
            text: '保存成功',
          });
          if (typeof successCb === 'function') {
            successCb();
          }
          commit('switchModePerm', {
            mode: 'view',
          });
          dispatch('updatePaginationPerm');
        },
        () => {
          commit('fetchFailurePerm', {
            text: '保存失败',
          });
          if (typeof failureCb === 'function') {
            failureCb();
          }
        }
      );
    },
    createPerm({ commit, dispatch }, payload = {}) {
      const { permission, successCb, failureCb } = payload;
      commit('fetchStartPerm', {
        text: '正在添加',
      });
      Vue.http.post('permissions', permission).then(
        () => {
          commit('fetchSuccessPerm', {
            text: '添加成功',
          });
          if (typeof successCb === 'function') {
            successCb();
          }
          commit('switchModePerm', {
            mode: 'view',
          });
          dispatch('updatePaginationPerm');
        },
        () => {
          commit('fetchFailurePerm', {
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
