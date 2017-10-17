<style lang="scss">
  @import '../style/vars';
  .admin-checkbox {
    display: inline-block;
    .admin-checkbox-sub {
      margin-right: 8px;
    }
    .admin-checkbox-label {
      display: inline-block;
      margin-right: 24px;
    }
    .admin-checkbox-text {
      color: $grayDarken35;
    }
    .admin-checkbox-label-text {
      margin-bottom: 8px;
      font-size: $small;
      color: $grayDarken25;
    }
  }
  .admin-checkbox.warning {
    .admin-checkbox-warning {
      margin-top: 6px;
      font-size: $small;
      color: $danger;
    }
    input:checked + .admin-checkbox-core {
      background-color: $danger;
    }
    input:not(:checked) + .admin-checkbox-core {
      border-color: $danger;
    }
  }
  .admin-checkbox.disabled {
    .admin-checkbox-label-text, .admin-checkbox-text {
      cursor: not-allowed;
    }
  }
</style>
<template>
  <div class="admin-checkbox" :class="classes">
    <div class="admin-checkbox-label-text" v-if="label">{{ label }}</div>
    <label v-if="!checkboxes.length" class="admin-checkbox-label">
      <input
        type="checkbox"
        class="admin-checkbox"
        v-model="localValue"
        @change="change($event)"
        @input="input"
        @focus="focus"
        @blur="blur"
        :disabled="disabled">
      <span class="admin-checkbox-sub admin-checkbox-core"></span>
      <span class="admin-checkbox-text">{{ text }}</span>
    </label>
    <label v-for="checkbox in checkboxes" class="admin-checkbox-label">
      <input type="checkbox"
      class="admin-checkbox"
      :value="checkbox.value"
      v-model="localValue"
      @change="change($event)"
      @input="input"
      @focus="focus"
      @blur="blur"
      :disabled="disabled">
      <span class="admin-checkbox-sub admin-checkbox-core"></span>
      <span class="admin-checkbox-text">{{ checkbox.text }}</span>
    </label>
    <div class="admin-checkbox-warning" v-for="warning in warnings">{{ warning }}</div>
    <div class="admin-checkbox-warning" v-for="warning in localWarnings">{{ warning }}</div>
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
    name: 'admin-checkbox',
    mixins: [localValidatorMixin, standardFormApiMixin],
    props: {
      text: {
        type: String
      },
      value: {
        type: [Boolean, Array],
        required: true
      },
      checkboxes: {
        type: Array,
        default () {
          return []
        }
      }
    },
    methods: {
      change (e) {
        this.$emit('change', this.localValue, e)
        this.input()
      }
    }
  }
</script>