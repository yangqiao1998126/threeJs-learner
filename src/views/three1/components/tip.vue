<template>
  <div class="tip" :style="_style">
    <span class="message">{{desc}}</span>
  </div>
</template>

<script>
export default {
  name: "tip",
  props:['_style','desc'],
  data() {
    return {}
  },
  methods: {},

}
</script>

<style lang="scss" scoped>
.tip {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 200px;
  height: 50px;
  transform: translateY(-100%);
  background: url(../../../assets/tip.png) center/100% no-repeat;
  .message {
    position: absolute;
    top: 8px;
    left: 130px;
    transform: translateX(-50%);
    color: white;
  }
}
</style>
