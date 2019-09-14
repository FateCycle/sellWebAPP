<template>
  <div class="title">
    <div class="line"></div>
    <div class="text">{{message}}</div>
    <div class="line"></div>
  </div>
</template>

<script>
export default {
  props: ['message'],
  data() {
    return {}
  }
}
</script>
<style lang='stylus' type='stylesheet/stylus'>
.title
  display: flex;
  .line
    position: relative;
    flex: 1;
    top: -6px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  .text
    padding: 0 12px;
    font-size: 14px;
    font-weight: 700;
</style>
