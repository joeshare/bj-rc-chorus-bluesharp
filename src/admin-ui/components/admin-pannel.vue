<style lang="scss">
  @import "../style/vars";
  .admin-pannel {
    padding: 24px;
    border: 1px solid $grayBrighten15;
    border-radius: 2px;
    background-color: #fff;
    box-shadow: $shadowLevel3;
    .admin-pannel-title {
      margin-top: 0;
      margin-bottom: 24px;
    }
  }
</style>
<template>
  <div class="admin-pannel">
    <h3 class="admin-pannel-title" v-if="title">{{ title }}</h3>
    <div class="admin-pannel-content">
      <slot></slot>
    </div>
  </div>
</template>
<script>
  // Author: Awey
  // email: chenwei@rongcapital.cn
  // github: https://github.com/BboyAwey
  // blog: http://www.jianshu.com/u/3c8fe1455914

  // Modifier:

  export default {
    name: 'admin-pannel',
    props: {
      title: String
    }
  }
</script>