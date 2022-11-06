<template>
  <div class="xxx-space">
    <v-node-slot />
  </div>
</template>

<script>
export default {
  name: 'LibSpace',
};
</script>
<script setup>
import { h, useSlots, ref, computed } from 'vue';
const props = defineProps({
  direction: {
    type: Boolean,
    default: true,
  },
  size: {
    type: Array,
    default: [10, 10],
  },
  alignItems: {
    type: String,
    default: 'center',
  },
});
const slot = useSlots();
const slotList = ref([]);
const align = ref(props.direction ? props.alignItems : 'left');
const styles = computed(() => {
  return {
    'display': props.direction ? 'inline-flex' : 'flex',
    'gap':
      props.size.length == 2
        ? `${props.size[0]}px ${props.size[1]}px`
        : `${props.size[0]}px`,
    'flex-direction': props.direction ? 'inherit' : 'column',
    'align-items': align.value,
    'flex-wrap': 'wrap',
    'width': props.direction ? '100%' : 'fit-content',
  };
});

slot.default().forEach(item => {
  slotList.value.push(
    h(
      'div',
      {
        className: 'xxx-space-item',
        style: 'width:fit-content',
      },
      item,
    ),
  );
});

const vNodeSlot = () => [
  h(
    'div',
    {
      className: 'xxx-space-container',
      style: styles.value,
    },
    slotList.value,
  ),
];
</script>

<style lang="scss" scoped></style>
