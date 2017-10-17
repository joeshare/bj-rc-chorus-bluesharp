<style lang="scss">
  .admin-prompt {
    padding-bottom: 4px;
  }
  .admin-prompt-message {
    margin-bottom: 16px;
  }
  .admin-prompt-core-container {
    padding: 0 2px;
    .admin-prompt-core {
      width: 100%;
      input {
        width: 100%;
      }
      .admin-input-container {
        width: 100%;
      }
    }
  }
</style>
<template>
  <div class="admin-prompt">
    <div class="admin-prompt-message">{{ message }}</div>
    <div class="admin-prompt-core-container">
      <admin-input class="admin-prompt-core" v-model="value" :warnings="warnings" @input="validate" ref="core"></admin-input>
    </div>
  </div>
</template>
<script>
  // Author: Awey
  // email: chenwei@rongcapital.cn
  // github: https://github.com/BboyAwey
  // blog: http://www.jianshu.com/u/3c8fe1455914

  // Modifier:

  import AdminInput from '../../admin-input'
  export default {
    name: 'admin-prompt',
    data () {
      return {
        value: '',
        warnings: null
      }
    },
    props: {
      message: String,
      required: '',
      trigger: Boolean,
      validator: Object
    },
    components: {
      AdminInput
    },
    methods: {
      validate (v) {
        if (!this.validator) return true
        if (this.validator.validate && typeof this.validator.validate === 'function') {
          if (this.validator.validate(v)) {
            this.warnings = null
            return true
          } else {
            this.warnings = [this.validator.warning]
            return false
          }
        }
      }
    }
  }
</script>
