export const mouseEvents = [
  {
    label: '点击',
    key: 'click',
  },
  {
    label: '双击',
    key: 'dblclick',
  },
  {
    label: '鼠标按下',
    key: 'mousedown',
  },
  {
    label: '鼠标松开',
    key: 'mouseup',
  },
  {
    label: '鼠标移动',
    key: 'mousemove',
  },
  {
    label: '鼠标移入',
    key: 'mouseenter',
  },
  {
    label: '鼠标移出',
    key: 'mouseleave',
  },
  {
    label: '鼠标悬停',
    key: 'mouseover',
  },
  {
    label: '鼠标离开',
    key: 'mouseout',
  },
  {
    label: '右键菜单',
    key: 'contextmenu',
  }
];

export const keyboardEvents = [
  {
    label: '按键按下',
    key: 'keydown',
  },
  {
    label: '按键保持',
    key: 'keypress',
  },
  {
    label: '按键松开',
    key: 'keyup',
  }
];

export const formEvents = [
  {
    label: '表单提交',
    key: 'submit',
  },
  {
    label: '内容改变',
    key: 'change',
  },
  {
    label: '输入内容',
    key: 'input',
  },
  {
    label: '元素获得焦点',
    key: 'focus',
  },
  {
    label: '元素失去焦点',
    key: 'blur',
  },
  {
    label: '元素焦点进入',
    key: 'focusin',
  },
  {
    label: '元素焦点离开',
    key: 'focusout',
  }
];

export const touchEvents = [
  {
    label: '触摸开始',
    key: 'touchstart',
  },
  {
    label: '触摸结束',
    key: 'touchend',
  },
  {
    label: '触摸移动',
    key: 'touchmove',
  },
  {
    label: '触摸取消',
    key: 'touchcancel',
  }
];

export const windowEvents = [
  {
    label: '滚动',
    key: 'scroll',
  },
  {
    label: '窗口大小变化',
    key: 'resize',
  },
  {
    label: '页面加载完成',
    key: 'load',
  },
  {
    label: '页面卸载',
    key: 'unload',
  },
  {
    label: '页面卸载前',
    key: 'beforeunload',
  },
  {
    label: '哈希变化',
    key: 'hashchange',
  },
  {
    label: '历史记录状态变化',
    key: 'popstate',
  }
];
export const dragEvents = [
  {
    label: '拖拽',
    key: 'drag',
  },
  {
    label: '拖拽开始',
    key: 'dragstart',
  },
  {
    label: '拖拽结束',
    key: 'dragend',
  },
  {
    label: '拖拽进入',
    key: 'dragenter',
  },
  {
    label: '拖拽悬停',
    key: 'dragover',
  },
  {
    label: '拖拽离开',
    key: 'dragleave',
  },
  {
    label: '拖拽释放',
    key: 'drop',
  }
];

export const otherEvents = [
  {
    label: '资源加载错误',
    key: 'error',
  },
  {
    label: 'CSS动画开始',
    key: 'animationstart',
  },
  {
    label: 'CSS动画结束',
    key: 'animationend',
  },
  {
    label: 'CSS过渡动画结束',
    key: 'transitionend',
  }
];

export default [
  ...mouseEvents,
  ...keyboardEvents,
  ...formEvents,
  ...touchEvents,
  ...windowEvents,
  ...dragEvents,
  ...otherEvents
]