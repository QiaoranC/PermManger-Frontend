<template>
  <el-pagination
    layout=" prev, pager, next, total"
    :total="PermPagn.total"
    @current-change="onCurrentChange"
    @size-change="onSizeChange">
  </el-pagination>
</template>

<script>
  import { mapGetters, mapActions, mapMutations } from 'vuex';

  export default {
    name: 'Perm-pagination',
    data() {
      return {
        page: 1,
        perPage: 10,
      };
    },
    methods: {
      ...mapActions(['updatePaginationPerm']),
      ...mapMutations(['updateFilterInfoPerm']),
      onSizeChange(pageSize) {
        this.updateFilterInfoPerm({
          perPage: pageSize,
        });
        this.updatePaginationPerm();
      },
      onCurrentChange(currentPage) {
        this.updateFilterInfoPerm({
          page: currentPage,
        });
        this.updatePaginationPerm();
      },
    },
    computed: {
      ...mapGetters(['PermPagn']),
    },
  };
</script>

<style scoped>
  .el-pagination {
    margin-bottom: 100px;
  }
</style>
