import Vue from 'vue';
import VueResource from 'vue-resource';

Vue.use(VueResource);

const requestUrl = (action) => {
  const resource = Vue.resource('', action.body, { action });
  return resource.action();
};

export default requestUrl;
