<template>
  <ol class="navbar">
    <li v-for="(entry, index) in dataList" >
      <a :href="entry.url"  @click="changeId(entry.id);" v-if="entry.url && entry.id!=activeId">{{entry.text}}</a>
      <span v-else>{{entry.text}}</span>
    </li>
  </ol>
</template>
<script>
// Author: joeliu
// email: liuzhao@rongcapital.cn
// github:https://github.com/joeliu926
// blog:

export default {
  data () {
    return {
      activeId:this.navList[this.navList.length-1].id,
      dataList:this.navList
    }
  },
  props: {
    navList: {
      type: Array,
      default: 0
    }
  },
  methods: {
    changeId (id) {
      this.activeId = id;
      let repArray = [],switchkey = true;
      this.dataList.forEach((m1)=>{
        if(switchkey){
        repArray.push(m1);
          if(m1.id ==id){
            switchkey=false;
          }
        }
      })
      this.dataList = repArray;
    }
  }
}
</script>
<style lang="scss">
  @import '../../admin-ui/style/vars.scss';
  .navbar{
    padding: 10px 15px;
    margin-bottom: 20px;
    list-style: none;
    border-bottom:1px solid #dfe1e5;
    li{
      display: inline-block;
      font-size:$normal;
      a{color:$primary; font-size:$normal;}
    }
    li:not(:first-child):before{
      padding: 0 6px;
      color: #6f7073;
      content: "/";
    }
  }
</style>