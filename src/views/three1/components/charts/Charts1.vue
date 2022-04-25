<template>
  <div id="center">
    <div class="up">
      <div v-for="(item,index) in titleItem" :key="index" class="item">
        <p>数据{{ index }}</p>
        <div>
          <dv-digital-flop :config="item.number"/>
        </div>
      </div>
      <dv-scroll-ranking-board :config="ranking" style="width:95%;height:160px;"/>
    </div>
  </div>
</template>

<script>
import CenterChart from '@/components/echart/center/centerChartRate'

export default {
  data() {
    return {
      test: 888,
      titleItem: [
        {
          title: '数量1',
          number: {
            number: [120],
            toFixed: 1,
            textAlign: 'center',
            content: '{nt}个',
            style: {
              fontSize: 20,
              translate: [50, 50]
            }
          }
        },
        {
          title: '数量2',
          number: {
            number: [18],
            toFixed: 1,
            textAlign: 'center',
            content: '{nt}个',
            style: {
              fontSize: 20,
              translate: [20, 20]
            }
          }
        },
        {
          title: '数量3',
          number: {
            number: [2],
            toFixed: 1,
            textAlign: 'center',
            content: '{nt}个',
            style: {
              fontSize: 20,
              translate: [20, 20]
            }
          }
        },

      ],
      ranking: {
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
          },
          {
            name: '数据6',
            value: 80
          },
          {
            name: '数据7',
            value: 80
          },
          {
            name: '数据8',
            value: 80
          },
          {
            name: '数据9',
            value: 80
          },
          {
            name: '数据10',
            value: 80
          }
        ],
        carousel: 'single',
        unit: '人'
      },
      water: {
        data: [24, 45],
        shape: 'roundRect',
        formatter: '{value}%',
        waveNum: 3
      },
      // 通过率和达标率的组件复用数据
      rate: [
        {
          id: 'centerRate1',
          tips: 60,
          colorData: {
            textStyle: '#3fc0fb',
            series: {
              color: ['#00bcd44a', 'transparent'],
              dataColor: {
                normal: '#03a9f4',
                shadowColor: '#97e2f5'
              }
            }
          }
        },
        {
          id: 'centerRate2',
          tips: 40,
          colorData: {
            textStyle: '#67e0e3',
            series: {
              color: ['#faf3a378', 'transparent'],
              dataColor: {
                normal: '#ff9800',
                shadowColor: '#fcebad'
              }
            }
          }
        }
      ]
    }
  },
  mounted() {
    setInterval(() => {
      this.titleItem.forEach( item => {
        item.number.number[0] += 10
        item.number = { ...item.number }
      })
    },5000)
  },
  components: {
    CenterChart
  }
}
</script>

<style lang="scss" scoped>
#center {
  display: flex;
  flex-direction: column;
  padding: 55px 18px;
  box-sizing: border-box;
  width: 100%;

  .up {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    width: 100%;

    .item {
      & > div {
        position: relative;
        top: -8px
      }

      text-align: center;
      padding: 2px;
      box-sizing: border-box;
      height: 60px;
      font-size: 15px;
      color: white;
      width: 31%;
      border-radius: 5px;
      background: rgba(134, 156, 229, .5);

      //margin:3px;
    }
  }

  //.up {
  //  width: 100%;
  //  display: flex;
  //  flex-wrap: wrap;
  //  justify-content: space-around;
  //  font-size: 13px;
  //  color: white;
  //  .item {
  //    border-radius: 6px;
  //    padding-top: 3px;
  //    margin-top: 3px;
  //    width: 32%;
  //    height: 50px;
  //    .dv-dig-flop {
  //      width: 120px;
  //      height: 35px;
  //    }
  //  }
  //}
  .down {
    padding: 6px 4px;
    padding-bottom: 0;
    width: 100%;
    display: flex;
    height: 255px;
    justify-content: space-between;

    .bg-color-black {
      border-radius: 5px;
    }

    .ranking {
      padding: 10px;
      width: 59%;

      .dv-scr-rank-board {
        height: 225px;
      }
    }

    .percent {
      width: 40%;
      display: flex;
      flex-wrap: wrap;

      .item {
        width: 50%;
        height: 120px;

        span {
          margin-top: 8px;
          font-size: 14px;
          display: flex;
          justify-content: center;
        }
      }

      .water {
        width: 100%;

        .dv-wa-le-po {
          height: 120px;
        }
      }
    }
  }
}
</style>
