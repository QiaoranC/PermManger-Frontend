<template>
    <div>
    <el-table
      :data="userRoleList"
      v-loading="loading.body"
      border
      height
      stripe
      style="width: 100%"
      :default-sort = "{prop: 'created_at', order: 'descending'}"
      >
      <el-table-column prop="User_id" width="70" align="center"
        label="ID">
      </el-table-column>
      <el-table-column prop="name" sortable align="center"
        label="姓名">
      </el-table-column>
      <el-table-column prop="mobile" sortable align="center"
        label="电话">
      </el-table-column>
      <el-table-column prop="email" sortable align="center"
        label="邮箱">
      </el-table-column>
      <el-table-column prop="title" sortable align="center"
        label="职位">
      </el-table-column>
      <el-table-column label="用户角色操作" align="center">
        <template scope="scope">
          <el-popover trigger="click" placement="bottom" ref="popoverRole">
              <p>角色: {{ scope.row.UserRole }}</p>
          </el-popover>
          <el-button size="mini" type="primary" @click="handleEdit(scope.row)" icon="edit">
            编辑
          </el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)" icon="delete">
            删除
          </el-button>
          <el-button size="mini" type="info" v-popover:popoverRole icon="information">
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    </div>
</template>

<script type="text/ecmascript-6">
import { mapGetters, mapState, mapMutations, mapActions } from 'vuex';

export default{
  computed: {
    ...mapGetters(['userRoleList']),
    ...mapState({
      loading: state => state.user.loading,
    }),
  },

  methods: {
    ...mapMutations(['switchModeUserRole', 'changeCurrentItemUserRole']),
    ...mapActions(['deleteUserRole']),
    handleDelete(role) {
      this.changeCurrentItemUserRole({ role });
      this.$confirm('此操作无法撤销，是否继续？', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'error',
      }).then(() => {
        this.deleteUserRole({
          successCb: () => {
            this.$message({
              type: 'success',
              message: '删除成功',
              duration: 1200,
            });
          },
          failureCb: () => {
            this.$message({
              type: 'error',
              message: '删除失败',
              duration: 1200,
            });
          },
        });
      });
    },
    handleEdit(role) {
      this.changeCurrentItemUserRole({ role });
      this.switchModeUserRole({
        mode: 'edit',
      });
    },
  },
};
</script>
