<style lang="scss">
  @import '../../admin-ui/style/vars.scss';
  .admin-select {
    position: relative;
    display: inline-block;
    width: 198px;
  }
  .admin-select-label-text {
    font-size: $small;
    margin-bottom: 8px;
    color: $grayDarken25;
  }
  .admin-select-core-container {
    position: relative;
    height: 32px;
    outline: none;
  }
  .admin-select-core {
    position: relative;
    display: inline-block;
    border-radius: 2px;
    border: 1px solid $grayBrighten5;
    padding: 0 8px;
    padding-right: 26px;
    width: 100%;
    line-height: 30px;
    word-break: keep-all;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-family: $fontFamily;
    color: $grayDarken35;
    font-size: $normal;
    outline: none;
    user-select: none;
    cursor: default;
  }
  .admin-select-arrow {
    display: inline-block;
    position: absolute;
    height: 24px;
    top: 0;
    right: 8px;
    font-size: 20px;
  }
  .admin-select:not(.disabled) .admin-select-core-container:focus {
  .admin-select-core {
    border-color: $info;
    box-shadow: 0 0 4px $info;
  }
  }
  .admin-select-arrow-active {
    color: $info;
  }
  .admin-select-option-container {
    position: absolute;
    z-index: 9990;
    top: 36px;
    border: 1px solid $grayBrighten5;
    border-radius: 2px;
    padding: 4px 0;
    min-width: 84px;
    width: 100%;
    box-shadow: $shadowLevel3;
    display: none;
    background-color: #fff;
  & > li {
        height: 28px;
        padding: 0 8px;
        line-height: 28px;
        font-size: $normal;
        color: $grayDarken35;
        word-break: keep-all;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        user-select: none;
        cursor: default;
        color: $grayDarken35;
      }
  & > li:not(.selected):hover {
        background-color: $grayBrighten15;
      // background-color: $primary;
      // color: #fff;
      }
  & > .disabled {
        color: $grayBrighten5;
      }
  & > .selected {
        background-color: $primary;
        color: #fff;
      }
  }
  .admin-select.admin-form-warning {
  .admin-select-core {
    border-color:  $danger;
  }

  .admin-select-warning {
    margin-top: 6px;
    font-size: $small;
    color: $danger;
  }
  .admin-select-arrow-active {
    color: $danger;
  }
  }
  .admin-select.admin-form-warning:not(.disabled) .admin-select-core-container:focus {
  .admin-select-core {
    border-color:  $danger;
    box-shadow: 0 0 4px  $danger;
  }
  }
  .admin-select.admin-form-small {
  .admin-select-core-container {
    height: 26px;
  }
  .admin-select-core {
    height: 26px;
    line-height: 24px;
  }
  .admin-select-option-container {
    top: 28px;
  li {
    height: 22px;
    padding: 0 8px;
    line-height: 22px;
    font-size: $small;
  }
  }
  }
  .admin-form-disabled .admin-select-core, .admin-form-disabled .admin-select-label-text {
    cursor: not-allowed;
  }
  .admin-form-disabled .admin-select-core {
    background-color: $grayBrighten20;
  }
</style>
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
        <li v-for="option in options" @click.stop="select(option)" :class="option.value==localValue?'selected':''">{{ option.text }}</li>
      </ul>
    </div>
    <div class="admin-select-warning" v-for="warning in warnings">{{ warning }}</div>
    <div class="admin-select-warning" v-for="warning in localWarnings">{{ warning }}</div>
  </div>
</template>
<script>
  // Author: Awey
  // email: chenwei@rongcapital.cn
  // github: https://github.com/BboyAwey
  // blog: http://www.jianshu.com/u/3c8fe1455914

  // Modifier:

  import adminIcon from 'adminUI/components/admin-icon'
  import localValidatorMixin from 'adminUI/helpers/local-validator-mixin'
  import standardFormApiMixin from 'adminUI/helpers/standard-form-api-mixin'
  export default {
    name: 'admin-select',
    mixins: [localValidatorMixin, standardFormApiMixin],
    components: {
      adminIcon
    },
    created () {
      let { options, localValue } = this
      for (let i = 0; i < options.length; i++) {

        if(Object.prototype.toString.call(localValue)=='[object Object]')
        {
          if (JSON.stringify(options[i].value) == JSON.stringify(localValue)) {
            this.placeholderText = options[i].text
            break
          }
        }
        else{
          if (options[i].value == localValue) {
            this.placeholderText = options[i].text
            break
          }

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
          if(Object.prototype.toString.call(v)=='[object Object]')
          {
            if (JSON.stringify(options[i].value) == JSON.stringify(v)) {
              this.placeholderText = options[i].text
              this.change()
              this.input()
              return false
              break
            }
          }
          else{
            if (options[i].value == v) {
              this.placeholderText = options[i].text
              this.change()
              this.input()
              return false
              break
            }
          }
        }
        if(options.length==0){
          this.placeholderText =this.placeholder;
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