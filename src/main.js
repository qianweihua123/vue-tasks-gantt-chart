
import vueTasksGanttChart from "./components/vueTasksGanttChart.vue";

export default {
  install(Vue) {
    let name = 'vueTasksGanttChart'
    Vue.component(name, vueTasksGanttChart);
  }
};