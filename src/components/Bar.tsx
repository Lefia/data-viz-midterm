import { useEffect, useState } from 'react'
import Plot from 'react-plotly.js'
import * as d3 from 'd3'


export default function Bar() {
  const [data, setData] = useState<d3.DSVRowArray<string>>()

  useEffect(() => {
    // https://data.gov.tw/dataset/161717
    d3.csv(`${import.meta.env.BASE_URL}data/11208年齡.csv`).then((data) => {
      setData(data)
    })
  }, [])

  return (
    <Plot
      data={[
        {
          y: data?.columns.slice(3).map((age) => {
            return data.reduce((acc, cur) => {
              return acc + parseInt(cur[age])
            }, 0)
          }),
          type: 'bar',
        },
      ]}
      layout={{
        title: '桃園市112年各區人口年齡層統計',
        xaxis: {
          title: '年齡(歲)',
        },
        yaxis: {
          title: '人口數(人)',
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
