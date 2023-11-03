import { useEffect, useState } from 'react'
import Plot from 'react-plotly.js'
import * as d3 from 'd3'

export default function Line() {
  const [data, setData] = useState<any[]>([])

  useEffect(() => {
    d3.csv('/data/機場捷運單月平均運量.csv').then((data) => {
      setData(data)
    })
  }, [])
  
  return (
    <Plot
      data={[
        {
          x: data.map((d) => {
            const year = parseInt(d.year) + 1911
            const month = d.month
            return new Date(year, month)
          }),
          y: data.map((d) => d.loading),
          type: 'scatter',
          mode: 'lines+markers',
          marker: { color: 'red' },
        },
      ]}
      layout={{
        xaxis: {
          title: '日期',
          type: 'date',
        },
        yaxis: {
          title: '單月平均運量',
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
      className={'w-full h-full rounded-lg bg-white'}
    />
  )
}