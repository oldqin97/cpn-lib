<template>
  <transition
    name="slide"
    appear>
    <div
      class="xxx-message"
      :style="state[type]"
      v-show="isShow">
      <template v-if="isText">
        <i
          v-if="icon"
          class="iconfont"
          :class="icon"></i>
        <span class="text">{{ text }}</span>
      </template>
      <template v-else>
        <slot />
      </template>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'LibMessage',
};
</script>
<script setup>
import { computed, onMounted, ref } from 'vue';
const props = defineProps({
  type: {
    type: String,
    default: 'info',
  },
  text: {
    type: [String, Object],
    default: '',
  },
  icon: String,
  textColor: String,
  bgColor: String,
});

const state = ref({
  info: {
    color: '#505050',
    backgroundColor: 'rgb(229 227 224)',
    borderColor: 'rgb(229 227 224)',
  },
  warn: {
    color: '#f57b29',
    backgroundColor: 'rgb(243 233 220)',
    borderColor: 'rgb(243 233 220)',
  },
  error: {
    color: '#ec3437',
    backgroundColor: 'rgb(251 228 228)',
    borderColor: 'rgb(251 228 228)',
  },
  success: {
    color: '#09b63d',
    backgroundColor: 'rgb(223 243 212)',
    borderColor: 'rgb(223 243 212)',
  },
  custom: {
    color: props.textColor,
    backgroundColor: props.bgColor,
    borderColor: props.bgColor,
  },
});

const isShow = ref(false);
const isText = computed(() => typeof props.text === 'string');
onMounted(() => {
  isShow.value = true;
});
</script>

<style lang="scss" scoped>
.slide-enter-active {
  animation: fade-in-top 0.5s ease-out both;
}
.slide-leave-active {
  animation: fade-in-top 0.5s ease-out reverse both;
}
@keyframes fade-in-top {
  0% {
    transform: translate(-50%, -50px);
    opacity: 0;
  }
  100% {
    transform: translateY(-50%, 0);
    opacity: 1;
  }
}
.xxx-message {
  position: fixed;
  display: flex;
  align-items: center;
  z-index: 10000;
  left: 50%;
  top: 25px;
  padding: 5px 25px;
  transform: translateX(-50%);
  min-height: 50px;
  border: 1px solid #e4e4e4;
  background-color: #f5f5f5;
  color: #999;
  border-radius: 5px;
  i {
    margin-right: 10px;
    vertical-align: middle;
    font-size: 15px;
    height: 100%;
  }
  .text {
    vertical-align: middle;
    font-size: 15px;
    line-height: 20px;
  }
}
</style>
