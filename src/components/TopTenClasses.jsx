import { useEffect } from "react";
import PropTypes from "prop-types";
import * as echarts from "echarts";
import { Radio, RadioGroup } from "@chakra-ui/react";
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
    // title: {
    //   text: "Top-15 Classes",
    //   left: "center",
    //   textStyle: {
    //     fontFamily: "Poppins",
    //   },
    // },
    yAxis: {
      data: data.map((item) => item.name),
      axisLabel: {
        fontFamily: "Poppins",
        fontSize: 10,
        rotate: 30,
      },
      type: "category",
      minInterval: 0,
    },
    xAxis: {
      type: "value",
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
      <div id="top-ten" className="w-full h-full"></div>
    </>
  );
}

TopTenClasses.propTypes = {
  data: PropTypes.array.isRequired,
};
