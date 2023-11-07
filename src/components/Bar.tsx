import { useEffect, useState } from 'react'
import Plot from 'react-plotly.js'
import * as d3 from 'd3'
import Card from './Card'

export default function Bar() {
  const [data1, setData1] = useState<number[]>([])
  const [data2, setData2] = useState<number[]>()

  useEffect(() => {
    // 102年: https://data.gov.tw/dataset/153086
    d3.csv(
      `${import.meta.env.BASE_URL}data/102年現住人口數按性別及單齡人口分.csv`,
    ).then((data) => {
      const populationByAge = data.columns.slice(3).map((age) => {
        return data.reduce((acc, cur) => {
          return acc + parseInt(cur[age].replace(/,/g, '').trim())
        }, 0)
      })
      setData1(populationByAge)
    })

    // 112年: https://data.gov.tw/dataset/161717
    d3.csv(`${import.meta.env.BASE_URL}data/11208年齡.csv`).then((data) => {
      const populationByAge = data.columns.slice(3).map((age) => {
        return data.reduce((acc, cur) => {
          return acc + parseInt(cur[age].replace(/,/g, '').trim())
        }, 0)
      })
      setData2(populationByAge)
    })
  }, [])

  return (
    <div>
      <Plot
        data={[
          {
            name: '102年',
            y: data1,
            type: 'bar',
            marker: {
              color: '#ff7f0e',
            },
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
            },
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
          updatemenus: [
            {
              buttons: [
                {
                  args: [{ visible: [true, false, true] }],
                  label: '圖一',
                },
                {
                  args: [{ visible: [false, true, true] }],
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
          },
        }}
        useResizeHandler={true}
        config={{
          responsive: true,
          displaylogo: false,
        }}
        className={'w-full h-[450px] bg-white rounded-lg'}
      />
      <Card
        title='Source'
        titleColor='text-yellow-600'
        cardColor='bg-yellow-100'
        horizontal
      >
        <a
          href='https://data.gov.tw/dataset/153086'
          className={'text-sky-800 hover:text-sky-600'}
          target='_blank'
        >
          桃園市政府民政局-102年各區人口年齡層統計
        </a>
        <br />
        <a
          href='https://data.gov.tw/dataset/161717'
          className={'text-sky-800 hover:text-sky-600'}
          target='_blank'
        >
          桃園市政府民政局-桃園市112年各區人口年齡層統計
        </a>
      </Card>
      <Card
        title='Method'
        titleColor='text-indigo-600'
        cardColor='bg-indigo-200'
      >
        將每個年齡層的人口數加總，並以長條圖的方式呈現，用以比較過去與現今的人口組成變化。
        在圖二中，我將102年的全部人口年齡加10，也就是在圖表上向右位移10年，用來比較人口的移入移出及死亡變化。
      </Card>
      <Card
        title='Insight'
        titleColor='text-slate-600'
        cardColor='bg-slate-300'
      >
        <span>
          從圖一中可以觀察到，現在中年以上的人口相較於10年前有明顯的增加，人口組成有老化的趨勢。而在11歲到21歲這個區間的年輕人相較十年前則是有明顯的減少。
        </span>
        <br />
        <span className='inline-block mt-1'>
          在圖二中我們可以看到26歲到46歲的人口相較102年的多，很有可能是因為工作產生的移入人口大於移出人口。而79歲後的人口減少應該是死亡人口多於移入人口所導致。
        </span>
      </Card>
    </div>
  )
}
