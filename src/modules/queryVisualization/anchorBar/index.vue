<style lang="scss">
.queryvisualization-anchorbar{
    position: fixed;
    top:35%;
    right: 32px;
    font-size:12px;
    border: 1px solid #ccc;
    border-radius:5px;
    background-color: white;
    overflow: hidden;
    box-shadow: 3px 3px 3px #ccc;
    li{ height: 45px;
        line-height: 45px;;
        text-align: center;
        width:40px;
        border-bottom: 1px solid #ccc;
        padding: 0 4px;
        vertical-align: middle;
        cursor: pointer;
        padding-top:3px;
        div{line-height: 18px;display: inline-block;}
    }
    .choose{
        background-color:#0e9ee2 ;
        color:white;
    }
}
</style>
<template>
<div class="queryvisualization-anchorbar">
    <ul>
        <li v-for="anchor in anchors" :class="anchor.choose?choosestyle:''" :href="anchor.linkstr" @click="clickanchor(anchor)"><div>{{anchor.name}}</div></li>
        <li @click="clickanchortoTop()"><div>^<br/>顶部</div></li>
    </ul>
</div>
</template>
<script>
    export default {
        data () {
            return {
                choosestyle:"choose",
                anchors: [
                    {choose:true,name:'实体A',linkstr:'#query-visualization-fromEntityCondition'},
                    {choose:false,name:'关系',linkstr:'#query-visualization-relationCondition'},
                    {choose:false,name:'实体B',linkstr:'#query-visualization-toEntityCondition'},
                    {choose:false,name:'受限条件',linkstr:'#query-visualization-limitCondition'},
                    {choose:false,name:'预览',linkstr:'#query-visualization-dataChart'}
                ]
            }
        },
        methods: {
            clickanchor (anchor) {
                this.anchors.filter((manchor)=>{
                   return manchor!=anchor;
                }).forEach(m=>{
                    m.choose= false;
                });
                anchor.choose = true;
                let scrtop = document.querySelector(anchor.linkstr).offsetTop -150;
                document.querySelector('.chorus-main').scrollTop=scrtop;
            },
            clickanchortoTop (anchor) {

                this.clickanchor(this.anchors[0])
                document.querySelector('.chorus-main').scrollTop=0;
            }
        }
    }
</script>