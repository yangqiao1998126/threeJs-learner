<template>
  <div class="camera" id="camera">
    <div class="space">
      <p class="front" ></p>
      <p class="left" ></p>
      <p class="bottom" ></p>
    </div>
  </div>
</template>

<script>
export default {
  name: "test",
  data() {
    return {}
  },
  methods: {},

}
</script>

<style scoped>
*{
  margin: 0;
  padding: 0;
}
.camera {
  perspective: 912px;
  perspective-origin:50% 50%;
}
.space {
  width: 912px;
  height: 480px;
  margin: 0 auto;
  transform-style: preserve-3d;
}
.space p {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
}
.space .front {
  /* 正面的图无需旋转 */
  background: #1a5cd7;
  transform: rotateZ(0) rotateY(0) rotateZ(0) translateZ(-480px);
}
.space .left {
  /*background: #ffc107;*/
  /*transform: rotateY(90deg) translateZ(-240px);*/
}
.space .bottom {
  /*background: #ff5722;*/
  /*transform: rotateX(90deg) translateZ(-240px);*/
}

</style>
