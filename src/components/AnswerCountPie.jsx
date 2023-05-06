import { useEffect } from "react";
import * as echarts from "echarts";
import axios from "axios";
export default function AnswerCountPie({data}) {
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
        },
        type:'scroll',
        left:'30',
        right:'30',
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
        name: "Answer Count Distribution",
        center: ['50%', '50%'],
        itemStyle:{
            borderRadius:10,
            borderColor:'#fff',
            borderWidth:1
        },
        label:{
            show:true,
            formatter:'{d}%',
            fontFamily: "Poppins",
        },
        data: data.map((num,index)=>{
            if(index>9){
                return {value:num,name:'9+'}
            }else{
                return {value:num, name: `${index}`}
            }
        })
      },
    ],
  };

  useEffect(() => {
    const chartDom = document.getElementById("answer-count-pie");
    const myChart = echarts.init(chartDom);
    myChart.setOption(option);
    window.addEventListener("resize", () => {
      myChart.resize();
    });
  });

  return (
    <>
      <div id="answer-count-pie" className="w-full h-full"></div>
    </>
  );
}
