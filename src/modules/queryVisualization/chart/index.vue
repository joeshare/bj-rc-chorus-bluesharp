<style lang="scss">
#chorus-query-visualization-canvas-wrapper,#chorus-query-visualization-chart-property-wrapper{
  display:block;
  float:left;
  canvas{
    background: url("../../../images/workflow/flow-bg.png") repeat;
    border: 1px solid rgb(239, 239, 239);
  }
  canvas.move{
    cursor:move;
  }


}
#chorus-query-visualization-chart-toolbar{
   position: absolute;
   left: 10px;
   top:10px;
   i{
         border: 1px solid rgba(150, 150, 150, 0.5);
         border-radius: 3px;
         width: 20px;
         height: 20px;
         display: inline-block;
         font-size: 14px;
         line-height: 20px;
         text-align: center;
         background: RGBA(102,102,102,.1);
         margin:4px;
         cursor:pointer;
         color:RGBA(102,102,102,.8);
   }
   i.action{
       background: #0e9ee2;
   }
   i:hover{
      background: #0e9ee2;
      color:#fff;
   }
}
#chorus-query-visualization-chart-property-wrapper{
   border: 1px solid rgb(239, 239, 239);
   box-shadow: -3px 2px 4px rgba(87,87,89,.3);
   overflow-y:auto;
   position: absolute;
   right: 0;
   background:#fff;
  .property-title{
      height:64px;
      line-height:64px;
      border-bottom: 1px solid rgb(239, 239, 239);
      margin: 0 0 10px 0;
      .close{
        float: right;
        margin-right: 20px;
        font-size: 22px;
      }
 }
 .sub-title{
   padding: 10px 15px;
   background-color: RGBA(131,159,184,1);
   color: #fff;
   .text{
     display:inline-block;
      color: #fff;
      padding:0 0 0 15px;
   }
 }
 .sub-content{
     padding: 10px 0;
     .row{
       color:#999;
       font-size:14px;
       padding:8px 25px;
     }
     .admin-radio, .admin-checkbox {
        color:#999;
         font-size:14px;
         padding-left:25px;
     }
     .admin-radio .admin-radio-label,.admin-checkbox .admin-checkbox-label {
         display: inline-block;
         margin-right: 100px;
         padding: 7px 0px;
     }
 }
}
.chorus-query-visualization-chart{
  position:relative;
}
</style>
<template src="./template.html"></template>
<script src="./index.js"></script>