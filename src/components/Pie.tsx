import { useEffect, useState } from 'react'
import Plot from 'react-plotly.js'
import * as d3 from 'd3'
import Card from './Card'
export default function Pie() {
  const [data, setData] = useState<d3.DSVRowArray<string>>()
  const [powerTypes1, setPowerTypes1] = useState<string[]>([])
  const [powerTypes2, setPowerTypes2] = useState<string[]>([])

  useEffect(() => {
    //https:data.gov.tw/dataset/112650
    d3.csv(
      `${import.meta.env.BASE_URL}data/經濟部能源署_電力供給月資料.csv`,
    ).then((data) => {
      setData(data)
      setPowerTypes1([
        data.columns[3],
        ...data.columns.slice(5, 9),
        ...data.columns.slice(10, 16),
      ])
      setPowerTypes2([
        ...data.columns.slice(3, 5),
        ...data.columns.slice(8, 10),
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
            labels: powerTypes1.map((powerType) =>
              powerType.replace(/全國發電量_/g, ''),
            ),
            values: powerTypes1.map((powerType) => {
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
            labels: powerTypes1.map((powerType) =>
              powerType.replace(/全國發電量_/g, ''),
            ),
            values: powerTypes1.map((powerType) => {
              const yearData = data?.find((d) => d['日期(年/月)'] === '202309')
              return yearData![powerType]
            }),
          },
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
            labels: powerTypes2.map((powerType) =>
              powerType.replace(/全國發電量_/g, ''),
            ),
            values: powerTypes2.map((powerType) => {
              const yearData = data?.find((d) => d['日期(年/月)'] === '200401')
              return yearData![powerType]
            }),
            visible: false,
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
            labels: powerTypes2.map((powerType) =>
              powerType.replace(/全國發電量_/g, ''),
            ),
            values: powerTypes2.map((powerType) => {
              const yearData = data?.find((d) => d['日期(年/月)'] === '202309')
              return yearData![powerType]
            }),
            visible: false,
          },
        ]}
        layout={{
          title: '台灣發電類型比較: 2004年 & 2023年',
          grid: {
            rows: 1,
            columns: 2,
            pattern: 'independent',
          },
          updatemenus: [
            {
              buttons: [
                {
                  args: [{ visible: [true, true, false, false] }],
                  label: '圖一',
                },
                {
                  args: [{ visible: [false, false, true, true] }],
                  label: '圖二',
                },
              ],
              type: 'buttons',
              direction: 'left',
              xanchor: 'left',
              x: -0.05,
              yanchor: 'top',
              y: 1.15,
            },
          ],
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
      <Card
        title='Source'
        titleColor='text-yellow-600'
        cardColor='bg-yellow-100'
        horizontal
      >
        <a
          href='https://data.gov.tw/dataset/112650'
          className={'text-sky-800 hover:text-sky-600'}
        >
          經濟部能源署-電力供給月資料
        </a>
      </Card>
      <Card
        title='Method'
        titleColor='text-indigo-600'
        cardColor='bg-indigo-200'
      >
        在圖一中，我挑選了2004和2023年各種發電方式的發電量，並使用圓餅圖來呈現。
        <br />
        在圖二中，我選擇了發電方式分類的大項來呈現。
      </Card>
      <Card
        title='Insight'
        titleColor='text-slate-600'
        cardColor='bg-slate-300'
      >
        <span>
          在圖一中，我們可以發現火力發電的占比都是最高的。在2004年的圖中，我們可以看到第二高佔比的核能到現在只佔了大約5%，可能是核四廠的爭議所導致的結果。而增加許多的燃氣發電，可能是因為燃氣相較於燃煤更環保一些，因此增設了許多機組。
        </span>
        <br />
        <span className='inline-block mt-1'>
          在圖二中，我們可以看出再生能源相較於20年前有了很大的成長，但火力發電也使用的更多了，希望在2050年能夠達到100%的再生能源，將氣溫變化控制在2度內。
        </span>
      </Card>
    </div>
  )
}
