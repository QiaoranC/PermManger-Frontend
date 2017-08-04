<template>
    <div>
    <el-table
      :data="PermissionList"
      v-loading="loading.body"
      border
      height
      stripe
      style="width: 100%"
      :default-sort = "{prop: 'created_at', order: 'descending'}"
      >
      <el-table-column prop="id" width="90" sortable align="center"
        label="ID">
      </el-table-column>
      <el-table-column prop="name" sortable align="center"
        label="名称">
      </el-table-column>
      <el-table-column prop="display_name" sortable align="center"
        label="权限名称">
      </el-table-column>
      <el-table-column prop="description" sortable align="center"
        label="权限描述">
      </el-table-column>
      <el-table-column sortable align="center"
        label="修改日期">
        <template scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.updated_at }}</span>
        </template>
      </el-table-column>
      <el-table-column label="权限操作" align="center">
        <template scope="scope">
          <el-button size="mini" type="primary" @click="handleEdit(scope.row)" icon="edit">
            编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)" icon="delete">
            删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    </div>
</template>

<script type="text/ecmascript-6">
import { mapGetters, mapState, mapMutations, mapActions } from 'vuex';

export default{
  computed: {
    ...mapGetters(['PermissionList']),
    ...mapState({
      loading: state => state.permission.loading,
    }),
  },
  methods: {
    ...mapMutations(['switchModePerm', 'changeCurrentItemPerm']),
    ...mapActions(['deletePerm']),
    handleDelete(permission) {
      this.changeCurrentItemPerm({ permission });
      this.$confirm('此操作无法撤销，是否继续？', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'error',
      }).then(() => {
        this.deletePerm({
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
    handleEdit(permission) {
      this.changeCurrentItemPerm({ permission });
      this.switchModePerm({
        mode: 'edit',
      });
    },
  },
};
</script>
