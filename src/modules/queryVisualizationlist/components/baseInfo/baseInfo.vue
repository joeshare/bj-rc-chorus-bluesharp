<template>
<div>
       <div  style="padding: 10px;">
            <ad-input class="project-manage-ad-input"
                    label="项目名称："
                    v-model="currentRecoder.projectName"
                    placeholder="请输入名称"
                    :validators="validateName"
                    :disabled=true
                    :trigger="triggerValue"
                    @input='inputProjectName'
                    @done="validateDone"></ad-input>
        </div>
        <div style="padding: 10px;">
            <ad-input class="project-manage-ad-input"
                    label="项目编码："
                    v-model="currentRecoder.projectCode"
                    placeholder="请输入编码"
                    :disabled="true"
                   ></ad-input>
        </div>
        <div style="padding: 10px;">
            <ad-input class="project-manage-ad-input"
                    label="项目描述："
                    type="textarea"
                    v-model="currentRecoder.projectDesc"
                    :disabled="true"
                    @input='inputProjectDesc'
                    ></ad-input>
        </div>
</div>
</template>
<script src="./index.js">
import AdInput from 'adminUI/components/admin-input';
export default {

}
</script>
<style lang="scss"></style>