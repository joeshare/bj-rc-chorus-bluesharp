<style lang="scss">
  @import '../style/vars';
  .admin-icon {
    color: inherit;
  }
</style>
<template>
  <i class="admin-icon"
    :class="type"
    :style="styles"></i>
</template>
<script>
  // Author: Awey
  // email: chenwei@rongcapital.cn
  // github: https://github.com/BboyAwey
  // blog: http://www.jianshu.com/u/3c8fe1455914

  // Modifier:

  import '../style/ionicons/ionicons.css'
  export default {
    name: 'admin-icon',
    props: {
      type: {
        type: String,
        required: true
      },
      size: {
        type: [Number, String]
      },
      color: {
        type: String
      }
    },
    computed: {
      styles () {
        let temp = {}
        if (this.size !== '' && !/^\s+$/g.test(this.size)) {
          let num = parseInt(this.size)
          if (!isNaN(num)) temp.fontSize = num + 'px'
        }
        if (this.color) temp.color = this.color
        return temp
      }
    }
  }
</script>