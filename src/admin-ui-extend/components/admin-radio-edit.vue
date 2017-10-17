<template>
  <div class="admin-radio" :class="classes">
    <div class="admin-radio-label-text" v-if="label" >{{ label }}</div>
    <div v-for="radio in radios" class="admin-radio-label" >
      <input type="radio" class="admin-radio" :name="name" :value="radio.value" v-model="localValue" @change="input" :disabled="disabled">
      <span class="admin-radio-sub admin-radio-core chorus-pointer" @click="click(radio,$event)"></span>
      <span class="admin-radio-text">{{ radio.text }}</span>
    </div>
    <div class="admin-radio-warning" v-for="warning in warnings">{{ warning }}</div>
    <div class="admin-radio-warning" v-for="warning in localWarnings">{{ warning }}</div>
  </div>
</template>
<script>
  //=============
  // 改进版 增加 name
  //=============
  // Author: Awey
  // email: chenwei@rongcapital.cn
  // github: https://github.com/BboyAwey
  // blog: http://www.jianshu.com/u/3c8fe1455914

  // Modifier:


  import localValidatorMixin from 'adminUI/helpers/local-validator-mixin'
  import standardFormApiMixin from 'adminUI/helpers/standard-form-api-mixin'
  export default {
    name: 'admin-radio-edit',
    mixins: [localValidatorMixin, standardFormApiMixin],
    props: {
      name: {
            type: String
      },
      radios: {
        type: Array,
        required: true
      }
    },
    methods:{
      input (e) {
            if(this.disabled) return;
            this.$emit('input', this.localValue, e)
      },
      click(v,e){
         if(this.disabled) return;
         this.$emit('click', v,e)
      }
    }
  }
</script>