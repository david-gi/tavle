<script setup lang='ts'>
import { ref } from 'vue'

const props = defineProps<{ text: string, theme: string, active: boolean | undefined }>()

const isActive = ref(props.active)
const colorClass = ref<string>('')
switch (props.theme) {
  case 'good':
    colorClass.value = 'bg-green'
    break
  case 'neutral':
    colorClass.value = 'bg-purple saturate-150'
    break
  case 'mean':
    colorClass.value = 'bg-yellow text-pink'
    break
  case 'evil':
    colorClass.value = 'bg-pink'
    break
  default:
    colorClass.value = 'bg-gray-light'
    break
}

function debounce() {
  if (isActive.value) {
    isActive.value = false
    setTimeout(() => {
      isActive.value = true
    }, 1000)
  }
}
</script>

<template>
  <button
    class="p-2 font-bold rounded-sm hover:shadow-none active:brightness-75"
    :class="[colorClass, { 'bg-gray': !isActive, 'hover:brightness-125 shadow-xl': isActive}]"
    :disabled="!isActive"
    @click="debounce"
  >
    {{text}}
  </button>
</template>

