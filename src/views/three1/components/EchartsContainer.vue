<template>
  <div>
    <div class="top d-flex jc-between ai-center text-white">
      <div class="flex-1 text-center">
        <h2>XXX数字工厂</h2>
      </div>
        <img @click="$emit('hideLeft')"  style="width: 60px;height: 40px;cursor: pointer" src="https://wimg.588ku.com/gif620/20/06/13/2723705efd380bee86a8d06ff375ec00.gif" alt="">
    </div>
    <dv-decoration-6 style="width:90%;height:10px;" />

    <div style="width: 100%;height: 300px;">
      <dv-border-box-11 :title="desc || '默认值'">
        <Chart1></Chart1>
      </dv-border-box-11>
    </div>

    <div style="width: 100%;height: 220px;">
      <dv-border-box-1>
        <Charts2></Charts2>
      </dv-border-box-1>
    </div>

    <div class="d-flex" style="width: 100%;height: 150px;">
      <div class="charts3" style="width: 50%;height: 100%">
        <dv-border-box-8>
          <dv-water-level-pond :config="{data:[66,45],shape: 'roundRect'}" style="width:90%;height:120px" />
        </dv-border-box-8>
      </div>
      <div class="" style="width: 50%;height: 100%">
        <dv-border-box-9>
          <dv-active-ring-chart :config="pie" style="width:100%;height:100%" />
        </dv-border-box-9>
      </div>
    </div>


  </div>
</template>

<script>
import Chart1 from './charts/Charts1'
import Charts2 from "./charts/Charts2";
// import Chart1 from '../../Chart/center'
export default {
  name: "EchartsContainer",
  data() {
    return {
      pie:{
        radius: '70%',
        activeRadius: '75%',
        data: [
          {
            name: '数据1',
            value: 55
          },
          {
            name: '数据2',
            value: 120
          },
          {
            name: '数据3',
            value: 78
          },
          {
            name: '数据4',
            value: 66
          },
          {
            name: '数据5',
            value: 80
          }
        ],
        lineWidth: 10
      }
    }
  },
  props:['desc'],
  components:{
    Charts2,
    Chart1
  },
  methods: {},

}
</script>

<style scoped>
>>> .charts3 .border-box-content{
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
}
</style>
