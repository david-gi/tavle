<script setup lang='ts'>
import { nextTick, ref } from 'vue'

const props = defineProps<{ label: string }>()

const activated = ref<boolean>(false)
const timer = ref<number>()


function toggle(val: boolean | null = null) {
  activated.value = val ?? !activated.value
  timeout()
  if (!activated.value) { clearTimeout(timer.value) }
  nextTick(() => (document.getElementById('editSlot' + props.label)?.firstElementChild as HTMLElement)?.focus())
}

function timeout() {
  timer.value = setTimeout(() => activated.value = false, 10000)
}

function extend() {
  clearTimeout(timer.value)
  timeout()
}
</script>

<template>
  <label class="font-bold">{{ label }} </label>
  <div @dblclick="toggle(true)" @click="toggle(true)" @focusout="toggle(false)" @keydown="extend">
    <div v-if="!activated" class="cursor-text transition ease-in rounded hover:bg-gray hover:bg-opacity-50 hover:shadow-inner">
      <span class="float-right font-thin opacity-60 pr-2 text-sm align-super">edit</span>
      <slot name="display"></slot>
    </div>
    <div :id="'editSlot' + label"><slot v-if="activated"  name="edit"></slot></div> 
  </div>
</template>


