<style lang="scss">
  @import "../style/vars";
  .admin-page-container {
    height: 100%;
    overflow: hidden;
    background-color: $grayBrighten20;
    .admin-page-header {
      display: block;
      padding: 10px 16px;
      background-color: $primary;
      color: #fff;
    }
    .admin-page-main:after {
      content: "";
      display: block;
      clear: both;
    }
    .admin-page-sidebar {
      position: relative;
      float: left;
      height: 100%;
      min-width: 200px;
      width: 15%;
      padding: 16px 0;
      background-color: #fff;
      box-shadow: $shadowLevel3;
    }
    // .adjustable:after {
    //   content: "";
    //   display: block;
    //   position: absolute;
    //   right: 2px;
    //   top: 50%;
    //   margin-top: -10px;
    //   width: 2px;
    //   height: 24px;
    //   border-left: 2px solid $grayBrighten5;
    //   border-right: 2px solid $grayBrighten5;
    //   cursor: move;
    // }
    .admin-page-content {
      float: left;
      height: 100%;
      overflow: auto;
    }
    .admin-page-content-main {
      padding: 16px;
    }
    .admin-page-footer {
      padding: 10px 16px;
      font-size: $small;
      color: $grayDarken5;
      background-color: $grayBrighten15;
    }
  }
</style>
<template>
  <div class="admin-page-container" ref="container">
    <div class="admin-page-header" ref="header">
      <slot name="header"></slot>
    </div>
    <div class="admin-page-main" ref="main">
      <div class="admin-page-sidebar" ref="sidebar" :style="{ width: sidebarWidth }">
        <slot name="sidebar"></slot>
      </div>
      <div class="admin-page-content" ref="content">
        <div class="admin-page-content-main" ref="contentMain">
          <slot name="content"></slot>
        </div>
        <div class="admin-page-footer" ref="footer" v-show="footerShow">
          <slot name="footer"></slot>
        </div>
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
    name: 'admin-page-container',
    created () {
      window.addEventListener('resize', this.resize)
    },
    destroyed () {
      window.removeEventListener('resize', this.resize)
    },
    mounted () {
      this.resize()
      this.footerShow = this.$refs.footer.innerHTML !== ''
    },
    updated () {
      this.resize()
      this.footerShow = this.$refs.footer.innerHTML !== ''
    },
    data () {
      return {
        footerShow: true
      }
    },
    props: {
      sidebarWidth: [Number, String],
      sidebarAdjustable: Boolean // TODO: resize by user
    },
    watch: {
      sidebarWidth () {
        this.resize()
      }
    },
    methods: {
      resize () {
        let headerSize = getElementSize(this.$refs.header)
        let containerSize = getElementSize(this.$refs.container)
        let sidebarSize = getElementSize(this.$refs.sidebar)
        let contentMainSize = getElementSize(this.$refs.contentMain)
        let footerSize = null
        if (this.footerShow) footerSize = getElementSize(this.$refs.footer)

        // resize the container of page main part height to full the screen
        let pageMainheight = containerSize.height - headerSize.height
        this.$refs.main.style.height = pageMainheight + 'px'
        // resize the content part width to full the screen
        this.$refs.content.style.width = Math.floor(containerSize.width - sidebarSize.width) + 'px'
        // resize the content main (except footer) to let the footer at the bottom of the screen
        // if the content is not high enough
        if (this.footerShow && contentMainSize.height + footerSize.height < pageMainheight) {
          this.$refs.contentMain.style.height = pageMainheight - footerSize.height + 'px'
        }
      }
    }
  }
</script>