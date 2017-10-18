/**
 * 获取鼠标页面偏移
 * @param mouseEvent
 * @returns {{pageX: number, pageY: number}}
 */
export function pageXYFromEvent (mouseEvent) {
  return {pageX: mouseEvent.pageX, pageY: mouseEvent.pageY}
}

/**
 * 为元素设置style
 * @param element{Element}
 * @param style{Object}
 */
export function setStyle (element, style) {
  for (let k in style) {
    element.style[k] = style[k]
  }
}

/**
 * 判断当前点击事件是否点到元素之外
 * @param element{Element}
 * @param event{Event}
 * @returns {boolean}
 */
export function isClickOutSide (element, event) {
  let curr = event.target
  while (curr && curr !== document.body) {
    if (curr === element) return false
    curr = curr.parentElement
  }
  return true
}
