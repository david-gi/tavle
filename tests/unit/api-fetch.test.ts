import { api } from '../../src/http/axios-base'
test('API not in use', async () => { expect(1).toBe(1) })

// test('updateBoard', async () => {
//   const response = await api('/board/update')
//   expect(response.status).toBe(200)
//   expect(response.data.results.length).toBe(20)
// })

// test('fetchBoard', async () => {
//   const response = await api('/board')
//   expect(response.status).toBe(200)
//   expect(response.data.results).not.toBeNull()
// })