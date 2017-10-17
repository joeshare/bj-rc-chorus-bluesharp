<template>
  <div class="admin-input" :class="classes">
    <div class="admin-input-label-text" v-if="label"  @click.stop="labelClick()">{{ label }}</div>
    <textarea
      v-if="type==='textarea'"
      class="admin-input-core"
      :maxlength="maxlength"
      :class="small?'small':''"
      v-model="localValue"
      :disabled="disabled"
      :placeholder="placeholder"
      @input="input($event)"
      @change="change($event)"
      @focus="focus($event)"
      @blur="blur($event)"
      @keyup="keyup($event)"
      @keypress="keypress($event)"
      @keydown="keydown($event)"
      ref="core"></textarea>
    <span class="admin-input-container" v-else>
      <i v-if="iconClass" class="admin-input-icon" :class="iconClass"></i>
      <input
        class="admin-input-core"
        type="text"
        :maxlength="maxlength"
        v-if="type === 'text'"
        :class="small?'small':''"
        v-model="localValue"
        :disabled="disabled"
        :placeholder="placeholder"
        @click.stop="click($event)"
        @input="input($event)"
        @change="change($event)"
        @focus="focus($event)"
        @blur="blur($event)"
        @keyup="keyup($event)"
        @keypress="keypress($event)"
        @keydown="keydown($event)"
        ref="core">
      <input
        class="admin-input-core"
        type="number"
        :maxlength="maxlength"
        v-if="type === 'number'"
        :class="small?'small':''"
        v-model="localValue"
        :disabled="disabled"
        :placeholder="placeholder"
        @click.stop="click($event)"
        @input="input($event)"
        @change="change($event)"
        @focus="focus($event)"
        @blur="blur($event)"
        @keyup="keyup($event)"
        @keypress="keypress($event)"
        @keydown="keydown($event)"
        ref="core">
      <input
        class="admin-input-core"
        type="password"
        :maxlength="maxlength"
        v-if="type === 'password'"
        :class="small?'small':''"
        v-model="localValue"
        :disabled="disabled"
        :placeholder="placeholder"
        @click.stop="click($event)"
        @input="input($event)"
        @change="change($event)"
        @focus="focus($event)"
        @blur="blur($event)"
        @keyup="keyup($event)"
        @keypress="keypress($event)"
        @keydown="keydown($event)"
        ref="core">
      <ul class="admin-input-associations-container" v-show="associationsShow" ref="associations">
        <li v-for="association in associations" @click.stop="selectAssociation(association)">{{ association }}</li>
      </ul>
    </span>
    <div class="admin-input-warning" v-for="warning in warnings">{{ warning }}</div>
    <div class="admin-input-warning" v-for="warning of localWarnings">{{ warning }}</div>
  </div>
  
</template>
<script>
  //==========
  //  增强版 增加了maxlength
  //==========
  // Author: Awey
  // email: chenwei@rongcapital.cn
  // github: https://github.com/BboyAwey
  // blog: http://www.jianshu.com/u/3c8fe1455914

  // Modifier:
  import '../../admin-ui/style/ionicons/ionicons.css'
  import localValidatorMixin from 'adminUI/helpers/local-validator-mixin'
  import standardFormApiMixin from 'adminUI/helpers/standard-form-api-mixin'
  export default {
    name: 'admin-input-edit',
    mounted () {
      let vm = this
      window.document.addEventListener('click', function adAssociationsHide () {
        vm.associationsShow = false
      })
    },
    destroyed () {
      window.document.removeEventListener('click', 'adAssociationsHide')
    },
    data () {
      return {
        // is the throttlling on
        throttlling: true,
        associationsShow: false
      }
    },
    mixins: [localValidatorMixin, standardFormApiMixin],
    props: {
      maxlength:{
        type: String
      },
      type: {
        type: String,
        default: 'text'
      },
      placeholder: {
        type: String,
        default: '请输入'
      },
      associations: Array,
      iconClass: String
    },
    watch: {
      associations (v) {
        this.toggleAssociations(true)
      }
    },
    methods: {
      keyup (e) { this.$emit('keyup', e.target.value, e) },
      keypress (e) { this.$emit('keypress', e.target.value, e) },
      keydown (e) { this.$emit('keydown', e.target.value, e) },
      click (e) {
        this.$emit('click', e.target.value, e)
      },
      labelClick () {
        this.$refs.core.focus()
      },
      toggleAssociations (v) {
        if (v) this.associationsShow = !!this.associations
        else this.associationsShow = false
      },
      selectAssociation (v) {
        this.localValue = v
        this.input()
        this.toggleAssociations(false)
      }
    }
  }
</script>