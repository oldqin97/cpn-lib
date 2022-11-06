<template>
  <i
    class="iconfont"
    v-if="className"
    :class="className"></i>
  <svg
    v-else
    class="xxx-svg-icon"
    aria-hidden="true"
    v-bind="$attrs">
    <use :xlink:href="iconName"></use>
  </svg>
</template>

<script>
export default {
  name: 'LibIcons',
};
</script>
<script setup>
import { computed } from 'vue';
const props = defineProps({
  icon: {
    type: String,
    default: '',
  },
  className: {
    type: String,
    default: '',
  },
});

const iconName = computed(() => `#${props.icon}`);
</script>

<style lang="scss" scoped>
.xxx-svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
