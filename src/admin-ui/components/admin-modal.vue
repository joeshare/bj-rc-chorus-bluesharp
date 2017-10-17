<style lang="scss">
  @import '../style/vars';
  .admin-modal-container {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9999;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .75);
  }
  .admin-modal {
    position: relative;
    top: 50%;
    margin: -129px auto 0 auto;
    padding: 20px;
    width: 432px;
    height: 298px;
    border-radius: 2px;
    background-color: #fff;
  }
  .admin-modal-title {
    height: 30px;
    margin: 0;
    padding-bottom: 12px;
    border-bottom: 1px solid $grayBrighten15;
    overflow: hidden;
  }
  .admin-modal-content {
    height: 185px;
    margin: 12px 0;
    overflow: auto;
  }
  .admin-modal-operations {
    padding-top: 12px;
    text-align: right;
    height: 44px;
    overflow: hidden;
  }
  .admin-modal-button:not(:last-child) {
    margin-right: 8px;
  }
  .admin-modal-dec-line {
    border-bottom: 1px solid $grayBrighten15;
  }
</style>
<template>
  <div v-show="localDisplay" class="admin-modal-container" ref="modal" @click="maskClick">
    <div class="admin-modal" @click.stop="() => {}" :style="modalStyle">
      <h4 class="admin-modal-title" v-show="title">{{ title }}</h4>
      <div class="admin-modal-content" ref="content">
        <slot></slot>
      </div>
      <div class="admin-modal-dec-line" ref="decline"></div>
      <div class="admin-modal-operations" v-show="buttonList.length" ref="operations">
        <button
          class="admin-modal-button"
          v-for="button in buttonList"
          :class="button.buttonClass"
          :style="{ 'background-color': button.bgColor }"
          @click="operate(button.name, button.handler)">{{ button.text }}</button>
      </div>
    </div>
  </div>
</template>
<script>
  // Author: Awey
  // email: chenwei@rongcapital.cn
  // github: https://github.com/BboyAwey
  // blog: http://www.jianshu.com/u/3c8fe1455914

  // Modifier:

  import { getElementSize } from '../helpers/common'
  
  export default {
    name: 'admin-modal',
    mounted () {
      // document.body.appendChild(this.$refs.modal)
      this.calModalContentStyle()
    },
    // destroyed () {
    //   document.body.removeChild(this.$refs.modal)
    // },
    data () {
      return {
        builtInButtons: {
          confirm: {
            text: '确定',
            name: 'confirm',
            buttonClass: 'admin-primary'
          },
          cancel: {
            text: '取消',
            name: 'cancel',
            buttonClass: 'admin-auxiliary'
          }
        },
        localDisplay: this.display
      }
    },
    props: {
      display: {
        type: Boolean,
        require: true
      },
      title: {
        type: String
      },
      buttons: {
        type: [Object, Array, String]
      },
      width: {
        type: [String, Number]
      },
      height: {
        type: [String, Number],
        valodator (v) {
          if (!/^\d+(px)*$/g.test(v)) {
            console.warn('admin-modal: height can not be percentage because we need absolute height value to put it in middle of the window')
            return false
          }
          return true
        }
      }
    },
    watch: {
      display (v) {
        this.localDisplay = v
        if (v) this.calModalContentStyle()
      },
      localDisplay (v) {
        this.$emit('admin-modal-' + (v ? 'on' : 'off'))
      }
    },
    computed: {
      buttonList () {
        let buttons = this.buttons
        let buttonList = []
        if (typeof buttons === 'string') { // build-in buttons
          if (this.builtInButtons[buttons]) buttonList.push(this.builtInButtons[buttons])
        } else if (typeof buttons === 'object') {
          if (buttons instanceof Array) { // if array, multipal buttons
            buttons.forEach(button => {
              if (typeof button === 'string') {
                if (this.builtInButtons[button]) buttonList.push(this.builtInButtons[button])
              } else if (typeof button === 'object') {
                buttonList.push(button)
              }
            })
          } else { // if object，single button
            buttonList.push(buttons)
          }
        }
        return buttonList
      },
      modalStyle () {
        let { width, height } = this
        // width can be form like 30% or 45px
        // height can only be form like 45px
        if (height === '') height = 298
        height = height < 140 ? 140 : height
        // if not given width
        if (!width) width = ''
        else width = width + ''
        return {
          width: width.indexOf('%') === -1 ? width.indexOf('px') ? width : parseInt(width) + 'px' : width,
          height: parseInt(height) + 'px',
          marginTop: parseInt(height) / 2 * -1 + 'px'
        }
      }
    },
    methods: {
      maskClick () {
        this.localDisplay = false
      },
      operate (name, handler) {
        if (name) this.$emit('admin-modal-' + name)
        let handlerRes = null
        if (handler && typeof handler === 'function') {
          handlerRes = handler()
          if (!handlerRes) this.localDisplay = false
        } else {
          this.localDisplay = false
        }
      },
      calModalContentStyle () {
        let { height, title } = this
        height = height || 298
        height = height < 140 ? 140 : height
        let operationHeight = 0
        if (this.buttons && this.buttons.length && this.$refs.operations) {
          operationHeight = getElementSize(this.$refs.operations, true).height
        }
        this.$refs.content.style.height = parseInt(height) - 64 - operationHeight - (title ? 31 : 0) + 'px'
      }
    }
  }
</script>