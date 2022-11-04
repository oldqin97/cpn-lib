<template>
  <div class="lib-fold">
    <div
      class="text-box"
      :class="{ 'over-hidden': fold }">
      <div ref="contentBoxRef">
        <slot></slot>
      </div>
    </div>
    <div class="action-handle select-none">
      <div
        v-if="isOver && unfold"
        class="expand-handle cursor-pointer"
        @click="handleExpand">
        {{ fold ? expandText.expand : expandText.shrink }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LibFold',
};
</script>
<script setup>
import { computed, ref, onMounted, onUnmounted } from 'vue';

const props = defineProps({
  line: {
    type: Number,
    default: 5,
  },
  unfold: {
    type: Boolean,
    default: false,
  },
  expandText: {
    type: Object,
    default: () => ({
      expand: '展开',
      shrink: '收缩',
    }),
  },
});

const line = computed(() => {
  let line = Math.trunc(Number(props.line));
  return line > 0 ? line : 1;
});
// 文本展开？
const fold = ref(true);
const handleExpand = () => {
  fold.value = !fold.value;
};

// 文本大于5行？
const isOver = ref(false);

const contentBoxRef = ref();

let observer;
onMounted(() => {
  observer = new ResizeObserver(() => {
    if (fold.value && contentBoxRef.value) {
      //offsetHeight：包括内容可见部分的高度，border，可见的padding，水平方向的scrollbar（如果存在）；不包括margin。

      // clientHeight：包括内容可见部分的高度，可见的padding；不包括border，水平方向的scrollbar，margin。

      //scrollHeight：包括内容的高度（可见与不可见），padding（可见与不可见）；不包括border，margin。
      isOver.value =
        contentBoxRef.value.offsetHeight <
        contentBoxRef.value.scrollHeight;
    }
  });
  observer.observe(contentBoxRef.value);
});

onUnmounted(() => {
  observer.disconnect();
});
</script>

<style lang="scss" scoped>
.lib-fold {
  font-size: 15px;
  line-height: 1.5rem;
  color: #515767;

  .text-box {
    /* margin: 0.5rem; */
    /* 会对过长的单词做词内断词处理，这样单词始终会在容器中，不会溢出容器 */
    word-wrap: break-word;
  }
  .action-handle {
    margin-bottom: 0.5rem;
    .expand-handle {
      display: inline-block;
      line-height: 20px;
      color: #1171ee;
    }
  }

  .over-hidden {
    display: -webkit-box;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: v-bind(line);
  }
}
</style>
