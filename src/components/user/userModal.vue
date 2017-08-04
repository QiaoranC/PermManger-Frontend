<template>
  <el-dialog
    v-model="visible"
    :show-close="false"
    :close-on-click-modal="false">
    <div
      slot="title">
      <el-button
        type="text"
        :disabled="loading.loading"
        @click="handleClose">
        关闭
      </el-button>
      <span
        class="el-dialog__title">
        {{mode === 'edit' ? '编辑用户' : '创建新用户'}}
      </span>
    </div>
    <div
      v-loading.body="loading.loading"
      :element-loading-text="loading.text">
      <el-row>
        <el-col
          :md="{ span: 18, offset: 2 }"
          :xs="24">
          <el-form
            label-width="100px"
            ref="userForm"
            :model="userM"
            :rules="rules">
            <el-form-item
              label="姓名" prop="name">
              <el-input
                v-model="userM.name">
              </el-input>
            </el-form-item>
            <el-form-item
              label="手机号" prop="mobile">
              <el-input
                v-model="userM.mobile">
              </el-input>
            </el-form-item>
            <el-form-item
              label="邮箱" prop="email">
              <el-input
                v-model="userM.email">
              </el-input>
            </el-form-item>
            <el-form-item
              label="职位" prop="title">
              <el-input
                v-model="userM.title">
              </el-input>
            </el-form-item>
            <el-form-item
              label="角色选择">
              <el-select v-model="userM.id" filterable multiple placeholder="请选择权限">
                <el-option
                  v-for="item in Allrole"
                  :key="item.id"
                  :label="item.display_name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    <div
      class="form-button-container">
      <el-button
        @click="handleReset">
        重置
      </el-button>
      <el-button
        type="primary"
        @click="handleSubmit">
        {{mode === 'edit' ? '保存': '添加'}}
      </el-button>
    </div>
    </div>
  </el-dialog>
</template>

<script>
  import { mapState, mapMutations, mapActions } from 'vuex';

  export default {
    name: 'userRole-form',
    data() {
      const rules = {
        name: [
          { required: true, message: '请输入名称', trigger: 'change' },
          { max: 255, message: '不能超过60个字符', trigger: 'change' },
        ],
      };
      const initUser = {
        name: '',
        mobile: '',
        email: '',
        title: '',
        id: [],
      };
      return {
        initUser,
        userM: {
          ...initUser,
        },
        users: [],
        rules,
      };
    },
    methods: {
      ...mapMutations(['switchModeUserRole']),
      ...mapActions(['updateUser', 'getRolelist', 'createUser']),
      handleClose() {
        this.switchModeUserRole({
          mode: 'view',
        });
      },
      initData() {
        this.users = [];
      },
      handleReset() {
        if (this.mode === 'edit') {
          this.userM = {
            ...this.currentItem,
          };
        } else {
          this.userM = {
            ...this.initUser,
          };
        }
        this.initData();
      },
      handleEdit() {
        this.$confirm('将会覆盖原有数据且无法撤销，是否继续？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
          this.updateUser({
            successCb: () => {
              this.$message({
                type: 'success',
                message: '保存成功',
                duration: 1200,
              });
            },
            failureCb: () => {
              this.$message({
                type: 'error',
                message: '保存失败',
                duration: 1200,
              });
            },
            user: this.userM,
          });
        });
      },
      handleAdd() {
        this.createUser({
          successCb: () => {
            this.$message({
              type: 'success',
              message: '添加成功',
              duration: 1200,
            });
          },
          failureCb: () => {
            this.$message({
              type: 'error',
              message: '添加失败',
              duration: 1200,
            });
          },
          user: this.userM,
        });
      },
      handleSubmit() {
        this.$refs.userForm.validate((valid) => {
          if (valid) {
            if (this.mode === 'edit') {
              this.handleEdit();
            } else {
              this.handleAdd();
            }
          } else {
            this.$message({
              type: 'error',
              message: '请检查表单是否填写正确',
              duration: 1200,
            });
          }
        });
      },
    },
    computed: {
      ...mapState({
        mode: state => state.user.mode,
        loading: state => state.user.loading,
        currentItem: state => state.user.currentItem,
        Allrole: state => state.user.Allrole,
      }),
      visible() {
        return this.mode !== 'view';
      },
    },
    watch: {
      mode() {
        this.handleReset();
      },
    },
  };
</script>

<style>
  .el-dialog__header {
    text-align: center;
  }
  .el-dialog__header button {
    float: left;
  }
  .form-button-container {
    text-align: right;
  }
</style>
