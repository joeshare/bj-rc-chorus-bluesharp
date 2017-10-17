<style lang="scss">
  .chorus-relation-model {
    .chorus-toolbar {
      padding-top: 10px;
    }
    .table-container, .paginator-container {
      width: 100%;
      padding: 0 20px;
    }
    .data-table-list {
      width: 100%;
      tbody td:last-Child {
        text-align: center;
      }
    }

  .create-form-el {
    width: 100% !important;
  }
  .create-form-el-container {
    padding: 10px;
  }
  .field-table td:last-Child {
          text-align: center !important;
   }
  .field-table {
    min-width: 1200px;
    th:last-Child {
      text-align: center;
    }
    th, td {
      vertical-align: middle;
      min-width: 100px;
    }
  }
  .field-table-form-el {
    width: 100%;
  }
  .field-table-form-radio-td {
    min-width: 160px;
  }
  .create-form-step-2-container {
    width: 100%;
  }
  .field-table-container {
    width: 100%;
    height: 370px;
    overflow-x: auto;
    overflow-y: auto;
  }
  .field-table-container.detail {
    height: auto;
    min-height: 100px;
    padding: 10px;
  }
  }
</style>
<template src="./template.html"></template>
<script src="./index.js"></script>