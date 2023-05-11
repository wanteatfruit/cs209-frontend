import { useEffect } from "react";
import PropTypes from "prop-types";
import * as echarts from "echarts";
export default function TopTenAnnotations({ data}) {



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
      text: "Top-10 Annotations",
      left: "center",
      textStyle: {
        fontFamily: "Poppins",
      },
    },
    xAxis: {
      data: data.map((item) => '@'+item.name),
      axisLabel: {
        fontFamily: "Poppins",
      },
      type:'category',
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
        data: data.map((item) => {return item.value}),
        itemStyle:{
          color:'orange'
        }
      },
      
    ],
  };

  useEffect(() => {
    console.log(data);
    const chartDom = document.getElementById("top-ten-a");
    const myChart = echarts.init(chartDom);
    myChart.setOption(option);
    window.addEventListener("resize", () => {
      myChart.resize();
    });
  });
  return (
    <>
      <div id="top-ten-a" className="w-full h-full"></div>
    </>
  );
}

TopTenAnnotations.propTypes = {
  data: PropTypes.array.isRequired,
};
