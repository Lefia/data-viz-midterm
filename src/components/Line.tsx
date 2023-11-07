import { useEffect, useState } from 'react'
import Plot from 'react-plotly.js'
import Card from '@components/Card'
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
    <div className={'inline-flex flex-col'}>
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
        className={'w-full h-[400px] bg-white rounded-lg'}
      />
      <Card
        title='Source'
        titleColor='text-yellow-600'
        cardColor='bg-yellow-100'
        horizontal
      >
        <a
          href='https://data.gov.tw/dataset/164956'
          className={'text-sky-800 hover:text-sky-600 '}
          target='_blank'
        >
          桃園市政府桃園捷運公司-單月平均日運量
        </a>
      </Card>
      <Card
        title='Method'
        titleColor='text-indigo-600'
        cardColor='bg-indigo-200'
      >
        將年和月轉換成Date物件，將其作為x軸，並將月平均運量作為y軸，使其以折線圖的方式呈現。
      </Card>
      <Card
        title='Insight'
        titleColor='text-slate-600'
        cardColor='bg-slate-300'
      >
        <span>
          從圖中可以觀察到，每月的平均運量從2019後穩定上升，但在2020後便急遽下降，猜測可能是受到COVID-19的影響:
          由於民眾出國的意願減少，因此搭乘機場捷運到桃園機場的人數也隨之減少。
        </span>
        <br />
        <span className='inline-block mt-1'>
          隨著疫情的趨緩，機場捷運的運量也在2022的六月後逐漸回升，甚至在八月達到了疫情前的最高峰。
        </span>
      </Card>
    </div>
  )
}
