import button from './Button.vue';

button.install = function (Vue) {
  Vue.component(button.name, button);
};

export default button;
