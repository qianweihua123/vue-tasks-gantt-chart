<template>
  <div
    class="vue-tasks-gantt-chart"
    ref="taskContainer"
    id="vue-tasks-gantt-chart"
  >
    <div class="loadingCss" v-if="loadingBol">
      <div class="emptyCss" style="">
        <svg
          viewBox="0 0 79 86"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
        >
          <defs>
            <linearGradient
              :id="`linearGradient-1-${id}`"
              x1="38.8503086%"
              y1="0%"
              x2="61.1496914%"
              y2="100%"
            >
              <stop stop-color="#FCFCFD" offset="0%" />
              <stop stop-color="#EEEFF3" offset="100%" />
            </linearGradient>
            <linearGradient
              :id="`linearGradient-2-${id}`"
              x1="0%"
              y1="9.5%"
              x2="100%"
              y2="90.5%"
            >
              <stop stop-color="#FCFCFD" offset="0%" />
              <stop stop-color="#E9EBEF" offset="100%" />
            </linearGradient>
            <rect :id="`path-3-${id}`" x="0" y="0" width="17" height="36" />
          </defs>
          <g
            id="Illustrations"
            stroke="none"
            stroke-width="1"
            fill="none"
            fill-rule="evenodd"
          >
            <g id="B-type" transform="translate(-1268.000000, -535.000000)">
              <g id="Group-2" transform="translate(1268.000000, 535.000000)">
                <path
                  id="Oval-Copy-2"
                  d="M39.5,86 C61.3152476,86 79,83.9106622 79,81.3333333 C79,78.7560045 57.3152476,78 35.5,78 C13.6847524,78 0,78.7560045 0,81.3333333 C0,83.9106622 17.6847524,86 39.5,86 Z"
                  fill="#F7F8FC"
                />
                <polygon
                  id="Rectangle-Copy-14"
                  fill="#E5E7E9"
                  transform="translate(27.500000, 51.500000) scale(1, -1) translate(-27.500000, -51.500000) "
                  points="13 58 53 58 42 45 2 45"
                />
                <g
                  id="Group-Copy"
                  transform="translate(34.500000, 31.500000) scale(-1, 1) rotate(-25.000000) translate(-34.500000, -31.500000) translate(7.000000, 10.000000)"
                >
                  <polygon
                    id="Rectangle-Copy-10"
                    fill="#E5E7E9"
                    transform="translate(11.500000, 5.000000) scale(1, -1) translate(-11.500000, -5.000000) "
                    points="2.84078316e-14 3 18 3 23 7 5 7"
                  />
                  <polygon
                    id="Rectangle-Copy-11"
                    fill="#EDEEF2"
                    points="-3.69149156e-15 7 38 7 38 43 -3.69149156e-15 43"
                  />
                  <rect
                    id="Rectangle-Copy-12"
                    :fill="`url(#linearGradient-1-${id})`"
                    transform="translate(46.500000, 25.000000) scale(-1, 1) translate(-46.500000, -25.000000) "
                    x="38"
                    y="7"
                    width="17"
                    height="36"
                  />
                  <polygon
                    id="Rectangle-Copy-13"
                    fill="#F8F9FB"
                    transform="translate(39.500000, 3.500000) scale(-1, 1) translate(-39.500000, -3.500000) "
                    points="24 7 41 7 55 -3.63806207e-12 38 -3.63806207e-12"
                  />
                </g>
                <rect
                  id="Rectangle-Copy-15"
                  :fill="`url(#linearGradient-2-${id})`"
                  x="13"
                  y="45"
                  width="40"
                  height="36"
                />
                <g
                  id="Rectangle-Copy-17"
                  transform="translate(53.000000, 45.000000)"
                >
                  <mask :id="`mask-4-${id}`" fill="white">
                    <use :xlink:href="`#path-3-${id}`" />
                  </mask>
                  <use
                    id="Mask"
                    fill="#E0E3E9"
                    transform="translate(8.500000, 18.000000) scale(-1, 1) translate(-8.500000, -18.000000) "
                    :xlink:href="`#path-3-${id}`"
                  />
                  <polygon
                    id="Rectangle-Copy"
                    fill="#D5D7DE"
                    :mask="`url(#mask-4-${id})`"
                    transform="translate(12.000000, 9.000000) scale(-1, 1) translate(-12.000000, -9.000000) "
                    points="7 0 24 0 20 18 -1.70530257e-13 16"
                  />
                </g>
                <polygon
                  id="Rectangle-Copy-18"
                  fill="#F8F9FB"
                  transform="translate(66.000000, 51.500000) scale(-1, 1) translate(-66.000000, -51.500000) "
                  points="62 45 79 45 70 58 53 58"
                />
              </g>
            </g>
          </g>
        </svg>
        <span style="color:#ccc">暂无数据</span>
      </div>
    </div>

    <!-- 程序中获取 dom 节点了，v-if会报错 -->
    <div class="taskContainer" v-show="!loadingBol">
      <!-- 动态计算头部月份的长度 -->
      <div class="monthHeaderWidth">
        <div
          class="monthSupport"
          :style="{
            width: item.width + 'px',
            left: item.left + 'px'
          }"
          :key="index + '' + onlySymbolVal()"
          v-for="(item, index) in monthList"
        >
          {{ item.date }}
        </div>
      </div>
      <div class="cellGanttContainer">
        <div
          class="gant_view_cell"
          v-for="(item, index) in dateList"
          :key="index + '' + onlySymbolVal()"
          :style="{ width: item.width + 'px' }"
        >
          {{ item.date }}
        </div>
      </div>
      <!-- 外层的边框 -->
      <div style="position: relative" id="getHeight">
        <div
          class="setTaskContainer"
          :key="index + '' + onlySymbolVal()"
          v-for="(item, index) in taskArrayData"
        >
          <div
            v-for="(date, index) in dateList"
            :key="index + '' + onlySymbolVal()"
            class="gant_view_cell"
            :style="{ width: date.width + 'px' }"
          ></div>
        </div>
        <canvas
          id="myCanvas"
          style="position: absolute; top: 0;left:0"
        ></canvas>
        <div
          class="taskContainerCss"
          v-for="(task, inx) in taskArrayData"
          :key="inx + '' + onlySymbolVal()"
          @mousemove="e => showTaskInfor(e, task)"
          @mouseleave="hideTaskInfor"
          :style="{
            width: task.width + 'px',
            left: task.left + 'px',
            background: task.taskBackground ? task.taskBackground : '#ebeef5',
            top: inx * 30 + 3 + 'px'
          }"
        >
          <div
            class="processTaskCss"
            v-if="task.process"
            :style="{
              width: task.processwidth + 'px',
              background: task.precentBackground
                ? task.precentBackground
                : '#67c23a'
            }"
            @mousemove="e => showTaskInfor(e, task)"
          >
            <span style="padding-left: 10px">
              <span
                :style="{
                  display: 'inline-block',
                  transform: task.showChildren
                    ? 'rotate(90deg)'
                    : 'rotate(0deg)'
                }"
                @click="showChildTask(task, inx)"
                v-if="task.children && task.children.length"
                >▶</span
              >
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
              <span
                @click="showChildTask(task, inx)"
                v-if="task.children && task.children.length"
                :style="{
                  display: 'inline-block',
                  transform: task.showChildren
                    ? 'rotate(90deg)'
                    : 'rotate(0deg)'
                }"
                >▶</span
              >
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
import { cloneDeep } from "../utils/cloneDeep.js";
import { isEqual } from "../utils/isEqual.js";
export default {
  name: "vueTasksGanttChart",
  props: {
    gantObject: {
      type: Object,
      default: () => {},
      required: true
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
      widthComputed: 0,
      loadingBol: true
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
  watch: {
    gantObject: {
      handler(oldValue, newValue) {
        this.loadingBol = true;
        if (isEqual(newValue) != isEqual(oldValue)) {
          this.$nextTick(() => {
            this.gantInitRender();
          });
        }
      },
      immediate: true,
      deep: true
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
        // 需要再 dom 改变后重新改变 canvas 画布的宽高
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

    /**
     * @description 描述 hover展示
     * @param {e, item}
     * @returns {*}
     */
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
      domDiv.innerHTML = `<div style="text-align:center"><span style="display:inline-block">${
        item.taskMessage.title ? item.taskMessage.title : ""
      }</span><div style="text-align:left">开始日期：${
        item.taskStartTime
      }</div><div  style="text-align:left">结束日期：${
        item.taskEndTime
      }</div></div>`;
    },
    hideTaskInfor() {
      let domDiv = document.getElementsByClassName("showTips")[0];
      domDiv.style.display = "none";
    },

    /**
     * @description 描述 计算总时长
     * @param {*}
     * @returns {*}
     */
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
     * @description 描述 获取后一位的时间，方便计算差额
     * @param {date}
     * @returns {*}
     */
    getNextMonth(date) {
      let year = new Date(date).getFullYear();
      let month = new Date(date).getMonth() + 1;
      return new Date(year, month, 1);
    },
    formatMsToDate(ms) {
      // 参数 毫秒数
      let addZero;
      addZero = function(num) {
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

    /**
     * @description 描述 初始化月份
     * @param {*}
     * @returns {*}
     */
    async initMonthFun() {
      let totalMs = this.computedTotalMs();
      let initBaseMonth = this.startDate;
      for (let i = 0; i <= totalMs; ) {
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
      this.monthList.forEach(function(month) {
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

    /**
     * @description 描述 初始化日期函数
     * @param {*} totalMs
     * @returns {*}
     */
    initDateNumFun(totalMs) {
      var list = [];
      let initBaseDate = this.startDate;
      for (let i = 0; i <= totalMs; ) {
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

    /**
     * @description 描述 画布箭头函数
     * @param {*}
     * @returns {*}
     */
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

    /**
     * @description 描述 初始化任务函数
     * @param {*}
     * @returns {*}
     */
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

    /**
     * @description 描述 初始化画布
     * @param {*}
     * @returns {*}
     */
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

    /**
     * @description 描述 初始化 gantt
     * @param {*}
     * @returns {*}
     */
    gantInitRender() {
      this.$nextTick(() => {
        let gantObject = cloneDeep(this.gantObject);
        let containerWidth = document.getElementById("vue-tasks-gantt-chart");
        this.containerWidth = containerWidth.offsetWidth;
        this.startDate = gantObject.startDate;
        this.endDate = gantObject.endDate;
        this.taskArrayData = gantObject.taskArrayData || [];
        const { initDateNumFun, initTaskFun } = this;
        this.initMonthFun().then(totalMs => {
          initDateNumFun(totalMs);
          initTaskFun();
          this.loadingBol = false;
        });
      });
    }
  },
  mounted() {}
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
      line-height: 24px;
      cursor: pointer;
      color: #303133;
      font-size: 12px;
      border-radius: 100px;
      overflow: hidden;

      .processTaskCss {
        height: 24px;
        line-height: 24px;
        cursor: pointer;
        color: #303133;
        font-size: 12px;
        border-radius: 100px;
        z-index: 9999999;
        display: flex;
        justify-content: space-between;
        overflow: hidden;
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

  .loadingCss {
    width: 100%;
    height: 200px;
    display: flex;
    justify-content: center;
    align-content: center;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    text-align: center;

    .emptyCss {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>
