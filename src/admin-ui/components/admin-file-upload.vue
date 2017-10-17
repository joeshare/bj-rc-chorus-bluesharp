<style lang="scss">
  @import '../style/vars';
  .admin-plain:hover i{
    color: #fff!important;
  }
  .admin-file-upload-text {
    user-select: none;
    padding-left: 8px;
    float:right;
  }
  .admin-file-upload-input {
    position: absolute;
    width: 0;
    height: 0;
    opacity: 0;
    visibility: hidden;
    top: 0;
    left: 0;
    padding: 0;
    border: 0;
    display: inline;
    
  }
  .admin-file-upload-name-list {
    width: 80%;
    ul {
      padding-top: 20px;
      padding-left: 16px;
    }
    li {
      display: inline;
      margin-right: 16px;
      span {
        padding: 0 8px;
        color: $grayDarken35;
      }
      i:first-child {
        position: relative;
      }
      i:last-child {
        cursor: pointer;
        position: relative;
        top: 1.5px;
      }
    }
  }
  .admin-file-label-text {
    margin-bottom: 8px;
    font-size: 12px;
    color: $grayDarken25;
  }
  .admin-file-warning {
    margin-top: 6px;
    font-size: 12px;
    color: $danger;
  }
  .admin-file-upload-area, .admin-file-upload-name-list {
    float: left;
  }
  .admin-file-upload:after {
    content: '';
    clear: both;
    display: block;
  }
  .admin-file-warning {
    clear: both;
    margin-top: 0;
    padding-top: 6px;
  }
</style>
<template>
  <div>
    <div class="admin-file-upload">
      <div class="admin-file-upload-area">
        <div class="admin-file-label-text" v-if="label">{{ label }}</div>
        <button class="admin-plain" :class="{'admin-small': small, 'admin-danger': warnings || (validators && flag)}" @click="openFolder">
          <admin-icon v-if="iconClass && !small" :type="iconClass" :color='warnings || (validators && flag)? "#f35555":"#0e9ee2"' size="18px"></admin-icon>
          <admin-icon v-else-if='iconClass && small' :type="iconClass" :color='warnings || (validators && flag)? "#f35555":"#0e9ee2"' size="14px"></admin-icon>
          <i class="admin-file-upload-text">{{text}}</i> 
          <input type="file" ref="fileInput" :accept="accept"  :multiple="multiple" @change="fileSelected($event)" class="admin-file-upload-input">
        </button>
      </div>
      <div class="admin-file-upload-name-list" v-if="fileList.length > 0" :class="{'admin-file-upload-absolute': 'label'}">
        <ul>
          <li v-for="(item, index) in fileList">
            <admin-icon v-if="small" type="ion-android-attach" size='10px'></admin-icon>
            <admin-icon v-else  type="ion-android-attach" size='15px'></admin-icon>
            <span v-if="small" style="font-size: 12px">{{item.name}}</span>
            <span v-else style="font-size: 14px">{{item.name}}</span>
            <admin-icon v-if="small" type="ion-android-close" size='11px' @click.native="splicefileList(index)"></admin-icon>
            <admin-icon v-else  type="ion-android-close" size='16px' @click.native="splicefileList(index)"></admin-icon>
          </li>
        </ul>
      </div>
      <div class="admin-file-warning" v-for="warning in warnings">{{ warning }}</div>
      <div class="admin-file-warning" v-for="warning in localWarnings">{{ warning }}</div>
    </div>
  </div>
</template>
<script>
import localValidatorMixin from '../helpers/local-validator-mixin'
import standardFormApiMixin from '../helpers/standard-form-api-mixin'
import adminIcon from './admin-icon'
standardFormApiMixin.props.value.required = false
export default {
  name: 'admin-file-upload',
  mixins: [localValidatorMixin, standardFormApiMixin],
  props: {
    iconClass: String,
    accept: String,
    multiple: String,
    text: String
  },
  data () {
    return {
      flag: false,
      throttlling: true,
      fileList: []
    }
  },
  watch: {
    value (v) {
      this.fileList = v
    },
    fileList: {
      deep: true,
      handler (v) {
        this.$emit('change', v)
        this.$emit('input', v)
      }
    }
  },
  components: {
    adminIcon
  },
  methods: {
    openFolder () {
      this.$refs.fileInput.click()
      this.$refs.fileInput.value = ''
    },
    fileSelected (e) {
      this.fileList = this.fileList.concat(Array.prototype.slice.call(e.target.files))
      if (this.flag) {
        this.flag = false
      }
    },
    splicefileList (index) {
      this.fileList.splice(index, 1)
      if (this.fileList.length === 0) {
        this.flag = true
      }
    }
  }
}
</script>
