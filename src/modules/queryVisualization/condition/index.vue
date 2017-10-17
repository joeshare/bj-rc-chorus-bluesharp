<style lang="scss">
    .queryvisualization-condition{
        .marg-top{margin-top: 10px;}
        .marg-conent{margin-top: 10px;margin-left: 25px;padding-bottom: 20px;font-size: 14px; margin-bottom: 10px;}
        .select-lable{display: inline-block; float: left;margin-right: 10px; line-height: 25px;}
    }
</style>
<template>
    <div class="queryvisualization-condition">
        <div class="marg-top"><span class="ion-funnel" style="color: #0e9ee2;font-size: large;"></span><span style="padding-left: 10px;">受限条件</span> </div>
        <div class="marg-conent">
            <div class="select-lable">Limit(单次最多100条)</div>
            <ad-input-edit  class="cond-edit" :disabled="$parent.isSnapshoot"  v-model="$parent.queryentity.size" :warnings="$parent.queryentity.add_size_warnings" :small="true"  maxlength="20" icon="ion-ios-search"></ad-input-edit>
            </div>
    </div>
</template>
<script>
    import adSelect from 'adminUI/components/admin-select'
    import adInputEdit from '../../../admin-ui-extend/components/admin-input-edit.vue'
    export default {
        components: {
            adSelect,
            adInputEdit
        },
        data () {
            return {
            }
        },
        methods: {
        }
    }
</script>