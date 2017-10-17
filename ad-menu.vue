<template>    
  <ul class="menu-ul">        
    <li v-for="model in menus">          
      <a href="javascript:void(0);" v-on:click="link(model.link)" @click='toggle(model)'>{{model.name}}</a>
      <m :menus="model.childTreeNode" v-on:link="link" v-show="model.open" v-if="model.childTreeNode && model.childTreeNode.length>0"></m>
    </li>
  </ul>  
</template>
<script>
export default {
  name: 'm',
  props: ['menus'],
  mounted: function () {
  },
  data () {
    return {
      open: false,
      isFolder: true
    }
  },
  computed: {
    isFolder: function () {
      return this.menus.childTreeNode && this.menus.childTreeNode.length
    }
  },
  methods: {
    link: function (link) {
      this.$emit('link', link)
    },
    toggle: function (d) {
      //console.log("dd:",this.isFolder,d);
      if (this.isFolder) {
        d.open = !d.open
      }
    }
  },
  components: {
  }
}
</script>

<style lang="scss">  
@import '../style/style.scss';
  
  .menu-ul{
    padding-left:16px;
    background-color:$gray;
    user-select:none;
  }
  .menu-ul li{
    padding-left:0px;
    padding-right:4px;
    line-height:28px;
  }
  .mainPage{   
    float:left;     
    max-width:1680px;
  }
</style>
