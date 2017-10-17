<style lang="scss">
  @import '../style/vars';
  .admin-cascading {
    display: inline-block;
  }
  .admin-cascading-label-text {
    margin-bottom: 8px;
    font-size: $small;
    color: $grayDarken25;
  }
  .admin-cascading-core {
    min-width: 60px;
  }
  .admin-cascading-core:not(:last-child) {
    margin-right: 16px;
  }
  .admin-cascading-core-container {
    display: block;
  }
  // warning
  .admin-cascading-warning {
    margin-top: 6px;
    font-size: $small;
    color: $danger;
  }
  // small
  .admin-cascading.admin-form-small {
    .admin-cascading-core:not(:last-child) {
      margin-right: 12px;
    }
  }
  // disabled
  .admin-form-disabled .admin-cascading-label-text{
    cursor: not-allowed;
  }
</style>
<template>
  <div class="admin-cascading" :class="classes" :style="{ width: 80 * level + (small ? 12 : 16) * (level - 1) + 'px' }">
    <div class="admin-cascading-label-text" v-if="label">{{ label }}</div>
    <span class="admin-cascading-core-container"><admin-select
      :style="{width: (1 / level) * 100 - 5 + '%'}"
      class="admin-cascading-core"
      :warnings="warnings || hasLocalWarnings ? [] : null"
      :small="small"
      v-for="(levelArr, index) in cascadingData"
      :options="filterOptions(levelArr, index)"
      v-model="selectedOptions[index]"
      @select="select"
      @change="change"
      @focus="focus"
      @blur="blur"
      :disabled="disabled"
      ref="admin-select"></admin-select></span>
    <div class="admin-cascading-warning" v-for="warning in warnings">{{ warning }}</div>
    <div class="admin-cascading-warning" v-for="warning in localWarnings">{{ warning }}</div>
  </div>
</template>
<script>
  // Author: Awey
  // email: chenwei@rongcapital.cn
  // github: https://github.com/BboyAwey
  // blog: http://www.jianshu.com/u/3c8fe1455914

  // Modifier:

  import standardFormApi from '../helpers/standard-form-api-mixin'
  import localValidator from '../helpers/local-validator-mixin'
  import adminSelect from './admin-select'
  export default {
    name: 'admin-cascading',
    mixins: [standardFormApi, localValidator],
    data () {
      return {
        // ancestor chain, used to save selected value
        selectedOptions: this.initAncestorsLink(this.value),
        level: 0
      }
    },
    props: {
      options: {
        type: Array,
        required: true
      }
    },
    computed: {
      cascadingData () {
        return this.calcCascadingData(this.options)
      }
    },
    watch: {
      options: {
        handler (v) {
          this.cascadingData = this.calcCascadingData(v)
        },
        deep: true
      },
      value (v) {
        this.selectedOptions = this.initAncestorsLink(v)
      },
      localValue (v) {
        this.change()
        this.input()
      }
    },
    components: {
      adminSelect
    },
    methods: {
      calcCascadingData (originArr) {
        // reconstruct the tree data into two-dimensional array based on the level of tree data
        let container = []
        let level = 0
        function resolve (arr, parent) {
          if (!container[level]) container[level] = []
          // traverse current level
          for (let i = 0; i < arr.length; i++) {
            container[level].push(Object.assign(arr[i], { level, parent }))
            // if has child level
            if (arr[i].children && arr[i].children.length) {
              level++
              // traverse child level
              resolve(arr[i].children, arr[i])
            }
          }
          level--
        }
        resolve(originArr)
        this.level = container.length
        return container
      },
      initAncestorsLink (bottomNodeValue) {
        // use the bottom level to calc ancestor chain
        let res = []
        let cascadingData = this.calcCascadingData(this.options)
        let bottomNodes = cascadingData[cascadingData.length - 1]
        let bottomNode = null
        // find the last node
        for (let i = 0; i < bottomNodes.length; i++) {
          if (bottomNodes[i].value === bottomNodeValue) {
            bottomNode = bottomNodes[i]
            break
          }
        }
        function calcLink (node) {
          res.unshift(node.value)
          let parent = node.parent
          if (parent) calcLink(parent)
        }
        calcLink(bottomNode)
        return res
      },
      select (node) {
        // if some node in the ancestor chain changed then all the descendant node should change
        let vm = this
        function revalueNextLevel (node) {
          if (node.children && node.children.length) {
            // set the corresponding node in ancestor chain if has child node
            vm.$set(vm.selectedOptions, node.level + 1, node.children[0].value)
            revalueNextLevel(node.children[0], node.level + 1)
          } else {
            // if has no child node then it is the bottom level
            vm.$set(vm.selectedOptions, node.level, node.value)
          }
        }
        revalueNextLevel(node)
        vm.localValue = vm.selectedOptions[vm.selectedOptions.length - 1]
      },
      // filter the options in each level
      filterOptions (options, level) {
        if (!level) return options
        return options.filter(option => option.parent.value === this.selectedOptions[level - 1])
      }
    }
  }
</script>