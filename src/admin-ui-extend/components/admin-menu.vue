<style lang="scss">
  @import "../style/vars";
  .admin-menu {
    list-style: none;
    color: $grayDarken25;
    & > li {
      position: relative;
    }
    & > li.active {
      color: $primary;
    }
    & > li > .menu:hover {
      color: $primary;
    }
    .menu {
      position: relative;
      height: 40px;
      padding: 0 16px 0 0;
      line-height: 40px;
      font-size: $normal;
      cursor: pointer;
    }
    .menu-icon {
      position: relative;
      top: 1px;
      margin-right: 10px;
      font-size: 18px;
    }
    .menu-fold-icon {
      float: right;
      font-size: $small;
      color: $grayDarken25;
    }
    .collapse > .menu > .menu-fold-icon {
      color: $grayDarken5;
    }
    .next-level-container {
      padding-left: $normal + 24px;
    }
    .self-has-icon {
      padding-left: $normal + 29px;
    }
    .self-no-icon {
      padding-left: $normal;
    }
  }
  .admin-menu.top-level {
    background-color: #fff;
    & > .children-active:before {
      content: '';
      display: inline-block;
      position: absolute;
      left: 0;
      top: 0;
      height: 100%;
      width: 4px;
      background-color: $primary;
    }
    & > .children-active {
      background-color: rgba($primary, .05);
    }
    & > li > .menu {
      padding-left: 24px;
    }
    & > li > .menu:hover {
      background-color: rgba($primary, .05);
    }
    // & > li > .next-level-container {
    //   padding-left: 38px;
    // }
    & > li > .self-has-icon {
      padding-left: $normal + 54px;
    }
    & > li > .self-no-icon {
      padding-left: $normal + 24px;
    }
  }
</style>
<template>
  <ul class="admin-menu" :class="isTopLevel ? 'top-level' : ''">
    <li
      v-for="item in localItems"
      :class="
        '' + (item.active ? 'active ' : '')
        + (item.collapse ? 'collapse ' : '')
        + (item.childrenActive ? 'children-active ' : '')
      ">
      <div class="menu" @click="select(item)">
        <i class="menu-icon" v-if="item.iconClass" :class="item.iconClass"></i>
        <span class="menu-text">{{ item.text }}</span>
        <i class="menu-fold-icon ion-chevron-down" v-if="item.children && item.children.length" v-show="!item.collapse"></i>
        <i class="menu-fold-icon ion-chevron-right" v-if="item.children && item.children.length" v-show="item.collapse"></i>
      </div>
      <div
        class="next-level-container"
        :class="item.iconClass ? 'self-has-icon' : 'self-no-icon'"
        v-if="item.children && item.children.length"
        v-show="!item.collapse">
        <admin-menu
          :menu-items="item.children"
          :is-top-level="false"
          :all-menu-items="isTopLevel ? localItems : allMenuItems"
          @admin-menu-select="item => { $emit('admin-menu-select', item) }"></admin-menu>
      </div>
    </li>
  </ul>
</template>
<script>
  // Author: Awey
  // email: chenwei@rongcapital.cn
  // github: https://github.com/BboyAwey
  // blog: http://www.jianshu.com/u/3c8fe1455914

  // Modifier

  import '../style/ionicons/ionicons.css'
  import { deepCopy } from '../helpers/common'
  
  export default {
    name: 'admin-menu',
    data () {
      return {
        localItems: []
      }
    },
    props: {
      menuItems: Array,
      isTopLevel: {
        type: Boolean,
        default: true
      },
      allMenuItems: Array
    },
    watch: {
      menuItems (v) {
        if (this.isTopLevel) this.localItems = this.setIndex(v, [])
        else this.localItems = v
      }
    },
    created () {
      if (this.isTopLevel) this.localItems = this.setIndex(this.menuItems, [])
      else this.localItems = this.menuItems
    },
    methods: {
      select (item) {
        if (item.url) {
          this.deactivate(this.isTopLevel ? this.localItems : this.allMenuItems)
          item.active = true
        }
        this.setTopLevelChildrenActiveDec(item)
        item.collapse = !item.collapse
        this.$emit('admin-menu-select', item)
      },
      deactivate (localItems) {
        localItems.forEach(item => {
          item.active = false
          if (item.children && item.children.length) {
            this.deactivate(item.children)
          }
        })
      },
      setIndex (items, parentIndex) {
        let result = []
        if (items instanceof Array && items.length) {
          result = deepCopy(items)
          result.forEach((item, index) => {
            let res = [].concat(parentIndex)
            res.push(index)
            item.index = res
            item.childrenActive = false
            if (item.active) item.childrenActive = true
            item.children = this.setIndex(item.children, item.index)
          })
        }
        return result
      },
      setTopLevelChildrenActiveDec (item) {
        let items = this.isTopLevel ? this.localItems : this.allMenuItems
        items.forEach(item => {
          item.childrenActive = false
        })
        if (this.isTopLevel) this.localItems[item.index[0]].childrenActive = true
        else this.allMenuItems[item.index[0]].childrenActive = true
      }
    }
  }
</script>
