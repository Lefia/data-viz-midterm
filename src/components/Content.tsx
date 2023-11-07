import clsx from 'clsx'
import Line from '@components/Line'
import Bar from '@components/Bar'
import Pie from '@components/Pie'
import Profile from '@components/Profile'

type ContentProps = {
  className?: string
  tabState: {
    tab: string
    setTab: (tab: string) => void
  }
}

export default function Content(props: ContentProps) {
  const { className, tabState } = props
  return (
    <div className={clsx(className)}>
        <div
          className={clsx(
            'w-full bg-zinc-600 h-[650px]',
            'rounded-lg ml-8 p-8',
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
