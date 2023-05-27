import { useEffect } from "react";
import * as echarts from "echarts";
export default function CommentUserPie({data}) {
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
      text: "User Count Distribution From Post Comments",
      left: "center",
      textStyle: {
        fontFamily: "Poppins",
      },
    },
    series: [
      {
        type: "pie",
        name: "Unique User Count",
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
            if(index>5){
                return {value:num,name:'6+'}
            }else{
                return {value:num, name: `${index+1}`}
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
