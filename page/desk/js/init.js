new Vue({
  el: "#app",
  data() {
    return {
      pianchashow: false,
      biangengshow: false,
      xiangqingshow: false,
      activeName: "dianliu",
      pianchaData: {},
      biangengData: {
        list: [
          {
            date: 1,
          },
        ],
      },
      tabs: [
        {
          name: "电流",
          value: "1",
        },
        {
          name: "电压",
          value: "2",
        },
        {
          name: "温度",
          value: "3",
        },
        {
          name: "震动",
          value: "4",
        },
        {
          name: "转速",
          value: "5",
        },
      ],
      activeTab: "1",
      date: "",
      chartDom: {
        line1: {},
      },
      lineTwoData: [
        { year: "1991", value: 68 },
        { year: "1992", value: 100 },
        { year: "1993", value: 59 },
        { year: "1994", value: 74 },
        { year: "1995", value: 70 },
        { year: "1996", value: 31 },
        { year: "1997", value: 82 },
        { year: "1998", value: 40 },
        { year: "1999", value: 33 },
      ],
    };
  },
  mounted() {},
  methods: {
    showDetails() {
      this.drawLine(this.lineTwoData, "line1", "red", "year*value");
    },
    destroy() {
      this.chartDom["line1"].destroy();
    },
    changeTab(item) {
      this.activeTab = item;
    },
    delshebei(item) {
      this.biangengData.list.splice(item, 1);
    },
    addshebei() {
      this.biangengData.list.push({
        date: 1,
      });
    },
    drawLine(data, el, color, type, ticks) {
      // Step 1: 创建 Chart 对象
      const colors = {
        blue: {
          area: "l(90) 0:rgba(248, 252, 255, 1) 1:rgba(239, 247, 255, 1)",
          line: "rgba(80, 167, 255, 1)",
        },
        red: {
          area: "l(90) 0:rgba(255, 91, 92, 0.27) 1:rgba(239, 247, 255, 1)",
          line: "rgba(255, 91, 92, 1)",
        },
        yellow: {
          area: "l(90) 0:rgba(252, 188, 54, 0.26) 1:rgba(239, 247, 255, 1)",
          line: "rgba(253, 183, 37, 1)",
        },
      };

      this.chartDom[el] = new G2.Chart({
        container: el, // 指定图表容器 ID
        autoFit: true,
        height: 210,
        pixelRatio: window.devicePixelRatio,
      });
      // Step 2: 载入数据源
      this.chartDom[el].data(data);

      this.chartDom[el].scale("value", {
        ticks: ticks,
        max: 100,
        min: 0,
      });

      this.chartDom[el].axis("year", {
        title: null,
        label: null,
      });

      // Step 3：创建图形语法，绘制柱状图
      this.chartDom[el].area().position(type).shape("smooth").color(colors[color]["area"]);
      this.chartDom[el].line().position(type).color(colors[color]["line"]).shape("smooth");
      this.chartDom[el].annotation().line({
        start: ["min", 85],
        end: ["max", 85],
        style: {
          stroke: "#ff4d4f",
          lineWidth: 1,
          lineDash: [3, 3],
        },
        text: {
          position: "start",
          style: {
            fill: "#8c8c8c",
            fontSize: 12,
            fontWeight: "normal",
          },
          content: "预警线",
          offsetY: -5,
        },
      });

      this.chartDom[el].annotation().line({
        start: ["min", 45],
        end: ["max", 45],
        style: {
          stroke: "#67c23a",
          lineWidth: 1,
          lineDash: [3, 3],
        },
        text: {
          position: "start",
          style: {
            fill: "#67c23a",
            fontSize: 12,
            fontWeight: "normal",
          },
          content: "预警线",
          offsetY: -5,
        },
      });

      // Step 4: 渲染图表
      this.chartDom[el].render();
      this.isDraw = true;
    },
  },
});
