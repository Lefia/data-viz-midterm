import clsx from 'clsx'
import Line from '@components/Line'
import Bar from '@components/Bar'
import Pie from '@components/Pie'
import Profile from '@components/Profile'

type ContentProps = {
  tabState: {
    tab: string
    setTab: (tab: string) => void
  }
}

export default function Content(props: ContentProps) {
  const { tabState } = props
  return (
    <div className={'w-full md:p-16 p-4 flex flex-col justify-center'}>
        <div
          className={clsx(
            'w-full bg-zinc-600 md:min-h-[550px] min-h-[300px]',
            'rounded-lg md:ml-12 p-8 my-8',
          )}
        >
          {tabState.tab === 'profile' && <Profile />}
          {tabState.tab === 'line' && <Line />}
          {tabState.tab === 'bar' && <Bar />}
          {tabState.tab === 'pie' && <Pie />}
        </div>
    </div>
  )
}
