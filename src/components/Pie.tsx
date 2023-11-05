import { useEffect, useState } from 'react'
import Plot from 'react-plotly.js'
import * as d3 from 'd3'


export default function Pie() {
  const [data, setData] = useState<d3.DSVRowArray<string>>()
  const [country, setCountry] = useState<string[]>([])

  useEffect(() => {
    // https://data.gov.tw/dataset/163714
    d3.csv(`${import.meta.env.BASE_URL}data/經濟部能源署_原油進口來源年資料.csv`).then((data) => {
      setData(data)
      console.log(data)
      setCountry(data.columns.slice(3))
    })
  }, [])

  return (
    <Plot
      data={[
        {
          type: 'pie',
          name: '2019',
          title: {
            text: '2019',
          },
          hole: 0.4,
          domain: { row: 0, column: 0 },
          labels: country,
          values: country.map((country) => {
            const yearData = data?.find((d) => d['日期(年)'] === '2019')
            return parseInt(yearData![country])
          })
        },
        {
          type: 'pie',
          name: '2020',
          title: {
            text: '2020',
          },
          hole: 0.4,
          domain: { row: 0, column: 1 },
          labels: country,
          values: country.map((country) => {
            const yearData = data?.find((d) => d['日期(年)'] === '2020')
            return parseInt(yearData![country])
          })
        },
        {
          type: 'pie',
          name: '2021',
          title: {
            text: '2021',
          },
          hole: 0.4,
          domain: { row: 1, column: 0 },
          labels: country,
          values: country.map((country) => {
            const yearData = data?.find((d) => d['日期(年)'] === '2021')
            return parseInt(yearData![country])
          })
        },
        {
          type: 'pie',
          name: '2022',
          title: {
            text: '2022',
          },
          hole: 0.4,
          domain: { row: 1, column: 1 },
          labels: country,
          values: country.map((country) => {
            const yearData = data?.find((d) => d['日期(年)'] === '2022')
            return parseInt(yearData![country])
          })
        },
      ]}
      layout={{
        title: '原油進口來源年資料',
        grid: {
          rows: 2,
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
      className={'w-full h-full rounded-lg bg-white'}
    />
  )
}
