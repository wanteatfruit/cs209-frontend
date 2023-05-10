import { useEffect } from "react";
import PropTypes from "prop-types";
import * as echarts from "echarts";
export default function ImportTreeMap({ importData }) {
  const option = {
    title: {
      text: "Import Tree map",
      left: "center",
      textStyle: {
        fontFamily: "Poppins",
      },
    },
    series: [
      {
        type: "treemap",
        name: "import",
        radius: [0, '95%'],
        data: importData,
        itemStyle:{
          color:'orange'
        },
        label:{
          textStyle:{
            fontFamily:'Poppins'
          }
          
        },
        roam:'move'
      },

    
    ],
    dataZoom: false,
    tooltip:{
      fontFamily:'Poppins'
    }
  };
  useEffect(() => {

    const chartDom = document.getElementById("import-tree");
    const myChart = echarts.init(chartDom);
    myChart.setOption(option);
    window.addEventListener("resize", () => {
      myChart.resize();
    });
  });
  return (
    <>
      <div id="import-tree" className="w-full h-full"></div>
    </>
  );
}

ImportTreeMap.propTypes = {
  importData: PropTypes.array.isRequired,
};
