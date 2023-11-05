import clsx from 'clsx'
import Line from '@components/Line'

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
    <div className={clsx(className, 'flex flex-row items-center')}>
        <div
          className={clsx(
            'w-full bg-zinc-600 h-[650px]',
            'rounded-lg ml-8 p-8',
          )}
        >
          {tabState.tab === 'line-and-scatter' && <Line />}
        </div>
    </div>
  )
}
