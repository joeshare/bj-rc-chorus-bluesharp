<style lang="scss">
  @import '../../admin-ui/style/ionicons/ionicons.css';
  @import '../../admin-ui/style/vars';
  .admin-paginator {
    display: inline-block;
    user-select: none;
    & > ul:after {
      content: "";
      display: block;
      clera: both;
    }
    & > ul > li {
      float: left;
      width: 40px;
      height: 32px;
      border-top: 1px solid $grayBrighten15;
      border-bottom: 1px solid $grayBrighten15;
      border-right: 1px solid $grayBrighten15;
      line-height: 32px;
      text-align: center;
      font-size: $small;
      color: $grayDarken25;
    }
    & > ul > .ellipsis{
      border: none;
      border-right: 1px solid $grayBrighten15;
    }
    & > ul > .active{
      background-color: $primary;
      color: #fff;
      border: none;
    }
    & > ul > .disabled{
      background-color: $grayBrighten20;
      color: $grayBrighten10;
      cursor: not-allowed;
    }
    & > ul > li:not(.active):not(.disabled):not(.ellipsis):hover{
      background-color: $grayBrighten20;
      color: $primary;
      cursor: pointer;
    }
    & > ul > li:first-child {
      border-left: 1px solid $grayBrighten15;
      border-top-left-radius: 2px;
      border-bottom-left-radius: 2px;
    }
    & > ul > li:last-child {
      border-top-right-radius: 2px;
      border-bottom-right-radius: 2px;
    }
  }
</style>
<template lang="html">
  <div class="admin-paginator">
    <ul>
     <li :class="{disabled: curPage <= 1 }" @click="prevPage" v-if="_pageCount() >= 0"><i class="ion-chevron-left"></i></li>
     <!-- 总数小等于 0-->
     <li  attr="ion-more-1" :class="{active: curPage == 1}" v-if="_pageCount()<=0" @click="page(1)">1</li>
     <!-- 总数大于等于 0 且小于等10-->
     <li :class="{active: curPage == index}" v-show="_pageCount() > 0 && _pageCount() <= 10" v-for="index in _pageCount()" @click="page(index)">{{index}}</li>
     <!-- 总数大于 10-->
     <li  attr="ion-more-1" :class="{active: curPage == 1}" v-if="_pageCount() > 10 " @click="page(1)">1</li>
     <li attr="ion-more-left" class="ellipsis " v-show="_offset()>1 && _pageCount() > 10"><i class="ion-more"></i></li>
     <li :class="{active: curPage == _cPage(index)}" v-show="(_cPage(index) <= _limit() ) && _pageCount() > 10" v-for="index in _limit()" @click="page(_cPage(index))">{{_cPage(index)}}</li>
     <li attr="ion-more-right" class="ellipsis" v-show="(_limit() < _pageCount() - 1) && _pageCount() > 10"><i class="ion-more"></i></li>
     <li attr="pageCount"  :class="{active: curPage == _pageCount()}" @click="page(_pageCount())" v-if="_pageCount() > 10">{{_pageCount()}}</li>
     <li :class="{disabled: curPage >= _pageCount() }" @click="nextPage" v-if="_pageCount() >=0"><i class="ion-chevron-right"></i></li>
     </ul>
  </div>
</template>
<script>
  // Author: Bearhotel
  // email: lilijing@rongcapital.cn
  // github:
  // blog:

  // Modifier: Awey
  // email: chenwei@rongcapital.cn
  // github: https://github.com/BboyAwey
  // blog: http://www.jianshu.com/u/3c8fe1455914

  export default {
    props: {
      totalCount: {
        type: Number,
        default: 0
      },
      currentPage: {
        type: Number,
        default: 1
      },
      pageSize: {
        type: Number,
        default: 10
      }
    },
    data () {
      return {
        middleLimit: 6,
        showPageNum: 10,
        curPage: 1,
        totalC: 0,
        pageS: 10
      }
    },
    created () {
      var pc = 1
      if (this.totalCount > 0 && this.pageSize > 0) {
        pc = Math.ceil(this.totalCount / this.pageSize)
      }
      if (pc < this.currentPage) {
        this.curPage = pc
      } else {
        this.curPage = this.currentPage
      }
      this.totalC = this.totalCount
      this.pageS = this.pageSize
    },
    computed: {
      _newMiddleLimit () {
        return this.curPage + 3
      }
    },
    watch: {
      totalCount (val) {
        this.totalC = val > 0 ? val : 0
      },
      currentPage (val) {
        this.curPage = val > this.totalC ? this.totalC || 1 : val
      },
      pageSize (val) {
        this.pageS = val
        this._currentPage = val > this.totalC ? this.totalC || 1 : val
      }
    },
    methods: {
      _offset () {
        var v = this.curPage + 3 - this.middleLimit
        var r = 1
        if (v > 1 && this._pageCount() - v <= this.middleLimit) {
          r = this._pageCount() - this.middleLimit
        } else if (v > 1 && this._pageCount() - v > this.middleLimit) {
          r = v
        }
        return r
      },
      _limit () {
        var c = 0
        if (this._newMiddleLimit <= this.middleLimit) {
          c = this.middleLimit
        } else if (this._newMiddleLimit > this._pageCount() - 1) {
          c = this._pageCount() - 1
        } else {
          c = this._newMiddleLimit
        }
        return c
      },
      _cPage (p) {
        return p + this._offset()
      },
      _pageCount () {
        return Math.ceil(this.totalCount / this.pageSize)
      },
      page (indexPage) {
        this.$emit('toggle-page', indexPage)
        this.curPage = indexPage
      },
      nextPage () {
        if (this.curPage < this.totalC) {
          this.page(this.curPage + 1)
        }
      },
      prevPage () {
        if (this.curPage > 1) {
          this.page(this.curPage - 1)
        }
      }

    }
  }
</script>

