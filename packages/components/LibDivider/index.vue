<template>
  <div
    class="xxx-divider"
    :class="{ vertical: direction === 'vertical' }">
    <div
      class="xxx-divider-title"
      v-if="position && direction !== 'vertical'">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LibDivider',
};
</script>
<script setup>
const props = defineProps({
  position: {
    type: String,
    default: 'left',
  },
  direction: {
    type: String,
    default: 'horizontal',
  },
  lineStyle: {
    type: String,
    default: 'solid',
  },
});
</script>

<style lang="scss" scoped>
.xxx-divider {
  display: flex;
  align-items: center;
  width: 100%;
  height: 1px;
  margin: 1em 0;
  padding: 0 20px;
  box-sizing: border-box;
  justify-content: v-bind(position);
  border-top: 1px v-bind(lineStyle) #dcdfe6;
}

.vertical {
  display: inline-block;
  width: 1px;
  height: 1em;
  margin: 0 10px;
  border-top: none;
  border-left: 1px solid #dcdfe6;
  padding: 0;
}
.xxx-divider-title {
  border-left: 20px solid white;
  border-right: 20px solid white;
  background-color: white;
}
</style>
