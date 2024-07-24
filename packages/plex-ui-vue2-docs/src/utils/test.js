/**
 * 在延迟2秒后将两个数字相加。
 *
 * @param {number} a - 要相加的第一个数字。
 * @param {number} b - 要相加的第二个数字。
 * @return {Promise<number>} 一个将两个数字相加的Promise。
 */export function add(a, b) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(a + b)
    }, 2000)
  })
}