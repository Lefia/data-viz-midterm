import { useEffect, useState } from 'react'
import Plot from 'react-plotly.js'
import * as d3 from 'd3'


export default function Bar() {
  const [data1, setData1] = useState<number[]>([])
  const [data2, setData2] = useState<number[]>()


  useEffect(() => {
    // 102年: https://data.gov.tw/dataset/153086
    d3.csv(`${import.meta.env.BASE_URL}data/102年現住人口數按性別及單齡人口分.csv`).then((data) => {
      const populationByAge = data.columns.slice(3).map((age) => {
        return data.reduce((acc, cur) => {
          return acc + parseInt(cur[age].replace(/,/g, "").trim())
        }, 0)
      })
      setData1(populationByAge)
    })

    // 112年: https://data.gov.tw/dataset/161717
    d3.csv(`${import.meta.env.BASE_URL}data/11208年齡.csv`).then((data) => {
      const populationByAge = data.columns.slice(3).map((age) => {
        return data.reduce((acc, cur) => {
          return acc + parseInt(cur[age].replace(/,/g, "").trim())
        }, 0)
      })
      setData2(populationByAge)
    })
  }, [])

  return (
    <Plot
      data={[
        {
          name: '102年',
          y: data1,
          type: 'bar',
          marker: {
            color: '#ff7f0e',
          }
        },
        {
          name: '102年(年齡+10)',
          x: Array.from({ length: 101 }, (_, index) => index + 10),
          y: data1.slice(0, 91),
          type: 'bar',
          marker: {
            color: '#ff7f0e',
          },
          visible: false,
        },
        {
          name: '112年',
          y: data2,
          type: 'bar',
          marker: {
            color: '#1f77b4',
          }
        },
        
      ]}
      layout={{
        title: '桃園市人口年齡層分布: 102年 & 112 年',
        xaxis: {
          title: '年齡(歲)',
        },
        yaxis: {
          title: '人口數(人)',
        },
        barmode: 'group',
        updatemenus: [{
          buttons: [
            {
              args: [{ 'visible': [true, false, true] }],
              label: '圖一',
            },
            {
              args: [{ 'visible': [false, true, true] }],
              label: '圖二',
            },
          ],
          type: 'buttons',
          direction: 'left',
          xanchor: 'left',
          x: -0.05,
          yanchor: 'top',
          y: 1.15,
        }],
        autosize: true,
        paper_bgcolor: 'rgba(0,0,0,0)',
        modebar: {
          bgcolor: 'rgba(0,0,0,0)',
          color: 'rgba(128,139,150,1)',
          activecolor: 'rgba(171,178,185,1)',
          orientation: 'h',
        },
      }}
      useResizeHandler={true}
      config={{ responsive: true }}
      className={'w-full h-full rounded-lg bg-white'}
    />
  )
}
