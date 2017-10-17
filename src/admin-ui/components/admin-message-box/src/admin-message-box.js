// Author: Awey
// email: chenwei@rongcapital.cn
// github: https://github.com/BboyAwey
// blog: http://www.jianshu.com/u/3c8fe1455914

// Modifier:

import Vue from 'vue'
import AdModalTemplate from '../../admin-modal'
import AdAlertTemplate from './admin-alert'
import AdConfirmTemplate from './admin-confirm'
import AdPromptTemplate from './admin-prompt'

// make sure only single vue instance to save memos
if (!window.adminUiNameSpace) window.adminUiNameSpace = {}
let nameSpace = window.adminUiNameSpace
function getInstance (type) {
  switch (type) {
    case 'modal':
      let res = null
      if (nameSpace.adModalIntance) {
        res = nameSpace.adModalIntance
      } else {
        res = new (Vue.extend(AdModalTemplate))({ el: document.createElement('div') })
        res.width = 320
        res.height = 164
        if (res.$refs.decline) res.$refs.decline.parentNode.removeChild(res.$refs.decline)
        nameSpace.adModalIntance = res
      }
      return res
    case 'alert':
      if (nameSpace.adAlertIntance) return nameSpace.adAlertIntance
      return new (Vue.extend(AdAlertTemplate))({ el: document.createElement('div') })
    case 'confirm':
      if (nameSpace.adConfirmIntance) return nameSpace.adConfirmIntance
      return new (Vue.extend(AdConfirmTemplate))({ el: document.createElement('div') })
    case 'prompt':
      if (nameSpace.adPromptIntance) return nameSpace.adPromptIntance
      return new (Vue.extend(AdPromptTemplate))({ el: document.createElement('div') })
  }
}

// get all instances
let instances = {
  modal: getInstance('modal'),
  alert: getInstance('alert'),
  confirm: getInstance('confirm'),
  prompt: getInstance('prompt')
}
// when modal close itself we shoud sync the display prop
instances.modal.$on('admin-modal-off', () => {
  if (instances.modal.$el.parentNode) {
    instances.modal.$el.parentNode.removeChild(instances.modal.$el)
  }
  instances.modal.display = false
})
// when click buttons call the handler
instances.modal.$on('admin-modal-confirm', () => {
  let config = instances.modal.config
  if (config.type === 'prompt') {
    if (config.confirm && typeof config.confirm === 'function') {
      if (instances[config.type].validate(instances[config.type].value)) {
        instances.modal.display = false
        Vue.nextTick(() => {
          config.confirm(instances[config.type].value)
        })
      } else {
        // config.confirm(instances[config.type].value)
        return true
      }
    }
  } else {
    if (config.confirm && typeof config.confirm === 'function') {
      instances.modal.display = false
      Vue.nextTick(() => {
        config.confirm()
      })
    }
  }
})
instances.modal.$on('admin-modal-cancel', () => {
  let config = instances.modal.config
  if (config.cancel && typeof config.cancel === 'function') {
    config.cancel(config.type === 'prompt' ? instances[config.type].value : undefined)
  }
})
// refresh el innnerHTML
function refreshContent (el, content) {
  el.innerHTML = ''
  el.appendChild(content)
}

function MessageBox (config) {
  let { type = 'alert', message, validator, reset, buttonClass } = config
  if (!type || ['alert', 'confirm', 'prompt'].indexOf(type) === -1) {
    console.warn('massage box: type is required and must be "alert","confirm" or "prompt"')
  }

  // deal with the modal config
  instances.modal.config = config
  if (type === 'alert') {
    instances.modal.buttons = [{
      name: 'confirm',
      text: '确定',
      buttonClass: buttonClass ? buttonClass.confirm : undefined
    }]
  }
  if (type === 'confirm') {
    instances.modal.buttons = [{
      name: 'cancel',
      text: '取消',
      buttonClass: buttonClass ? buttonClass.cancel : undefined
    }, {
      name: 'confirm',
      text: '确定',
      buttonClass: buttonClass ? buttonClass.confirm : undefined
    }]
  }
  if (type === 'prompt') {
    instances.modal.buttons = [{
      name: 'cancel',
      text: '取消',
      buttonClass: buttonClass ? buttonClass.cancel : undefined
    }, {
      name: 'confirm',
      text: '确定',
      buttonClass: buttonClass ? buttonClass.confirm : undefined,
      handler () {
        return true
      }
    }]
  }
  if (type === 'prompt') instances.modal.height = 198
  else instances.modal.height = 144

  // get a content instance
  let contentInstance = instances[type]
  if (reset) {
    contentInstance.value = ''
    contentInstance.warnings = null
  }
  // set content instance props
  Object.assign(contentInstance, {message, validator})
  // put the content into modal and show them on document
  refreshContent(instances.modal.$refs.content, contentInstance.$el)
  instances.modal.display = true
  // auto focus
  if (contentInstance.$refs.core && contentInstance.$refs.core.$refs.core) {
    contentInstance.$refs.core.$refs.core.focus()
  }
  document.body.appendChild(instances.modal.$el)
}

export default MessageBox
