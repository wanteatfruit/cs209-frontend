import { useEffect } from "react";
import PropTypes from "prop-types";
import * as echarts from "echarts";
export default function QuestionDistribution({ questions }) {
  const option = {
    tooltip: {},
    title: {
      text: "Question Creation Time and Answer Count Distribution",
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
      orient: 'vertical',
      show:false,
      max:30,
      dimension: 1,
      inRange: {
        color: ['#F2C94C', '#F2994A', '#FF5F6D']
      },
      
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

QuestionDistribution.propTypes = {
  questions: PropTypes.array.isRequired,
};
