<style>
  #app, #wrapper, #page-wrapper {
    height: 100%;
  }
  body {
    background-color: #f3f3f4;
  }
  .el-pagination {
    margin-top: 25px;
    float: right;
  }
</style>
<template>
  <div id="wrapper">
    <SideBarComponent/>
    <div id="page-wrapper" class="gray-bg">
      <div class="row border-bottom">
        <nav class="navbar navbar-static-top" role="navigation" style="margin-bottom: 0">
          <div class="navbar-header">
            <a class="navbar-minimalize minimalize-styl-2 btn btn-primary " href="#"><i class="fa fa-bars"></i> </a>
            <form role="search" class="navbar-form-custom" action="search_results.html">
              <div class="form-group">
                <input type="text" placeholder="Search for something..." class="form-control" name="top-search"
                       id="top-search">
              </div>
            </form>
          </div>
          <ul class="nav navbar-top-links navbar-right">
            <li>
              <span class="m-r-sm text-muted welcome-message">权限管理DEMO</span>
            </li>
            <li class="dropdown">
              <a class="dropdown-toggle count-info" data-toggle="dropdown" href="#">
                <i class="fa fa-envelope"></i> <span class="label label-warning">16</span>
              </a>
            </li>
            <li class="dropdown">
              <a class="dropdown-toggle count-info" data-toggle="dropdown" href="#">
                <i class="fa fa-bell"></i> <span class="label label-primary">8</span>
              </a>
            </li>


            <li>
              <router-link :to="{path:'/auth'}">
                <i class="fa fa-sign-out"></i> Log out
              </router-link>
              </a>
            </li>
          </ul>
        </nav>
      </div>
      <div class="ng-scope">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import SideBarComponent from './components/common/sideBar';

  export default {
    components: {
      SideBarComponent,
    },
    methods: {
      handleSelect() {
      },
    },
  };

</script>
