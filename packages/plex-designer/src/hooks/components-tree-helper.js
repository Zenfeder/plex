import { ref, computed } from 'vue'

// 将树形数据结构扁平化，同时过滤掉不满足条件的元素
export function useFlattenAndFilterComponentTree(componentsTree, filter) {
  const componentTreeFlatten = computed(() => {
    const result = [];
    function traverse(node) {
      if (filter(node)) {
        result.push(node);
      }
      if (Array.isArray(node.children) && node.children.length > 0) {
        node.children.forEach(child => traverse(child));
      }
    }

    componentsTree.value.forEach(node => traverse(node));
    return result;
  });
  return componentTreeFlatten;
}