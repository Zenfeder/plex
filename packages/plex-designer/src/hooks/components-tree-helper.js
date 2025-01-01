import { ref, computed } from 'vue'

// 查找 props 中同时包含 keys 中给定的多个 key 的组件
export function useComponentListWithKeys(componentsTree, keys) {
  const componentListWithField = computed(() => {
    const result = [];
    function traverse(node) {
      if (node?.schema?.props && node?.schema?.props.length > 0) {
        const propsAllKeys = node.schema.props.map(prop => prop.key);
        if (keys.every(key => propsAllKeys.includes(key))) {
          result.push(node);
        }
      }
      if (Array.isArray(node.children) && node.children.length > 0) {
        node.children.forEach(child => traverse(child));
      }
    }

    componentsTree.value.forEach(node => traverse(node));
    return result;
  });
  return componentListWithField;
}