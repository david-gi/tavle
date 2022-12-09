import { ref } from 'vue'
import { defineStore } from 'pinia'
import { api } from '../http/axios-base'
import { Board, Stage, Item } from '../models/board'

const wrapAttempt = (func: () => void) => {
  try {
      func()
      return true
    } catch (e) {
      console.error(e)
      return false
    }
} 

export const useBoardStore = defineStore('board', () => {
  const stages: Stage[] = [
    { name: 'Stage 1', items: [] },
    { name: 'Stage 2', items: [] },
    { name: 'Stage 3', items: [] },
  ]
  const board = ref<Board>({ stages })
  const selectedStageIndex = ref<number>(-1)
  const selectedItemIndex = ref<number>(-1)
  const selectedItem = ref<Item | null>(null)
  const ready = ref<boolean>(false)

  function fetch() {
    ready.value = false
    return wrapAttempt(() => {
      const stored = localStorage.getItem('tavle-board')
      if (stored != null) board.value = <Board>JSON.parse(stored)
      ready.value = true
    })
  }

  function save() {
    return wrapAttempt(() => {
      localStorage.setItem('tavle-board', JSON.stringify(board.value))
    })
  }

  function selectItemById(id: string) {
    board.value.stages.forEach((s, i) => {
      const foundItem = <Item>s.items.find(i => i.id == id)
      if (foundItem) {
        selectedStageIndex.value = i
        selectedItemIndex.value = s.items.indexOf(foundItem)
        selectedItem.value = foundItem
        return foundItem
      }
    })
  }

  //#region Alternate API actions
  
  async function fetchWithApi() {
    // If using an api backend:
    ready.value = false
    return await api
      .get('/board')
      .then((res) => {
        board.value = <Board>res.data.results
        ready.value = true
      })
      .catch(e => console.error(e))
  }

  async function saveWithApi() {
    // If using an api backend:
    ready.value = false
    return await api
      .post('/board/update', board.value)
      .then(() => {
        ready.value = true
      })
      .catch(e => console.error(e))
  }

  //#endregion

  return { board, selectedStageIndex, selectedItemIndex, selectedItem, ready, fetch, save, selectItemById }
})
