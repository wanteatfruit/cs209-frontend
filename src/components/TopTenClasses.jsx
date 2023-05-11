import { useEffect } from "react";
import PropTypes from "prop-types";
import * as echarts from "echarts";
export default function TopTenClasses({ data }) {
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
    yAxis: {
      data: data.map((item) => item.name),
      axisLabel: {
        fontFamily: "Poppins",
        fontSize: 8,
        rotate: 30,
      },
      type: "category",
      minInterval: 0,
    },
    xAxis: {
      type: "value",
      axisLabel: {
        fontFamily: "Poppins",
      },
      nameTextStyle: {
        fontFamily: "Poppins",
      },
    },
    visualMap: {
      orient: 'horizontal',
      left: 'center',
      min: 10,
      max: 300,
      show:false,
      dimension: 0,
      inRange: {
        color: ['#F2C94C', '#F2994A', '#FF5F6D']
      }
    },
    series: [
      {
        type: "bar",
        name: "Count",
        data: data.map((item) => {
          return item.value;
        }),
        itemStyle: {
          color: "orange",
        },
      },
    ],
  };

  useEffect(() => {
    console.log(data);
    const chartDom = document.getElementById("top-ten");
    const myChart = echarts.init(chartDom);
    myChart.setOption(option);
    window.addEventListener("resize", () => {
      myChart.resize();
    });
  });
  return (
    <>
      <div id="top-ten" className="w-full h-full mb-5 "></div>
    </>
  );
}

TopTenClasses.propTypes = {
  data: PropTypes.array.isRequired,
};
