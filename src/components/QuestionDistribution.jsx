import { useEffect } from "react";
import PropTypes from "prop-types";
import * as echarts from "echarts";
export default function QuestionDistribution({ questions }) {
  const option = {
    tooltip: {},
    title:{
        text:'Question Creation Time and Answer Count Distribution',
        left:'center',
        textStyle:{
            fontFamily:'Poppins',
        }
    },
    xAxis: {
      data: Object.keys(questions),
      axisLabel: {
        fontFamily: "Poppins",
      },
      name:'Question Index Sorted by Time',
      nameLocation:'center',
      nameGap:30,
      nameTextStyle:{
        fontFamily:'Poppins',
    }
    },
    yAxis: {
        name:'Answer Count',
        axisLabel: {
            fontFamily: "Poppins",
        },
        nameTextStyle:{
            fontFamily:'Poppins',
        }
    },
    series: [
      {
        type: "line",
        name:'Question Index',
        data: Object.values(questions),
      },
    ],
    dataZoom:[

        {
            type: 'inside',
        }
    ]
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
    questions: PropTypes.array.isRequired
};
