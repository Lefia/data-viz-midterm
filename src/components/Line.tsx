import { useEffect, useState } from 'react'
import Plot from 'react-plotly.js'
import * as d3 from 'd3'

export default function Line() {
  const [data, setData] = useState<d3.DSVRowArray<string>>()

  useEffect(() => {
    // https://data.gov.tw/dataset/164956
    d3.csv(`${import.meta.env.BASE_URL}data/機場捷運單月平均運量.csv`).then(
      (data) => {
        setData(data)
      },
    )
  }, [])

  return (
    <div>
      <Plot
        data={[
          {
            x: data?.map((d) => {
              const year = parseInt(d.year) + 1911
              const month = parseInt(d.month)
              return new Date(year, month)
            }),
            y: data?.map((d) => d.loading),
            type: 'scatter',
            mode: 'lines+markers',
          },
        ]}
        layout={{
          title: '桃園機場捷運每月平均運量',
          xaxis: {
            title: '日期',
            type: 'date',
          },
          yaxis: {
            title: '單月平均運量',
          },
          autosize: true,
          // paper_bgcolor: 'rgba(0,0,0,0)',
          // modebar: {
          //   bgcolor: 'rgba(0,0,0,0)',
          //   color: 'rgba(128,139,150,1)',
          //   activecolor: 'rgba(171,178,185,1)',
          //   orientation: 'h',
          // },
        }}
        useResizeHandler={true}
        config={{ responsive: true }}
        className={'w-full h-full'}
      />
      <div className={'w-full bg-slate-300 rounded-lg mt-4 p-4'}>
        從圖中可以觀察到，每月的平均運量從2019後穩定上升，但在2020後便急遽下降，猜測可能是受到COVID-19的影響，出國人數減少，因此搭乘機場捷運的人數也隨之減少。
        隨著疫情的趨緩，機場捷運的運量也在2022的六月後逐漸回升，甚至在八月達到了疫情前的最高峰。
      </div>
    </div>
  )
}
