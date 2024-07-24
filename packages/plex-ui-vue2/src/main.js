import { add } from './utils/test'

const a = 1
const b = 2

console.time('time')
add(a, b).then((res) => {
  console.timeEnd('time')
  console.log('>>> a + b = ', res)
  console.log('hello worldhahhaha ')
})

export function test() {
  console.log('test ui')
}