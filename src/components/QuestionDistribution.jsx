import { useEffect } from "react";
import PropTypes from "prop-types";
import * as echarts from "echarts";
export default function QuestionDistribution({ questions }) {
  const option = {
    tooltip: {},
    title:{
        text:'Question and Answer Count Distribution',
        left:'center',
        textStyle:{
            fontFamily:'Poppins',
        }
    },
    xAxis: {
      data: questions.map((q,index) => {return index+1}),
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
        data: questions.map((q) => q.answerCount),
      },
    ],
    dataZoom:[

        {
            type: 'inside',
        }
    ]
  };
  useEffect(() => {
    const chartDom = document.querySelector(".chart");
    const myChart = echarts.init(chartDom);
    myChart.setOption(option);
  });
  return (
    <>
      <div className="chart"></div>
    </>
  );
}

QuestionDistribution.propTypes = {
    questions: PropTypes.array.isRequired
};
