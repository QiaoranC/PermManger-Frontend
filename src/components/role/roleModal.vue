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
        {{mode === 'edit' ? '编辑角色' : '创建新角色'}}
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
            ref="roleForm"
            :model="roleM"
            :rules="rules">
            <el-form-item
              label="名称"
              prop="name">
              <el-input
                v-model="roleM.name">
              </el-input>
            </el-form-item>
            <el-form-item
              label="角色名称"
              prop="display_name">
              <el-input
                v-model="roleM.display_name">
              </el-input>
            </el-form-item>
            <el-form-item
              label="角色描述"
              prop="description">
              <el-input
                v-model="roleM.description">
              </el-input>
            </el-form-item>
            <el-form-item
              label="权限选择">
              <el-select v-model="roleM.id" filterable multiple placeholder="请选择权限">
                <el-option
                  v-for="item in Allperm"
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
    name: 'role-form',
    data() {
      const rules = {
        name: [
          { required: true, message: '请输入名称', trigger: 'change' },
          { max: 255, message: '不能超过60个字符', trigger: 'change' },
        ],
        display_name: [
          { required: true, message: '请输入角色名称', trigger: 'change' },
          { max: 255, message: '不能超过60个字符', trigger: 'change' },
        ],
      };
      const initRole = {
        name: '',
        display_name: '',
        id: [],
        description: '',
      };
      return {
        initRole,
        roleM: {
          ...initRole,
        },
        roles: [],
        rules,
      };
    },
    methods: {
      ...mapMutations(['switchModeRole']),
      ...mapActions(['updateRole', 'createRole', 'getPermlist']),
      handleClose() {
        this.switchModeRole({
          mode: 'view',
        });
      },
      initData() {
        this.roles = [];
      },
      handleReset() {
        if (this.mode === 'edit') {
          this.roleM = {
            ...this.currentItem,
          };
        } else {
          this.roleM = {
            ...this.initRole,
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
          this.updateRole({
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
            role: this.roleM,
          });
        });
      },
      handleAdd() {
        this.createRole({
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
          role: this.roleM,
        });
      },
      handleSubmit() {
        this.$refs.roleForm.validate((valid) => {
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
        mode: state => state.role.mode,
        loading: state => state.role.loading,
        currentItem: state => state.role.currentItem,
        Allperm: state => state.role.Allperm,
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
