/**
 * 在树形数据结构中递归查找具有匹配ID的节点。
 *
 * @param {Object} tree - 要搜索的树形数据结构。
 * @param {string|number} id - 要查找的节点ID。
 * @return {Object|null} 具有匹配ID的节点，或者如果没有找到则为null。
 */
export function findComponentNodeById (tree, id) {
  function search(nodes) {
    for (const node of nodes) {
      if (node.id === id) {
        return node;
      }
      if (node.children) {
        const found = search(node.children);
        if (found) {
          return found;
        }
      }
    }
    return null;
  }
  return search(tree);
}

/**
 * 在树形数据结构中交换指定节点与其下一个兄弟节点。
 *
 * @param {Object} tree - 要搜索的树形数据结构。
 * @param {string|number} id - 要交换的节点的ID。
 * @return {Object|null} 修改后的树形数据结构，如果节点未找到，则返回原始树。
 */
export function swapWithNextSibling(tree, id) {
  function searchAndSwap(nodes) {
    const newNodes = [...nodes];
    for (let i = 0; i < newNodes.length; i++) {
      if (newNodes[i].id === id) {
        if (i === newNodes.length - 1) return newNodes;
        // 交换元素
        let temp = newNodes[i];
        newNodes[i] = newNodes[i + 1];
        newNodes[i + 1] = temp;
        return newNodes;
      }
      if (newNodes[i].children) {
        const newChildren = searchAndSwap(newNodes[i].children);
        if (newChildren) {
          newNodes[i].children = newChildren;
          return newNodes;
        }
      }
    }
    return null;
  }

  return searchAndSwap(tree) || tree;
}

/**
 * 在树形数据结构中交换指定节点与其前一个兄弟节点。
 *
 * @param {Object} tree - 要搜索的树形数据结构。
 * @param {string|number} id - 要交换的节点的ID。
 * @return {Object|null} 修改后的树形数据结构，如果节点未找到，则返回原始树。
 */
export function swapWithPreviousSibling(tree, id) {
  function searchAndSwap(nodes) {
    const newNodes = [...nodes];
    for (let i = 0; i < newNodes.length; i++) {
      if (newNodes[i].id === id) {
        if (i === 0) return newNodes;
        // 交换元素
        let temp = newNodes[i];
        newNodes[i] = newNodes[i - 1];
        newNodes[i - 1] = temp;
        return newNodes;
      }
      if (newNodes[i].children) {
        const newChildren = searchAndSwap(newNodes[i].children);
        if (newChildren) {
          newNodes[i].children = newChildren;
          return newNodes;
        }
      }
    }
    return null;
  }

  return searchAndSwap(tree) || tree;
}

/**
 * 从树形数据结构中根据ID删除元素。
 *
 * @param {Object} tree - 要搜索的树形数据结构。
 * @param {string|number} id - 要删除的元素的ID。
 * @return {Object} 删除元素后的树形数据结构。
 */
export function deleteComponentNodeById(tree, id) {
  function searchAndDelete(nodes) {
    return nodes.filter(node => {
      if (node.id === id) {
        return false;
      }
      if (node.children) {
        node.children = searchAndDelete(node.children);
      }
      return true;
    });
  }
  
  return searchAndDelete(tree);
}

/**
 * 在树状数据结构中，插入一个新节点到指定ID的兄弟节点之前。
 *
 * @param {Object} tree - 要搜索的树状数据结构。
 * @param {string|number} id - 要在其之前插入新节点的兄弟节点的ID。
 * @param {Object} newNode - 要插入的新节点。
 * @return {Object} 已插入新节点的修改后的树状数据结构。
 */
export function insertBeforeSibling(tree, id, newNode) {
  function searchAndInsert(nodes) {
    const newNodes = [...nodes];
    for (let i = 0; i < newNodes.length; i++) {
      if (newNodes[i].id === id) {
        newNodes.splice(i, 0, newNode);
        return newNodes;
      } else if (newNodes[i].children) {
        const newChildren = searchAndInsert(newNodes[i].children);
        if (newChildren) {
          newNodes[i].children = newChildren;
          return newNodes;
        }
      }
    } 
    return null;
  }

  return searchAndInsert(tree) || tree;
}

/**
 * 在树状数据结构中插入一个新的节点，位于指定的兄弟节点之后。
 *
 * @param {Object} tree - 要搜索的树状数据结构。
 * @param {string|number} id - 要在其后插入新节点的兄弟节点的ID。
 * @param {Object} newNode - 要插入的新节点。
 * @return {Object} 插入新节点后的树状数据结构，如果未找到节点，则返回原始树状数据结构。
 */
export function insertAfterSibling(tree, id, newNode) {
  function searchAndInsert(nodes) {
    const newNodes = [...nodes];
    for (let i = 0; i < newNodes.length; i++) {
      if (newNodes[i].id === id) {
        newNodes.splice(i + 1, 0, newNode);
        return newNodes;
      } else if (newNodes[i].children) {
        const newChildren = searchAndInsert(newNodes[i].children);
        if (newChildren) {
          newNodes[i].children = newChildren;
          return newNodes;
        }
      }
    } 
    return null;
  }

  return searchAndInsert(tree) || tree;
}