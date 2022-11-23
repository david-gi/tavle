import { mount } from '@vue/test-utils'
import { createPinia } from 'pinia'
import TheBoard from '../src/components/TheBoard.vue'
import { useBoardStore } from '../src/store/board'
import { storeToRefs } from 'pinia'

describe('TheBoard Component', () => {
  const theComponent = mount(TheBoard, { global: { plugins: [createPinia()] } })

  const store = useBoardStore()
  const { board } = storeToRefs(store)

  // Test objects
  const tVal = 'test_value'
  const tItem = { name: 'test_item_name', desc: 'test_item_desc', color: 'green', created: 123, updated: 123 }
  const tStage = { name: 'test_stage_name', items: [tItem] }
  const tBoard = { stages: [tStage] }

  test('save', async () => {
    board.value = tBoard
    store.save()
  })

  test('fetch', async () => {
    store.fetch()
    expect(board.value.stages.length > 0)
    expect(board.value.stages[0].name == tStage.name)
    expect(board.value.stages[0].items.length > 0)
    expect(board.value.stages[0].items[0].name == tStage.name)
  })

  it('Adds a stage', () => {
    const count = board.value.stages.length
    theComponent.vm.addStage()
    expect(board.value.stages).toHaveLength(count + 1)
  })

  it('Changes a stage name', () => {
    theComponent.vm.editStageName(0, tVal)
    expect(board.value.stages[0].name).toBe(tVal)
  })

  it('Add an item', () => {
    theComponent.vm.setItemSelection(0, -1)
    expect(board.value.stages[0].items).toHaveLength(1)
  })
})