<script setup lang='ts'>
import { ref, defineEmits, watch, computed } from 'vue'
import { Item } from '../models/board'

import ColorSelector from './base/ColorSelector.vue'
import EditableValue from './base/EditableValue.vue'
import DefaultButton from './base/DefaultButton.vue'

const props = defineProps<{ modelValue: Item, first: boolean, last: boolean }>()
defineEmits<{
  (eventName: 'update:modelValue', item: Item) : void
  (eventName: 'regress') : void
  (eventName: 'progress') : void,
  (eventName: 'closed') : void,
  (eventName: 'delete') : void,
}>()

const deleteActivated = ref<boolean>()
const descHeight = ref<string>()
const item = ref<Item>(props.modelValue)
watch(props.modelValue, () => updateDate())

const urlLink = computed(() => window.location.pathname + '#' + item.value.id)

function updateDate() { item.value.updated = new Date().getTime() }

function startDelete() {
  setTimeout(() =>
  {
    deleteActivated.value = true
    setTimeout(() => deleteActivated.value = false, 3000)
  },
    600)
}

function setDescHeight() {
  const height = document.getElementById('descDisplay')?.clientHeight ?? 0
  descHeight.value = (height + 10) + 'px'
}

</script>

<template>
  <div
    v-if="item"
    class="fixed min-w-full h-1/2 bottom-0 left-0 right-0 bg-gradient-to-b from-purple to-blue shadow-2xl"
  >
    <div class="sticky bg-gray-light p-1">
      <default-button text="⤌ Regress" theme="neutral" class="w-fit mr-1" :active="!first" @click="$emit('regress')" />
      <default-button text="✖" theme=" " class="w-auto px-6 py-1 text-2xl float-right" :active="true" @click="$emit('closed')" />
      <default-button text="Progress ⤍" theme="good" class="w-fit mx-auto float-right" :active="!last" @click="$emit('progress')" />
    </div>

    <div class="flex flex-col gap-4 min-w-full h-full bottom-0 left-0 right-0 px-6 pb-12 overflow-y-auto">
      
      <div
        v-if="item.updated != item.created"
        class="-mx-6 p-2 text-orange font-bold backdrop-brightness-90 text-center"
      >
        Updated: <span class="pl-2">{{ new Date(item.updated) }}</span>
      </div>

      <div class="columns-2">
        <div class="h-20">
          <label class="font-bold">Color</label>
          <color-selector v-model="item.color" />
        </div>
        <div class="float-right">
            <default-button 
              text="Delete" 
              theme="evil" 
              class="w-16 bg-opacity-60"
              :class="{ 'hidden': deleteActivated}" 
              :active="true" 
              @click="startDelete"
            />
            <default-button 
              text="Delete?" 
              theme="mean" 
              class="w-16 animate-pulse" 
              :class="{ 'hidden': !deleteActivated}" 
              :active="true" 
              @click="$emit('delete')"
            />
        </div>
      </div>

      <div>
        <div>
          <a class="rounded-md float-right opacity-70" :href="urlLink">
            <strong class="underline text-sm">Hyperlink</strong>
          </a>
        </div>
          <editable-value :label="'Name'">
            <template #display>
              <span>{{item.name}}</span>
            </template>
            <template #edit>
              <input 
                v-model="item.name"
                class="w-full"
                maxlength="240"
              />
            </template>
          </editable-value>
      </div>

      <div>
        <editable-value :label="'Description'">
          <template #display>
            <div
              id="descDisplay"
              class="whitespace-pre-wrap"
              @click="setDescHeight"
            >
              {{item.desc}}
            </div>
          </template>
          <template #edit>
            <textarea
              id="descEdit"
              v-model="item.desc"
              class="w-full"
              :style="{ 'height': descHeight, 'min-height': '10rem' }"
            ></textarea>
          </template>
        </editable-value>
      </div>

      <div class="-mx-6 p-2 text-green font-bold backdrop-brightness-90 text-center">
        Created:<span class="pl-2">{{ new Date(item.created) }}</span>
      </div>
    </div>  
  </div>
</template>


