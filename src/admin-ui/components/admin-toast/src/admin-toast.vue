<style lang="scss">
  @import "../../../style/vars";
  .admin-toast {
    position: fixed;
    z-index: 99999;
    top: 0;
    left: 0;
    max-width: 80%;
    height: 68px;
    padding: 18px 32px;
    box-sizing: border-box;
    border-radius: 4px;
    color: #fff;
    line-height: 32px;
    overflow: hidden;
    text-align: center;
    background-color: rgba($grayDarken45, .8);
    transition:
      transform .3s ease-in-out,
      opacity .3s ease-in-out;
    & > span {
      position: relative;
      display: inline-block;
      width: 100%;
      height: 100%;
      overflow: hidden;
    }
    .admin-toast-icon {
      display: inline-block;
      position: absolute;
      height: 100%;
      left: 0;
      font-size: 32px;
    }
  }
  .admin-toast-fade-enter,
  .admin-toast-fade-leave-active {
    opacity: 0;
  }
</style>
<template>
  <transition name="admin-toast-fade">
    <div class="admin-toast" :style="toastStyle" v-show="display">
      <span :style="{paddingLeft: iconClass ? '48px' : ''}"><i class="admin-toast-icon" :class="iconClass" :style = "iconStyle"></i>{{ message }}</span>
    </div>
  </transition>
</template>
<script>
  // Author: Awey
  // email: chenwei@rongcapital.cn
  // github: https://github.com/BboyAwey
  // blog: http://www.jianshu.com/u/3c8fe1455914

  // Modifier:

  import '../../../style/ionicons/ionicons.css'
  export default {
    name: 'admin-toast',
    props: {
      display: Boolean,
      message: '',
      iconClass: String,
      iconColor: String,
      top: [String, Number],
      left: [String, Number]
    },
    computed: {
      iconStyle () {
        return {
          color: this.iconColor
        }
      },
      toastStyle () {
        return {
          transform: `translateX(${parseInt(this.left)}px) translateY(${parseInt(this.top)}px)`
        }
      }
    }
  }
</script>
