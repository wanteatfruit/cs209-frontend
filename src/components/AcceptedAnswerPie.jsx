import { useEffect } from "react";
import * as echarts from "echarts";
export default function AcceptedAnswerPie() {
  const option = {
    tooltip: {
      trigger: 'item',
        textStyle:{
            fontFamily: "Poppins",
        },
    },
    legend:{
        bottom:'0',
        textStyle:{
            fontFamily: "Poppins",
        }
    },
    title: {
      text: "Accepted Answer Distribution",
      left: "center",
      textStyle: {
        fontFamily: "Poppins",
      },
    },
    series: [
      {
        type: "pie",
        name: "Answer Status",
        radius:["40%","70%"],
        roseType:'area',
        itemStyle:{
            borderRadius:10,
            borderColor:'#fff',
            borderWidth:2
        },
        label:{
            show:true,
            formatter:'{d}%',
            fontFamily: "Poppins",
        },
        data: [
          { value: 506, name: "Answer Accepted" },
          { value: 714, name: "Answer Unaccepted" },
          { value: 779, name: "Not Answered" },
        ],
      },
    ],
  };

  useEffect(() => {
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
