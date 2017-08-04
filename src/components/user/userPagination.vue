<template>
  <el-pagination
    layout="sizes, prev, pager, next, jumper, total"
    :total="userRolepagn.pagination.total"
    @current-change="onCurrentChange"
    @size-change="onSizeChange">
  </el-pagination>
</template>

<script>
  import { mapActions, mapMutations, mapGetters } from 'vuex';

  export default {
    name: 'userRole-pagination',
    data() {
      return {
        page: 1,
        perPage: 10,
      };
    },
    methods: {
      ...mapActions(['updatePaginationUserRole']),
      ...mapMutations(['updateFilterInfoUserRole']),
      onSizeChange(pageSize) {
        this.updateFilterInfoUserRole({
          perPage: pageSize,
        });
        this.updatePaginationUserRole();
      },
      onCurrentChange(currentPage) {
        this.updateFilterInfoUserRole({
          page: currentPage,
        });
        this.updatePaginationUserRole();
      },
    },
    computed: {
      ...mapGetters(['userRolepagn']),
    },
  };
</script>

<style scoped>
  .el-pagination {
    margin-bottom: 100px;
  }
</style>
