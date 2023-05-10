import { useEffect } from "react";
import PropTypes from "prop-types";
import * as echarts from "echarts";
export default function ImportSunBlast({ importData }) {
  const option = {
    tooltip: {},
    title: {
      text: "Import Hierarchical Sunburst",
      left: "center",
      textStyle: {
        fontFamily: "Poppins",
      },
    },
    series: [
      {
        type: "sunburst",
        name: "import",
        radius: [0, '95%'],
        data: importData,
        textStyle:{
            fontFamily:'Poppins'
        },
        emphasis:{
            focus:'ancestor'
        },
        labelLayout:{
            hideOverlap:true
        },
        levels: [
            {},
            {
              r0: '15%',
              r: '35%',
              itemStyle: {
                borderWidth: 2
              },
              label: {
                rotate: 'tangential',
                fontFamily:'Poppins'
              }
            },
            {
              r0: '35%',
              r: '70%',
              label: {
                show: false
              }
            },
            {
              r0: '70%',
              r: '72%',
              label: {
                position: 'outside',
                padding: 3,
                silent: false,
                fontFamily:'Poppins'
              },
              itemStyle: {
                borderWidth: 3
              }
            }
          ]
      
      },

    
    ],
  };
  useEffect(() => {

    const chartDom = document.getElementById("import-sun");
    const myChart = echarts.init(chartDom);
    myChart.setOption(option);
    window.addEventListener("resize", () => {
      myChart.resize();
    });
  });
  return (
    <>
      <div id="import-sun" className="w-full h-full"></div>
    </>
  );
}

ImportSunBlast.propTypes = {
  importData: PropTypes.array.isRequired,
};
