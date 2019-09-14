<template>
  <div class="rateingselect">
    <div class="rating-type">
      <span class='block positive' :class='{active:selectType===2}'
      @click='select(2,$event)'
      >{{desc.ALL}}<span class='count'>{{ratings.length}}</span>
      </span>
      <span class='block positive' :class='{active:selectType===0}'
       @click='select(0,$event)'>{{desc.POSITIVE}}<span class='count'>{{positives.length}}</span>
      </span>
      <span class='block negative' :class='{active:selectType===1}'
       @click='select(1,$event)'>{{desc.NEGATIVE}}<span class='count'>{{negatives.length}}</span>
      </span>
    </div>
    <div class="switch" :class='{on:onlyContent}' @click='toggleContent'>
      <span class="icon-check_circle"></span>
      <span class="text">只看有内容的评价</span>
    </div>
  </div>
</template>

<script>
/* eslint-disable no-unused-vars */
const POSITIVE = 0
const NEGATIVE = 1
const ALL = 2
export default {
  props: {
    ratings: {
      type: Array,
      default() {
        return []
      }
    },
    selectType: {
      type: Number,
      default: ALL
    },
    onlyContent: {
      type: Boolean,
      default() {
        return false
      }
    },
    desc: {
      type: Object,
      default() {
        return {
          ALL: '全部',
          POSITIVE: '满意',
          NEGATIVE: '不满意'
        }
      }
    }
  },
  data() {
    return {}
  },
  computed: {
    positives() {
      return this.ratings.filter(elem=>{
        return elem.rateType === 0
      })
    },
    negatives() {
      return this.ratings.filter(elem=>{
        return elem.rateType === 1
      })
    }

  },
  methods: {
    select(tag,e) {
      if (!e._constructed){
        return
      }
      this.$emit('select',tag)
    },
    toggleContent(e) {
      if (!e._constructed) {
        return
      }
      this.$emit('toggle')
    }
  }
}
</script>
<style lang='stylus' style='stylesheet'>
@import '../../common/stylus/index.stylus'
.rateingselect
  .rating-type
    padding-top: 18px
    margin-left: 18px
    border-1px(rgba(7,17,27,0.1))
    font-size: 0
    .block
      display: inline-block
      padding 8px 12px
      border-radius: 2px
      margin-right: 8px
      font-size: 12px
      line-height: 16px
      color: rgb(77,85,93)
      &.active
        color: rgb(255,255,255)
      .count
        font-size: 8px
        margin-left: 2px
      &.positive
        background-color: rgba(0,160,220,0.2)
        &.active
          background-color : rgb(0,160,220)
      &.negative
        background-color: rgba(77,85,93,0.2)
        &.active
          background-color: rgb(77,85,93)
  .switch
    padding: 12px 18px
    line-height: 24px
    color: rgb(147,153,159)
    border-bottom: 1px solid rgba(7,17,27,0.1)
    &.on
      .icon-check_circle
        color: #00c850
    .icon-check_circle
      display: inline-block
      vertical-align: top
      margin-right: 4px
      font-size: 24px
    .text
      display: inline-block
      vertical-align: top
      font-size: 12px
</style>
