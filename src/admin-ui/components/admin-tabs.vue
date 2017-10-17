<template>
<div class="admin-tabs-wrapper">
    <div class="admin-tabs-nav">
        <ul>
            <li v-for="(entry, index) in tabs" :class="entry.name==activeTabName?'admin-tabs-active':''" :name="['tab-'+entry.name]"  @click="toggleTabs(entry.name);"><a href="javascript:void(0);" :title="entry.text">{{entry.text}}</a></li>
        </ul>
    </div>
    <div  class="admin-tabs-container">
        <slot class="admin-tabs-content"></slot>
    </div>
</div>
</template>
<script>
// Author: Bearhotel
// email: lilijing@rongcapital.cn
// github:
// blog:

// Modifier: joeliiu
// email: liuzhao@rongcapital.cn
// github:https://github.com/joeliu926
// blog:

// Modifier: Awey
// email: chenwei@rongcapital.cn
// github: https://github.com/BboyAwey
// blog: http://www.jianshu.com/u/3c8fe1455914

export default {
  data () {
    return {
      activeTabName: this.currentTabName
    }
  },
  props: ['tabs', 'currentTabName'],
  watch: {
    currentTabName (v) {
      this.activeTabName = this.currentTabName;
      if(this.currentTabName){
      this.toggleTabs(this.currentTabName)}
    }
  },
  methods: {
    toggleTabs (name) {
      this.activeTabName = name
      this.$emit('toggle-tab', name)
      var cons = this.$el.querySelectorAll('.admin-tabs-container>*')
      var tabs = this.$el.querySelectorAll('.admin-tabs-nav li')
      var activeEl = this.$el.querySelectorAll('* [ name=' + name + ']')
      for (var i = 0, len = cons.length; i < len; i++) {
        cons[i].style.display = 'none'
      }
      if (activeEl && activeEl[0]) {
        activeEl[0].style.display = 'block'
      }
      for (var m = 0, num = tabs.length; m < num; m++) {
        var label = tabs[m]
        label.name === 'tab-' + name ? label.classList.add('admin-tabs-active') : label.classList.remove('admin-tabs-active')
      }
    }
  },
  components: {
    child: {template: '<div></div>'}
  },
  mounted () {
    var els = this.$el.querySelectorAll('.admin-tabs-container > *')
    for (var i = 0, len = els.length; i < len; i++) {
      els[i].classList.add('admin-tabs-content')
    }
  }
}
</script>
<style lang="scss">
  @import '../style/vars';
  .admin-tabs-wrapper {
    position: relative;
    z-index: 0;
    width: 100%;
    height: 100%;
    display: block;
  }
  .admin-tabs-nav {
    position: absolute;
    top: 0;
    z-index: 2;
    left: 0;
    right: 0;
    & > ul:after {
      conten: '';
      display: block;
      clear: both;
    }
    li {
      float: left;
      height: 34px;
      line-height: 34px;
      text-align: center;
      padding: 0 24px;
      cursor: pointer;
      min-width: 88px;
      overflow: hidden;
      max-width: 156px;
      text-overflow: ellipsis;
      white-space: nowrap;
      a {
        color: $grayDarken5;
        font-size: $normal;
      }
    }
    li:not(.admin-tabs-active):hover {
      a {
        color: $grayDarken25;
      }
    }
  }
  li.admin-tabs-active {
    border-bottom: 2px solid $primary;
    height: 35px;
    a {
      color: $grayDarken35;
    }
  }
  .admin-tabs-container {
    border-top: 1px solid $grayBrighten10;
    clear: both;
    height: 100%;
    position: absolute;
    top: 34px;
    z-index: 1;
    left: 0;
    right: 0;
    bottom: 1px;
    display: block;
    overflow-y: auto;
    .admin-tabs-content {
      display: none;
      padding: 10px;
    }
    .admin-tabs-content:first-child {
      display: block;
    }
  }
</style>
