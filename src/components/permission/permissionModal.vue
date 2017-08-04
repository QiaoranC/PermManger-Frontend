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
        {{mode === 'edit' ? '编辑权限' : '创建新权限'}}
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
            ref="permForm"
            :model="permM"
            :rules="rules">
            <el-form-item
              label="名称"
              prop="name">
              <el-input
                v-model="permM.name">
              </el-input>
            </el-form-item>
            <el-form-item
              label="权限名称"
              prop="display_name">
              <el-input
                v-model="permM.display_name">
              </el-input>
            </el-form-item>
            <el-form-item
              label="权限描述"
              prop="description">
              <el-input
                v-model="permM.description">
              </el-input>
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
    name: 'perm-form',
    data() {
      const rules = {
        name: [
          { required: true, message: '请输入名称', trigger: 'change' },
          { max: 255, message: '不能超过60个字符', trigger: 'change' },
        ],
        display_name: [
          { required: true, message: '请输入权限名称', trigger: 'change' },
          { max: 255, message: '不能超过60个字符', trigger: 'change' },
        ],
      };
      const initPerm = {
        name: '',
        display_name: '',
        description: '',
      };
      return {
        initPerm,
        permM: {
          ...initPerm,
        },
        perms: [],
        rules,
      };
    },
    methods: {
      ...mapMutations(['switchModePerm']),
      ...mapActions(['updatePerm', 'createPerm', 'getPermlist']),
      handleClose() {
        this.switchModePerm({
          mode: 'view',
        });
      },
      initData() {
        this.perms = [];
      },
      handleReset() {
        if (this.mode === 'edit') {
          this.permM = {
            ...this.currentItem,
          };
        } else {
          this.permM = {
            ...this.initPerm,
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
          this.updatePerm({
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
            permission: this.permM,
          });
        });
      },
      handleAdd() {
        this.createPerm({
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
          permission: this.permM,
        });
      },
      handleSubmit() {
        this.$refs.permForm.validate((valid) => {
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
        mode: state => state.permission.mode,
        loading: state => state.permission.loading,
        currentItem: state => state.permission.currentItem,
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
