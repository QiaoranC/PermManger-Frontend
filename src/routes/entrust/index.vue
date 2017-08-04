<template>
  <div>
    <el-tabs type="border-card">
      <el-tab-pane>
        <span slot="label"><i class="fa fa-address-card-o" aria-hidden="true"></i> 权限管理</span>
        <div>
          <el-row class="permission-header">
            <el-col :span="22">
              <h2 class="TitleDescription">权限规则CRUD</h2>
            </el-col>
            <el-col :span="2">
              <el-button
                @click="handleAddPerm" type="primary">
                添加
              </el-button>
            </el-col>
          </el-row>
            <permissionTable/>
            <permissionPagination/>
            <permissionModal/>
        </div>
      </el-tab-pane>
      <el-tab-pane>
        <span slot="label"><i class="fa fa-address-book-o" aria-hidden="true"></i> 角色管理</span>
        <div>
          <el-row
            class="permission-header">
            <el-col :span="22">
              <h2 class="TitleDescription">管理角色及权限分配</h2>
            </el-col>
            <el-col :span="2">
              <el-button
                @click="handleAddRole" type="primary">
                添加
              </el-button>
            </el-col>
          </el-row>
            <roleTable/>
            <roleModal/>
            <rolePagination/>
        </div>
      </el-tab-pane>
      <el-tab-pane>
        <span slot="label"><i class="fa fa-user-o" aria-hidden="true"></i> 用户管理</span>
        <div>
          <el-row
            class="permission-header">
            <el-col :span="22">
              <h2 class="TitleDescription">管理用户的角色权限</h2>
            </el-col>
            <el-col :span="2">
              <el-button
                @click="handleAddUser" type="primary">
                添加
              </el-button>
            </el-col>
          </el-row>
            <userTable/>
            <userPagination/>
            <userModal/>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import { mapActions, mapMutations, mapGetters, mapState } from 'vuex';
  import permissionPagination from '../../components/permission/permissionPagination';
  import permissionTable from '../../components/permission/permissionTable';
  import permissionModal from '../../components/permission/permissionModal';

  import roleTable from '../../components/role/roleTable';
  import roleModal from '../../components/role/roleModal';
  import rolePagination from '../../components/role/rolePagination';

  import userTable from '../../components/user/userTable';
  import userModal from '../../components/user/userModal';
  import userPagination from '../../components/user/userPagination';

  export default {
    components: {
      permissionPagination,
      permissionTable,
      permissionModal,

      roleTable,
      roleModal,
      rolePagination,

      userTable,
      userModal,
      userPagination,
    },
    data() {
      return {
      };
    },
    methods: {
      ...mapActions([
        'updatePaginationPerm',
        'updatePaginationRole', 'getPermlist',
        'updatePaginationUserRole', 'getRolelist',
      ]),
      ...mapMutations([
        'switchModePerm', 'updateFilterInfoPerm', 'changeCurrentItemPerm',
        'switchModeRole', 'updateFilterInfoRole', 'changeCurrentItemRole',
        'switchModeUserRole', 'updateFilterInfoRole', 'changeCurrentItemUserRole',
      ]),
      handleAddPerm() {
        this.changeCurrentItemPerm();
        this.switchModePerm({
          mode: 'create',
        });
      },
      handleAddRole() {
        this.changeCurrentItemRole();
        this.switchModeRole({
          mode: 'create',
        });
      },
      handleAddUser() {
        this.changeCurrentItemRole();
        this.switchModeUserRole({
          mode: 'create',
        });
      },
    },
    created() {
      this.switchModePerm({ mode: 'view' });
      this.updateFilterInfoPerm({ filter: '' });
      this.updatePaginationPerm();

      this.switchModeRole({ mode: 'view' });
      this.updateFilterInfoRole({ filter: '' });
      this.updatePaginationRole();
      this.getPermlist();

      this.switchModeUserRole({ mode: 'view' });
      this.updateFilterInfoRole({ filter: '' });
      this.updatePaginationUserRole();
      this.getRolelist();
    },
    computed: {
      ...mapState({
        loading: state => state.permission.loading,
      }),
      ...mapGetters(['PermissionList', 'userRolepagn', 'rolePagn']),

    },
  };
</script>

<style>
  .permission-header {
    margin-bottom: 10px;
  }
  .TitleDescription {
    margin-top: 6px;
  }
</style>
