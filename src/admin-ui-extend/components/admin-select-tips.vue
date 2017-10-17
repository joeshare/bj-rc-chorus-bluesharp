<template>
  <div class="admin-select" :class="classes">
    <div class="admin-select-label-text" @click="labelClick" v-if="label" @click.stop="()=>{}">{{ label }}</div>
    <div class="admin-select-core-container" @blur="blur" @focus="focus" @click="click" ref="coreContainer" tabindex="0">
      <div id="test" class="admin-select-core" ref="core">
        {{ placeholderText }}
        <span class="admin-select-arrow" :class="optionDisplay ? 'admin-select-arrow-active' : ''">
          <admin-icon type="ion-android-arrow-dropdown"></admin-icon>
        </span>
      </div>
      <ul class="admin-select-option-container" :style="{display:optionDisplay?'block':'none'}" ref="options">
        <li v-for="option in options" @click.stop="select(option)" :class="option.value==localValue?'selected':''" :title="option.tips">{{ option.text }}</li>
      </ul>
    </div>
    <div class="admin-select-warning" v-for="warning in warnings">{{ warning }}</div>
    <div class="admin-select-warning" v-for="warning in localWarnings">{{ warning }}</div>
  </div>
</template>
<script>
  //==========
  //  带提示功能
  //==========
  // Author: Awey
  // email: chenwei@rongcapital.cn
  // github: https://github.com/BboyAwey
  // blog: http://www.jianshu.com/u/3c8fe1455914

  // Modifier:

  import localValidatorMixin from 'adminUI/helpers/local-validator-mixin'
  import standardFormApiMixin from 'adminUI/helpers/standard-form-api-mixin'
  import adminIcon from 'adminUI/components/admin-icon'
  export default {
    name: 'admin-select-tips',
    mixins: [localValidatorMixin, standardFormApiMixin],
    components: {
      adminIcon
    },
    created () {
      let { options, localValue } = this
      for (let i = 0; i < options.length; i++) {
        if (options[i].value === localValue) {
          this.placeholderText = options[i].text
          break
        }
      }
    },
    destroyed () {
      window.document.body.removeEventListener('click', 'adSelectHide')
    },
    data () {
      return {
        optionDisplay: false,
        placeholderText: this.placeholder
      }
    },
    props: {
      placeholder: {
        type: String,
        default: '请选择'
      },
      options: {
        type: Array,
        required: true
      }
    },
    watch: {
      localValue (v) {
        let options = this.options
        for (let i = 0; i < options.length; i++) {
          if (options[i].value === v) {
            this.placeholderText = options[i].text
            this.change()
            this.input()
            return false
          }
        }
      }
    },
    methods: {
      labelClick () {
        if (this.disabled) return false
        this.$refs.coreContainer.focus()
        this.showOptions()
      },
      click () {
        if (this.disabled) return false
        this.toggleOptions()
      },
      blur () {
        this.hideOptions()
      },
      showOptions () {
        this.optionDisplay = true
      },
      hideOptions () {
        this.optionDisplay = false
      },
      toggleOptions () {
        this.optionDisplay = !this.optionDisplay
      },
      select (option) {
        this.localValue = option.value
        this.placeholderText = option.text
        this.optionDisplay = false
        this.$emit('select', option)
      }
    }
  }
</script>