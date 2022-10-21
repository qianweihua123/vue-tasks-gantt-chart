<template>
  <div class="vue-tasks-gantt-chart" ref="taskContainer" id="vue-tasks-gantt-chart">
    <div class="taskContainer">
      <!-- 动态计算头部月份的长度 -->
      <div class="monthHeaderWidth">
        <div class="monthSupport" :style="{
          width: item.width + 'px',
          left: item.left + 'px'
        }" :key="index+''+onlySymbolVal()" v-for="(item, index) in monthList">
          {{ item.date }}
        </div>
      </div>
      <div class="cellGanttContainer">
        <div class="gant_view_cell" v-for="(item, index) in dateList" :key="index+''+onlySymbolVal()"
          :style="{ width: item.width + 'px' }">
          {{ item.date }}
        </div>
      </div>
      <!-- 外层的边框 -->
      <div style="position: relative" id="getHeight">
        <div class="setTaskContainer" :key="index+''+onlySymbolVal()" v-for="(item, index) in taskArrayData">
          <div v-for="(date, index) in dateList" :key="index+''+onlySymbolVal()" class="gant_view_cell"
            :style="{ width: date.width + 'px' }"></div>
        </div>
        <canvas id="myCanvas" style="position: absolute; top: 0;left:0"></canvas>
        <div class="taskContainerCss" v-for="(task, inx) in taskArrayData" :key="inx+''+onlySymbolVal()"
          @mousemove="e => showTaskInfor(e, task)" @mouseleave="hideTaskInfor" :style="{
            width: task.width + 'px',
            left: task.left + 'px',
            background: task.taskBackground ? task.taskBackground : '#ebeef5',
            top: inx * 30 + 3 + 'px',
          }">
          <div class="processTaskCss" v-if="task.process" :style="{
            width: task.processwidth + 'px',
            background: task.precentBackground
              ? task.precentBackground
              : '#67c23a'
          }" @mousemove="e => showTaskInfor(e, task)">
            <span style="padding-left: 10px">
              <span :style="{
                display: 'inline-block',
                transform: task.showChildren
                  ? 'rotate(90deg)'
                  : 'rotate(0deg)'
              }" @click="showChildTask(task, inx)" v-if="task.children && task.children.length">▶</span>
              <span class="titleStyle">{{
              task.taskMessage && task.taskMessage.title
              ? task.taskMessage.title
              : ""
              }}</span>
            </span>
            <span style="padding-right: 20px">{{ task.precentNumer }}</span>
          </div>
          <div v-else>
            <span style="padding-left: 10px">
              <span @click="showChildTask(task, inx)" v-if="task.children && task.children.length" :style="{
                display: 'inline-block',
                transform: task.showChildren
                  ? 'rotate(90deg)'
                  : 'rotate(0deg)'
              }">▶</span>
              <span class="titleStyle">{{
              task.taskMessage && task.taskMessage.title
              ? task.taskMessage.title
              : ""
              }}</span>
            </span>
          </div>
        </div>
      </div>
      <div class="showTips"></div>
    </div>
  </div>
</template>

<script>
import { formatMonth } from "../utils/FormatMonth.js";
import { formatDate } from "../utils/FormatDate.js";
import { fullFormatYearMonthDate } from "../utils/FullFormatYearMonthDate.js";
import { baseCalculate, getTimeFun } from "../utils/mathFun.js";
import { onlySymbolVal } from "../utils/onlySymbolVal.js";
export default {
  name: 'vueTasksGanttChart',
  props: {
    gantObject: {
      type: Object,
      default: () => { }
    }
  },
  data() {
    return {
      onlySymbolVal,
      startDate: "", // 定义的头部时间范围
      endDate: "", // 定义的头部时间范围
      monthList: [],
      dateList: [],
      initMonthLaterMilliseconds: 0,
      containerWidth: 0,
      defaultPx: 60,
      taskArrayData: [],
      widthComputed: 0
    };
  },
  computed: {
    endMs() {
      return new Date(this.endDate).getTime();
    },
    startMs() {
      return new Date(this.startDate).getTime();
    },
    distanceMs() {
      return (
        new Date(this.endDate).getTime() - new Date(this.startDate).getTime()
      );
    },
    oneDayMs() {
      return (60 * 60 * 24 * 1000) / this.defaultPx;
    },
    containRequiredMs() {
      return this.containerWidth * this.oneDayMs;
    }
  },
  methods: {
    showChildTask(task, inx) {
      // 循环task数组，得到点然后去连接
      if (task.showChildren) {
        this.taskArrayData.splice(
          inx + 1,
          this.taskArrayData[inx].children.length
        );
        task.showChildren = false;
        // return
      } else {
        task.showChildren = true;
        this.taskArrayData.splice(
          inx + 1,
          0,
          ...this.taskArrayData[inx].children
        );
      }

      this.$nextTick(() => {
        this.initCanvas().then(res => {
          const { bl, ctx } = res;
          this.taskArrayData.forEach((item, index) => {
            if (item.children && item.children.length) {
              if (item.showChildren) {
                let sign = 0;
                ctx.lineWidth = 5;
                ctx.strokeStyle = "orange";
                ctx.setLineDash([20, 2]); // [实线长度, 间隙长度]
                ctx.lineDashOffset = -0;

                item.children.forEach(childTask => {
                  this.drawArrow(
                    ctx,
                    (item.left - 15) * bl,
                    ((index + 1) * 30 - 15) * bl,
                    (item.left - 1) * bl,
                    ((index + 1) * 30 - 15) * bl
                  );
                  function draw() {
                    ctx.beginPath(); // 新建一条path
                    ctx.moveTo(
                      (item.left - 15) * bl,
                      ((index + 1) * 30 - 16) * bl
                    ); // 首先从主任务左上角开始画 从主任务开始的起始点

                    ctx.lineTo(
                      (item.left - 15) * bl,
                      (30 * (index + 1 + sign) + 15) * bl
                    ); // 移动到主任务下一格
                    ctx.lineTo(
                      (childTask.left - 15) * bl,
                      (30 * (index + 1 + sign) + 15) * bl
                    );
                    ctx.stroke();
                  }
                  draw();
                  this.drawArrow(
                    ctx,
                    (childTask.left - 15) * bl,
                    (30 * (index + 1 + sign) + 15) * bl,
                    (childTask.left - 2) * bl,
                    (30 * (index + 1 + sign) + 15) * bl
                  );
                  // ctx.closePath();
                  sign++;
                });
              }
            }
          });
        });
      });
    },
    showTaskInfor(e, item) {
      let domDiv = document.getElementsByClassName("showTips")[0];
      var x = e.pageX;
      var y = e.pageY;
      domDiv.style.display = "block";
      domDiv.style.zIndex = 99999;
      domDiv.style.color = "#454545";
      domDiv.style.padding = "10px";
      domDiv.style.left = x - 180 + "px";
      domDiv.style.top = y - 60 + "px";
      domDiv.innerHTML = `<div style="text-align:center"><span style="display:inline-block">${item.taskMessage.title ? item.taskMessage.title : ''
        }</span><div style="text-align:left">开始日期：${item.taskStartTime}</div><div  style="text-align:left">结束日期：${item.taskEndTime}</div></div>`;
    },
    hideTaskInfor() {
      let domDiv = document.getElementsByClassName("showTips")[0];
      domDiv.style.display = "none";
    },
    computedTotalMs() {
      let totalMs = 0;
      if (this.startDate && this.endDate) {
        if (this.containRequiredMs > this.distanceMs) {
          totalMs = this.containRequiredMs + this.startMs;
        } else {
          totalMs = this.endMs;
        }
      }
      return totalMs;
    },
    /**
     *
     * @date 格式为yyyy-mm-dd的日期，
     */
    getNextMonth(date) {
      let year = new Date(date).getFullYear();
      let month = new Date(date).getMonth() + 1;
      return new Date(year, month, 1);
    },
    formatMsToDate(ms) {
      // 参数 毫秒数
      let addZero;
      addZero = function (num) {
        if (parseInt(num) < 10) {
          num = "0" + num;
        }
        return num;
      };
      if (ms) {
        var oDate = new Date(ms),
          oYear = oDate.getFullYear(),
          oMonth = oDate.getMonth() + 1,
          oDay = oDate.getDate(),
          oHour = oDate.getHours(),
          oMin = oDate.getMinutes(),
          oSen = oDate.getSeconds(),
          oTime =
            oYear +
            "-" +
            addZero(oMonth) +
            "-" +
            addZero(oDay) +
            " " +
            addZero(oHour) +
            ":" +
            addZero(oMin) +
            ":" +
            addZero(oSen);
        return oTime;
      } else {
        return "";
      }
    },
    async initMonthFun() {
      let totalMs = this.computedTotalMs();
      let initBaseMonth = this.startDate; // 初始化月份
      for (let i = 0; i <= totalMs;) {
        let leftStartMs = new Date(initBaseMonth);
        let monthValue = formatMonth(leftStartMs);
        initBaseMonth = this.getNextMonth(initBaseMonth);
        var width = baseCalculate(
          new Date(initBaseMonth),
          leftStartMs,
          this.oneDayMs,
          "divied"
        );
        var left = baseCalculate(
          leftStartMs,
          new Date(this.startDate),
          this.oneDayMs,
          "divied"
        );
        this.monthList.push({
          left,
          width,
          date: monthValue
        });
        i = getTimeFun(initBaseMonth);
        this.initMonthLaterMilliseconds = i;
      }
      let widthComputed = 0;
      this.monthList.forEach(function (month) {
        widthComputed += month.width;
      });
      this.widthComputed = widthComputed;
      let monthHeaderWidth = document.getElementsByClassName(
        "monthHeaderWidth"
      )[0];
      monthHeaderWidth.style.width = this.widthComputed + "px";
      if (this.initMonthLaterMilliseconds) {
        totalMs = this.initMonthLaterMilliseconds;
      }
      return totalMs;
    },
    initDateNumFun(totalMs) {
      var list = [];
      let initBaseDate = this.startDate; // 初始化月份
      for (let i = 0; i <= totalMs;) {
        let leftStartDateMs = initBaseDate;
        let dateNum = formatDate(new Date(leftStartDateMs));
        let formatYearMonthDate = fullFormatYearMonthDate(
          new Date(leftStartDateMs)
        );

        initBaseDate = new Date(
          new Date(initBaseDate).getFullYear(),
          new Date(initBaseDate).getMonth(),
          new Date(initBaseDate).getDate() + 1
        );

        var width = baseCalculate(
          initBaseDate,
          new Date(leftStartDateMs),
          this.oneDayMs,
          "divied"
        );
        var left = baseCalculate(
          new Date(leftStartDateMs),
          new Date(this.startDate),
          this.oneDayMs,
          "divied"
        );
        i = getTimeFun(initBaseDate);
        if (i <= totalMs) {
          list.push({
            left,
            width,
            date: dateNum,
            title: formatYearMonthDate
          });
        }
      }
      this.dateList = list;
    },

    drawArrow(ctx, fromX, fromY, toX, toY) {
      let theta = 30;
      let headlen = 10;
      let angle = (Math.atan2(fromY - toY, fromX - toX) * 180) / Math.PI;
      let angle1 = ((angle + theta) * Math.PI) / 180;
      let angle2 = ((angle - theta) * Math.PI) / 180;
      let topX = headlen * Math.cos(angle1);
      let topY = headlen * Math.sin(angle1);
      let botX = headlen * Math.cos(angle2);
      let botY = headlen * Math.sin(angle2);
      ctx.save();
      ctx.beginPath();
      var arrowX, arrowY;
      ctx.moveTo(fromX, fromY);
      ctx.lineTo(toX, toY);
      arrowX = toX + topX;
      arrowY = toY + topY;
      ctx.moveTo(arrowX, arrowY);
      ctx.lineTo(toX, toY);
      arrowX = toX + botX;
      arrowY = toY + botY;
      ctx.lineTo(arrowX, arrowY);
      ctx.strokeStyle = "orange";
      ctx.lineWidth = 5;
      ctx.stroke();
      ctx.restore();
    },
    initTaskFun() {
      this.taskArrayData = this.taskArrayData.map(v => {
        if (!v.taskStartTime || !v.taskEndTime) {
          this.taskArrayData.length = null;
          throw new Error("Input the start time and end time of the task");
        }
        if (new Date(v.taskEndTime) - new Date(v.taskStartTime) < 0) {
          this.taskArrayData.length = null;
          throw new Error("The end date cannot be later than the start date");
        }
        if (new Date(v.taskStartTime) - new Date(this.startDate) < 0) {
          this.taskArrayData.length = null;
          throw new Error(
            "The task start date must be greater than the specified startDate"
          );
        }
        if (new Date(v.taskEndTime) - new Date(this.endDate) > 0) {
          this.taskArrayData.length = null;
          throw new Error(
            "The task end date must be smaller than the specified endDate"
          );
        }

        if (v.children && v.children.length) {
          v.children = v.children.map(childTask => {
            if (
              new Date(childTask.taskStartTime) - new Date(v.taskStartTime) <
              0
            ) {
              this.taskArrayData.length = null;
              throw new Error(
                "The start time of a subtask must be greater than the specified taskStartTime"
              );
            }
            if (new Date(childTask.taskEndTime) - new Date(v.taskEndTime) > 0) {
              this.taskArrayData.length = null;
              throw new Error(
                "The end time of a subtask must be greater than the specified taskEndTime"
              );
            }
            return {
              left: baseCalculate(
                new Date(childTask.taskStartTime),
                new Date(this.startDate),
                this.oneDayMs,
                "divied"
              ),
              width: baseCalculate(
                new Date(
                  new Date(childTask.taskEndTime).getFullYear(),
                  new Date(childTask.taskEndTime).getMonth(),
                  new Date(childTask.taskEndTime).getDate() + 1
                ),
                new Date(childTask.taskStartTime),
                this.oneDayMs,
                "divied"
              ),
              processwidth: childTask.process
                ? baseCalculate(
                  new Date(
                    new Date(childTask.process).getFullYear(),
                    new Date(childTask.process).getMonth(),
                    new Date(childTask.process).getDate() + 1
                  ),
                  new Date(childTask.taskStartTime),
                  this.oneDayMs,
                  "divied"
                )
                : 0,
              ...childTask
            };
          });
        }
        return {
          left: baseCalculate(
            new Date(v.taskStartTime),
            new Date(this.startDate),
            this.oneDayMs,
            "divied"
          ),
          width: baseCalculate(
            new Date(
              new Date(v.taskEndTime).getFullYear(),
              new Date(v.taskEndTime).getMonth(),
              new Date(v.taskEndTime).getDate() + 1
            ),
            new Date(v.taskStartTime),
            this.oneDayMs,
            "divied"
          ),
          processwidth: v.process
            ? baseCalculate(
              new Date(
                new Date(v.process).getFullYear(),
                new Date(v.process).getMonth(),
                new Date(v.process).getDate() + 1
              ),
              new Date(v.taskStartTime),
              this.oneDayMs,
              "divied"
            )
            : 0,
          showChildren: false,
          ...v
        };
      });
      this.initCanvas();
    },
    initCanvas() {
      return new Promise(resolve => {
        let getHeightDom = document.getElementById("getHeight");
        var canvas = document.getElementById("myCanvas");
        // 获取设备像素比
        const dpr = window.devicePixelRatio || 1;
        // 3540 4425 0.5 120 150 0.8
        canvas.style.width = this.widthComputed + "px";
        canvas.style.height = getHeightDom.offsetHeight + "px";
        canvas.width = Math.round(this.widthComputed * dpr);
        canvas.height = Math.round(getHeightDom.offsetHeight * dpr);
        let bl = Number(canvas.width) / Number(this.widthComputed);
        var ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        resolve({
          bl,
          ctx
        });
      });
    },
    gantInitRender() {
      this.$nextTick(() => {
        let containerWidth = document.getElementById("vue-tasks-gantt-chart");
        this.containerWidth = containerWidth.offsetWidth;
        this.startDate = this.gantObject.startDate;
        this.endDate = this.gantObject.endDate;
        this.taskArrayData = this.gantObject.taskArrayData;
        const { initDateNumFun, initTaskFun } = this;
        this.initMonthFun().then(totalMs => {
          initDateNumFun(totalMs);
          initTaskFun();
        });
      });
    }
  },
  mounted() {
    this.gantInitRender();
  }
};
</script>

<style lang="scss" scoped>
.vue-tasks-gantt-chart {
  padding: 0 10px;
  box-sizing: border-box;

  .taskContainer {
    overflow-x: auto;
    padding-bottom: 20px;
    box-sizing: border-box;

    .monthHeaderWidth {
      display: flex;
      border-top: 1px solid #ebebeb;
      border-bottom: 1px solid #ebebeb;
      border-left: 1px solid #ebebeb;
      position: relative;
      height: 30px;
      box-sizing: border-box;
    }

    .monthSupport {
      flex-shrink: 0;
      color: #a6a6a6;
      line-height: 30px;
      text-align: center;
      border-right: 1px solid #ebebeb;
      box-sizing: border-box;
      position: absolute;
      box-sizing: border-box;
    }

    .cellGanttContainer {
      height: 30px;
      display: flex;
      border-left: 1px solid #ebebeb;
      box-sizing: border-box;
    }

    .gant_view_cell {
      flex-shrink: 0;
      text-align: center;
      box-sizing: border-box;
      border-right: 1px solid #ebebeb;
      border-bottom: 1px solid #ebebeb;
      white-space: nowrap;
      font-weight: bold;
      line-height: 30px;
      color: #a6a6a6;
    }

    .setTaskContainer {
      display: flex;
      height: 30px;
      border-left: 1px solid #ebebeb;
      position: relative;
      box-sizing: border-box;
    }

    .taskContainerCss {
      position: absolute;
      line-Height: 24px;
      cursor: pointer;
      color: #303133;
      font-Size: 12px;
      border-Radius: 100px;
      overflow: hidden;

      .processTaskCss {
        height: 24PX;
        line-Height: 24px;
        cursor: pointer;
        color: #303133;
        font-Size: 12px;
        border-Radius: 100px;
        z-Index: 9999999;
        display: flex;
        justify-Content: space-between;
        overflow: hidden
      }

      .titleStyle {
        padding-left: 5px;
        display: inline-block;
        white-space: nowrap;
      }
    }
  }

  .showTips {
    position: absolute;
    white-space: nowrap;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    background-color: #fff;
    border-radius: 3px;
    display: none;
    font-size: 12px;
    color: #303133;
    font-weight: bold;
  }
}
</style>
