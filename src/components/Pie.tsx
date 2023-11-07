import { useEffect, useState } from 'react'
import Plot from 'react-plotly.js'
import * as d3 from 'd3'

export default function Pie() {
  const [data, setData] = useState<d3.DSVRowArray<string>>()
  const [powerTypes, setPowerTypes] = useState<string[]>([])

  useEffect(() => {
    //https:data.gov.tw/dataset/112650
    d3.csv(
      `${import.meta.env.BASE_URL}data/經濟部能源署_電力供給月資料.csv`,
    ).then((data) => {
      setData(data)
      setPowerTypes([
        data.columns[3],
        ...data.columns.slice(5, 9),
        ...data.columns.slice(10, 16),
      ])
    })
  }, [])

  return (
    <div>
      <Plot
        data={[
          {
            type: 'pie',
            name: '2004',
            title: {
              text: '2004',
            },
            hole: 0.4,
            domain: {
              row: 0,
              column: 0,
            },
            labels: powerTypes.map((powerType) =>
              powerType.replace(/全國發電量_/g, ''),
            ),
            values: powerTypes.map((powerType) => {
              const yearData = data?.find((d) => d['日期(年/月)'] === '200401')
              return yearData![powerType]
            }),
          },
          {
            type: 'pie',
            name: '2023',
            title: {
              text: '2023',
            },
            hole: 0.4,
            domain: {
              row: 0,
              column: 1,
            },
            labels: powerTypes.map((powerType) =>
              powerType.replace(/全國發電量_/g, ''),
            ),
            values: powerTypes.map((powerType) => {
              const yearData = data?.find((d) => d['日期(年/月)'] === '202309')
              return yearData![powerType]
            }),
          },
        ]}
        layout={{
          title: '台灣發電類型比較: 2004年 & 2023年',
          grid: {
            rows: 1,
            columns: 2,
            pattern: 'independent',
          },
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
        className={'w-full h-[450px] bg-white rounded-lg'}
      />
      <div className={'w-full bg-slate-300 rounded-lg mt-4 p-4'}>
        透過比較兩張圖，我們可以發現在19年後發電的類型仍然是以火力發電，包括過去就大量使用的燃氣發電和增加許多的燃氣火力發電，推測可能是用來補足因核四廠爭議而減少的核能發電。不過我們也能看到太陽能發電相較於過去有明顯的提升，這可能是近年政策推廣太陽能發電的結果。
      </div>
    </div>
  )
}
