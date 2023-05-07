import { useEffect } from "react";
import PropTypes from "prop-types";
import * as echarts from "echarts";
export default function ResolutionTime({ data }) {



  const option = {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
      textStyle: {
        fontFamily: "Poppins",
      },
    },
    title: {
      text: "Resolution Time Distribution",
      left: "center",
      textStyle: {
        fontFamily: "Poppins",
      },
    },
    xAxis: {
      data: data.map((item) => item.range),
      axisLabel: {
        fontFamily: "Poppins",
      },
      type:'category',
      minInterval: 0
    },
    yAxis: {
      name: "Answer Count",
      axisLabel: {
        fontFamily: "Poppins",
      },
      nameTextStyle: {
        fontFamily: "Poppins",
      },
    },
    series: [
      {
        type: "bar",
        name: "Answer Count",
        data: data.map((item) => {return item.count}),
        itemStyle:{
          color:'orange'
        }
      },
    ],
  };

  useEffect(() => {
    console.log(data);
    const chartDom = document.getElementById("resolution");
    const myChart = echarts.init(chartDom);
    myChart.setOption(option);
    window.addEventListener("resize", () => {
      myChart.resize();
    });
  });
  return (
    <>
      <div id="resolution" className="w-full h-full"></div>
    </>
  );
}

ResolutionTime.propTypes = {
  data: PropTypes.array.isRequired,
};
