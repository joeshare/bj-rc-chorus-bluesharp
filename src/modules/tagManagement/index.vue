<template src="./template.html"></template>
<script src="./index.js">
</script>
<style lang="scss">
    .admin-pannel-content{height: 100%}
    .meta-data-page-form-field{
   table{
         width: 100%;
         th{
           text-align: center !important;
         }
   }
   td{
    overflow: hidden;
    width: auto !important;
    max-width: 100px;
    text-overflow: ellipsis;
    white-space: nowrap;
   }
   td.project-management-opt{
     white-space: normal;
   }
 }
 .tag-management{
     height:100%;
     .res_con{    border-bottom: 2px solid #cecbce;
         margin-bottom: 8px;
         padding-bottom: 8px;}
    .chorus-grid td{ overflow: inherit;}
    .admin-grid-container{ height: 95%}
    .tagvalue-li{
        display: inline-block;
        border:1px solid white;
        margin: 5px;
        padding: 6px 8px;
        border-radius: 6px;
        font-size: 14px;
        background-color: rgba(190, 238, 232, 1);
        position: relative;
        cursor: pointer;
    }
    .tagvalue-li:hover{

        background-color: #50f7e2;
        i{display: block;}
    }
    .tagvalue-i{
        position: absolute;
        right: -6px;
        top: -6px;
        cursor: pointer;
        display: none;
        color:red;
    }
 }



</style>