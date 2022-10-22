# vue-tasks-gantt-chart

## 效果预览

![201666355568_.pic.jpg](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/dd70932ca3364c96bd308752b9e84439~tplv-k3u1fbpfcp-watermark.image?)

## 插件安装

```bash
yarn add vue-tasks-gantt-chart

# or

npm install vue-tasks-gantt-chart --save
```

## 插件使用

目前只支持传入日期的格式年份/月份/日期

- 在项目的入口文件`main.js`中加入下述代码

```javascript
import vueTasksGanttChart from "vue-tasks-gantt-chart";

Vue.use(vueTasksGanttChart);
```

- 在你的业务代码中，进行试验，然后传对应的参数即可.如果数据加载时间比较长，在自己代码中配合loading 效果去渲染更合适

```vue
<template>
  <div>
    <vueTasksGanttChart :gantObject="ganttObject" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      ganttObject: {
        startDate: "2022/1/1", //定义的头部时间范围
        endDate: "2022/3/16", //定义的头部时间范围
        taskArrayData: [
          {
            taskMessage: {
              title: "项目制作任务1"
            },
            taskStartTime: "2022/1/2",
            taskEndTime: "2022/1/15",
            taskBackground: "",
            process: "2022/1/12",
            precentNumer: "80%",
            precentBackground: "",
            children: [
              {
                parent: 1,
                taskMessage: {
                  title: "项目制作1子任务"
                },
                taskBackground: "",
                process: "2022/1/6",
                precentNumer: "60%",
                precentBackground: "",
                taskStartTime: "2022/1/4",
                taskEndTime: "2022/1/10"
              },
              {
                taskMessage: {
                  title: "项目制作1子任务"
                },
                taskBackground: "",
                process: "2022/1/8",
                precentNumer: "",
                precentBackground: "",
                taskStartTime: "2022/1/6",
                taskEndTime: "2022/1/10"
              },
              {
                parent: 1,
                taskMessage: {
                  title: "项目制作1子任务"
                },
                taskBackground: "",
                process: "",
                precentNumer: "",
                precentBackground: "",
                taskStartTime: "2022/1/6",
                taskEndTime: "2022/1/10"
              }
            ]
          },
          {
            taskMessage: {
              title: "项目制作任务2"
            },
            taskStartTime: "2022/1/5",
            taskEndTime: "2022/1/15",
            taskBackground: "#409eff",
            children: [
              {
                taskMessage: {
                  title: "项目制作2子任务"
                },
                taskBackground: "",
                process: "",
                precentNumer: "",
                precentBackground: "",
                taskStartTime: "2022/1/12",
                taskEndTime: "2022/1/13"
              }
            ]
          },
          {
            taskMessage: {
              title: "项目制作任务3"
            },
            taskStartTime: "2022/1/2",
            taskEndTime: "2022/3/16",
            taskBackground: "",
            children: [
              {
                parent: 1,
                taskMessage: {
                  title: "项目制作3子任务"
                },
                taskBackground: "",
                process: "",
                precentNumer: "",
                precentBackground: "",
                taskStartTime: "2022/1/12",
                taskEndTime: "2022/3/13"
              }
            ]
          }
        ]
      }
    };
  }
};
</script>
```

### 参数说明

如示例代码所示，
在 template 中使用后，配置一个对象 ganttObject

- startDate 定义的头部时间范围
- endDate 定义的头部时间范围
- taskArrayData: [ 任务数组
  {
  taskMessage: {
  title: "" 主任务名称
  },
- taskStartTime: "", 主任务开始的时间
- taskEndTime: "", 主任务结束的时间
- taskBackground: "", 主任务的背景色
- process: "",主任务支持进度条
- precentNumer: "80%", 主任务进度条可定义完成的数值
- precentBackground: "", 主任务进度条可定义背景色
- children: [] 支持显示子任务，内部参数同外部

## 写在最后

至此，插件的所有使用方法就介绍完了。
