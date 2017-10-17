<style lang="scss">
  @import '../style/vars';
  .admin-radio {
    display: inline-block;
    .admin-radio-core {
      margin-right: 8px;
    }
    .admin-radio-label {
      display: inline-block;
      margin-right: 24px;
    }
    .admin-radio-label-text {
      margin-bottom: 8px;
      font-size: $small;
      color: $grayDarken25;
    }
  }
  .admin-radio.admin-form-warning {
    .admin-radio-warning {
      margin-top: 6px;
      font-size: $small;
      color: $danger;
    }
    input:checked + .admin-radio-core {
      border-color: $danger;
    }
    input:checked + .admin-radio-core:before {
      background-color: $danger;
    }
    input:not(:checked) + .admin-radio-core {
      border-color: $danger;
    }
  }
  .admin-form.disabled {
    .admin-radio-label-text, .admin-radio-text {
      cursor: not-allowed;
    }
  }
</style>
<template>
  <div class="admin-radio" :class="classes">
    <div class="admin-radio-label-text" v-if="label">{{ label }}</div>
    <label v-for="radio in radios" class="admin-radio-label">
      <input type="radio" class="admin-radio" :value="radio.value" v-model="localValue" @change="input" :disabled="disabled">
      <span class="admin-radio-sub admin-radio-core"></span>
      <span class="admin-radio-text">{{ radio.text }}</span>
    </label>
    <div class="admin-radio-warning" v-for="warning in warnings">{{ warning }}</div>
    <div class="admin-radio-warning" v-for="warning in localWarnings">{{ warning }}</div>
  </div>
</template>
<script>
  // Author: Awey
  // email: chenwei@rongcapital.cn
  // github: https://github.com/BboyAwey
  // blog: http://www.jianshu.com/u/3c8fe1455914

  // Modifier:

  import localValidatorMixin from '../helpers/local-validator-mixin'
  import standardFormApiMixin from '../helpers/standard-form-api-mixin'
  export default {
    name: 'admin-radio',
    mixins: [localValidatorMixin, standardFormApiMixin],
    props: {
      radios: {
        type: Array,
        required: true
      }
    }
  }
</script>