import * as echarts from 'echarts';
import 'echarts-wordcloud';
import { useEffect } from 'react';

function parseData(wordCloudData){
    let jsonArray = [];
    for (let key in wordCloudData){
        jsonArray.push(
            {name:key,value:wordCloudData[key]}
        )
    }
    jsonArray.sort((a,b)=>a.value-b.value);
    console.log(jsonArray.splice(0,100))
    return jsonArray;
}

export default function TagCloud({wordCloudData}){
    const option={
        series: [
            {
                type: 'wordCloud',
                shape:'circle',
                left:'center',
                width:'90%',
                height:'90%',
                textStyle:{
                    fontFamily:'Poppins',
                    fontWeight:'bold',
                    color:function(){
                        //use Random orange color
                        return 'rgb(' + [
                            Math.round(Math.random() * 100) + 200,
                            Math.round(Math.random() * 100)+  30,
                            Math.round(Math.random() * 0) + 0
                        ].join(',') + ')';
                    }
                        
                },
                data: parseData(wordCloudData),
                layoutAnimation:true,
                emphasis: {
                    focus: 'self',
                    textStyle: {
                        textShadowBlur: 5,
                        textShadowColor: '#fff'
                    }
                },
                sizeRange:[12,50],
                gridSize:1,
                // rotationRange:[0,0],
                
                
        


            }
        ]
    }
    useEffect(()=>{
        const chartDom = document.getElementById('tag-cloud');
        const myChart = echarts.init(chartDom);
        myChart.setOption(option);
        window.addEventListener('resize',()=>{
            myChart.resize();
        })
    })
    return(
        <div id="tag-cloud" style={{width:'100%',height:'100%'}}>
            
        </div>
    )
}
