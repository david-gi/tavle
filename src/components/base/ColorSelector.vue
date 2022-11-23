<script setup lang='ts'>
import { ref, defineEmits } from 'vue'

defineProps<{ modelValue: string }>()
const emit = defineEmits<{
  (eventName: 'update:modelValue', val: string) : void
}>()

const activated = ref<boolean>(false)
const colors = [
  'blue',
  'orange',
  'pink',
  'green',
]
const baseClasses = [
  'w-fit',
  'p-3',
  'cursor-pointer',
  'contrast-125',
  'shadow-inner',
  'hover:shadow-none',
  'hover:brightness-125',
]
const timer = ref<number>()

function toggle() {
  activated.value = !activated.value
  if (activated.value) timer.value = setTimeout(() => activated.value = false, 3000)
}

function select(color: string) {
  emit('update:modelValue', color)
  activated.value = false
  clearTimeout(timer.value)
}

</script>

<template>
    <div>
        <div
          class="float-left border-2 border-gray-dark rounded"
          :class="[baseClasses, { 'brightness-75 hover:brightness-75': activated }]"
          :style="{ 'background-color': ('rgb(var(--color-' + modelValue + '))') }"
          @click="toggle"
        ></div>
        
        <div
          v-if="activated" 
          class="w-fit float-left border-2 border-gray-dark shadow-lg rounded"
        >
          <div
            v-for="color in colors"
            :key="'color-' + color"
            :class="baseClasses"
            :style="{ 'background-color': ('rgb(var(--color-' + color + '))') }"
            class="float-left ring-1 ring-gray-dark"
            @click="select(color)"
          ></div>
          <br class="clear-both"/>
        </div>
    </div>
</template>


