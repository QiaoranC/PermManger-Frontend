<template>
  <nav class="navbar-default navbar-static-side" role="navigation">
    <div class="sidebar-collapse">
      <el-menu default-active="" class="el-menu-vertical-demo">
        <li class="nav-header">
          <div class="dropdown profile-element" dropdown="">
            <img alt="image" class="img-circle" src="../../assets/Avatar.jpg" height="48" width="48">
            <a class="dropdown-toggle" dropdown-toggle="" href="" aria-haspopup="true" aria-expanded="false">
              <span class="clear">
                  <span class="block m-t-xs">
                      <strong class="font-bold">QiaoranC</strong>
               </span>
                  <span class="text-muted text-xs block">Permission DEMO</span>
              </span>
            </a>
          </div>
        </li>
        <router-link :to="{path:'/entrust'}">
          <el-menu-item index="18"><i class="fa fa-address-card fa-lg"></i>权限管理</el-menu-item>
        </router-link>
      </el-menu>
    </div>
  </nav>

</template>

<script>

    export default{

    };

</script>


<style>
  .img-circle {
    margin-left: 20px;
 }
  .nav-header {
    background-color: #233646;
    background-image: none !important;
  }
  .el-menu-item, .el-submenu, .el-submenu__title {
    background-color: #2f4050;
    color: #a7b1c2;
  }
  .navbar-default {
    background-color: #2f4050;
    height: inherit;
  }
  #page-wrapper {
    min-height: inherit;
  }
  .is-opened>.el-submenu__title,
  .is-opened .el-menu-item,
  .el-menu-item-group__title {
    background-color: #293846;
    border-left: 4px solid #19aa8d;
  }
  .el-menu-item.is-active {
    color: white;
  }
  .el-menu-item:hover,
  .el-submenu__title:hover,
  .el-menu-item:hover {
    background-color: #293846 !important;
    color: white;
  }

  .fa-lg {
    width: 20px;
    margin-right: 15px;
  }

  .fa-lg2{
    width: 15px;
    margin-right: 15px;
  }

</style>
