<template>
  <el-pagination
    layout=" prev, pager, next, total "
    :total="rolePagn.total"
    @current-change="onCurrentChange"
    @size-change="onSizeChange">
  </el-pagination>
</template>

<script>
  import { mapGetters, mapActions, mapMutations } from 'vuex';

  export default {
    name: 'role-pagination',
    data() {
      return {
        page: 1,
        perPage: 10,
      };
    },
    methods: {
      ...mapActions(['updatePaginationRole']),
      ...mapMutations(['updateFilterInfoRole']),
      onSizeChange(pageSize) {
        this.updateFilterInfoRole({
          perPage: pageSize,
        });
        this.updatePaginationRole();
      },
      onCurrentChange(currentPage) {
        this.updateFilterInfoRole({
          page: currentPage,
        });
        this.updatePaginationRole();
      },
    },
    computed: {
      ...mapGetters(['rolePagn']),
    },
  };
</script>

<style scoped>
  .el-pagination {
    margin-bottom: 100px;
  }
</style>
