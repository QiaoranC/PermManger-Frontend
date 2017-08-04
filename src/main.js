import 'element-ui/lib/theme-default/index.css';
import 'element-ui/lib/theme-default/base.css';

import {
  Button,
  Col,
  Dialog,
  Form,
  FormItem,
  Input,
  Loading,
  Menu,
  MenuItem,
  MenuItemGroup,
  Message,
  Option,
  Pagination,
  Radio,
  Row,
  Select,
  Submenu,
  Table,
  TableColumn,
  Tooltip,
  MessageBox,
  InputNumber,
  Cascader,
  Checkbox,
  CheckboxGroup,
  tag,
  Tabs,
  TabPane,
  Popover,
} from 'element-ui';

import Vue from 'vue';
import VueResource from 'vue-resource';
import VueRouter from 'vue-router';
import host from './config';
import routes from './router';
import store from './models/';

const components = [
  Radio,
  FormItem,
  MenuItemGroup,
  TableColumn,
  Button,
  Dialog,
  Form,
  Input,
  Pagination,
  Select,
  Tooltip,
  Row,
  Menu,
  Col,
  MenuItem,
  Submenu,
  Option,
  Table,
  InputNumber,
  Cascader,
  Checkbox,
  CheckboxGroup,
  tag,
  Tabs,
  TabPane,
  Popover,
];

components.forEach((item) => {
  Vue.component(item.name, item);
});

Vue.use(Loading.directive);
Vue.prototype.$loading = Loading.service;
Vue.prototype.$message = Message;
Vue.prototype.$confirm = MessageBox.confirm;

Vue.use(VueRouter);
Vue.use(VueResource);

const router = new VueRouter({
  routes,
});

Vue.http.options = { root: host };

router.beforeEach((to, from, next) => {
  if (to.path === '/auth' || to.path === '/login') {
    next();
  } else {
    next();
  }
});

new Vue({ router, store }).$mount('#app');
