<style lang="scss">
   @import '../../admin-ui/style/vars.scss';
  .admin-select-menu {
    position: relative;
    display: inline-block;
    width: 26px;
    height: 26px;
    line-height:26px;
    text-align:center;
  }

  .admin-select-menu-core-container {
    position: relative;
    height: 26px;
    outline: none;
  }
  .admin-select-menu-core {
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
  .admin-select-menu:not(.disabled) .admin-select-menu-core-container:focus {
    .admin-select-core {
      border-color: $info;
      box-shadow: 0 0 4px $info;
    }
  }

  .admin-select-menu-option-container {
    position: absolute;
    z-index: 9990;
    top: 30px;
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
      cursor: not-allowed;
    }
    & > .selected {
      background-color: $primary;
      color: #fff;
    }
  }


  .admin-select-menu.admin-form-small {
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
</style>
<template>
  <div class="admin-select-menu" :class="classes">
    <div class="admin-select-menu-core-container" @blur="blur" @focus="focus" @click="click" ref="coreContainer" tabindex="0">
      <admin-icon type="ion-android-more-vertical chorus-pointer" ></admin-icon>
      <ul class="admin-select-menu-option-container" :style="{display:optionDisplay?'block':'none'}" ref="options">
        <li v-for="option in options" @click.stop="select(option)" :class="[option.value==localValue&&option.disabled!==true?'selected':'',option.disabled===true?'disabled':'']">{{ option.text }}</li>
      </ul>
    </div>
  </div>
</template>
<script>

  import localValidatorMixin from 'adminUI/helpers/local-validator-mixin'
  import standardFormApiMixin from 'adminUI/helpers/standard-form-api-mixin'
  import adminIcon from 'adminUI/components/admin-icon'
  export default {
    name: 'admin-select-menu',
    mixins: [localValidatorMixin, standardFormApiMixin],
    components: {
      adminIcon
    },
    created () { },
    destroyed () {
      window.document.body.removeEventListener('click', 'adSelectHide')
    },
    mounted(){
          var ul = this.$refs.options;
          console.log(ul)
          console.log(this.dir)
          if (ul) {
            this.dir=='left'?(ul.style['left']='0px'):(ul.style['right']='0px')
          }
    },
    data () {
      return {
        optionDisplay: false
      }
    },
    props: {
      options: {
        type: Array,
        required: true
      },
      dir: {
         type: String,
         default: 'left'
      }
    },
    watch: {
      localValue (v) {
        let options = this.options
        for (let i = 0; i < options.length; i++) {
          if (options[i].value === v) {
            this.change()
            this.input()
            return false
          }
        }
      }
    },
    methods: {
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
        this.$emit('select', option)
        if(option.disabled===true) return false;
        this.optionDisplay = false

      }
    }
  }
</script>