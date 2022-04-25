<template>
  <div>
    <div class="top d-flex jc-between ai-center text-white">
      <div class="flex-1 text-center">
        <h2>XXX数字工厂</h2>
      </div>
<!--      https://wimg.588ku.com/gif620/21/12/15/47eba67adf8fcde78c5f47f55d5ee4db.gif-->
        <img @click="$emit('hideLeft')"  style="width: 60px;height: 40px;cursor: pointer" src="https://wimg.588ku.com/gif620/20/06/13/2723705efd380bee86a8d06ff375ec00.gif" alt="">
    </div>
    <dv-decoration-6 style="width:90%;height:10px;" />

    <div style="width: 100%;height: 300px;">
      <dv-border-box-11 title="dv-border-box-11">
        <Chart1></Chart1>
      </dv-border-box-11>
    </div>

    <div style="width: 100%;height: 200px;">
      <dv-border-box-1>
        111
      </dv-border-box-1>
    </div>

    <div class="d-flex" style="width: 100%;height: 160px;">
      <div style="width: 50%;height: 100%">
        <dv-border-box-8>dv-border-box-8</dv-border-box-8>
      </div>
      <div style="width: 50%;height: 100%">
        <dv-border-box-9>dv-border-box-9</dv-border-box-9>
      </div>
    </div>


  </div>
</template>

<script>
import Chart1 from './charts/Charts1'
// import Chart1 from '../../Chart/center'
export default {
  name: "EchartsContainer",
  data() {
    return {}
  },
  components:{
    Chart1
  },
  methods: {},

}
</script>

<style >
/*.border-box-content{*/
/*  display: flex;*/
/*  justify-content: center;*/
/*  align-items: start;*/
/*}*/
.top{

}
</style>
