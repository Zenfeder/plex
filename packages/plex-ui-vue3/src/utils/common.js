/**
 * 使用字母和数字生成一个长度为16的随机字符串。
 *
 * @return {string} 生成的随机字符串。
 */
export function generateRandomString() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  const charactersLength = characters.length;

  for (let i = 0; i < 16; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
}