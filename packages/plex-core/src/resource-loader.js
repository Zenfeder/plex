/**
 * 依次加载一系列脚本，一次加载一个。
 *
 * @param {Array<string>} scripts - 要加载的脚本的URL数组。
 * @return {Promise<void>} 一个Promise，在所有脚本成功加载时解析，如果出现错误则拒绝。
 */
export function loadScript (url) {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.setAttribute('defer', 'defer');
    script.src = url;
    script.onload = () => resolve();
    script.onerror = () => reject();
    document.head.appendChild(script);
  });
}
/**
 * 并行加载多个脚本，并返回一个Promise，当所有脚本加载完成时解析。
 *
 * @param {Array<string>} urls - 要加载的脚本的URL数组。
 * @return {Promise<Array<void>>} 一个Promise，解析为一个包含每个已加载脚本的未定义值的数组。
 */

export function loadScriptBatch (urls) {
  return Promise.all(urls.map(loadScript));
}


export async function loadScriptsInOrder(urls) {
  for (const url of urls) {
    try {
      await loadScript(url);
    } catch (error) {
      console.error(`Failed to load ${url}`);
      throw error;
    }
  }
}

/**
 * 从指定的 URL 加载一个 CSS 文件，并将其添加到文档的头部。
 *
 * @param {string} url - 要加载的 CSS 文件的 URL。
 * @return {void} 此函数不返回任何值。
 */
export function loadStyle (url) {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = url;
  document.head.appendChild(link);
}
