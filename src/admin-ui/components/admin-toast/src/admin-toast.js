// Author: Awey
// email: chenwei@rongcapital.cn
// github: https://github.com/BboyAwey
// blog: http://www.jianshu.com/u/3c8fe1455914

// Modifier:

import Vue from 'vue'
import ToastConfig from './admin-toast.vue'
import { getWindowSize, getElementSize } from '../../../helpers/common'

// use only one toast instances for saving memory
if (!window.adminUiNameSpace) window.adminUiNameSpace = {}
window.adminUiNameSpace.adToast = null // save the instance in name space
window.adminUiNameSpace.adToastEmptySize = null
window.adminUiNameSpace.getToastInstance = function () {
  if (window.adminUiNameSpace.adToast) return window.adminUiNameSpace.adToast
  let el = document.createElement('div')
  let instance = new ToastConstructor({ el })
  window.adminUiNameSpace.adToast = instance
  return instance
}

// the show queue of toast
// each of them is a config of one tosat
let toastQueue = []
toastQueue.shifting = false
toastQueue.shiftToast = function () {
  if (!this.length) return false
  if (this.shifting) return false
  // only if there are config in queue and no other instance is showing will the next show up
  let instance = window.adminUiNameSpace.getToastInstance()
  let config = this.shift()
  instance.originConfig = Object.assign({}, config)
  // calc and set the pos to config
  function getEmptySize () {
    window.adminUiNameSpace.adToastEmptySize = window.adminUiNameSpace.adToastEmptySize
      ? window.adminUiNameSpace.adToastEmptySize : getElementSize(instance.$el, true)
    return window.adminUiNameSpace.adToastEmptySize
  }
  function setPos () {
    let emptySize = getEmptySize()
    let windowSize = getWindowSize()
    let emptyEl = document.createElement('span')
    emptyEl.innerText = config.message
    let textSize = getElementSize(emptyEl, true)

    config.top = config.top ? config.top : (windowSize.height - (textSize.height + emptySize.height)) / 2
    config.left = config.left ? config.left : (windowSize.width - (textSize.width + emptySize.width)) / 2
  }
  if (!(config.top && config.left)) setPos()
  Object.assign(instance, config)
  instance.show()
}

// the constructor of toast
let ToastConstructor = Vue.extend(ToastConfig)
// toast functions
ToastConstructor.prototype.close = function () {
  let instance = this
  function clean () { // some clean up work after dismiss the toast instance
    this.removeEventListener('transitionend', clean)
    clearTimeout(instance.clock)
    // remove the repos listener
    window.removeEventListener('resize', instance.rePos.bind(instance))
    // next shift
    toastQueue.shifting = false
    toastQueue.shiftToast() // next toast show up
  }
  instance.$el.addEventListener('transitionend', clean)
  instance.display = false // hide the el and it will trigger the transitionend event
}
ToastConstructor.prototype.show = function (config) {
  toastQueue.shifting = true
  let instance = this
  if (!instance.$el.parentNode)document.body.appendChild(instance.$el)
  // set a resize listener to repos and it should be removed when close
  if (!instance.originConfig.top || !instance.originConfig.left) window.addEventListener('resize', instance.rePos.bind(instance))
  instance.display = true
  instance.duration = instance.duration || 2000
  ~instance.duration && (instance.clock = setTimeout(function () {
    instance.close()
  }, instance.duration))
}
ToastConstructor.prototype.rePos = function () {
  // if do not pass the pos config we should pos it to center
  let instance = this
  function getSize () {
    return {
      windowSize: getWindowSize(),
      elementSize: getElementSize(instance.$el, true)
    }
  }
  function _setPos (direction) {
    let side = direction === 'top' ? 'height' : 'width'
    let size = getSize()
    instance[direction] = (size.windowSize[side] - size.elementSize[side]) / 2 + 'px'
  }
  _setPos('top')
  _setPos('left')
}

// the Toast function for public
let Toast = function (config = {}) {
  if (toastQueue.length) {
    let prev = toastQueue[toastQueue.length - 1]
    for (let key in prev) {
      // same config to prev
      if (prev[key] !== config[key]) {
        toastQueue.push(config)
        break
      }
    }
  } else {
    toastQueue.push(config)
  }
  // start the show queue
  toastQueue.shiftToast()
}

export default Toast
