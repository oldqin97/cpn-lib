<template>
  <div class="_button">
    <span>{{ count }}</span>
    <button @click="handleClick">{{ count }}</button>
  </div>
</template>

<script>
import { ref } from 'vue';
export default {
  name: 'MyButton',
  setup() {
    const count = ref(1);
    const handleClick = () => {
      count.value += 1;
    };

    return {
      count,
      handleClick,
    };
  },
};
</script>

<style lang="scss" scoped>
._button {
  color: orange;
}
</style>
