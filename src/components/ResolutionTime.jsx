import { useEffect } from "react";
import PropTypes from "prop-types";
import * as echarts from "echarts";
export default function ResolutionTime({ questions }) {
  const option = {
    tooltip: {},
    title: {
      text: "Resolution Time Distribution",
      left: "center",
      textStyle: {
        fontFamily: "Poppins",
      },
    },
    xAxis: {
      data: Object.keys(questions),
      axisLabel: {
        fontFamily: "Poppins",
      },
      name: "Question Creation Time",
      nameLocation: "center",
      nameGap: 30,
      nameTextStyle: {
        fontFamily: "Poppins",
      },
    },
    visualMap: {
      show: false,
      type: "continuous",
      seriesIndex: 1,
      dimension: 0,
      min: 0,
      max: questions.length - 1,
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
        type: "line",
        name: "Answer Count",
        data: Object.values(questions),
        itemStyle:{
          color:'orange'
        }
      },
    
    ],
    dataZoom: [
      {
        type: "inside",
      },
    ],
  };
  useEffect(() => {
    //group by and average time stamp

    const chartDom = document.getElementById("chart");
    const myChart = echarts.init(chartDom);
    myChart.setOption(option);
    window.addEventListener("resize", () => {
      myChart.resize();
    });
  });
  return (
    <>
      <div id="chart" className="w-full h-full"></div>
    </>
  );
}

ResolutionTime.propTypes = {
  questions: PropTypes.array.isRequired,
};
